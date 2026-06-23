import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { AssistantWidget } from "@/components/AssistantWidget";
import { getInsight, type InsightArticle } from "@/lib/insights";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }): { article: InsightArticle } => {
    const article = getInsight(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    return {
      meta: a
        ? [
            { title: a.seoTitle },
            { name: "description", content: a.seoDescription },
            { property: "og:title", content: a.seoTitle },
            { property: "og:description", content: a.seoDescription },
          ]
        : [{ title: "Insight \u2014 NKM Advocates" }],
    };
  },
  component: InsightPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-3xl text-navy">Article not found</h1>
        <Link to="/insights" className="mt-4 inline-block text-gold font-semibold">Back to Insights</Link>
      </div>
    </div>
  ),
});

function InsightPage() {
  const { article } = Route.useLoaderData() as { article: InsightArticle };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <article className="max-w-[780px] mx-auto px-7 py-16 lg:py-20">
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 text-brass text-xs font-semibold tracking-[0.2em] uppercase hover:gap-3 transition-all mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> All Insights
        </Link>

        <span className="block font-mono text-[12px] tracking-[0.12em] uppercase text-brass mb-4">
          {article.kicker}
        </span>

        <h1 className="font-serif text-[clamp(28px,4vw,42px)] font-bold leading-tight text-navy mb-4">
          {article.title}
        </h1>

        <p className="font-sans text-[14px] text-ink-text mb-6">{article.metaLine}</p>

        <hr className="border-navy mb-8" />

        <p className="font-sans text-[18px] font-bold italic text-navy leading-relaxed mb-10">
          {article.lead}
        </p>

        {article.sections.map((section, i) => {
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
                    <li key={j} className="py-2 pl-7 relative border-b border-gray-100 last:border-b-0 leading-relaxed">
                      <span className="absolute left-0 top-2 text-brass font-bold text-xl">{'\u203A'}</span>
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
                    nkm-advocates.co.ke &nbsp;\u00b7&nbsp; WhatsApp 0707 329 013 &nbsp;\u00b7&nbsp; contact@nkm-advocates.co.ke
                  </p>
                </div>
              );
            default:
              return null;
          }
        })}
      </article>

      <SiteFooter />
      <AssistantWidget />
    </div>
  );
}
