import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { AssistantWidget } from "@/components/AssistantWidget";

export const Route = createFileRoute("/customer-service-week")({
  head: () => ({
    meta: [
      { title: "Customer Service Week | NKM Advocates" },
      {
        name: "description",
        content:
          "5–9 October 2026 — Customer Service Week at NKM Advocates. What you can expect from us this week, and every way to reach us.",
      },
    ],
  }),
  component: ServiceWeekPage,
});

const commitments: { title: string; body: string }[] = [
  {
    title: "We listen first",
    body: "Reach us on WhatsApp, phone, email, or right here on the site. Every message this week is read by a person — tell us what we get right and what we miss.",
  },
  {
    title: "Plain answers, no runaround",
    body: "We'll explain your matter in plain English: what happens next, what it costs, and what we honestly think of your chances.",
  },
  {
    title: "Urgent means urgent",
    body: "Freezes, deadlines, arrests, disputed land — urgent matters are triaged the same day wherever possible, the same as every week of the year.",
  },
  {
    title: "You hear back within a day",
    body: "Every enquiry gets a reply within one business day — even when the answer is that we're not the right firm for it.",
  },
];

function ServiceWeekPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative hero-pattern pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/50 to-navy-deep/90" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-10 text-center text-paper-text">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-brass">
            5 &ndash; 9 October 2026
          </span>
          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            Customer Service Week
          </h1>
          <p className="mt-5 text-lg text-paper-text/75">
            One week set aside to say thank you — and to listen. You&rsquo;re the reason we show up,
            so this week we&rsquo;re making it easier to tell us what we get right, what we miss,
            and how doing legal work with us actually feels.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-clay">
            What you can expect from us this week
          </span>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {commitments.map((item) => (
              <div
                key={item.title}
                className="border border-line border-l-[4px] border-l-brass bg-card p-6"
              >
                <h2 className="font-serif text-[19px] font-semibold text-navy">{item.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-text">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 bg-ink-2 p-8 text-center text-paper-text sm:p-10">
            <p className="font-serif text-2xl italic sm:text-3xl">
              &ldquo;You&rsquo;re the reason we show up.&rdquo;
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-brass">
              The whole team, all week
            </p>
          </div>

          <div className="mt-14">
            <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-clay">
              Reach us this week
            </span>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <div className="border border-line bg-card p-6">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-brass">
                  Call or WhatsApp
                </h3>
                <a
                  href="tel:0707329013"
                  className="mt-2 block font-serif text-[19px] font-semibold text-navy transition-colors hover:text-clay"
                >
                  0707 329 013
                </a>
                <p className="mt-1 text-[14px] text-ink-text">Mon &ndash; Sat, 9am &ndash; 5pm</p>
              </div>
              <div className="border border-line bg-card p-6">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-brass">
                  Email
                </h3>
                <a
                  href="mailto:contact@nkm-advocates.co.ke"
                  className="mt-2 block break-all font-serif text-[17px] font-semibold text-navy transition-colors hover:text-clay"
                >
                  contact@nkm-advocates.co.ke
                </a>
                <p className="mt-1 text-[14px] text-ink-text">Replies within one business day</p>
              </div>
              <div className="border border-line bg-card p-6">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-brass">
                  Visit
                </h3>
                <p className="mt-2 font-serif text-[19px] font-semibold text-navy">Wilkem Edge</p>
                <p className="mt-1 text-[14px] text-ink-text">Matasia</p>
              </div>
            </div>
          </div>

          <div className="mt-14 border border-line border-l-[4px] border-l-brass bg-card p-6 sm:p-8">
            <p className="font-serif text-xl font-semibold text-navy">
              Tell us how we&rsquo;re doing — or just say hello
            </p>
            <p className="mt-2 leading-relaxed text-ink-text">
              Book a consultation, send a WhatsApp message, or ask our assistant anything on this
              site. However you prefer to reach us, a real person will answer.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link
                to="/"
                hash="book"
                className="border border-clay bg-clay px-6 py-3 font-mono text-[13px] tracking-wide text-paper-text transition-all duration-150 hover:-translate-y-0.5"
              >
                Book a Consultation
              </Link>
              <a
                href="https://wa.me/254707329013"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line px-6 py-3 font-mono text-[13px] tracking-wide text-ink-text transition-all duration-150 hover:border-brass hover:text-clay"
              >
                WhatsApp Us
              </a>
              <Link
                to="/faq"
                className="border border-line px-6 py-3 font-mono text-[13px] tracking-wide text-ink-text transition-all duration-150 hover:border-brass hover:text-clay"
              >
                Read the FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <AssistantWidget />
    </div>
  );
}
