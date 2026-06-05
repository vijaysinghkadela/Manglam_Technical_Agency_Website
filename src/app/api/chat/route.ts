import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  buildChatSystemPrompt,
  buildLocalAssistantReply,
} from "@/lib/chatbot/site-context";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(1000),
});

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
  pathname: z.string().max(200).optional(),
  pageTitle: z.string().max(120).optional(),
  pageDescription: z.string().max(300).optional(),
});

const API_CONTEXT_WINDOW = 15;
const OPENROUTER_ENDPOINT =
  "https://openrouter.ai/api/v1/chat/completions";
const CHAT_TIMEOUT_MS = 20_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();

  for (const [storeKey, value] of rateLimitStore) {
    if (value.resetAt <= now) rateLimitStore.delete(storeKey);
  }

  const current = rateLimitStore.get(key);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function getLastUserMessage(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
) {
  return (
    [...messages].reverse().find((message) => message.role === "user")
      ?.content ?? ""
  );
}

function localFallback(parsed: z.infer<typeof requestSchema>) {
  const lastUserMessage = getLastUserMessage(parsed.messages);
  return NextResponse.json(
    {
      success: true,
      source: "local-fallback",
      message: buildLocalAssistantReply(
        {
          pathname: parsed.pathname,
          pageTitle: parsed.pageTitle,
          pageDescription: parsed.pageDescription,
        },
        lastUserMessage,
      ),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

async function openRouterStream(
  orResponse: Response,
  fallbackText: string,
): Promise<Response> {
  const encoder = new TextEncoder();
  const reader = orResponse.body!.getReader();
  const decoder = new TextDecoder();
  let emittedContent = false;

  const stream = new ReadableStream({
    async pull(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;
            const data = trimmed.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || "";
              if (content) {
                emittedContent = true;
                controller.enqueue(encoder.encode(content));
              }
            } catch {
              // skip malformed JSON
            }
          }
        }
      } catch {
        // stream interrupted — partial content is still valid
      }
      if (!emittedContent) {
        controller.enqueue(encoder.encode(fallbackText));
      }
      controller.close();
    },
    cancel() {
      reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-store",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(getClientIp(request))) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many assistant requests. Please wait a minute and try again.",
        },
        {
          status: 429,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const parsed = requestSchema.parse(await request.json());
    const model =
      process.env.OPENROUTER_MODEL ?? "openai/gpt-oss-20b:free";

    const systemPrompt = buildChatSystemPrompt({
      pathname: parsed.pathname,
      pageTitle: parsed.pageTitle,
      pageDescription: parsed.pageDescription,
    });

    if (!apiKey) {
      console.warn("[chat] OPENROUTER_API_KEY not set; using local fallback");
      return localFallback(parsed);
    }

    const referer =
      process.env.NEXT_PUBLIC_SITE_URL ??
      "https://manglamtechnicalagency.com";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(OPENROUTER_ENDPOINT, {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": referer,
          "X-Title": "MTA Website Assistant",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            ...parsed.messages.slice(-API_CONTEXT_WINDOW).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          ],
          temperature: 0.3,
          top_p: 0.9,
          max_tokens: 800,
          stream: true,
        }),
      });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      const reason =
        fetchErr instanceof Error && fetchErr.name === "AbortError"
          ? `timeout (>${CHAT_TIMEOUT_MS / 1000}s)`
          : fetchErr instanceof Error
            ? fetchErr.message
            : String(fetchErr);
      console.error(`[chat] OpenRouter fetch failed (${reason})`);
      return localFallback(parsed);
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errBody = await response.text().catch(() => "<no body>");
      console.error(
        `[chat] OpenRouter HTTP ${response.status} — ${errBody.slice(0, 400)}`,
      );
      return localFallback(parsed);
    }

    const fallbackText = buildLocalAssistantReply(
      {
        pathname: parsed.pathname,
        pageTitle: parsed.pageTitle,
        pageDescription: parsed.pageDescription,
      },
      getLastUserMessage(parsed.messages),
    );

    return openRouterStream(response, fallbackText);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid request." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }
    console.error(
      "[chat] Unexpected error:",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(
      { success: false, message: "Chatbot error." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
