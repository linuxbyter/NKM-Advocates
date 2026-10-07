import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { AssistantWidget } from "@/components/AssistantWidget";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | NKM Advocates" },
      {
        name: "description",
        content:
          "Answers to the questions clients ask most — consultations, fees, diaspora clients, land checks, NGO registration, and working with NKM Advocates online.",
      },
    ],
  }),
  component: FaqPage,
});

const groups: { title: string; items: { q: string; a: React.ReactNode }[] }[] = [
  {
    title: "Getting Started",
    items: [
      {
        q: "How do I book a consultation?",
        a: (
          <>
            Fill in the consultation form on our{" "}
            <Link to="/" hash="book" className="text-clay hover:underline">
              homepage
            </Link>
            , call 0707 329 013, or send us a WhatsApp message. Tell us briefly what the matter is
            about and we will confirm a time — usually within one business day.
          </>
        ),
      },
      {
        q: "What happens after I send the form?",
        a: "We review your message, match it to the right department, and get back to you by phone, WhatsApp, or email to confirm your consultation slot. If we are not the right firm for your matter, we will tell you honestly and quickly.",
      },
      {
        q: "Do I have to visit your office?",
        a: "No. Most matters — company registration, contracts, land searches, succession, debt recovery — can be handled entirely online, with documents exchanged over WhatsApp or email and signing done digitally or by post. Visit the office in Matasia only if you prefer to.",
      },
    ],
  },
  {
    title: "Working With Us",
    items: [
      {
        q: "Which areas of law do you handle?",
        a: (
          <>
            Eight departments: Business & SME Advisory, Real Estate, Debt Recovery & Small Claims,
            Mediation/Arbitration & ADR, Intellectual Property, NGO & Non-Profit Registration,
            Family Law, and Data Protection. See the full{" "}
            <Link to="/" hash="departments" className="text-clay hover:underline">
              departments list
            </Link>
            .
          </>
        ),
      },
      {
        q: "How do your fees work?",
        a: "After the first consultation you receive a written fee estimate before any work begins — fixed fees where the scope is clear, and staged or hourly billing for ongoing matters. No work is started and no invoice raised without your sign-off.",
      },
      {
        q: "Can you act for me if I live abroad?",
        a: "Yes — diaspora work is a core part of our practice. We verify land, handle succession and probate, and arrange powers of attorney while you are in the UK, US, Gulf, or elsewhere. We work across time zones and keep you updated in writing.",
      },
      {
        q: "My matter is urgent. Can you help today?",
        a: "Call 0707 329 013 or WhatsApp us directly. Urgent matters — freezes, deadlines, arrests, disputed land — are triaged the same day wherever possible.",
      },
    ],
  },
  {
    title: "Specific Matters",
    items: [
      {
        q: "I want to buy land from abroad. Where do I start?",
        a: (
          <>
            With a search, not a payment. Start with our{" "}
            <Link
              to="/insights/$slug"
              params={{ slug: "buying-land-in-kenya-from-overseas" }}
              className="text-clay hover:underline"
            >
              pre-purchase checklist
            </Link>
            , then instruct us to verify the title at the Lands Registry, confirm rates and land
            rent, and physically inspect the plot before any money moves.
          </>
        ),
      },
      {
        q: "How long does NGO or company registration take?",
        a: "Depends on the registry and whether your documents are in order the first time. With complete paperwork, company registration is typically days, while NGO/PBO registration runs to several weeks. We tell you the realistic timeline up front and handle all filings.",
      },
      {
        q: "Someone owes me money. Do I have to go to court?",
        a: "Usually not to start. We send a formal demand letter first — that resolves a large share of debts. If it still isn't paid, Small Claims Court handles claims within its threshold quickly and cheaply, and we take it there.",
      },
      {
        q: "Is mediation cheaper than litigation?",
        a: "Almost always. Mediation is faster, confidential, and preserves relationships — useful for business partners, family, and neighbours. If mediation fails, you have lost nothing: you can still litigate.",
      },
    ],
  },
];

function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative hero-pattern text-paper-text pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/50 to-navy-deep/90" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <span className="text-brass font-mono text-xs tracking-[0.16em] uppercase">Answers</span>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl text-paper-text leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-5 text-lg text-paper-text/75">
            The questions clients ask us most — answered plainly.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          {groups.map((group) => (
            <div key={group.title} className="mb-12">
              <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-clay">
                {group.title}
              </span>
              <div className="mt-4 border-t border-line">
                {group.items.map((item) => (
                  <details key={item.q} className="group border-b border-line">
                    <summary className="flex items-start justify-between gap-4 cursor-pointer list-none py-4 font-serif text-[17px] font-semibold text-navy hover:text-clay transition-colors">
                      {item.q}
                      <span className="text-brass font-mono text-lg leading-6 shrink-0 transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="pb-5 -mt-1 text-ink-text leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-card border border-line border-l-[4px] border-l-brass p-6">
            <p className="font-serif text-xl font-semibold text-navy mb-2">
              Still have a question?
            </p>
            <p className="text-ink-text leading-relaxed mb-4">
              Ask us directly — the first consultation is free and there is no obligation to
              instruct us afterwards.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                hash="book"
                className="font-mono text-[13px] tracking-wide bg-clay text-paper-text px-6 py-3 border border-clay hover:-translate-y-0.5 transition-all duration-150"
              >
                Book a Consultation
              </Link>
              <a
                href="https://wa.me/254707329013"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[13px] tracking-wide bg-transparent text-ink-text px-6 py-3 border border-line hover:border-brass hover:text-clay transition-all duration-150"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <AssistantWidget />
    </div>
  );
}
