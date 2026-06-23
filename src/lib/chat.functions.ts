import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import Groq from "groq-sdk";
import { db } from "@/lib/db";
import { chatMessages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const ChatInputSchema = z.object({
  sessionId: z.string().uuid(),
  messages: z.array(MessageSchema).min(1).max(40),
});

const SYSTEM_PROMPT = `You are the AI concierge for NKM Advocates, a premier multi-disciplinary law firm in Nairobi, Kenya led by Managing Partner Agnes Nyawira (Advocate of the High Court of Kenya, CPS(K), and accredited mediator with 8+ years of experience).

Your job is to greet visitors warmly, answer questions about the firm, and help them decide whether to book a consultation or leave feedback.

Tone: professional, warm, concise, and confidence-inspiring. Use plain English. Avoid legal jargon unless asked. Never give specific legal advice or predict outcomes — instead, invite the visitor to schedule a confidential consultation.

Firm facts you can rely on:
- Location: Wilkem Edge Business Center, 1st Floor, Matasia, Ngong. Office hours: Mon–Sat, 9am–5pm EAT.
- Email: contact@nkm-advocates.co.ke
- Phone/WhatsApp: +254 707 329 013
- Eight departments:
  1. Business & SME Advisory (SME-01) — Formation, contracts, compliance, tax structuring
  2. Real Estate (RE-02) — Title verification, leases, conveyancing, due diligence
  3. Debt Recovery & Small Claims (DR-03) — Demand letters, SCC representation, judgment enforcement
  4. Mediation, Arbitration & ADR (ADR-04) — Mediation, arbitration, dispute resolution
  5. Intellectual Property (IP-05) — Trademarks, copyright, brand protection
  6. NGO & Non-Profit Registration (NGO-06) — PBO registration, compliance, governance
  7. Family Law (FAM-07) — Succession, custody, power of attorney
  8. Data Protection (DP-08) — DPA compliance, ODPC registration, DPIAs
- Consultations: visitors can request one via the "Book Consultation" tab in this widget or the contact form on the page. We respond within one business day.

Rules:
- Never invent fees, court outcomes, or claims about the firm not listed above.
- If a visitor describes a legal matter, acknowledge it briefly and point them to the "Book Consultation" tab to share details confidentially.
- If asked something outside the firm's scope, say so and suggest booking a consultation to be referred appropriately.
- Keep responses under 120 words unless the visitor explicitly asks for more detail.`;

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("[chatTurn] GROQ_API_KEY is not set in environment variables");
    return null;
  }
  return new Groq({ apiKey });
}

export const chatTurn = createServerFn({ method: "POST" })
  .validator((input: unknown) => ChatInputSchema.parse(input))
  .handler(async ({ data }) => {
    const groq = getGroqClient();
    if (!groq) {
      return { reply: "Our AI assistant is not configured yet. Please use the Book Consultation tab to reach our team directly." };
    }

    const userMessage = data.messages[data.messages.length - 1];

    // Persist user message (best-effort)
    try {
      await db.insert(chatMessages).values({
        sessionId: data.sessionId,
        role: "user",
        content: userMessage.content,
      });
    } catch (e) {
      console.error("[chatTurn] Failed to persist user message:", e);
    }

    // Build Groq request (OpenAI-compatible format)
    const messages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...data.messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages,
        max_tokens: 256,
        temperature: 0.7,
      });

      const reply = completion.choices[0]?.message?.content?.trim() ?? "I'm here to help — could you rephrase that?";

      // Persist assistant reply (best-effort)
      try {
        await db.insert(chatMessages).values({
          sessionId: data.sessionId,
          role: "assistant",
          content: reply,
        });
      } catch (e) {
        console.error("[chatTurn] Failed to persist assistant reply:", e);
      }

      return { reply };
    } catch (err: any) {
      console.error("[chatTurn] Groq API error:", err?.status, err?.message);
      if (err?.status === 429) {
        return { reply: "Our assistant is briefly at capacity — please try again in a moment, or use the Book Consultation tab to reach our team directly." };
      }
      return { reply: "I'm having trouble processing your request right now. Please use the Book Consultation tab to reach our team directly." };
    }
  });
