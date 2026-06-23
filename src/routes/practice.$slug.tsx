import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { AssistantWidget } from "@/components/AssistantWidget";
import { getPracticeArea, practiceAreas, type PracticeArea } from "@/lib/practice-areas";

export const Route = createFileRoute("/practice/$slug")({
  loader: ({ params }): { area: PracticeArea } => {
    const area = getPracticeArea(params.slug);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.area;
    return {
      meta: a
        ? [
            { title: `${a.title} — NKM Advocates` },
            { name: "description", content: a.short },
            { property: "og:title", content: `${a.title} — NKM Advocates` },
            { property: "og:description", content: a.short },
          ]
        : [{ title: "Practice Area — NKM Advocates" }],
    };
  },
  component: PracticePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-3xl text-navy">Practice area not found</h1>
        <Link to="/" className="mt-4 inline-block text-gold font-semibold">Back to home</Link>
      </div>
    </div>
  ),
});

function PracticePage() {
  const { area } = Route.useLoaderData() as { area: PracticeArea };
  const Icon = area.icon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative hero-pattern text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/50 to-navy-deep/90" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
          <Link
            to="/"
            hash="practice"
            className="inline-flex items-center gap-2 text-gold text-xs font-semibold tracking-[0.2em] uppercase hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Practice Areas
          </Link>
          <div className="mt-6 flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center bg-gold text-navy-deep">
              <Icon className="w-7 h-7" />
            </div>
            <span className="text-gold-soft text-xs font-semibold tracking-[0.25em] uppercase">Practice Area</span>
          </div>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight max-w-3xl">
            {area.title}
          </h1>
          <p className="mt-5 text-lg text-white/75 max-w-2xl">{area.tagline}</p>
        </div>
      </section>

      {/* Overview + scope */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl text-navy">Overview</h2>
            <p className="mt-5 text-slate-ink leading-relaxed text-lg">{area.overview}</p>

            <h3 className="mt-12 font-display text-2xl text-navy">What we handle</h3>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3">
              {area.scope.map((s) => (
                <li key={s} className="flex gap-3 text-slate-ink">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>

            {area.faqs.length > 0 && (
              <>
                <h3 className="mt-12 font-display text-2xl text-navy">Frequently asked</h3>
                <dl className="mt-5 space-y-5">
                  {area.faqs.map((f) => (
                    <div key={f.q} className="border-l-2 border-gold pl-5">
                      <dt className="font-semibold text-navy">{f.q}</dt>
                      <dd className="mt-1.5 text-slate-ink leading-relaxed">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-navy text-white p-7 sticky top-28">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                Who we serve
              </div>
              <ul className="mt-4 space-y-2 text-white/85 text-sm">
                {area.whoWeServe.map((w) => (
                  <li key={w} className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">·</span> {w}
                  </li>
                ))}
              </ul>
              <div className="mt-7 pt-6 border-t border-white/15">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft mb-3">
                  Ready to talk?
                </div>
                <Link
                  to="/"
                  hash="contact"
                  className="inline-flex items-center gap-2 bg-gold text-navy-deep w-full justify-center py-3 text-sm font-semibold tracking-wide hover:bg-gold-soft transition-colors"
                >
                  Request Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Other practice areas */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <h2 className="font-display text-2xl text-navy">Other practice areas</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {practiceAreas
              .filter((p) => p.slug !== area.slug)
              .slice(0, 3)
              .map((p) => {
                const PIcon = p.icon;
                return (
                  <Link
                    key={p.slug}
                    to="/practice/$slug"
                    params={{ slug: p.slug }}
                    className="group bg-background border border-border p-6 hover:border-gold hover:-translate-y-1 transition-all"
                  >
                    <div className="w-11 h-11 flex items-center justify-center bg-navy text-gold group-hover:bg-gold group-hover:text-navy transition-colors">
                      <PIcon className="w-5 h-5" />
                    </div>
                    <div className="mt-4 font-display text-lg text-navy leading-snug">{p.title}</div>
                    <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-2">
                      View <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      <SiteFooter />
      <AssistantWidget />
    </div>
  );
}