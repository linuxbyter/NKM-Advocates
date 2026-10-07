import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { AssistantWidget } from "@/components/AssistantWidget";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer | NKM Advocates" },
      {
        name: "description",
        content:
          "Important information about the content published by NKM Advocates — general information only, not legal advice.",
      },
    ],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative hero-pattern text-paper-text pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/50 to-navy-deep/90" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <span className="text-brass font-mono text-xs tracking-[0.16em] uppercase">
            Important
          </span>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl text-paper-text leading-tight">
            Disclaimer
          </h1>
          <p className="mt-5 text-lg text-paper-text/75">
            What this website is — and what it is not.
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-[0.14em] uppercase text-brass-soft">
            Effective 6 October 2026
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="bg-card border border-line border-l-[4px] border-l-brass p-6 mb-10">
            <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-brass mb-2">
              The short version
            </p>
            <p className="text-ink-text leading-relaxed">
              Everything on this website is general information for education and marketing
              purposes. It is <strong>not legal advice</strong>, and reading it does not make us
              your advocates. For advice you can rely on, book a consultation and let us look at
              your actual facts.
            </p>
          </div>

          <Section title="No legal advice">
            <p>
              Articles, podcast episodes, department pages, and other material on this site are
              general and may not reflect the current state of the law. They do not take into
              account your particular circumstances. Nothing here should be acted upon or relied
              upon as legal advice without a formal engagement.
            </p>
          </Section>

          <Section title="No advocate–client relationship">
            <p>
              Visiting this website, using the chat assistant, or sending us a message through the
              consultation form does not create an advocate–client relationship. A relationship
              begins only when we have confirmed we can act for you and the terms of engagement have
              been agreed.
            </p>
          </Section>

          <Section title="No guarantees">
            <p>
              Legal outcomes depend on facts, evidence, and the discretion of courts and tribunals.
              Past results and case examples described on this site are not a guarantee of what will
              happen in your matter. Fees, timelines, and prospects are always discussed and
              confirmed individually.
            </p>
          </Section>

          <Section title="External links">
            <p>
              We link to external sites (including Spotify and social platforms) for convenience. We
              do not control their content and are not responsible for it. A link is not an
              endorsement.
            </p>
          </Section>

          <Section title="Currency of information">
            <p>
              Law and practice change. While we aim to keep content accurate and current, we do not
              warrant that anything on this site is complete or up to date at the moment you read
              it. Please verify anything critical with us directly.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p>
              To the extent permitted by the laws of Kenya, NKM Advocates is not liable for any loss
              or damage arising from your use of, or reliance on, this website or its content. This
              includes loss of profit, loss of opportunity, or loss arising from decisions taken on
              the basis of website content alone.
            </p>
          </Section>

          <Section title="Governing law">
            <p>
              This disclaimer is governed by the laws of Kenya, and the Kenyan courts have
              jurisdiction over any disputes relating to it or to this website.
            </p>
          </Section>

          <Section title="Questions">
            <p>
              If anything here is unclear, ask us before acting:{" "}
              <a href="mailto:contact@nkm-advocates.co.ke" className="text-clay hover:underline">
                contact@nkm-advocates.co.ke
              </a>{" "}
              or 0707 329 013.
            </p>
          </Section>

          <div className="mt-12 border-t border-line pt-8 flex flex-wrap gap-4">
            <Link
              to="/"
              hash="book"
              className="font-mono text-[13px] tracking-wide bg-clay text-paper-text px-6 py-3 border border-clay hover:-translate-y-0.5 transition-all duration-150"
            >
              Get Proper Advice — Book a Consultation
            </Link>
            <Link
              to="/privacy"
              className="font-mono text-[13px] tracking-wide bg-transparent text-ink-text px-6 py-3 border border-line hover:border-brass hover:text-clay transition-all duration-150"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <AssistantWidget />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-serif text-[22px] font-bold text-navy mb-3">{title}</h2>
      <div className="text-ink-text leading-relaxed space-y-3">{children}</div>
    </div>
  );
}
