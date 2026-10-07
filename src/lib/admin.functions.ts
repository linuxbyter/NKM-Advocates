import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "@/lib/db";
import { articles, episodes } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getPassword, makeToken, requireAuth, timingSafeEq, verifyToken } from "@/lib/admin-auth";
import { getInsight, type InsightArticle } from "@/lib/insights";

const AuthSchema = z.object({ token: z.string().min(1) });

// ── Auth ──

export const adminLogin = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ password: z.string() }).parse(input))
  .handler(async ({ data }) => {
    if (!timingSafeEq(data.password, getPassword())) {
      throw new Error("Invalid password");
    }
    return { ok: true, token: makeToken() };
  });

export const adminCheck = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ token: z.string() }).parse(input))
  .handler(async ({ data }): Promise<{ authenticated: boolean }> => {
    return { authenticated: verifyToken(data.token) };
  });

export interface ArticleRow {
  id: string;
  slug: string;
  kicker: string;
  title: string;
  metaLine: string;
  lead: string;
  content: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  createdAt: Date;
}

export interface EpisodeRow {
  id: string;
  number: number;
  title: string;
  description: string | null;
  spotifyUrl: string | null;
  published: boolean;
  createdAt: Date;
}

// ── Articles ──

const ArticleInput = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(200),
  kicker: z.string().min(1).max(200),
  title: z.string().min(1).max(500),
  metaLine: z.string().min(1).max(500),
  lead: z.string().min(1).max(2000),
  content: z.array(z.record(z.string(), z.unknown())).default([]),
  seoTitle: z.string().min(1).max(200),
  seoDescription: z.string().min(1).max(500),
  published: z.boolean().default(false),
});

export const getArticles = createServerFn({ method: "POST" })
  .validator((input: unknown) => AuthSchema.parse(input))
  .handler(async ({ data }): Promise<ArticleRow[]> => {
    requireAuth(data.token);
    return db.select().from(articles).orderBy(articles.createdAt) as Promise<ArticleRow[]>;
  });

export const getArticle = createServerFn({ method: "POST" })
  .validator((input: unknown) => AuthSchema.extend({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }): Promise<ArticleRow | null> => {
    requireAuth(data.token);
    const rows = await db.select().from(articles).where(eq(articles.id, data.id)).limit(1);
    return (rows[0] as ArticleRow) ?? null;
  });

export const upsertArticle = createServerFn({ method: "POST" })
  .validator((input: unknown) => ArticleInput.extend({ token: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    requireAuth(data.token);
    const { token: _token, ...values } = data;
    const clash = await db
      .select({ id: articles.id })
      .from(articles)
      .where(eq(articles.slug, values.slug))
      .limit(1);
    if (clash.length > 0 && clash[0].id !== values.id) {
      throw new Error(`The web address "${values.slug}" is already used by another article.`);
    }
    if (!values.id && getInsight(values.slug)) {
      throw new Error(`The web address "${values.slug}" is already used by a published article.`);
    }
    if (values.id) {
      await db.update(articles).set(values).where(eq(articles.id, values.id));
      return { ok: true, id: values.id };
    }
    const rows = await db.insert(articles).values(values).returning({ id: articles.id });
    return { ok: true, id: rows[0].id };
  });

export const deleteArticle = createServerFn({ method: "POST" })
  .validator((input: unknown) => AuthSchema.extend({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    requireAuth(data.token);
    await db.delete(articles).where(eq(articles.id, data.id));
    return { ok: true };
  });

// ── Episodes ──

const EpisodeInput = z.object({
  id: z.string().uuid().optional(),
  number: z.number().int().min(1),
  title: z.string().min(1).max(500),
  description: z.string().default(""),
  spotifyUrl: z.string().default(""),
  published: z.boolean().default(false),
});

export const getEpisodes = createServerFn({ method: "POST" })
  .validator((input: unknown) => AuthSchema.parse(input))
  .handler(async ({ data }): Promise<EpisodeRow[]> => {
    requireAuth(data.token);
    return db.select().from(episodes).orderBy(episodes.number) as Promise<EpisodeRow[]>;
  });

export const getEpisode = createServerFn({ method: "POST" })
  .validator((input: unknown) => AuthSchema.extend({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }): Promise<EpisodeRow | null> => {
    requireAuth(data.token);
    const rows = await db.select().from(episodes).where(eq(episodes.id, data.id)).limit(1);
    return (rows[0] as EpisodeRow) ?? null;
  });

export const upsertEpisode = createServerFn({ method: "POST" })
  .validator((input: unknown) => EpisodeInput.extend({ token: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    requireAuth(data.token);
    const { token: _token, ...values } = data;
    if (values.id) {
      await db.update(episodes).set(values).where(eq(episodes.id, values.id));
      return { ok: true, id: values.id };
    }
    const rows = await db.insert(episodes).values(values).returning({ id: episodes.id });
    return { ok: true, id: rows[0].id };
  });

export const deleteEpisode = createServerFn({ method: "POST" })
  .validator((input: unknown) => AuthSchema.extend({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    requireAuth(data.token);
    await db.delete(episodes).where(eq(episodes.id, data.id));
    return { ok: true };
  });

// ── Public site content (published only, no auth) ──

function str(v: unknown): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.map(str).join("\n");
  if (v == null) return "";
  return String(v);
}

function toSections(raw: unknown): InsightArticle["sections"] {
  let data = raw;
  if (typeof data === "string") {
    const text = data;
    try {
      data = JSON.parse(text);
    } catch {
      return text.trim() ? [{ type: "paragraph", content: text }] : [];
    }
  }
  if (!Array.isArray(data)) return [];
  const out: InsightArticle["sections"] = [];
  for (const entry of data) {
    if (!entry || typeof entry !== "object") continue;
    const rec = entry as Record<string, unknown>;
    switch (rec.type) {
      case "paragraph":
      case "heading":
      case "pullquote":
        out.push({ type: rec.type, content: str(rec.content) });
        break;
      case "callout":
        out.push({
          type: "callout",
          variant: rec.variant === "teal" || rec.variant === "danger" ? rec.variant : "brass",
          title: str(rec.title),
          content: Array.isArray(rec.content)
            ? rec.content.map(str).filter((l) => l.trim() !== "")
            : str(rec.content)
                .split("\n")
                .filter((l) => l.trim() !== ""),
        });
        break;
      case "list":
        out.push({
          type: "list",
          items: Array.isArray(rec.items)
            ? rec.items.map((it) => {
                if (typeof it === "string") return { text: it };
                const o = (it ?? {}) as Record<string, unknown>;
                return typeof o.bold === "string" && o.bold
                  ? { bold: o.bold, text: str(o.text) }
                  : { text: str(o.text) };
              })
            : [],
        });
        break;
      case "cta":
        out.push({ type: "cta", heading: str(rec.heading), body: str(rec.body) });
        break;
      default:
        break;
    }
  }
  return out;
}

function rowToInsight(row: ArticleRow): InsightArticle {
  return {
    slug: row.slug,
    kicker: row.kicker,
    title: row.title,
    metaLine: row.metaLine,
    lead: row.lead,
    seoTitle: row.seoTitle || row.title,
    seoDescription: row.seoDescription || row.lead.slice(0, 160),
    sections: toSections(row.content),
  };
}

export const getSiteInsights = createServerFn({ method: "GET" }).handler(
  async (): Promise<InsightArticle[]> => {
    try {
      const rows = (await db
        .select()
        .from(articles)
        .where(eq(articles.published, true))
        .orderBy(articles.createdAt)) as ArticleRow[];
      return rows.map(rowToInsight);
    } catch (err) {
      console.error("[getSiteInsights]", err);
      return [];
    }
  },
);

export const getSiteInsight = createServerFn({ method: "GET" })
  .validator((slug: unknown) => z.string().min(1).max(200).parse(slug))
  .handler(async ({ data }): Promise<InsightArticle | null> => {
    try {
      const rows = (await db
        .select()
        .from(articles)
        .where(and(eq(articles.slug, data), eq(articles.published, true)))
        .limit(1)) as ArticleRow[];
      return rows[0] ? rowToInsight(rows[0]) : null;
    } catch (err) {
      console.error("[getSiteInsight]", err);
      return null;
    }
  });

export interface PublicEpisode {
  number: number;
  title: string;
  description: string | null;
  spotifyUrl: string | null;
}

export const getSiteEpisodes = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicEpisode[]> => {
    try {
      const rows = await db
        .select({
          number: episodes.number,
          title: episodes.title,
          description: episodes.description,
          spotifyUrl: episodes.spotifyUrl,
        })
        .from(episodes)
        .where(eq(episodes.published, true))
        .orderBy(episodes.number);
      return rows as PublicEpisode[];
    } catch (err) {
      console.error("[getSiteEpisodes]", err);
      return [];
    }
  },
);
