import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  getArticles,
  upsertArticle,
  deleteArticle,
  getEpisodes,
  upsertEpisode,
  deleteEpisode,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type Article = {
  id: string;
  slug: string;
  kicker: string;
  title: string;
  metaLine: string;
  lead: string;
  content: unknown;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  createdAt: string;
};

type Episode = {
  id: string;
  number: number;
  title: string;
  description: string | null;
  spotifyUrl: string | null;
  published: boolean;
  createdAt: string;
};

const emptyArticle = {
  slug: "",
  kicker: "",
  title: "",
  metaLine: "",
  lead: "",
  content: "[]",
  seoTitle: "",
  seoDescription: "",
  published: false,
};

const emptyEpisode = {
  number: 1,
  title: "",
  description: "",
  spotifyUrl: "",
  published: false,
};

function AdminPage() {
  const [tab, setTab] = useState<"articles" | "episodes">("articles");
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [editingEpisode, setEditingEpisode] = useState<Partial<Episode> | null>(null);
  const [msg, setMsg] = useState("");

  const loadArticles = useServerFn(getArticles);
  const loadEpisodes = useServerFn(getEpisodes);
  const saveArticle = useServerFn(upsertArticle);
  const removeArticle = useServerFn(deleteArticle);
  const saveEpisode = useServerFn(upsertEpisode);
  const removeEpisode = useServerFn(deleteEpisode);

  const refreshArticles = useCallback(async () => {
    const data = await loadArticles();
    setArticleList((data as Article[]) || []);
  }, [loadArticles]);

  const refreshEpisodes = useCallback(async () => {
    const data = await loadEpisodes();
    setEpisodeList((data as Episode[]) || []);
  }, [loadEpisodes]);

  useEffect(() => {
    refreshArticles();
    refreshEpisodes();
  }, [refreshArticles, refreshEpisodes]);

  const flash = (m: string) => {
    setMsg(m);
    setTimeout(() => setMsg(""), 3000);
  };

  // ── Article handlers ──
  const handleArticleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    let parsedContent: unknown = [];
    try {
      parsedContent = JSON.parse(fd.get("content") as string);
    } catch {
      parsedContent = [{ type: "paragraph", content: fd.get("content") as string }];
    }
    await saveArticle({
      data: {
        id: editingArticle?.id || undefined,
        slug: fd.get("slug") as string,
        kicker: fd.get("kicker") as string,
        title: fd.get("title") as string,
        metaLine: fd.get("metaLine") as string,
        lead: fd.get("lead") as string,
        content: parsedContent,
        seoTitle: fd.get("seoTitle") as string,
        seoDescription: fd.get("seoDescription") as string,
        published: fd.get("published") === "on",
      },
    });
    setEditingArticle(null);
    (e.currentTarget as HTMLFormElement).reset();
    await refreshArticles();
    flash("Article saved");
  };

  const handleArticleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    await removeArticle({ data: id });
    await refreshArticles();
    flash("Article deleted");
  };

  // ── Episode handlers ──
  const handleEpisodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await saveEpisode({
      data: {
        id: editingEpisode?.id || undefined,
        number: Number(fd.get("number")),
        title: fd.get("title") as string,
        description: (fd.get("description") as string) || "",
        spotifyUrl: (fd.get("spotifyUrl") as string) || "",
        published: fd.get("published") === "on",
      },
    });
    setEditingEpisode(null);
    (e.currentTarget as HTMLFormElement).reset();
    await refreshEpisodes();
    flash("Episode saved");
  };

  const handleEpisodeDelete = async (id: string) => {
    if (!confirm("Delete this episode?")) return;
    await removeEpisode({ data: id });
    await refreshEpisodes();
    flash("Episode deleted");
  };

  return (
    <div className="min-h-screen bg-stone text-ink-text">
      {/* Header */}
      <header className="bg-ink-2 text-paper-text px-6 py-4 flex items-center justify-between">
        <div>
          <span className="font-serif text-lg font-bold tracking-tight">NKM Admin</span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-brass-soft ml-3">CONTENT MANAGEMENT</span>
        </div>
        {msg && <span className="font-mono text-xs text-brass-soft">{msg}</span>}
      </header>

      {/* Tabs */}
      <div className="border-b border-line bg-card">
        <div className="max-w-5xl mx-auto px-6 flex gap-0">
          {(["articles", "episodes"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setEditingArticle(null); setEditingEpisode(null); }}
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

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* ── ARTICLES TAB ── */}
        {tab === "articles" && (
          <>
            {/* Form */}
            <div className="bg-card border border-border p-6 mb-8">
              <h2 className="font-serif text-xl text-navy mb-4">
                {editingArticle?.id ? "Edit Article" : "New Article"}
              </h2>
              <form onSubmit={handleArticleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Slug" name="slug" value={editingArticle?.slug} placeholder="buying-land-in-kenya" />
                  <Field label="Kicker" name="kicker" value={editingArticle?.kicker} placeholder="Real Estate · Diaspora" />
                </div>
                <Field label="Title" name="title" value={editingArticle?.title} placeholder="Buying Land in Kenya From Overseas" />
                <Field label="Meta Line" name="metaLine" value={editingArticle?.metaLine} placeholder="May 2026 · Real Estate · 8-minute read" />
                <Field label="Lead Paragraph" name="lead" value={editingArticle?.lead} placeholder="Bold opening paragraph..." />
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase tracking-widest text-brass mb-1">Content (JSON array)</label>
                  <textarea
                    name="content"
                    rows={6}
                    defaultValue={editingArticle?.content ? JSON.stringify(editingArticle.content, null, 2) : ""}
                    placeholder='[{"type":"paragraph","content":"..."}]'
                    className="w-full bg-background border border-border px-3 py-2.5 text-sm font-mono focus:outline-2 focus:outline-brass"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="SEO Title" name="seoTitle" value={editingArticle?.seoTitle} placeholder="Page title for SEO" />
                  <Field label="SEO Description" name="seoDescription" value={editingArticle?.seoDescription} placeholder="Meta description" />
                </div>
                <label className="flex items-center gap-2 font-mono text-sm text-ink-text">
                  <input type="checkbox" name="published" defaultChecked={editingArticle?.published ?? false} className="accent-brass" />
                  Published
                </label>
                <div className="flex gap-3">
                  <button type="submit" className="bg-clay text-paper-text font-mono text-sm px-6 py-2.5 hover:bg-clay/80 transition-colors">
                    {editingArticle?.id ? "Update" : "Create"}
                  </button>
                  {editingArticle?.id && (
                    <button type="button" onClick={() => setEditingArticle(null)} className="border border-border px-6 py-2.5 font-mono text-sm hover:bg-card transition-colors">
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
                    <th className="px-4 py-3">Kicker</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articleList.map((a) => (
                    <tr key={a.id} className="border-b border-border/50 hover:bg-background/50">
                      <td className="px-4 py-3 text-navy font-semibold">{a.title}</td>
                      <td className="px-4 py-3 text-ink-text">{a.kicker}</td>
                      <td className="px-4 py-3">
                        <span className={`font-mono text-[11px] px-2 py-0.5 ${a.published ? "text-brass bg-gold-soft/20" : "text-ink-text bg-background"}`}>
                          {a.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button onClick={() => setEditingArticle(a)} className="font-mono text-xs text-clay hover:underline">Edit</button>
                        <button onClick={() => handleArticleDelete(a.id)} className="font-mono text-xs text-ink-text hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {articleList.length === 0 && (
                    <tr><td colSpan={4} className="px-4 py-8 text-center text-ink-text/60 font-mono text-sm">No articles yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── EPISODES TAB ── */}
        {tab === "episodes" && (
          <>
            {/* Form */}
            <div className="bg-card border border-border p-6 mb-8">
              <h2 className="font-serif text-xl text-navy mb-4">
                {editingEpisode?.id ? "Edit Episode" : "New Episode"}
              </h2>
              <form onSubmit={handleEpisodeSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Episode Number" name="number" type="number" value={editingEpisode?.number?.toString()} placeholder="1" />
                  <label className="flex items-end gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-brass">
                    <input type="checkbox" name="published" defaultChecked={editingEpisode?.published ?? false} className="accent-brass" />
                    Published
                  </label>
                </div>
                <Field label="Title" name="title" value={editingEpisode?.title} placeholder="Episode title" />
                <Field label="Description" name="description" value={editingEpisode?.description ?? ""} placeholder="Short description" />
                <Field label="Spotify Embed URL" name="spotifyUrl" value={editingEpisode?.spotifyUrl ?? ""} placeholder="https://open.spotify.com/embed/episode/..." />
                <div className="flex gap-3">
                  <button type="submit" className="bg-clay text-paper-text font-mono text-sm px-6 py-2.5 hover:bg-clay/80 transition-colors">
                    {editingEpisode?.id ? "Update" : "Create"}
                  </button>
                  {editingEpisode?.id && (
                    <button type="button" onClick={() => setEditingEpisode(null)} className="border border-border px-6 py-2.5 font-mono text-sm hover:bg-card transition-colors">
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
                    <th className="px-4 py-3">Spotify</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {episodeList.map((ep) => (
                    <tr key={ep.id} className="border-b border-border/50 hover:bg-background/50">
                      <td className="px-4 py-3 font-mono text-brass">{ep.number}</td>
                      <td className="px-4 py-3 text-navy font-semibold">{ep.title}</td>
                      <td className="px-4 py-3 font-mono text-xs text-ink-text">{ep.spotifyUrl ? "✓ Linked" : "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`font-mono text-[11px] px-2 py-0.5 ${ep.published ? "text-brass bg-gold-soft/20" : "text-ink-text bg-background"}`}>
                          {ep.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button onClick={() => setEditingEpisode(ep)} className="font-mono text-xs text-clay hover:underline">Edit</button>
                        <button onClick={() => handleEpisodeDelete(ep.id)} className="font-mono text-xs text-ink-text hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {episodeList.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-ink-text/60 font-mono text-sm">No episodes yet</td></tr>
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

function Field({
  label,
  name,
  type = "text",
  value,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-[11px] font-bold uppercase tracking-widest text-brass mb-1">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={value ?? ""}
        placeholder={placeholder}
        className="w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-2 focus:outline-brass"
      />
    </div>
  );
}
