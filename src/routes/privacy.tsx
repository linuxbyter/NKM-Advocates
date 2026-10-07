import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { AssistantWidget } from "@/components/AssistantWidget";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | NKM Advocates" },
      {
        name: "description",
        content:
          "How NKM Advocates collects, uses, and protects your personal data under Kenya's Data Protection Act, 2019.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative hero-pattern text-paper-text pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/50 to-navy-deep/90" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <span className="text-brass font-mono text-xs tracking-[0.16em] uppercase">
            Your Information
          </span>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl text-paper-text leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-5 text-lg text-paper-text/75">
            What we collect, why we collect it, and the choices you have — in plain English.
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-[0.14em] uppercase text-brass-soft">
            Effective 6 October 2026
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Section title="1. Who we are">
            <p>
              NKM Advocates is a Kenyan law firm with offices at Wilkem Edge Business Center, 1st
              Floor, Matasia, Ngong. We are the data controller for personal data handled through
              this website and in the course of our practice. You can reach us at{" "}
              <a href="mailto:contact@nkm-advocates.co.ke" className="text-clay hover:underline">
                contact@nkm-advocates.co.ke
              </a>{" "}
              or 0707 329 013.
            </p>
          </Section>

          <Section title="2. What we collect">
            <ul className="list-none p-0 space-y-3">
              <li>
                <strong className="text-navy">Information you give us</strong> — your name, email
                address, phone number, and any details you include in the consultation form, the
                chat assistant, or in correspondence with us.
              </li>
              <li>
                <strong className="text-navy">Matter information</strong> — documents and facts you
                share when you instruct us. This is protected by advocate–client confidentiality in
                addition to data protection law.
              </li>
              <li>
                <strong className="text-navy">Technical information</strong> — standard server logs
                (such as IP address and browser type) kept by our hosting provider for security and
                reliability.
              </li>
            </ul>
          </Section>

          <Section title="3. How we use it">
            <ul className="list-none p-0 space-y-3">
              <li>To respond to your enquiry and book your consultation.</li>
              <li>To provide legal services you have asked us to provide.</li>
              <li>
                To send insights or updates you have specifically asked to receive — you can
                unsubscribe at any time.
              </li>
              <li>To keep our website secure and working properly.</li>
            </ul>
            <p className="mt-4">
              We do <strong>not</strong> sell your personal data, and we do not share it for
              advertising.
            </p>
          </Section>

          <Section title="4. Our legal basis">
            <p>
              We process personal data in accordance with the Data Protection Act, 2019 of Kenya.
              Our grounds are your consent (for example, when you submit the consultation form),
              steps taken at your request before entering a retainer, and our legitimate interest in
              running a law firm securely and responsibly. Advocate–client confidentiality
              obligations apply to client matter information and are independent of — and in
              addition to — data protection law.
            </p>
          </Section>

          <Section title="5. Who we share it with">
            <p>
              We use vetted service providers to operate this website: our hosting platform, our
              database provider, our email delivery service, and our chat assistant provider. They
              process data only on our instructions. We may also disclose data where the law, a
              court, or a regulator requires it. We never sell your data.
            </p>
          </Section>

          <Section title="6. How long we keep it">
            <p>
              Enquiry data is kept only as long as needed to respond and follow up. Client files are
              retained for the period required by Kenyan law and our professional obligations, after
              which they are securely destroyed. You can ask us to delete your enquiry data at any
              time.
            </p>
          </Section>

          <Section title="7. Your rights">
            <p>Under the Data Protection Act, 2019 you have the right to:</p>
            <ul className="list-none p-0 space-y-2 mt-3">
              <li>Access the personal data we hold about you.</li>
              <li>Correct data that is inaccurate or out of date.</li>
              <li>Request deletion of your data.</li>
              <li>Object to, or withdraw consent for, certain processing.</li>
              <li>Lodge a complaint with the Office of the Data Protection Commissioner.</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, email{" "}
              <a href="mailto:contact@nkm-advocates.co.ke" className="text-clay hover:underline">
                contact@nkm-advocates.co.ke
              </a>
              . We will respond within the period required by law.
            </p>
          </Section>

          <Section title="8. Security">
            <p>
              Data in transit is encrypted with TLS. Access to client information is limited to the
              advocates and staff who need it, all of whom are bound by professional confidentiality
              obligations. No system is perfectly secure, but we review our safeguards regularly.
            </p>
          </Section>

          <Section title="9. Cookies">
            <p>
              This website uses only the storage strictly needed for core functions — for example,
              keeping you signed in to the assistant session. We do not use advertising or
              cross-site tracking cookies.
            </p>
          </Section>

          <Section title="10. Changes and contact">
            <p>
              We may update this policy to reflect changes in our practices or the law. The current
              version will always be published on this page with its effective date. Questions?
              Contact us at{" "}
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
              Book a Consultation
            </Link>
            <Link
              to="/disclaimer"
              className="font-mono text-[13px] tracking-wide bg-transparent text-ink-text px-6 py-3 border border-line hover:border-brass hover:text-clay transition-all duration-150"
            >
              Read our Disclaimer
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
