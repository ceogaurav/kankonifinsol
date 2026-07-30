import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { companyInfo } from "@/lib/site-data";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatPayload {
  sessionId?: unknown;
  message?: unknown;
  history?: unknown;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function genSessionId(): string {
  return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function isChatMessage(m: unknown): m is { role: string; content: unknown } {
  if (typeof m !== "object" || m === null) return false;
  const role = (m as { role?: unknown }).role;
  return role === "user" || role === "assistant";
}

function safeHistory(v: unknown): ChatMessage[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter(isChatMessage)
    .map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: typeof m.content === "string" ? m.content.slice(0, 4000) : "",
    }))
    .filter((m) => m.content.length > 0)
    .slice(-8); // keep last 8 turns max for context
}

const SYSTEM_PROMPT = `You are "Kankoni", the AI financial concierge for Kankoni Finsol, a premium Indian financial services platform headquartered in Mumbai.

Your role:
- Help Indian users understand loans (personal, business, home, mortgage, loan-against-property, working capital, OD/CC, machinery, construction finance, balance transfer, gold, car), EMI math, eligibility, required documents, bank comparison, insurance, mutual funds, MSME finance, CIBIL score improvement, and basic tax-saving investments.
- Be friendly, premium, and concise. India-focused. Use ₹ for currency.
- Keep every reply under ~180 words. Prefer short paragraphs or concise bullet points.
- NEVER invent exact interest rates randomly. For Personal Loans, ALWAYS quote these exact starting rates: ICICI (9.99%), HDFC (9.99%), IDFC First (9.99%), Axis (13.00%), Aditya Birla (13.00%). For other loans, quote typical ranges like "home loans usually start around 8.35% p.a.".
- Never promise approval. Encourage the user to (a) use the AI Eligibility Checker on the website, or (b) speak to a dedicated Kankoni relationship manager.
- If the user wants to talk to a human, share the contact details below.
- Never ask for sensitive data (PAN, full Aadhaar, OTP, card numbers). Tell the user to never share these in chat.
- Stay within financial topics. If a query is off-topic, gently steer back to finance.

Company contact (share when relevant):
- Phone: ${companyInfo.phone}
- WhatsApp: +${companyInfo.whatsapp}
- Email: ${companyInfo.email}
- Address: ${companyInfo.address}
- Hours: ${companyInfo.hours}

End most replies with a short call-to-action (book a consultation, try the eligibility checker, or request a callback).`;

const FALLBACK_REPLY =
  "I'm here to help with loans, EMIs, eligibility, insurance, mutual funds and more. " +
  "I'm having a brief issue answering in detail right now — please try again, or speak to a " +
  `Kankoni relationship manager at ${companyInfo.phone} (WhatsApp +${companyInfo.whatsapp}). ` +
  "You can also try our AI Eligibility Checker for an instant loan assessment.";

async function persistSession(
  sessionId: string,
  userAgent: string | null,
  messages: ChatMessage[]
) {
  try {
    await db.chatSession.upsert({
      where: { sessionId },
      update: { messages, userAgent, updatedAt: new Date() },
      create: { sessionId, userAgent, messages },
    });
  } catch (err) {
    console.error("[api/chat persist] error:", err);
  }
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!rateLimit(`chat:${ip}`, 30, 60_000)) {
      return Response.json(
        { success: false, error: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }

    let body: ChatPayload;
    try {
      body = (await req.json()) as ChatPayload;
    } catch {
      return Response.json(
        { success: false, error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const message = isNonEmptyString(body.message) ? body.message.trim() : "";
    if (!message) {
      return Response.json(
        { success: false, error: "message is required." },
        { status: 400 }
      );
    }
    if (message.length > 2000) {
      return Response.json(
        { success: false, error: "Message too long (max 2000 characters)." },
        { status: 400 }
      );
    }

    const sessionId =
      isNonEmptyString(body.sessionId) && body.sessionId.length < 80
        ? body.sessionId.trim()
        : genSessionId();

    const userAgent = req.headers.get("user-agent");
    const priorHistory = safeHistory(body.history);

    // Build conversation for the LLM: system + prior + new user message
    const llmMessages: { role: "assistant" | "user"; content: string }[] = [
      { role: "assistant", content: SYSTEM_PROMPT },
      ...priorHistory.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    let reply = "";
    let usedFallback = false;

    try {
      const zai = await ZAI.create();
      const completion = await zai.chat.completions.create({
        messages: llmMessages,
        thinking: { type: "disabled" },
      });
      reply =
        completion?.choices?.[0]?.message?.content?.trim() || FALLBACK_REPLY;
    } catch (llmErr) {
      console.error("[api/chat LLM] error:", llmErr);
      reply = FALLBACK_REPLY;
      usedFallback = true;
    }

    // Hard cap reply length to keep UX tight
    if (reply.length > 1200) reply = reply.slice(0, 1200).trim() + "…";

    // Persist conversation history (cap to last 20 turns)
    const newHistory: ChatMessage[] = [
      ...priorHistory,
      { role: "user", content: message },
      { role: "assistant", content: reply },
    ].slice(-20);

    await persistSession(sessionId, userAgent, newHistory);

    return Response.json(
      usedFallback
        ? { success: false, fallback: true, sessionId, reply }
        : { success: true, sessionId, reply }
    );
  } catch (err) {
    console.error("[api/chat POST] error:", err);
    return Response.json(
      {
        success: false,
        fallback: true,
        reply: FALLBACK_REPLY,
        error: "Something went wrong.",
      },
      { status: 200 }
    );
  }
}
