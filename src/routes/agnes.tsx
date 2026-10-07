import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  adminLogin,
  adminCheck,
  getArticles,
  upsertArticle,
  deleteArticle,
  getEpisodes,
  upsertEpisode,
  deleteEpisode,
  type ArticleRow,
  type EpisodeRow,
} from "@/lib/admin.functions";
import {
  aiDraftArticle,
  aiDraftEpisode,
  getNextEpisodeNumber,
  slugExists,
} from "@/lib/ai.functions";
import { ChevronUp, ChevronDown, Trash2, Plus, Eye, Pencil, Sparkles } from "lucide-react";

const TOKEN_KEY = "nkm_admin_token";

export const Route = createFileRoute("/agnes")({
  component: AdminPage,
});

// ── Content blocks ──

type Block =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string }
  | { type: "pullquote"; content: string }
  | { type: "callout"; variant: "brass" | "teal" | "danger"; title: string; content: string[] }
  | { type: "list"; items: { bold?: string; text: string }[] }
  | { type: "cta"; heading: string; body: string };

const BLOCK_TYPES: { type: Block["type"]; label: string }[] = [
  { type: "paragraph", label: "Paragraph" },
  { type: "heading", label: "Heading" },
  { type: "pullquote", label: "Quote" },
  { type: "list", label: "Checklist" },
  { type: "callout", label: "Highlight" },
  { type: "cta", label: "Call-to-Action" },
];

function blockLabel(type: Block["type"]): string {
  return BLOCK_TYPES.find((b) => b.type === type)?.label ?? type;
}

function newBlock(type: Block["type"]): Block {
  switch (type) {
    case "paragraph":
      return { type: "paragraph", content: "" };
    case "heading":
      return { type: "heading", content: "" };
    case "pullquote":
      return { type: "pullquote", content: "" };
    case "list":
      return { type: "list", items: [] };
    case "callout":
      return { type: "callout", variant: "brass", title: "", content: [] };
    case "cta":
      return { type: "cta", heading: "", body: "" };
  }
}

function str(v: unknown): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.map(str).join("\n");
  if (v == null) return "";
  return String(v);
}

function blocksFromContent(raw: unknown): Block[] {
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
  const out: Block[] = [];
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
                if (typeof o.bold === "string" && o.bold) {
                  return { bold: o.bold, text: str(o.text) };
                }
                return { text: str(o.text) };
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

function parseListLines(text: string): { bold?: string; text: string }[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const m = line.match(/^\*\*(.+?)\*\*\s*(.*)$/);
      return m ? { bold: m[1], text: m[2] } : { text: line };
    });
}

function listToText(items: { bold?: string; text: string }[]): string {
  return items.map((i) => (i.bold ? `**${i.bold}** ${i.text ?? ""}` : (i.text ?? ""))).join("\n");
}

function slugify(v: string): string {
  return v
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function errMsg(err: unknown, fallback: string): string {
  return err instanceof Error && err.message ? err.message : fallback;
}

function isAuthErr(err: unknown): boolean {
  return /not authorized|log in again/i.test(errMsg(err, ""));
}

// ── Page ──

function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState<"articles" | "episodes">("articles");
  const [articleList, setArticleList] = useState<ArticleRow[]>([]);
  const [episodeList, setEpisodeList] = useState<EpisodeRow[]>([]);
  const [editingArticle, setEditingArticle] = useState<Partial<ArticleRow> | null>(null);
  const [editingEpisode, setEditingEpisode] = useState<Partial<EpisodeRow> | null>(() => ({
    number: 1,
  }));
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [preview, setPreview] = useState(false);
  const [msg, setMsg] = useState("");
  const [formEpoch, setFormEpoch] = useState(0);
  const [aiBrief, setAiBrief] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const msgTimer = useRef<number | null>(null);
  const slugEditedRef = useRef(false);
  const slugRef = useRef<HTMLInputElement>(null);

  const checkAuth = useServerFn(adminCheck);
  const doLogin = useServerFn(adminLogin);
  const loadArticles = useServerFn(getArticles);
  const loadEpisodes = useServerFn(getEpisodes);
  const saveArticle = useServerFn(upsertArticle);
  const removeArticle = useServerFn(deleteArticle);
  const saveEpisode = useServerFn(upsertEpisode);
  const removeEpisode = useServerFn(deleteEpisode);
  const askArticleDraft = useServerFn(aiDraftArticle);
  const askEpisodeDraft = useServerFn(aiDraftEpisode);
  const askNextEpisodeNumber = useServerFn(getNextEpisodeNumber);
  const askSlugExists = useServerFn(slugExists);

  const getToken = () => localStorage.getItem(TOKEN_KEY) ?? "";

  const flash = useCallback((m: string) => {
    setMsg(m);
    if (msgTimer.current) window.clearTimeout(msgTimer.current);
    msgTimer.current = window.setTimeout(() => setMsg(""), 3500);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setAuthenticated(false);
      return;
    }
    checkAuth({ data: { token } })
      .then((res) => setAuthenticated(res?.authenticated ?? false))
      .catch(() => setAuthenticated(false));
  }, [checkAuth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await doLogin({ data: { password } });
      if (res?.token) {
        localStorage.setItem(TOKEN_KEY, res.token);
        setAuthenticated(true);
        setPassword("");
      }
    } catch {
      setLoginError("Wrong password.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthenticated(false);
  };

  const refreshArticles = useCallback(async () => {
    try {
      const data = await loadArticles({ data: { token: getToken() } });
      setArticleList(data || []);
    } catch (err) {
      console.error("Failed to load articles:", err);
      if (isAuthErr(err)) setAuthenticated(false);
      else flash("Failed to load articles: " + errMsg(err, "unknown error"));
    }
  }, [loadArticles, flash]);

  const refreshEpisodes = useCallback(async () => {
    try {
      const data = await loadEpisodes({ data: { token: getToken() } });
      setEpisodeList(data || []);
    } catch (err) {
      console.error("Failed to load episodes:", err);
      if (isAuthErr(err)) setAuthenticated(false);
      else flash("Failed to load episodes: " + errMsg(err, "unknown error"));
    }
  }, [loadEpisodes, flash]);

  useEffect(() => {
    refreshArticles();
    refreshEpisodes();
  }, [refreshArticles, refreshEpisodes]);

  // ── Block helpers ──
  const addBlock = (type: Block["type"]) => {
    setPreview(false);
    setBlocks((b) => [...b, newBlock(type)]);
  };
  const updateBlock = (i: number, patch: Partial<Block>) => {
    setBlocks((b) => b.map((blk, j) => (j === i ? ({ ...blk, ...patch } as Block) : blk)));
  };
  const moveBlock = (i: number, dir: -1 | 1) => {
    setBlocks((b) => {
      const j = i + dir;
      if (j < 0 || j >= b.length) return b;
      const next = [...b];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };
  const removeBlock = (i: number) => {
    setBlocks((b) => b.filter((_, j) => j !== i));
  };

  const startEditArticle = (a: ArticleRow) => {
    setEditingArticle(a);
    setBlocks(blocksFromContent(a.content));
    setPreview(false);
    slugEditedRef.current = true;
    setFormEpoch((e) => e + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startNewArticle = () => {
    setEditingArticle(null);
    setBlocks([]);
    setPreview(false);
    slugEditedRef.current = false;
    setFormEpoch((e) => e + 1);
  };

  // ── AI drafting ──
  const handleAiDraft = async () => {
    if (aiBusy) return;
    const brief = aiBrief.trim();
    if (brief.length < 10) {
      flash("Describe what you want first — topic, audience, angle");
      return;
    }
    setAiBusy(true);
    try {
      const token = getToken();
      if (tab === "articles") {
        const draft = await askArticleDraft({ data: { token, brief } });
        let slug = draft.slug;
        try {
          const dup = await askSlugExists({ data: { token, slug } });
          if (dup.exists) slug = `${slug}-2`;
        } catch {
          // uniqueness check is best-effort
        }
        setEditingArticle({
          slug,
          kicker: draft.kicker,
          title: draft.title,
          metaLine: draft.metaLine,
          lead: draft.lead,
          seoTitle: draft.seoTitle,
          seoDescription: draft.seoDescription,
          published: false,
        });
        setBlocks(blocksFromContent(draft.sections));
        setPreview(false);
        slugEditedRef.current = true;
        setFormEpoch((e) => e + 1);
        setAiBrief("");
        window.scrollTo({ top: 0, behavior: "smooth" });
        flash("Draft ready — review it below, then Create to publish");
      } else {
        let nextNumber = editingEpisode?.number;
        if (!editingEpisode?.id) {
          try {
            const next = await askNextEpisodeNumber({ data: { token } });
            nextNumber = next.number;
          } catch {
            nextNumber = (episodeList[0]?.number ?? 0) + 1;
          }
        }
        const draft = await askEpisodeDraft({
          data: { token, brief, nextNumber: nextNumber ?? 1 },
        });
        setEditingEpisode((prev) => ({
          ...(prev?.id ? prev : {}),
          number: draft.number,
          title: draft.title,
          description: draft.description,
          published: prev?.published ?? false,
        }));
        setFormEpoch((e) => e + 1);
        setAiBrief("");
        window.scrollTo({ top: 0, behavior: "smooth" });
        flash("Episode draft ready — add the Spotify link when it's live");
      }
    } catch (err) {
      console.error("AI draft failed:", err);
      flash(errMsg(err, "AI draft failed — please try again"));
      if (isAuthErr(err)) setAuthenticated(false);
    } finally {
      setAiBusy(false);
    }
  };

  const switchTab = (t: "articles" | "episodes") => {
    setTab(t);
    startNewArticle();
    setEditingEpisode(null);
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-stone flex items-center justify-center">
        <span className="font-mono text-sm text-brass-soft">Checking access…</span>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-stone flex items-center justify-center">
        <div className="bg-card border border-border p-8 w-full max-w-[360px]">
          <h1 className="font-serif text-xl text-navy mb-1">Admin Access</h1>
          <p className="font-mono text-[11px] text-brass-soft mb-6 uppercase tracking-widest">
            Password required
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
                className="w-full bg-background border border-border px-3 py-2.5 pr-10 text-sm focus:outline-2 focus:outline-brass"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-text/50 hover:text-ink-text transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button
              type="submit"
              disabled={loggingIn || !password}
              className="w-full bg-clay text-paper-text font-mono text-sm px-6 py-2.5 hover:bg-clay/80 transition-colors disabled:opacity-50"
            >
              {loggingIn ? "Checking…" : "Enter"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Article handlers ──
  const handleArticleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const title = ((fd.get("title") as string) || "").trim();
    const slug = ((fd.get("slug") as string) || "").trim();
    const lead = ((fd.get("lead") as string) || "").trim();
    if (!title) {
      flash("Give the article a title first");
      return;
    }
    if (!slug) {
      flash("Add a web address (slug) — e.g. buying-land-in-kenya");
      return;
    }
    if (!lead) {
      flash("Add a lead paragraph — the bold opening lines");
      return;
    }
    if (blocks.length === 0) {
      flash("Add at least one content block below");
      return;
    }
    try {
      await saveArticle({
        data: {
          token: getToken(),
          id: editingArticle?.id || undefined,
          slug,
          kicker: ((fd.get("kicker") as string) || "").trim(),
          title,
          metaLine: ((fd.get("metaLine") as string) || "").trim(),
          lead,
          content: JSON.parse(JSON.stringify(blocks)),
          seoTitle: ((fd.get("seoTitle") as string) || "").trim() || title,
          seoDescription: ((fd.get("seoDescription") as string) || "").trim() || lead.slice(0, 150),
          published: fd.get("published") === "on",
        },
      });
      startNewArticle();
      await refreshArticles();
      flash("Article saved");
    } catch (err) {
      flash(errMsg(err, "Failed to save article"));
      if (isAuthErr(err)) setAuthenticated(false);
    }
  };

  const handleArticleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    try {
      await removeArticle({ data: { token: getToken(), id } });
      await refreshArticles();
      flash("Article deleted");
    } catch (err) {
      flash(errMsg(err, "Failed to delete article"));
      if (isAuthErr(err)) setAuthenticated(false);
    }
  };

  // ── Episode handlers ──
  const handleEpisodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const num = Number(fd.get("number"));
    const title = ((fd.get("title") as string) || "").trim();
    if (!num || num < 1) {
      flash("Episode number is required");
      return;
    }
    if (!title) {
      flash("Title is required");
      return;
    }
    try {
      await saveEpisode({
        data: {
          token: getToken(),
          id: editingEpisode?.id || undefined,
          number: num,
          title,
          description: (fd.get("description") as string) || "",
          spotifyUrl: (fd.get("spotifyUrl") as string) || "",
          published: fd.get("published") === "on",
        },
      });
      setEditingEpisode(null);
      setFormEpoch((e) => e + 1);
      await refreshEpisodes();
      flash("Episode saved");
    } catch (err) {
      flash(errMsg(err, "Failed to save episode"));
      if (isAuthErr(err)) setAuthenticated(false);
    }
  };

  const handleEpisodeDelete = async (id: string) => {
    if (!confirm("Delete this episode?")) return;
    try {
      await removeEpisode({ data: { token: getToken(), id } });
      await refreshEpisodes();
      flash("Episode deleted");
    } catch (err) {
      flash(errMsg(err, "Failed to delete episode"));
      if (isAuthErr(err)) setAuthenticated(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone text-ink-text">
      {/* Header */}
      <header className="bg-ink-2 text-paper-text px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="font-serif text-lg font-bold tracking-tight">NKM Admin</span>
          <span className="hidden sm:inline font-mono text-[10px] tracking-[0.18em] text-brass-soft ml-3">
            CONTENT MANAGEMENT
          </span>
        </div>
        {msg && (
          <span className="font-mono text-xs text-brass-soft text-center truncate">{msg}</span>
        )}
        <button
          onClick={handleLogout}
          className="font-mono text-xs text-ink-text hover:text-navy transition-colors shrink-0"
        >
          Logout
        </button>
      </header>

      {/* Tabs */}
      <div className="border-b border-line bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex gap-0">
          {(["articles", "episodes"] as const).map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`px-5 py-3 font-mono text-sm tracking-wide uppercase border-b-2 transition-colors ${
                tab === t
                  ? "border-brass text-clay font-bold"
                  : "border-transparent text-ink-text hover:text-navy"
              }`}
            >
              {t === "articles" ? "Insights" : "Podcast"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* ── ARTICLES TAB ── */}
        {tab === "articles" && (
          <>
            {/* AI Assistant */}
            <AiPanel
              brief={aiBrief}
              setBrief={setAiBrief}
              busy={aiBusy}
              onGenerate={handleAiDraft}
              hint="Describe the article — topic, audience, angle. The assistant writes a full draft you can edit before publishing."
              placeholder="e.g. A practical checklist for diaspora buyers doing due diligence on Nairobi apartments — common frauds, what to verify, when to involve a lawyer"
            />

            {/* Form */}
            <div className="bg-card border border-border p-4 sm:p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl text-navy">
                  {editingArticle?.id ? "Edit Article" : "New Article"}
                </h2>
                {editingArticle?.id && (
                  <button
                    type="button"
                    onClick={startNewArticle}
                    className="font-mono text-xs text-clay hover:underline"
                  >
                    + New instead
                  </button>
                )}
              </div>
              <form
                key={`${editingArticle?.id ?? "new"}:${formEpoch}`}
                onSubmit={handleArticleSubmit}
                className="space-y-4"
              >
                <div>
                  <Field
                    label="Title"
                    name="title"
                    value={editingArticle?.title}
                    placeholder="Buying Land in Kenya From Overseas"
                    onChange={(v) => {
                      if (!slugEditedRef.current && slugRef.current) {
                        slugRef.current.value = slugify(v);
                      }
                    }}
                  />
                  <Hint>The main headline readers see at the top of the article.</Hint>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Field
                      label="Web Address (slug)"
                      name="slug"
                      value={editingArticle?.slug}
                      placeholder="buying-land-in-kenya"
                      inputRef={slugRef}
                      onChange={() => {
                        slugEditedRef.current = true;
                      }}
                    />
                    <Hint>Fills in automatically from the title. Appears in the URL.</Hint>
                  </div>
                  <div>
                    <Field
                      label="Kicker"
                      name="kicker"
                      value={editingArticle?.kicker}
                      placeholder="Real Estate · Diaspora"
                    />
                    <Hint>Small label above the title, e.g. “Real Estate · Diaspora”.</Hint>
                  </div>
                </div>

                <div>
                  <Field
                    label="Meta Line"
                    name="metaLine"
                    value={editingArticle?.metaLine}
                    placeholder="May 2026 · Real Estate · 8-minute read"
                  />
                  <Hint>Byline under the title: date · topic · read time.</Hint>
                </div>

                <div>
                  <Field
                    label="Lead Paragraph"
                    name="lead"
                    value={editingArticle?.lead}
                    placeholder="The bold opening paragraph that hooks the reader…"
                  />
                  <Hint>The italic opening paragraph, shown before the content blocks.</Hint>
                </div>

                {/* ── Content blocks ── */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-widest text-brass">
                      Article Content
                    </label>
                    <div className="flex border border-border">
                      <button
                        type="button"
                        onClick={() => setPreview(false)}
                        className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide flex items-center gap-1.5 ${
                          !preview
                            ? "bg-clay text-paper-text"
                            : "bg-background text-ink-text hover:bg-card"
                        }`}
                      >
                        <Pencil className="w-3 h-3" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreview(true)}
                        className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide flex items-center gap-1.5 ${
                          preview
                            ? "bg-clay text-paper-text"
                            : "bg-background text-ink-text hover:bg-card"
                        }`}
                      >
                        <Eye className="w-3 h-3" /> Preview
                      </button>
                    </div>
                  </div>
                  <Hint>
                    Build your article block by block — they appear on the page in this order.
                  </Hint>

                  {preview ? (
                    <div className="mt-3 border border-border bg-background p-4 sm:p-6">
                      {blocks.length === 0 ? (
                        <p className="text-sm text-ink-text/60 font-mono">
                          Nothing to preview yet — add a block below.
                        </p>
                      ) : (
                        <BlockPreview blocks={blocks} />
                      )}
                    </div>
                  ) : (
                    <div className="mt-3 space-y-3">
                      {blocks.length === 0 && (
                        <div className="border border-dashed border-border bg-background/60 p-6 text-center">
                          <p className="font-mono text-sm text-ink-text/70 mb-1">No content yet.</p>
                          <p className="text-sm text-ink-text/60">
                            Add your first paragraph below →
                          </p>
                        </div>
                      )}
                      {blocks.map((block, i) => (
                        <BlockCard
                          key={i}
                          block={block}
                          index={i}
                          total={blocks.length}
                          onChange={(patch) => updateBlock(i, patch)}
                          onMove={(dir) => moveBlock(i, dir)}
                          onRemove={() => removeBlock(i)}
                        />
                      ))}

                      {/* Add block bar */}
                      <div className="border border-border bg-card p-3">
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-brass mb-2">
                          <Plus className="w-3 h-3 inline -mt-0.5 mr-1" />
                          Add block
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {BLOCK_TYPES.map((b) => (
                            <button
                              key={b.type}
                              type="button"
                              onClick={() => addBlock(b.type)}
                              className="border border-border bg-background px-3 py-1.5 font-mono text-xs text-ink-text hover:border-brass hover:text-clay transition-colors"
                            >
                              {b.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Field
                      label="SEO Title"
                      name="seoTitle"
                      value={editingArticle?.seoTitle}
                      placeholder="Page title for Google"
                    />
                    <Hint>Left blank = uses the article title.</Hint>
                  </div>
                  <div>
                    <Field
                      label="SEO Description"
                      name="seoDescription"
                      value={editingArticle?.seoDescription}
                      placeholder="Short summary for Google"
                    />
                    <Hint>Left blank = first lines of the lead paragraph.</Hint>
                  </div>
                </div>

                <label className="flex items-center gap-2 font-mono text-sm text-ink-text">
                  <input
                    type="checkbox"
                    name="published"
                    defaultChecked={editingArticle?.published ?? false}
                    className="accent-brass"
                  />
                  Published (visible to visitors)
                </label>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-clay text-paper-text font-mono text-sm px-6 py-2.5 hover:bg-clay/80 transition-colors"
                  >
                    {editingArticle?.id ? "Update" : "Create"}
                  </button>
                  {editingArticle?.id && (
                    <button
                      type="button"
                      onClick={startNewArticle}
                      className="border border-border px-6 py-2.5 font-mono text-sm hover:bg-card transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Table */}
            <div className="bg-card border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-widest text-brass">
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Kicker</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articleList.map((a) => (
                    <tr key={a.id} className="border-b border-border/50 hover:bg-background/50">
                      <td className="px-4 py-3 text-navy font-semibold">{a.title}</td>
                      <td className="px-4 py-3 text-ink-text hidden sm:table-cell">{a.kicker}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`font-mono text-[11px] px-2 py-0.5 ${a.published ? "text-brass bg-gold-soft/20" : "text-ink-text bg-background"}`}
                        >
                          {a.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => startEditArticle(a)}
                          className="font-mono text-xs text-clay hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleArticleDelete(a.id)}
                          className="font-mono text-xs text-ink-text hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {articleList.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-ink-text/60 font-mono text-sm"
                      >
                        No articles yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── EPISODES TAB ── */}
        {tab === "episodes" && (
          <>
            {/* AI Assistant */}
            <AiPanel
              brief={aiBrief}
              setBrief={setAiBrief}
              busy={aiBusy}
              onGenerate={handleAiDraft}
              hint="Describe the episode idea. The assistant drafts the title and description — add the Spotify link once it's published."
              placeholder="e.g. Why SMEs lose small claims cases — missing paperwork, wrong venue, and how to prepare before the hearing"
            />

            {/* Form */}
            <div className="bg-card border border-border p-4 sm:p-6 mb-8">
              <h2 className="font-serif text-xl text-navy mb-4">
                {editingEpisode?.id ? "Edit Episode" : "New Episode"}
              </h2>
              <form
                key={`${editingEpisode?.id ?? "new"}:${formEpoch}`}
                onSubmit={handleEpisodeSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Episode Number"
                    name="number"
                    type="number"
                    value={editingEpisode?.number?.toString()}
                    placeholder="1"
                  />
                  <label className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-brass sm:pb-2.5">
                    <input
                      type="checkbox"
                      name="published"
                      defaultChecked={editingEpisode?.published ?? false}
                      className="accent-brass"
                    />
                    Published (visible to visitors)
                  </label>
                </div>
                <div>
                  <Field
                    label="Title"
                    name="title"
                    value={editingEpisode?.title}
                    placeholder="Episode title"
                  />
                  <Hint>Name of the episode as it appears on Spotify.</Hint>
                </div>
                <div>
                  <Field
                    label="Description"
                    name="description"
                    value={editingEpisode?.description ?? ""}
                    placeholder="Short summary of what the episode covers"
                  />
                  <Hint>One or two sentences shown under the episode.</Hint>
                </div>
                <div>
                  <Field
                    label="Spotify Link"
                    name="spotifyUrl"
                    value={editingEpisode?.spotifyUrl ?? ""}
                    placeholder="https://open.spotify.com/embed/episode/..."
                  />
                  <Hint>
                    On Spotify: ⋯ menu → <strong>Share</strong> → <strong>Copy link</strong>, then
                    paste it here.
                  </Hint>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-clay text-paper-text font-mono text-sm px-6 py-2.5 hover:bg-clay/80 transition-colors"
                  >
                    {editingEpisode?.id ? "Update" : "Create"}
                  </button>
                  {editingEpisode?.id && (
                    <button
                      type="button"
                      onClick={() => setEditingEpisode(null)}
                      className="border border-border px-6 py-2.5 font-mono text-sm hover:bg-card transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Table */}
            <div className="bg-card border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-widest text-brass">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Spotify</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {episodeList.map((ep) => (
                    <tr key={ep.id} className="border-b border-border/50 hover:bg-background/50">
                      <td className="px-4 py-3 font-mono text-brass">{ep.number}</td>
                      <td className="px-4 py-3 text-navy font-semibold">{ep.title}</td>
                      <td className="px-4 py-3 font-mono text-xs text-ink-text hidden sm:table-cell">
                        {ep.spotifyUrl ? "✓ Linked" : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`font-mono text-[11px] px-2 py-0.5 ${ep.published ? "text-brass bg-gold-soft/20" : "text-ink-text bg-background"}`}
                        >
                          {ep.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => {
                            setEditingEpisode(ep);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="font-mono text-xs text-clay hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleEpisodeDelete(ep.id)}
                          className="font-mono text-xs text-ink-text hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {episodeList.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-ink-text/60 font-mono text-sm"
                      >
                        No episodes yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── UI pieces ──

function AiPanel({
  brief,
  setBrief,
  busy,
  onGenerate,
  hint,
  placeholder,
}: {
  brief: string;
  setBrief: (v: string) => void;
  busy: boolean;
  onGenerate: () => void;
  hint: string;
  placeholder: string;
}) {
  return (
    <div className="bg-card border border-border border-l-[3px] border-l-brass p-4 sm:p-5 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
        <span className="font-mono text-[11px] uppercase tracking-widest text-brass inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" /> AI Assistant
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-text/50">
          draft → review → publish
        </span>
      </div>
      <p className="text-sm text-ink-text/70 mb-3">{hint}</p>
      <textarea
        rows={3}
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        placeholder={placeholder}
        disabled={busy}
        className={inputCls + " resize-y disabled:opacity-60"}
      />
      <div className="flex flex-wrap items-center gap-3 mt-3">
        <button
          type="button"
          onClick={onGenerate}
          disabled={busy}
          className="bg-navy text-paper-text font-mono text-sm px-5 py-2.5 hover:bg-navy/85 transition-colors disabled:opacity-50 inline-flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {busy ? "Writing…" : "Generate draft"}
        </button>
        {busy && (
          <span className="font-mono text-[11px] text-brass-soft">
            Thinking — this can take up to half a minute…
          </span>
        )}
      </div>
    </div>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="font-sans text-[11px] text-ink-text/60 mt-1">{children}</p>;
}

function IconBtn({
  children,
  onClick,
  disabled,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="p-1.5 border border-border/70 bg-background text-ink-text hover:text-clay hover:border-brass disabled:opacity-30 disabled:hover:text-ink-text transition-colors"
    >
      {children}
    </button>
  );
}

const inputCls =
  "w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-2 focus:outline-brass";

function BlockCard({
  block,
  index,
  total,
  onChange,
  onMove,
  onRemove,
}: {
  block: Block;
  index: number;
  total: number;
  onChange: (patch: Partial<Block>) => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
}) {
  const label = blockLabel(block.type);

  return (
    <div className="border border-border bg-background/60">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/70 bg-card">
        <span className="font-mono text-[10px] uppercase tracking-widest text-brass">
          {index + 1}. {label}
        </span>
        <div className="flex items-center gap-1">
          <IconBtn onClick={() => onMove(-1)} disabled={index === 0} title="Move up">
            <ChevronUp className="w-3.5 h-3.5" />
          </IconBtn>
          <IconBtn onClick={() => onMove(1)} disabled={index === total - 1} title="Move down">
            <ChevronDown className="w-3.5 h-3.5" />
          </IconBtn>
          <IconBtn onClick={onRemove} title="Delete block">
            <Trash2 className="w-3.5 h-3.5" />
          </IconBtn>
        </div>
      </div>

      <div className="p-3 space-y-2">
        {block.type === "paragraph" && (
          <textarea
            rows={4}
            value={block.content}
            onChange={(e) => onChange({ content: e.target.value } as Partial<Block>)}
            placeholder="Write a normal paragraph…"
            className={inputCls + " resize-y"}
          />
        )}

        {block.type === "heading" && (
          <input
            type="text"
            value={block.content}
            onChange={(e) => onChange({ content: e.target.value } as Partial<Block>)}
            placeholder="Section heading, e.g. Why Diaspora Buyers Are Targeted"
            className={inputCls}
          />
        )}

        {block.type === "pullquote" && (
          <textarea
            rows={3}
            value={block.content}
            onChange={(e) => onChange({ content: e.target.value } as Partial<Block>)}
            placeholder="A striking quote to pull out of the text…"
            className={inputCls + " resize-y"}
          />
        )}

        {block.type === "list" && (
          <>
            <textarea
              rows={5}
              value={listToText(block.items)}
              onChange={(e) =>
                onChange({ items: parseListLines(e.target.value) } as Partial<Block>)
              }
              placeholder={
                "One point per line, e.g.\n**Title search** — verify the deed at the Lands Registry\n**Visit the plot** — never buy sight unseen"
              }
              className={inputCls + " resize-y"}
            />
            <p className="font-sans text-[11px] text-ink-text/60">
              One point per line. Wrap the opening words in **asterisks** to make them bold.
            </p>
          </>
        )}

        {block.type === "callout" && (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-brass">
                Colour
              </span>
              {(
                [
                  { v: "brass", label: "Gold" },
                  { v: "teal", label: "Navy" },
                  { v: "danger", label: "Red" },
                ] as const
              ).map((c) => (
                <button
                  key={c.v}
                  type="button"
                  onClick={() => onChange({ variant: c.v } as Partial<Block>)}
                  className={`px-3 py-1 font-mono text-[11px] uppercase border transition-colors ${
                    block.variant === c.v
                      ? "border-brass bg-gold-soft/30 text-clay font-bold"
                      : "border-border bg-background text-ink-text hover:border-brass"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={block.title}
              onChange={(e) => onChange({ title: e.target.value } as Partial<Block>)}
              placeholder="Box title, e.g. THE FRAUD PLAYBOOK"
              className={inputCls}
            />
            <textarea
              rows={4}
              value={block.content.join("\n")}
              onChange={(e) =>
                onChange({
                  content: e.target.value.split("\n").filter((l) => l.trim() !== ""),
                } as Partial<Block>)
              }
              placeholder={
                "One line per bullet, e.g.\nForged title deeds — printed on specialist paper\nImpersonation — forged Power of Attorney"
              }
              className={inputCls + " resize-y"}
            />
            <p className="font-sans text-[11px] text-ink-text/60">One bullet per line.</p>
          </>
        )}

        {block.type === "cta" && (
          <>
            <input
              type="text"
              value={block.heading}
              onChange={(e) => onChange({ heading: e.target.value } as Partial<Block>)}
              placeholder="Heading, e.g. SPEAK TO AN ADVOCATE TODAY"
              className={inputCls}
            />
            <textarea
              rows={3}
              value={block.body}
              onChange={(e) => onChange({ body: e.target.value } as Partial<Block>)}
              placeholder="Short message under the heading…"
              className={inputCls + " resize-y"}
            />
          </>
        )}
      </div>
    </div>
  );
}

function BlockPreview({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((section, i) => {
        switch (section.type) {
          case "paragraph":
            return (
              <p key={i} className="text-foreground leading-relaxed mb-5">
                {section.content}
              </p>
            );
          case "heading":
            return (
              <h2 key={i} className="font-sans text-[22px] font-bold text-navy mt-10 mb-5">
                {section.content}
              </h2>
            );
          case "pullquote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-navy pl-6 py-3 my-8 font-serif text-[20px] italic text-navy font-bold max-w-[75ch]"
              >
                {section.content}
              </blockquote>
            );
          case "callout":
            return (
              <div
                key={i}
                className={`p-5 my-8 border-l-[5px] ${
                  section.variant === "brass"
                    ? "bg-gold-soft border-brass border"
                    : section.variant === "teal"
                      ? "bg-brass-soft border-navy border border-l-navy"
                      : "bg-clay/10 border-clay border border-l-clay"
                }`}
              >
                <p
                  className={`font-mono text-[13px] font-bold uppercase tracking-widest mb-3 ${
                    section.variant === "brass"
                      ? "text-brass"
                      : section.variant === "teal"
                        ? "text-navy"
                        : "text-clay"
                  }`}
                >
                  {section.title}
                </p>
                {section.content.map((line, j) => (
                  <p key={j} className="text-foreground text-sm leading-relaxed mb-1 last:mb-0">
                    {line}
                  </p>
                ))}
              </div>
            );
          case "list":
            return (
              <ul key={i} className="list-none p-0 mb-6">
                {section.items.map((item, j) => (
                  <li
                    key={j}
                    className="py-2 pl-7 relative border-b border-gray-100 last:border-b-0 leading-relaxed"
                  >
                    <span className="absolute left-0 top-2 text-brass font-bold text-xl">
                      {"\u203A"}
                    </span>
                    {item.bold && <strong className="text-navy font-bold">{item.bold}</strong>}
                    {item.text}
                  </li>
                ))}
              </ul>
            );
          case "cta":
            return (
              <div key={i} className="bg-ink text-white p-10 text-center mt-12">
                <h3 className="font-mono text-sm font-bold tracking-widest uppercase text-white mb-4">
                  {section.heading}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed mb-2 max-w-[600px] mx-auto">
                  {section.body}
                </p>
                <p className="font-mono text-xs font-bold text-brass mt-4">
                  nkm-advocates.co.ke &nbsp;·&nbsp; WhatsApp 0707 329 013 &nbsp;·&nbsp;
                  contact@nkm-advocates.co.ke
                </p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  inputRef,
}: {
  label: string;
  name: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: (v: string) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <div>
      <label className="block font-mono text-[11px] font-bold uppercase tracking-widest text-brass mb-1">
        {label}
      </label>
      <input
        ref={inputRef}
        type={type}
        name={name}
        defaultValue={value ?? ""}
        placeholder={placeholder}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={inputCls}
      />
    </div>
  );
}
