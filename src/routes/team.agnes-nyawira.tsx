import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { AssistantWidget } from "@/components/AssistantWidget";

export const Route = createFileRoute("/team/agnes-nyawira")({
  head: () => ({
    meta: [
      { title: "Agnes Nyawira — Principal Advocate | NKM Advocates" },
      { name: "description", content: "Managing Partner at NKM Advocates. Over 10 years of experience in property, commercial, corporate, banking, and intellectual property law." },
    ],
  }),
  component: TeamProfilePage,
});

function TeamProfilePage() {
  return (
    <div className="min-h-screen bg-background text-ink-text">
      <SiteHeader />

      <section className="bg-ink text-paper-text py-20">
        <div className="mx-auto max-w-[960px] px-7 flex flex-col md:flex-row gap-10 items-center">
          <img
            src="/agnes-nyawira.jpg"
            alt="Agnes Nyawira"
            className="w-[280px] h-[320px] object-cover rounded-lg border border-line-dark flex-shrink-0"
          />
          <div>
            <Link
              to="/"
              className="font-mono text-[11px] text-brass-soft hover:text-brass mb-6 inline-block"
            >
              &larr; Back to home
            </Link>
            <span className="font-mono text-[11px] tracking-widest uppercase text-brass-soft block mb-2">
              Principal Advocate
            </span>
            <h1 className="font-serif text-[clamp(28px,4vw,42px)] font-semibold tracking-tight mb-3">
              Agnes Nyawira
            </h1>
            <p className="text-[15px] leading-relaxed text-paper-text/70 mb-5">
              Managing Partner at NKM Advocates. Over 10 years of experience delivering practical
              and strategic legal solutions across property, commercial, corporate, banking, and
              intellectual property law.
            </p>
            <a
              href="https://www.linkedin.com/in/nkm-a-9844b135"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-brass-soft hover:text-brass inline-flex items-center gap-1.5 group"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              View LinkedIn Profile
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[720px] px-7">
          <div className="mb-12">
            <h2 className="font-serif text-[22px] font-semibold text-navy mb-4">Areas of Expertise</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-card border border-border p-5">
                <h3 className="font-serif font-semibold text-[15px] text-navy mb-1.5">Real Estate &amp; Conveyancing</h3>
                <p className="text-[13.5px] leading-relaxed text-ink-text/70">Property transactions, title transfers, due diligence, and conveyancing for residential and commercial properties across Kenya.</p>
              </div>
              <div className="bg-card border border-border p-5">
                <h3 className="font-serif font-semibold text-[15px] text-navy mb-1.5">Corporate &amp; Commercial Law</h3>
                <p className="text-[13.5px] leading-relaxed text-ink-text/70">Company formation, contracts, compliance, and advisory for businesses operating in Kenya and across borders.</p>
              </div>
              <div className="bg-card border border-border p-5">
                <h3 className="font-serif font-semibold text-[15px] text-navy mb-1.5">Banking &amp; Securities</h3>
                <p className="text-[13.5px] leading-relaxed text-ink-text/70">Security documentation, loan agreements, charge registrations, and regulatory compliance for financial transactions.</p>
              </div>
              <div className="bg-card border border-border p-5">
                <h3 className="font-serif font-semibold text-[15px] text-navy mb-1.5">Intellectual Property</h3>
                <p className="text-[13.5px] leading-relaxed text-ink-text/70">Trademark registration, copyright protection, and IP portfolio management for businesses and creative enterprises.</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-[22px] font-semibold text-navy mb-4">Experience</h2>
            <div className="border-l-2 border-brass pl-5 space-y-6">
              <div>
                <span className="font-mono text-[11px] tracking-widest uppercase text-clay">Jan 2016 — Present</span>
                <h3 className="font-serif font-semibold text-[16px] text-navy mt-1">Managing Partner — NKM Advocates</h3>
                <p className="text-[14px] leading-relaxed text-ink-text/70 mt-1">Leading a multi-disciplinary law firm serving corporates, SMEs, and individuals. Successfully managed property conveyancing projects, corporate law matters, and commercial transactions including banking and securities law. Built a client-focused practice founded on trust, transparency, and timely service delivery.</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-[22px] font-semibold text-navy mb-4">Education</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brass mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[15px] text-navy">Bachelor of Laws (LL.B)</h3>
                  <p className="text-[13.5px] text-ink-text/60">Mount Kenya University</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brass mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[15px] text-navy">Postgraduate Diploma in Legal Practice</h3>
                  <p className="text-[13.5px] text-ink-text/60">Kenya School of Law</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-[22px] font-semibold text-navy mb-4">Approach</h2>
            <p className="text-[15px] leading-relaxed text-ink-text">I pride myself on building strong client relationships founded on trust, transparency, and timely service delivery. Whether you are an individual buying property, a startup forming a company, or a corporation navigating regulatory compliance, my goal is to provide clear, practical legal guidance that protects your interests and moves your matters forward.</p>
          </div>

          <div className="bg-ink text-paper-text p-8 text-center rounded-lg">
            <h3 className="font-serif text-[20px] font-semibold mb-2">Book a consultation with Agnes</h3>
            <p className="text-[14px] text-paper-text/60 mb-5">Free initial consultation — by phone, WhatsApp, or in person at our Nairobi office.</p>
            <Link
              to="/"
              hash="book"
              className="inline-block bg-clay text-paper-text font-mono text-[12px] px-6 py-2.5 hover:bg-clay/80 transition-colors"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <AssistantWidget />
    </div>
  );
}
