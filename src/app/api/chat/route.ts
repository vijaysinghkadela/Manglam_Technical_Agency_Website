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
  content: z.string().min(1).max(4000),
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
  return NextResponse.json({
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
  });
}

async function openRouterStream(orResponse: Response): Promise<Response> {
  const encoder = new TextEncoder();
  const reader = orResponse.body!.getReader();
  const decoder = new TextDecoder();

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
              if (content) controller.enqueue(encoder.encode(content));
            } catch {
              // skip malformed JSON
            }
          }
        }
      } catch {
        // stream interrupted — partial content is still valid
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
      "Cache-Control": "no-cache",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
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
      console.error("[chat] OPENROUTER_API_KEY not set — using local fallback");
      return localFallback(parsed);
    }

    const referer =
      process.env.NEXT_PUBLIC_SITE_URL ??
      "https://manglamtechnicalagency.com";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30_000);

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
          max_tokens: 1200,
          stream: true,
        }),
      });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      const reason =
        fetchErr instanceof Error && fetchErr.name === "AbortError"
          ? "timeout (>30s)"
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

    return openRouterStream(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid request." },
        { status: 400 },
      );
    }
    console.error(
      "[chat] Unexpected error:",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(
      { success: false, message: "Chatbot error." },
      { status: 500 },
    );
  }
}
