import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "@/lib/db";
import { articles, episodes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createHmac, timingSafeEqual } from "crypto";

const TOKEN_TTL = 8 * 60 * 60; // 8 hours

function hmacSign(data: string, secret: string): string {
  return createHmac("sha256", secret).update(data).digest("hex");
}

function getSecret(): string {
  const s = process.env.ADMIN_SECRET;
  if (!s) throw new Error("ADMIN_SECRET not set");
  return s;
}

function getPassword(): string {
  const p = process.env.ADMIN_PASSWORD;
  if (!p) throw new Error("ADMIN_PASSWORD not set");
  return p;
}

function timingSafeEq(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

function makeToken(): string {
  const issued = Math.floor(Date.now() / 1000);
  const payload = `${issued}:${TOKEN_TTL}`;
  const sig = hmacSign(payload, getSecret());
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString();
    const parts = decoded.split(":");
    if (parts.length !== 3) return false;
    const [issued, ttl, sig] = parts;
    const expected = hmacSign(`${issued}:${ttl}`, getSecret());
    if (!timingSafeEq(sig, expected)) return false;
    const now = Math.floor(Date.now() / 1000);
    return now - Number(issued) < Number(ttl);
  } catch {
    return false;
  }
}

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

export const getArticles = createServerFn({ method: "GET" })
  .handler(async (): Promise<ArticleRow[]> => {
    return db.select().from(articles).orderBy(articles.createdAt) as Promise<ArticleRow[]>;
  });

export const getArticle = createServerFn({ method: "GET" })
  .validator((id: unknown) => z.string().uuid().parse(id))
  .handler(async ({ data }): Promise<ArticleRow | null> => {
    const rows = await db.select().from(articles).where(eq(articles.id, data)).limit(1);
    return (rows[0] as ArticleRow) ?? null;
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
  description: z.string().default(""),
  spotifyUrl: z.string().default(""),
  published: z.boolean().default(false),
});

export const getEpisodes = createServerFn({ method: "GET" })
  .handler(async (): Promise<EpisodeRow[]> => {
    return db.select().from(episodes).orderBy(episodes.number) as Promise<EpisodeRow[]>;
  });

export const getEpisode = createServerFn({ method: "GET" })
  .validator((id: unknown) => z.string().uuid().parse(id))
  .handler(async ({ data }): Promise<EpisodeRow | null> => {
    const rows = await db.select().from(episodes).where(eq(episodes.id, data)).limit(1);
    return (rows[0] as EpisodeRow) ?? null;
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
