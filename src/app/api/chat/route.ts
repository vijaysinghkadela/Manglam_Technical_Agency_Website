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
      return generateFallbackResponse(parsed);
    }

    const referer =
      process.env.NEXT_PUBLIC_SITE_URL ??
      "https://manglamtechnicalagency.com";

    const response = await fetch(OPENROUTER_ENDPOINT, {
      method: "POST",
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

    if (!response.ok) {
      // Rate-limited (429), bad key (401), upstream error (5xx) — fall back.
      return generateFallbackResponse(parsed);
    }

    const data = (await response.json().catch(() => null)) as
      | OpenRouterResponse
      | null;

    if (!data || data.error) {
      return generateFallbackResponse(parsed);
    }

    const message = data.choices?.[0]?.message?.content?.trim();

    if (!message) {
      return generateFallbackResponse(parsed);
    }

    return NextResponse.json({
      success: true,
      source: "openrouter",
      message,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Please send a valid chat message." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "The chatbot could not process your request.",
      },
      { status: 500 },
    );
  }
}
