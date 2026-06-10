import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const ChatInputSchema = z.object({
  sessionId: z.string().uuid(),
  messages: z.array(MessageSchema).min(1).max(40),
});

const SYSTEM_PROMPT = `You are the AI concierge for NKM Advocates, a premier law firm in Nairobi, Kenya led by Managing Partner NKM A. (Advocate of the High Court of Kenya, CPS(K), and accredited mediator with 8+ years of experience).

Your job is to greet visitors warmly, answer questions about the firm, and help them decide whether to book a consultation or leave feedback.

Tone: professional, warm, concise, and confidence-inspiring. Use plain English. Avoid legal jargon unless asked. Never give specific legal advice or predict outcomes — instead, invite the visitor to schedule a confidential consultation.

Firm facts you can rely on:
- Location: Nairobi, Kenya. Office hours: Mon–Fri, 8:30 AM – 5:30 PM EAT.
- Email: nkionga@gmail.com
- Phone: +254 707 329 013
- Practice areas: (1) Corporate Governance & Company Secretarial, (2) Property & Real Estate Law, (3) Business & Startup Law, (4) Mediation & Dispute Resolution, (5) Private Client Services (wills, succession, estate planning), (6) Non-Profit & Advisory.
- Managing Partner expertise includes data protection (Kenya Data Protection Act, 2019), corporate governance, policy development, and mediation. She writes and speaks on data protection, governance, and child-rights education.
- Consultations: visitors can request one via the "Book Consultation" tab in this widget or the contact form on the page. We respond within one business day.

Rules:
- Never invent fees, court outcomes, or claims about the firm not listed above.
- If a visitor describes a legal matter, acknowledge it briefly and point them to the "Book Consultation" tab to share details confidentially.
- If asked something outside the firm's scope, say so and suggest booking a consultation to be referred appropriately.
- Keep responses under 120 words unless the visitor explicitly asks for more detail.`;

export const chatTurn = createServerFn({ method: "POST" })
  .validator((input: unknown) => ChatInputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[chatTurn] GEMINI_API_KEY is not set in environment variables");
      return { reply: "Our AI assistant is not configured yet. Please use the Book Consultation tab to reach our team directly." };
    }

    const userMessage = data.messages[data.messages.length - 1];

    // Persist user message (best-effort)
    try {
      await supabaseAdmin
        .from("chat_messages")
        .insert({
          session_id: data.sessionId,
          role: "user",
          content: userMessage.content,
        });
    } catch (e) {
      console.error("[chatTurn] Failed to persist user message:", e);
    }

    // Build Gemini request
    const contents = data.messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: {
            maxOutputTokens: 256,
            temperature: 0.7,
          },
        }),
      },
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("[chatTurn] Gemini API error", response.status, errText);
      if (response.status === 429) {
        return { reply: "Our assistant is briefly at capacity — please try again in a moment, or use the Book Consultation tab to reach our team directly." };
      }
      return { reply: "I'm having trouble processing your request right now. Please use the Book Consultation tab to reach our team directly." };
    }

    const json = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const reply = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "I'm here to help — could you rephrase that?";

    // Persist assistant reply (best-effort)
    try {
      await supabaseAdmin
        .from("chat_messages")
        .insert({
          session_id: data.sessionId,
          role: "assistant",
          content: reply,
        });
    } catch (e) {
      console.error("[chatTurn] Failed to persist assistant reply:", e);
    }

    return { reply };
  });
