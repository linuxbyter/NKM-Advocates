import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft } from "lucide-react";
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
            { title: `${a.title} \u2014 NKM Advocates` },
            { name: "description", content: a.short },
            { property: "og:title", content: `${a.title} \u2014 NKM Advocates` },
            { property: "og:description", content: a.short },
          ]
        : [{ title: "Practice Area \u2014 NKM Advocates" }],
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative hero-pattern text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/50 to-navy-deep/90" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
          <Link
            to="/"
            hash="departments"
            className="inline-flex items-center gap-2 text-gold text-xs font-semibold tracking-[0.2em] uppercase hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Departments
          </Link>
          <div className="mt-6">
            <span className="text-brass font-mono text-xs tracking-[0.12em] uppercase">
              FILE NO. {area.fileNo}
            </span>
          </div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight max-w-3xl">
            {area.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          {/* Legal Basis Panel */}
          <div className="border border-teal-lt border-l-4 border-l-teal bg-teal-lt p-5 mb-8">
            <div className="grid grid-cols-[120px_1fr] gap-0">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-teal self-start">
                Legal Basis
              </span>
              <p className="text-sm text-slate-ink leading-relaxed m-0">
                {area.legalBasis}
              </p>
            </div>
          </div>

          {/* Overview */}
          <p className="text-lg leading-relaxed text-foreground mb-10">
            {area.overview}
          </p>

          {/* What We Do */}
          <h2 className="font-display text-2xl text-teal font-bold mb-6">What We Do</h2>
          <ul className="list-none p-0 mb-12 space-y-0">
            {area.services.map((service) => (
              <li
                key={service.name}
                className="py-4 pl-6 relative border-b border-gray-100 last:border-b-0"
              >
                <span className="absolute left-0 top-4 text-brass font-bold text-xl">{'\u203A'}</span>
                <strong className="text-teal font-bold">{service.name}</strong>
                <span className="text-foreground"> \u2014 {service.description}</span>
              </li>
            ))}
          </ul>

          {/* Diaspora Advantage */}
          <h2 className="font-display text-2xl text-teal font-bold mb-6">Diaspora Advantage</h2>
          <div className="bg-amber border border-brass border-l-5 border-l-brass p-6 mb-10">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-brass mb-4">
              Diaspora Advantage
            </p>
            <ul className="list-none p-0 m-0 space-y-2">
              {area.diasporaAdvantage.map((item) => (
                <li key={item} className="text-foreground text-sm leading-relaxed py-1 border-b border-brass/15 last:border-b-0">
                  {'\u2192'} {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-teal text-white p-10 text-center mt-12">
            <h3 className="font-mono text-sm font-bold tracking-widest uppercase text-white mb-4">
              Book a Consultation
            </h3>
            <p className="text-white/90 text-sm leading-relaxed mb-2">
              Our {area.title} team is ready to advise. Book a free initial consultation \u2014 by phone, WhatsApp, or in person at our Ngong office.
            </p>
            <p className="font-mono text-xs font-bold text-brass mt-4">
              WhatsApp 0707 329 013  \u00b7  contact@nkm-advocates.co.ke
            </p>
          </div>
        </div>
      </section>

      {/* Other departments */}
      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <h2 className="font-display text-2xl text-navy">Other departments</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {practiceAreas
              .filter((p) => p.slug !== area.slug)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.slug}
                  to="/practice/$slug"
                  params={{ slug: p.slug }}
                  className="group bg-background border border-border p-6 hover:border-gold hover:-translate-y-1 transition-all"
                >
                  <span className="font-mono text-[11px] tracking-wide text-brass">
                    FILE NO. {p.fileNo}
                  </span>
                  <div className="mt-3 font-display text-lg text-navy leading-snug">{p.title}</div>
                  <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-brass flex items-center gap-2">
                    View <ArrowRight className="w-3 h-3" />
                  </div>
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
