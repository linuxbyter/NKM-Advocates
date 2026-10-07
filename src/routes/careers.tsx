import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { AssistantWidget } from "@/components/AssistantWidget";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers | NKM Advocates" },
      {
        name: "description",
        content:
          "Careers at NKM Advocates — how advocates, para-legals, certified secretaries, and interns can apply to join our Matasia, Ngong office.",
      },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative hero-pattern text-paper-text pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/50 to-navy-deep/90" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <span className="text-brass font-mono text-xs tracking-[0.16em] uppercase">Join Us</span>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl text-paper-text leading-tight">
            Careers at NKM
          </h1>
          <p className="mt-5 text-lg text-paper-text/75">
            A small, serious firm where your work is your own — and your name goes on it.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="mb-12">
            <h2 className="font-serif text-[26px] font-bold text-navy mb-3">How we work</h2>
            <div className="text-ink-text leading-relaxed space-y-3">
              <p>
                NKM Advocates is a multi-disciplinary firm in Matasia, Ngong, serving Kenyan
                businesses, families, and the diaspora. We handle serious matters with a small team,
                which means juniors here see real files early — drafting, searches, client meetings,
                and court attendances — under direct supervision.
              </p>
              <p>
                We value clear writing, honest client communication, and work you would be
                comfortable putting your name to. If that sounds like you, we would like to hear
                from you.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-[26px] font-bold text-navy mb-4">What we look for</h2>
            <ul className="list-none p-0 grid sm:grid-cols-2 gap-4">
              {[
                [
                  "Advocates",
                  "Admitted advocates with courtroom and advisory experience; fresh admits with strong attachments considered.",
                ],
                [
                  "Para-legals & Legal Officers",
                  "Research, drafting support, registry filings, and client follow-up.",
                ],
                [
                  "Certified Secretaries",
                  "Company secretarial, governance, and compliance work for our corporate clients.",
                ],
                [
                  "Interns & Pupils",
                  "Structured attachment with supervised exposure across departments.",
                ],
              ].map(([title, desc]) => (
                <li
                  key={title}
                  className="bg-card border border-line border-l-[3px] border-l-brass p-5"
                >
                  <h3 className="font-serif text-[17px] font-semibold text-navy mb-1.5">{title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-ink-text">{desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-[26px] font-bold text-navy mb-3">How to apply</h2>
            <div className="text-ink-text leading-relaxed space-y-3">
              <p>
                We do not use a recruitment portal. Email your CV and a short cover letter to{" "}
                <a
                  href="mailto:contact@nkm-advocates.co.ke?subject=Application%20%E2%80%94%20[Role]"
                  className="text-clay hover:underline"
                >
                  contact@nkm-advocates.co.ke
                </a>{" "}
                with the subject line{" "}
                <strong className="text-navy">Application — [the role you want]</strong>. Tell us
                which department interests you and why, in your own words.
              </p>
              <p>
                We read every application. If your profile matches a role — open or upcoming — we
                will invite you for a conversation. Internship enquiries are welcome year-round;
                specify your university and attachment period.
              </p>
            </div>
          </div>

          <div className="bg-card border border-line border-l-[4px] border-l-brass p-6">
            <p className="font-serif text-xl font-semibold text-navy mb-2">
              Not looking for a job — looking for a lawyer?
            </p>
            <p className="text-ink-text leading-relaxed mb-4">
              Clients are welcome on the same page: the first consultation is free.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                hash="book"
                className="font-mono text-[13px] tracking-wide bg-clay text-paper-text px-6 py-3 border border-clay hover:-translate-y-0.5 transition-all duration-150"
              >
                Book a Consultation
              </Link>
              <Link
                to="/faq"
                className="font-mono text-[13px] tracking-wide bg-transparent text-ink-text px-6 py-3 border border-line hover:border-brass hover:text-clay transition-all duration-150"
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
