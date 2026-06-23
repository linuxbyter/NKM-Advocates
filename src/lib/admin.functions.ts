import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "@/lib/db";
import { articles, episodes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCookie, setCookie, deleteCookie } from "@tanstack/start-server-core";
import { createHash, timingSafeEqual } from "crypto";

const COOKIE_NAME = "nkm_admin";
const SESSION_TTL = 8 * 60 * 60; // 8 hours

function signToken(password: string, secret: string): string {
  return createHash("sha256").update(`${password}:${secret}`).digest("hex");
}

function getAdminSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET env var not set");
  return secret;
}

function getAdminPassword(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD env var not set");
  return pw;
}

function getAdminToken(): string {
  return signToken(getAdminPassword(), getAdminSecret());
}

function timingSafeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

// ── Auth ──

export const adminLogin = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ password: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const valid = timingSafeCompare(data.password, getAdminPassword());
    if (!valid) {
      throw new Error("Invalid password");
    }
    const token = getAdminToken();
    setCookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_TTL,
    });
    return { ok: true };
  });

export const adminLogout = createServerFn({ method: "POST" })
  .handler(async () => {
    deleteCookie(COOKIE_NAME, { path: "/" });
    return { ok: true };
  });

export const adminCheck = createServerFn({ method: "GET" })
  .handler(async (): Promise<{ authenticated: boolean }> => {
    try {
      const token = getCookie(COOKIE_NAME);
      if (!token) return { authenticated: false };
      const expected = getAdminToken();
      return { authenticated: timingSafeCompare(token, expected) };
    } catch {
      return { authenticated: false };
    }
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
