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

interface OpenRouterChoice {
  message?: { role?: string; content?: string };
  finish_reason?: string;
}

interface OpenRouterResponse {
  choices?: OpenRouterChoice[];
  error?: { message?: string; code?: number | string };
}

function getLastUserMessage(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
) {
  return (
    [...messages].reverse().find((message) => message.role === "user")
      ?.content ?? ""
  );
}

function generateFallbackResponse(parsed: z.infer<typeof requestSchema>) {
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
      console.error(
        "[chat] OPENROUTER_API_KEY is not set in this environment — falling back to local templated reply. Set the env var in your hosting dashboard (e.g. Vercel → Settings → Environment Variables).",
      );
      return generateFallbackResponse(parsed);
    }

    const referer =
      process.env.NEXT_PUBLIC_SITE_URL ??
      "https://manglamtechnicalagency.com";

    // OpenRouter free models can be slow; cap at 25s to leave headroom under
    // the Vercel Hobby 30s function timeout.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25_000);

    let response: Response;
    try {
      response = await fetch(OPENROUTER_ENDPOINT, {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          // OpenRouter uses these for analytics & rate-limiting policy.
          "HTTP-Referer": referer,
          "X-Title": "MTA Website Assistant",
        },
        body: JSON.stringify({
          model,
          // System prompt rides as the first message in OpenAI-compatible API.
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
          stream: false,
        }),
      });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      const reason =
        fetchErr instanceof Error && fetchErr.name === "AbortError"
          ? "timeout (>25s)"
          : fetchErr instanceof Error
            ? fetchErr.message
            : String(fetchErr);
      console.error(`[chat] OpenRouter fetch failed (${reason}) — model=${model}`);
      return generateFallbackResponse(parsed);
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      // Rate-limited (429), bad key (401), upstream error (5xx) — fall back.
      const errBody = await response.text().catch(() => "<no body>");
      console.error(
        `[chat] OpenRouter HTTP ${response.status} ${response.statusText} — model=${model} — ${errBody.slice(0, 400)}`,
      );
      return generateFallbackResponse(parsed);
    }

    const data = (await response.json().catch(() => null)) as
      | OpenRouterResponse
      | null;

    if (!data || data.error) {
      console.error(
        `[chat] OpenRouter returned error payload — model=${model} — ${JSON.stringify(data?.error ?? data).slice(0, 400)}`,
      );
      return generateFallbackResponse(parsed);
    }

    const message = data.choices?.[0]?.message?.content?.trim();

    if (!message) {
      console.error(
        `[chat] OpenRouter returned empty/missing content — model=${model} — finish_reason=${data.choices?.[0]?.finish_reason ?? "unknown"}`,
      );
      return generateFallbackResponse(parsed);
    }

    return NextResponse.json({
      success: true,
      source: "openrouter",
      message,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("[chat] Request validation failed:", error.issues);
      return NextResponse.json(
        { success: false, message: "Please send a valid chat message." },
        { status: 400 },
      );
    }

    console.error(
      "[chat] Unexpected error in POST handler:",
      error instanceof Error ? `${error.name}: ${error.message}` : error,
    );
    return NextResponse.json(
      {
        success: false,
        message: "The chatbot could not process your request.",
      },
      { status: 500 },
    );
  }
}
