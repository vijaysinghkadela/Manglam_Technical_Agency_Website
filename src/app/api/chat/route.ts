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

interface GeminiContentPart {
  text?: string;
}

interface GeminiCandidate {
  content?: {
    parts?: GeminiContentPart[];
  };
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
}

function extractGeminiText(payload: GeminiResponse): string {
  const candidate = payload?.candidates?.[0];
  const parts = candidate?.content?.parts ?? [];
  return parts
    .map((part) => (typeof part?.text === "string" ? part.text : ""))
    .join("")
    .trim();
}

function getLastUserMessage(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
) {
  return (
    [...messages].reverse().find((message) => message.role === "user")
      ?.content ?? ""
  );
}

async function generateFallbackResponse(parsed: z.infer<typeof requestSchema>) {
  const lastUserMessage = getLastUserMessage(parsed.messages);
  return NextResponse.json({
    success: true,
    message: buildLocalAssistantReply(
      {
        pathname: parsed.pathname,
        pageTitle: parsed.pageTitle,
        pageDescription: parsed.pageDescription,
      },
      lastUserMessage,
    ),
    source: "local-fallback",
  });
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    const parsed = requestSchema.parse(await request.json());
    const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
    const systemPrompt = buildChatSystemPrompt({
      pathname: parsed.pathname,
      pageTitle: parsed.pageTitle,
      pageDescription: parsed.pageDescription,
    });

    if (!apiKey) {
      return generateFallbackResponse(parsed);
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: parsed.messages.slice(-12).map((message) => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [{ text: message.content }],
          })),
          generationConfig: {
            temperature: 0.35,
            topP: 0.9,
            topK: 40,
            maxOutputTokens: 800,
          },
        }),
      },
    );

    if (!response.ok) {
      return generateFallbackResponse(parsed);
    }

    const data: GeminiResponse = await response.json();
    const message = extractGeminiText(data);

    if (!message) {
      return generateFallbackResponse(parsed);
    }

    return NextResponse.json({ success: true, message });
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
