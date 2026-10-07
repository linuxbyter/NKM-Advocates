import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import Groq from "groq-sdk";
import { requireAuth } from "@/lib/admin-auth";
import { getInsight } from "@/lib/insights";
import { db } from "@/lib/db";
import { articles, episodes } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

const MODEL = "openai/gpt-oss-120b";

function clampFields(value: Record<string, unknown>, limits: Record<string, number>): void {
  for (const [key, max] of Object.entries(limits)) {
    const current = value[key];
    if (typeof current === "string" && current.length > max) value[key] = current.slice(0, max);
  }
}

const ARTICLE_FIELD_LIMITS: Record<string, number> = {
  kicker: 200,
  title: 300,
  slug: 200,
  metaLine: 300,
  lead: 1500,
  seoTitle: 200,
  seoDescription: 300,
};

const EPISODE_FIELD_LIMITS: Record<string, number> = {
  title: 300,
  description: 800,
};

const SECTION_CONTENT_LIMITS: Record<string, number> = {
  heading: 300,
  paragraph: 3000,
  pullquote: 400,
  cta: 600,
  callout: 500,
  list: 400,
};

function clampSections(value: unknown): void {
  if (!Array.isArray(value)) return;
  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;
    const section = entry as Record<string, unknown>;
    const max = SECTION_CONTENT_LIMITS[String(section.type)] ?? 3000;
    if (section.type === "cta") {
      if (typeof section.heading === "string") section.heading = section.heading.slice(0, 200);
      if (typeof section.body === "string") section.body = section.body.slice(0, max);
      continue;
    }
    if (section.type === "callout") {
      if (typeof section.title === "string") section.title = section.title.slice(0, 200);
      if (Array.isArray(section.content)) {
        section.content = section.content.map((line: unknown) =>
          typeof line === "string" ? line.slice(0, max) : line,
        );
      }
      continue;
    }
    if (section.type === "list" && Array.isArray(section.items)) {
      section.items = section.items.map((item: unknown) => {
        if (!item || typeof item !== "object") return item;
        const row = item as Record<string, unknown>;
        if (typeof row.text === "string") row.text = row.text.slice(0, max);
        if (typeof row.bold === "string") row.bold = row.bold.slice(0, 120);
        return row;
      });
      continue;
    }
    if (typeof section.content === "string") section.content = section.content.slice(0, max);
  }
}

function getGroqClient(): Groq {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("AI assistant is not configured (missing GROQ_API_KEY).");
  return new Groq({ apiKey });
}

const FIRM_CONTEXT = `You are the in-house content assistant for NKM Advocates, a multi-disciplinary law firm in Nairobi, Kenya (Managing Partner: Agnes Nyawira, Advocate of the High Court of Kenya, CPS(K), accredited mediator).

Departments: Business & SME Advisory; Real Estate & Conveyancing; Debt Recovery & Small Claims; Mediation, Arbitration & ADR; Intellectual Property; NGO & Non-Profit Registration; Family Law (succession, custody, power of attorney); Data Protection.

Audiences: Kenyan SMEs and startups, diaspora/overseas Kenyans, and investors.

Voice: plain-English, warm, confident, practical. Kenya-specific (laws, institutions, shillings, real processes). Never invent fees, statute amendments, court outcomes, statistics, or case citations. Do not give individualized legal advice — invite readers to book a consultation.`;

// ── Article draft ──

const ArticleBrief = z.object({
  token: z.string().min(1),
  brief: z.string().min(10).max(4000),
  tone: z.string().max(200).optional(),
});

const SectionSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), content: z.string().min(1).max(300) }),
  z.object({ type: z.literal("paragraph"), content: z.string().min(1).max(3000) }),
  z.object({ type: z.literal("pullquote"), content: z.string().min(1).max(400) }),
  z.object({
    type: z.literal("list"),
    items: z
      .array(z.object({ bold: z.string().max(120).optional(), text: z.string().min(1).max(400) }))
      .min(2)
      .max(12),
  }),
  z.object({
    type: z.literal("callout"),
    variant: z.enum(["brass", "teal", "danger"]),
    title: z.string().min(1).max(200),
    content: z.array(z.string().min(1).max(500)).min(1).max(8),
  }),
  z.object({
    type: z.literal("cta"),
    heading: z.string().min(1).max(200),
    body: z.string().min(1).max(600),
  }),
]);

const ArticleDraftSchema = z.object({
  kicker: z.string().min(1).max(200),
  title: z.string().min(1).max(300),
  slug: z.string().min(1).max(200),
  metaLine: z.string().min(1).max(300),
  lead: z.string().min(50).max(1500),
  seoTitle: z.string().min(1).max(200),
  seoDescription: z.string().min(50).max(300),
  sections: z.array(SectionSchema).min(3).max(30),
});

export type ArticleDraft = z.infer<typeof ArticleDraftSchema>;

const ARTICLE_SYSTEM = `${FIRM_CONTEXT}

You draft complete, ready-to-review articles for the firm's Insights section.

Return ONLY a JSON object with exactly these keys:
{
  "kicker": "Topic · Audience label, e.g. SME Advisory · Diaspora",
  "title": "compelling headline, max 70 chars",
  "slug": "kebab-case-url-slug",
  "metaLine": "Month Year · Topic · N-minute read",
  "lead": "bold opening hook paragraph, 70-110 words",
  "seoTitle": "Google title, max 60 chars",
  "seoDescription": "meta description, 140-160 chars",
  "sections": [ ...blocks... ]
}

Section block types (use 6-10 blocks total):
- {"type":"heading","content":"Section heading"}
- {"type":"paragraph","content":"70-140 word paragraph"}
- {"type":"pullquote","content":"one striking sentence"}
- {"type":"list","items":[{"bold":"Lead phrase","text":"explanation"}, ...]}  (4-7 items)
- {"type":"callout","variant":"brass"|"teal"|"danger","title":"BOX TITLE","content":["bullet","bullet"]}
- {"type":"cta","heading":"SPEAK TO AN ADVOCATE TODAY","body":"one-sentence invitation ending with contact by consultation"}

Structure: 2-4 paragraphs opening, then headings with paragraphs/lists under them, exactly one pullquote, exactly one callout, end with exactly one cta block. Total 700-1100 words. Everything Kenya-specific and practical.`;

export const aiDraftArticle = createServerFn({ method: "POST" })
  .validator((input: unknown) => ArticleBrief.parse(input))
  .handler(async ({ data }): Promise<ArticleDraft> => {
    requireAuth(data.token);
    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: ARTICLE_SYSTEM },
        {
          role: "user",
          content: `Write the article draft for this brief:\n\n${data.brief}${data.tone ? `\n\nTone/notes: ${data.tone}` : ""}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 8000,
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      throw new Error("The assistant returned an unreadable draft — please try again.");
    }
    if (parsed && typeof parsed === "object") {
      clampFields(parsed as Record<string, unknown>, ARTICLE_FIELD_LIMITS);
      clampSections((parsed as Record<string, unknown>).sections);
    }
    const draft = ArticleDraftSchema.parse(parsed);
    draft.slug = draft.slug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 200);
    return draft;
  });

// ── Episode draft ──

const EpisodeBrief = z.object({
  token: z.string().min(1),
  brief: z.string().min(10).max(4000),
  nextNumber: z.number().int().min(1),
});

const EpisodeDraftSchema = z.object({
  title: z.string().min(1).max(300),
  description: z.string().min(20).max(800),
});

export type EpisodeDraft = z.infer<typeof EpisodeDraftSchema>;

const EPISODE_SYSTEM = `${FIRM_CONTEXT}

You draft metadata for episodes of The NKM Podcast — short, plain-English conversations on Kenyan business law, diaspora property risk, and SME mistakes.

Return ONLY a JSON object:
{
  "title": "episode title, max 80 chars, specific and curiosity-drawing",
  "description": "2 sentences (max 600 characters) describing what listeners will take away"
}

No markdown, no hashtags, no episode number in the title.`;

export const aiDraftEpisode = createServerFn({ method: "POST" })
  .validator((input: unknown) => EpisodeBrief.parse(input))
  .handler(async ({ data }): Promise<EpisodeDraft & { number: number }> => {
    requireAuth(data.token);
    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: EPISODE_SYSTEM },
        {
          role: "user",
          content: `Draft episode ${data.nextNumber} from this idea:\n\n${data.brief}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 3000,
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      throw new Error("The assistant returned an unreadable draft — please try again.");
    }
    if (parsed && typeof parsed === "object") {
      clampFields(parsed as Record<string, unknown>, EPISODE_FIELD_LIMITS);
    }
    const draft = EpisodeDraftSchema.parse(parsed);
    return { number: data.nextNumber, ...draft };
  });

// ── Helpers used by the admin UI ──

export const getNextEpisodeNumber = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ token: z.string().min(1) }).parse(input))
  .handler(async ({ data }): Promise<{ number: number }> => {
    requireAuth(data.token);
    try {
      const rows = await db
        .select({ number: episodes.number })
        .from(episodes)
        .orderBy(desc(episodes.number))
        .limit(1);
      return { number: (rows[0]?.number ?? 0) + 1 };
    } catch (err) {
      console.error("[getNextEpisodeNumber]", err);
      return { number: 1 };
    }
  });

export const slugExists = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z.object({ token: z.string().min(1), slug: z.string().min(1).max(200) }).parse(input),
  )
  .handler(async ({ data }): Promise<{ exists: boolean }> => {
    requireAuth(data.token);
    if (getInsight(data.slug)) return { exists: true };
    try {
      const rows = await db
        .select({ id: articles.id })
        .from(articles)
        .where(eq(articles.slug, data.slug))
        .limit(1);
      return { exists: rows.length > 0 };
    } catch (err) {
      console.error("[slugExists]", err);
      return { exists: false };
    }
  });
