import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { AssistantWidget } from "@/components/AssistantWidget";
import { insights } from "@/lib/insights";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights \u2014 NKM Advocates" },
      { name: "description", content: "Legal insights and analysis from NKM Advocates \u2014 covering real estate, SME advisory, family law, and debt recovery for Kenyans at home and abroad." },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative hero-pattern text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/50 to-navy-deep/90" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <span className="text-brass font-mono text-xs tracking-[0.16em] uppercase">
            From the Firm
          </span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
            Insights
          </h1>
          <p className="mt-5 text-lg text-white/75 max-w-2xl mx-auto">
            Plain-English legal analysis on the issues that matter most to Kenyan businesses, diaspora investors, and families \u2014 written by the advocates who handle these cases every day.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-6">
            {insights.map((article) => (
              <Link
                key={article.slug}
                to="/insights/$slug"
                params={{ slug: article.slug }}
                className="group bg-card border border-line border-l-[4px] border-l-brass p-6 flex flex-col min-h-[220px] hover:-translate-y-1 hover:shadow-lg transition-all no-underline"
              >
                <span className="font-mono text-[11px] tracking-wide uppercase text-brass">
                  {article.kicker}
                </span>
                <h2 className="font-serif text-xl font-semibold leading-tight mt-3 mb-3 flex-1 text-navy group-hover:text-clay transition-colors">
                  {article.title}
                </h2>
                <span className="font-mono text-[12px] text-ink-text">{article.metaLine}</span>
                <span className="font-mono text-[12px] text-clay mt-3 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Read article <span>{'\u2192'}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <AssistantWidget />
    </div>
  );
}
