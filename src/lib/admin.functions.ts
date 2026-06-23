import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "@/lib/db";
import { articles, episodes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// ── Articles ──

const ArticleInput = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(200),
  kicker: z.string().min(1).max(200),
  title: z.string().min(1).max(500),
  metaLine: z.string().min(1).max(500),
  lead: z.string().min(1).max(2000),
  content: z.any(),
  seoTitle: z.string().min(1).max(200),
  seoDescription: z.string().min(1).max(500),
  published: z.boolean().default(false),
});

export const getArticles = createServerFn({ method: "GET" })
  .handler(async () => {
    return db.select().from(articles).orderBy(articles.createdAt);
  });

export const getArticle = createServerFn({ method: "GET" })
  .validator((id: unknown) => z.string().uuid().parse(id))
  .handler(async ({ data }) => {
    const rows = await db.select().from(articles).where(eq(articles.id, data)).limit(1);
    return rows[0] ?? null;
  });

export const upsertArticle = createServerFn({ method: "POST" })
  .validator((input: unknown) => ArticleInput.parse(input))
  .handler(async ({ data }) => {
    if (data.id) {
      await db.update(articles).set(data).where(eq(articles.id, data.id));
      return { ok: true, id: data.id };
    }
    const rows = await db.insert(articles).values(data).returning({ id: articles.id });
    return { ok: true, id: rows[0].id };
  });

export const deleteArticle = createServerFn({ method: "POST" })
  .validator((id: unknown) => z.string().uuid().parse(id))
  .handler(async ({ data }) => {
    await db.delete(articles).where(eq(articles.id, data));
    return { ok: true };
  });

// ── Episodes ──

const EpisodeInput = z.object({
  id: z.string().uuid().optional(),
  number: z.number().int().min(1),
  title: z.string().min(1).max(500),
  description: z.string().optional().or(z.literal("")),
  spotifyUrl: z.string().optional().or(z.literal("")),
  published: z.boolean().default(false),
});

export const getEpisodes = createServerFn({ method: "GET" })
  .handler(async () => {
    return db.select().from(episodes).orderBy(episodes.number);
  });

export const getEpisode = createServerFn({ method: "GET" })
  .validator((id: unknown) => z.string().uuid().parse(id))
  .handler(async ({ data }) => {
    const rows = await db.select().from(episodes).where(eq(episodes.id, data)).limit(1);
    return rows[0] ?? null;
  });

export const upsertEpisode = createServerFn({ method: "POST" })
  .validator((input: unknown) => EpisodeInput.parse(input))
  .handler(async ({ data }) => {
    if (data.id) {
      await db.update(episodes).set(data).where(eq(episodes.id, data.id));
      return { ok: true, id: data.id };
    }
    const rows = await db.insert(episodes).values(data).returning({ id: episodes.id });
    return { ok: true, id: rows[0].id };
  });

export const deleteEpisode = createServerFn({ method: "POST" })
  .validator((id: unknown) => z.string().uuid().parse(id))
  .handler(async ({ data }) => {
    await db.delete(episodes).where(eq(episodes.id, data));
    return { ok: true };
  });
