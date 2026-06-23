import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitLead } from "@/lib/leads.functions";
import { AssistantWidget } from "@/components/AssistantWidget";
import { practiceAreas } from "@/lib/practice-areas";
import { Loader2 } from "lucide-react";
import leaderPhoto from "@/assets/leader-photo.jpg";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trackRef = useRef<HTMLDivElement>(null);
  const scrollCarousel = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement;
    if (!card) return;
    const step = card.getBoundingClientRect().width + 18;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(1);
  const call = useServerFn(submitLead);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }
    setLoading(true);
    try {
      await call({ data: { ...form, source: "contact-form" } });
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      const subject = encodeURIComponent(`Consultation: ${form.service || "General"}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\n${form.message}`,
      );
      window.open(`mailto:contact@nkm-advocates.co.ke?subject=${subject}&body=${body}`, "_blank");
      toast.success("Opening your email app to complete your request.");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone text-ink-text font-sans antialiased">
      {/* Header */}
      <header
        className={`sticky top-0 z-60 transition-all duration-300 bg-ink-2/90 backdrop-blur-md ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-7 py-[18px] transition-all duration-200">
          <div className="flex flex-col leading-none">
            <span className="font-serif text-[19px] font-bold tracking-tight text-paper-text">
              NKM ADVOCATES
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-brass-soft">
              ADVOCATES &amp; CONSULTANTS
            </span>
          </div>
          <nav className="hidden md:flex">
            <ul className="flex list-none items-center gap-2">
              <li className="relative group">
                <a
                  href="#departments"
                  className="inline-block px-3 py-2.5 text-sm font-medium text-paper-text transition-colors hover:text-paper-text"
                >
                  Departments <span className="text-[9px] opacity-70 ml-1">▾</span>
                </a>
                <div className="absolute top-full left-0 min-w-[300px] bg-card border border-line shadow-xl p-2.5 opacity-0 invisible translate-y-1.5 transition-all duration-[180ms] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 grid gap-0.5 z-50">
                  {[
                    ["SME · 01", "Business &amp; SME Advisory"],
                    ["RE · 02", "Real Estate"],
                    ["DR · 03", "Debt Recovery &amp; Small Claims"],
                    ["ADR · 04", "Mediation &amp; ADR"],
                    ["IP · 05", "Intellectual Property"],
                    ["NGO · 06", "NGO &amp; Non-Profit Registration"],
                    ["FAM · 07", "Family Law"],
                    ["DP · 08", "Data Protection"],
                  ].map(([code, name]) => (
                    <a
                      key={code}
                      href="#departments"
                      className="block rounded px-3 py-2 hover:bg-stone transition-colors"
                    >
                      <span className="font-mono text-[10px] tracking-wide text-clay">{code}</span>
                      <br />
                      <span
                        className="text-[13.5px] font-semibold text-ink-text"
                        dangerouslySetInnerHTML={{ __html: name }}
                      />
                    </a>
                  ))}
                </div>
              </li>
              <li>
                <a
                  href="#serve"
                  className="inline-block px-3 py-2.5 text-sm font-medium text-paper-text transition-colors hover:text-paper-text"
                >
                  Who We Serve
                </a>
              </li>
              <li>
                <a
                  href="#insights"
                  className="inline-block px-3 py-2.5 text-sm font-medium text-paper-text transition-colors hover:text-paper-text"
                >
                  Insights
                </a>
              </li>
              <li>
                <a
                  href="#podcast"
                  className="inline-block px-3 py-2.5 text-sm font-medium text-paper-text transition-colors hover:text-paper-text"
                >
                  Podcast
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="inline-block px-3 py-2.5 text-sm font-medium text-paper-text transition-colors hover:text-paper-text"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#book"
                  className="inline-block px-3 py-2.5 text-sm font-medium text-paper-text transition-colors hover:text-paper-text"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <a
            href="#book"
            className="font-mono text-[13px] tracking-wide bg-clay text-paper-text px-[18px] py-[11px] border border-clay transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(138,60,41,0.28)] focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
          >
            Book Consultation
          </a>
        </div>
      </header>

      {/* HERO — full viewport */}
      <section className="relative min-h-screen flex items-center overflow-hidden -mt-[68px]">
        <div className="absolute inset-0 z-0">
          <svg
            viewBox="0 0 1400 800"
            preserveAspectRatio="xMidYMax slice"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1B3437" />
                <stop offset="100%" stopColor="#0B1A1B" />
              </linearGradient>
            </defs>
            <rect width="1400" height="800" fill="url(#sky)" />
            <g fill="#0B1A1B" opacity="0.92">
              <rect x="40" y="520" width="70" height="280" />
              <rect x="130" y="460" width="50" height="340" />
              <rect x="200" y="560" width="90" height="240" />
              <rect x="310" y="420" width="60" height="380" />
              <rect x="390" y="500" width="100" height="300" />
              <rect x="510" y="380" width="46" height="420" />
              <rect x="575" y="470" width="120" height="330" />
              <rect x="715" y="430" width="58" height="370" />
              <rect x="790" y="510" width="95" height="290" />
              <rect x="905" y="450" width="50" height="350" />
              <rect x="970" y="540" width="110" height="260" />
              <rect x="1095" y="400" width="64" height="400" />
              <rect x="1175" y="490" width="90" height="310" />
              <rect x="1280" y="455" width="55" height="345" />
            </g>
            <g stroke="#B6883F" strokeWidth={1} opacity="0.35">
              <line x1="0" y1="800" x2="1400" y2="800" />
            </g>
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,22,24,0.55)] via-[rgba(10,22,24,0.78)] to-[rgba(10,22,24,0.94)] z-[1]"></div>
        <div className="relative z-10 max-w-[720px] mx-auto px-7 py-[120px_28px_90px] text-center">
          <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-brass-soft inline-flex items-center gap-2.5 justify-center mb-[18px] before:content-[''] before:w-[18px] before:h-px before:bg-brass-soft before:inline-block">
            Kenya · Diaspora · Cross-Border
          </span>
          <h1 className="font-serif text-[clamp(32px,5vw,54px)] leading-[1.08] text-paper-text mb-5 font-semibold tracking-tight">
            Structuring your business. Protecting your family.{" "}
            <em className="italic text-brass-soft not-italic">Wherever you are.</em>
          </h1>
          <p className="text-[16.5px] leading-relaxed text-paper-text max-w-[560px] mx-auto mb-8">
            A Kenyan commercial and family law firm built for entrepreneurs, SMEs, foreign
            investors, and Kenyans living abroad — with a bench of advocates and consultants, not a
            single point of contact.
          </p>
          <div className="flex gap-3.5 flex-wrap justify-center">
            <a
              href="#book"
              className="font-mono text-[13px] tracking-wide bg-clay text-paper-text px-[22px] py-[14px] border border-clay transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(138,60,41,0.28)]"
            >
              Book a Consultation
            </a>
            <a
              href="#departments"
              className="font-mono text-[13px] tracking-wide bg-transparent text-paper-text px-[22px] py-[14px] border border-paper-text-dim transition-all duration-150 hover:-translate-y-0.5 hover:border-brass-soft hover:text-brass-soft"
            >
              View Departments
            </a>
          </div>
          <p className="font-mono text-[11.5px] tracking-wide text-paper-text mt-5">
            Available entirely online — visit our office only if you'd prefer to.
          </p>
        </div>
      </section>

      {/* EXPLORE STRIP */}
      <div className="bg-ink-2 border-t border-b border-line-dark">
        <div className="mx-auto flex max-w-[1180px] justify-center flex-wrap">
          {["Departments", "Who We Serve", "Insights", "Podcast", "Our Team"].map((label, i) => (
            <a
              key={label}
              href={["#departments", "#serve", "#insights", "#podcast", "#team"][i]}
              className="font-mono text-[12px] tracking-wide uppercase text-paper-text px-[26px] py-[18px] border-r border-line-dark last:border-r-0 transition-colors hover:text-brass-soft hover:bg-white/[0.03]"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* ABOUT — with leadership photo */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1180px] px-7">
          <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
            <div>
              <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-clay inline-flex items-center gap-2.5 before:content-[''] before:w-[18px] before:h-px before:bg-clay before:inline-block">
                Why Clients Choose Nkm
              </span>
              <h2 className="font-serif text-[clamp(26px,3.2vw,38px)] font-semibold tracking-tight mt-3.5 max-w-[560px]">
                Distance shouldn't mean disadvantage.
              </h2>
              <div className="mt-8 flex items-start gap-5">
                <img
                  src={leaderPhoto}
                  alt="Agnes Nyawira — Managing Partner"
                  className="w-24 h-24 rounded-full object-cover border-2 border-brass shrink-0"
                />
                <div>
                  <p className="text-base leading-relaxed text-ink-text">
                    <strong className="text-ink-text">Agnes Nyawira</strong>, Managing Partner —
                    Advocate of the High Court of Kenya, Certified Public Secretary, and accredited
                    mediator.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-base leading-relaxed text-ink-text mb-5">
                Whether you're growing a business in Nairobi or protecting family land while based
                abroad, the risk is the same: things move faster than you can follow. We close that
                gap with specialist departments, advisory-first judgment, and direct,
                time-zone-aware communication.
              </p>
              <a
                href="#team"
                className="font-mono text-[12.5px] text-clay inline-flex items-center gap-1.5 group"
              >
                More About Us
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-card">
        <div className="mx-auto max-w-[1180px] px-7">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-clay inline-flex items-center gap-2.5 before:content-[''] before:w-[18px] before:h-px before:bg-clay before:inline-block">
                Working With Us
              </span>
              <h2 className="font-serif text-[clamp(26px,3.2vw,38px)] font-semibold tracking-tight mt-3 max-w-[560px]">
                The same service, whether you visit or not.
              </h2>
            </div>
            <p className="text-[13px] italic text-ink-text max-w-[320px]">
              Every department can be engaged entirely online.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              [
                "01",
                "Book a Consultation",
                "By phone, WhatsApp, or scheduled video call — no office visit required.",
              ],
              [
                "02",
                "Share Documents Directly",
                "Send identification, contracts, or title documents via WhatsApp or your dedicated case email — no portal login required.",
              ],
              [
                "03",
                "We Handle the Matter",
                "Your case goes to the right department, with updates as it progresses.",
              ],
              [
                "04",
                "Sign & Pay",
                'Print, sign, and scan documents back over WhatsApp, then settle fees by bank transfer or M-Pesa — wherever you are. <span class="inline-flex items-center gap-1 mt-1"><svg viewBox="0 0 40 14" width="40" height="14" aria-label="M-Pesa"><rect width="40" height="14" rx="2" fill="#4CAF50"/><text x="20" y="10" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">M-PESA</text></svg></span>',
              ],
            ].map(([num, title, desc]) => (
              <div key={num} className="pt-[18px] border-t-2 border-brass">
                <span className="font-mono text-[13px] tracking-wide text-clay">{num}</span>
                <h3 className="font-serif text-[17px] font-semibold tracking-tight mt-2.5 mb-2">
                  {title}
                </h3>
                <p
                  className="text-[13.5px] leading-relaxed text-ink-text"
                  dangerouslySetInnerHTML={{ __html: desc }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTMENTS CAROUSEL */}
      <section className="py-24" id="departments">
        <div className="mx-auto max-w-[1180px] px-7">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-clay inline-flex items-center gap-2.5 before:content-[''] before:w-[18px] before:h-px before:bg-clay before:inline-block">
                How We're Organized
              </span>
              <h2 className="font-serif text-[clamp(26px,3.2vw,38px)] font-semibold tracking-tight mt-3">
                One firm, eight departments.
              </h2>
            </div>
            <p className="text-[13px] italic text-ink-text max-w-[320px]">
              Each matter is filed to the department built for it.
            </p>
          </div>
          <div className="relative">
            <div
              ref={trackRef}
              onScroll={() => {
                const el = trackRef.current;
                if (!el) return;
                const card = el.firstElementChild as HTMLElement;
                if (!card) return;
                const step = card.getBoundingClientRect().width + 18;
                setCarouselIdx(Math.min(8, Math.max(1, Math.round(el.scrollLeft / step) + 1)));
              }}
              className="flex gap-[18px] overflow-x-auto snap-x snap-mandatory scrollbar-none pb-1.5"
            >
              {[
                [
                  "SME-01",
                  "Business &amp; SME Advisory",
                  "Formation, contracts, compliance and tax structuring for founders and growing businesses.",
                ],
                [
                  "RE-02",
                  "Real Estate",
                  "Title verification, leases, and protection against fraudulent land transactions.",
                ],
                [
                  "DR-03",
                  "Debt Recovery &amp; Small Claims",
                  "Structured collections for unpaid invoices and small claims representation.",
                ],
                [
                  "ADR-04",
                  "Mediation, Arbitration &amp; ADR",
                  "Out-of-court resolution for commercial and family disputes.",
                ],
                [
                  "IP-05",
                  "Intellectual Property",
                  "Trademark, copyright, and brand protection for growing businesses.",
                ],
                [
                  "NGO-06",
                  "NGO &amp; Non-Profit Registration",
                  "Registration and compliance for nonprofits and diaspora-funded initiatives.",
                ],
                [
                  "FAM-07",
                  "Family Law",
                  "Succession, custody, and power of attorney — with experience supporting clients abroad.",
                ],
                [
                  "DP-08",
                  "Data Protection",
                  "Privacy compliance and data governance built into how you operate.",
                ],
              ].map(([code, title, desc]) => (
                <div
                  key={code}
                  className="flex-[0_0_280px] scroll-snap-start bg-card border border-line border-l-[3px] border-l-brass p-[26px_22px] transition-all duration-200 hover:border-l-[9px] hover:pl-7"
                >
                  <span className="font-mono text-[11px] tracking-wide text-clay">
                    FILE NO. {code}
                  </span>
                  <h3
                    className="font-serif text-[18px] font-semibold tracking-tight mt-2.5 mb-2 leading-tight"
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                  <p className="text-[13.5px] leading-relaxed text-ink-text mb-3.5">{desc}</p>
                  <span className="font-mono text-[12.5px] text-clay inline-flex items-center gap-1.5 group">
                    View Department
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3.5 mt-5">
              <span className="font-mono text-[12.5px] text-ink-text min-w-[48px] text-center">
                {carouselIdx} / 8
              </span>
              <button
                onClick={() => scrollCarousel(-1)}
                aria-label="Previous department"
                className="w-[38px] h-[38px] rounded-full border border-ink-text bg-transparent flex items-center justify-center cursor-pointer text-ink-text text-[15px] transition-colors hover:bg-clay hover:border-clay hover:text-paper-text focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
              >
                ←
              </button>
              <button
                onClick={() => scrollCarousel(1)}
                aria-label="Next department"
                className="w-[38px] h-[38px] rounded-full border border-ink-text bg-transparent flex items-center justify-center cursor-pointer text-ink-text text-[15px] transition-colors hover:bg-clay hover:border-clay hover:text-paper-text focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-24 bg-ink" id="serve">
        <div className="mx-auto max-w-[1180px] px-7">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-brass-soft inline-flex items-center gap-2.5 before:content-[''] before:w-[18px] before:h-px before:bg-brass-soft before:inline-block">
                Our Reach
              </span>
              <h2 className="font-serif text-[clamp(26px,3.2vw,38px)] font-semibold tracking-tight mt-3 text-paper-text">
                Who we serve.
              </h2>
            </div>
            <p className="text-[13px] italic text-paper-text max-w-[320px]">
              One Kenyan office. Three audiences we know well.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              [
                "Kenya",
                "SMEs &amp; Individuals",
                "Company formation, contracts, compliance, and dispute resolution for Kenyan businesses and families — in person or entirely online.",
              ],
              [
                "The Diaspora",
                "UK · US · Gulf",
                "Land verification, succession, and power of attorney handled on the ground while you're abroad.",
              ],
              [
                "Investors",
                "Entering Kenya",
                "Registration, compliance, and contracts for businesses and investors entering the Kenyan market.",
              ],
            ].map(([eyebrow, title, desc]) => (
              <div
                key={eyebrow}
                className="bg-ink text-paper-text relative min-h-[280px] p-[30px_26px] flex flex-col justify-end overflow-hidden"
              >
                <div className="relative z-10">
                  <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-brass-soft inline-flex items-center gap-2.5 mb-2.5 before:content-[''] before:w-[18px] before:h-px before:bg-brass-soft before:inline-block">
                    {eyebrow}
                  </span>
                  <h3
                    className="font-serif text-[22px] font-semibold tracking-tight text-paper-text mb-2.5"
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                  <p className="text-[13.5px] leading-relaxed text-paper-text mb-3.5">{desc}</p>
                  <a
                    href="#book"
                    className="font-mono text-[12.5px] text-brass-soft inline-flex items-center gap-1.5 group"
                  >
                    Learn More
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="py-24 bg-card" id="insights">
        <div className="mx-auto max-w-[1180px] px-7">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-clay inline-flex items-center gap-2.5 before:content-[''] before:w-[18px] before:h-px before:bg-clay before:inline-block">
                From the Firm
              </span>
              <h2 className="font-serif text-[clamp(26px,3.2vw,38px)] font-semibold tracking-tight mt-3">
                Insights.
              </h2>
            </div>
            <a
              href="/insights"
              className="font-mono text-[12.5px] text-clay inline-flex items-center gap-1.5 group"
            >
              View All
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
            {[
              { slug: "buying-land-in-kenya-from-overseas", tag: "Real Estate \u00b7 Diaspora", title: "Buying Land in Kenya From Overseas: A Pre-Purchase Checklist", date: "May 2026" },
              { slug: "five-contract-clauses-every-kenyan-sme-forgets", tag: "SME Advisory", title: "Five Contract Clauses Every Kenyan SME Forgets", date: "Apr 2026" },
              { slug: "power-of-attorney-from-abroad-kenya", tag: "Family Law \u00b7 Diaspora", title: "Power of Attorney From Abroad: What Actually Works in Kenya", date: "Mar 2026" },
              { slug: "chasing-an-unpaid-invoice-kenya", tag: "Debt Recovery", title: "Chasing an Unpaid Invoice in Kenya: Demand Letter to Small Claims, Explained", date: "Feb 2026" },
            ].map((article) => (
              <a
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="bg-card border border-line p-[22px] flex flex-col min-h-[210px] no-underline hover:-translate-y-1 hover:shadow-lg transition-all group"
              >
                <span className="font-mono text-[10.5px] tracking-wide uppercase text-clay">
                  {article.tag}
                </span>
                <h4 className="font-serif text-base font-semibold leading-tight mt-2.5 mb-2.5 flex-1 text-navy group-hover:text-clay transition-colors">
                  {article.title}
                </h4>
                <span className="font-mono text-[11px] text-ink-text">{article.date}</span>
                <span className="font-mono text-[12px] text-clay mt-2.5 inline-flex items-center gap-1.5">
                  Read article <span>{'\u2192'}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PODCAST */}
      <section className="py-24 bg-ink text-paper-text" id="podcast">
        <div className="mx-auto max-w-[1180px] px-7">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-4">
            <div>
              <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-brass-soft inline-flex items-center gap-2.5 mb-3 before:content-[''] before:w-[18px] before:h-px before:bg-brass-soft before:inline-block">
                On Air
              </span>
              <h2 className="font-serif text-[clamp(26px,3.2vw,38px)] font-semibold tracking-tight text-paper-text">
                The NKM Podcast.
              </h2>
            </div>
            <a
              href="#"
              className="font-mono text-[12.5px] text-brass-soft inline-flex items-center gap-1.5 group"
            >
              All Episodes
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>
          <p className="text-[15.5px] leading-relaxed text-paper-text max-w-[560px] mb-2">
            Plain-English conversations on Kenyan business law, diaspora property risk, and what
            SMEs get wrong before it costs them. New episodes monthly.
          </p>
          <div className="grid md:grid-cols-3 gap-[18px] my-[34px]">
            {[
              ["EP. 01", "Buying Land in Kenya When You Live Abroad"],
              ["EP. 02", "Five Mistakes SMEs Make Before Their First Contract"],
              ["EP. 03", "What Actually Counts as a Small Claim in Kenya"],
            ].map(([ep, title]) => (
              <div
                key={ep}
                className="bg-white/[0.04] border border-line-dark border-l-[3px] border-l-brass-soft p-[22px] transition-colors hover:bg-white/[0.07]"
              >
                <span className="font-mono text-[11px] tracking-wide text-brass-soft">{ep}</span>
                <h4 className="font-serif text-[15.5px] font-semibold leading-tight text-paper-text mt-2 mb-2.5">
                  {title}
                </h4>
                <span className="font-mono text-[9.5px] tracking-wide text-paper-text/50 border border-line-dark rounded-full px-[7px] py-[2px] mt-2.5 w-fit inline-block">
                  Sample — not yet recorded
                </span>
              </div>
            ))}
          </div>
          <div className="font-mono text-[12px] text-paper-text flex gap-4 items-center flex-wrap">
            <span className="text-paper-text">Listen on:</span>
            <span>Spotify</span>
            <span>·</span>
            <span>Apple Podcasts</span>
            <span>·</span>
            <span>YouTube</span>
          </div>
        </div>
      </section>

      {/* TEAM TEASER */}
      <section className="py-24" id="team">
        <div className="mx-auto max-w-[1180px] px-7">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex mb-6">
                {["A", "·", "·", "RW", "HM"].map((init, i) => (
                  <div
                    key={i}
                    className={`w-[58px] h-[58px] rounded-full bg-ink text-brass-soft flex items-center justify-center font-serif font-semibold text-[17px] border-2 border-card ${i > 0 ? "-ml-[14px]" : ""}`}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-clay inline-flex items-center gap-2.5 before:content-[''] before:w-[18px] before:h-px before:bg-clay before:inline-block">
                The Bench
              </span>
              <h2 className="font-serif text-[clamp(26px,3.2vw,38px)] font-semibold tracking-tight mt-3.5">
                A team, not a single practitioner.
              </h2>
            </div>
            <div>
              <p className="text-[15.5px] leading-relaxed text-ink-text mb-5">
                NKM operates across partners, associate advocates, and consulting counsel — each
                attached to a named department, so your matter is never dependent on one person's
                availability. Full bios, practising certificate status, and department leads are on
                the Team page.
              </p>
              <a
                href="#"
                className="font-mono text-[12.5px] text-clay inline-flex items-center gap-1.5 group"
              >
                Meet the Full Team
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BOOK CONSULTATION — area picker + form */}
      <section className="py-24 bg-ink-2 text-paper-text" id="book">
        <div className="mx-auto max-w-[1180px] px-7 text-center">
          <svg viewBox="0 0 200 200" aria-hidden="true" className="w-16 mx-auto mb-5">
            <circle cx="100" cy="100" r="92" fill="none" stroke="#B6883F" strokeWidth={2} />
            <text
              x="100"
              y="112"
              textAnchor="middle"
              fontFamily="Fraunces, serif"
              fontSize={46}
              fontWeight={700}
              fill="#D9B97A"
            >
              N
            </text>
          </svg>
          <h2 className="font-serif text-[clamp(26px,3.6vw,40px)] font-semibold tracking-tight text-paper-text max-w-[680px] mx-auto mb-4">
            Start with a conversation, not a commitment.
          </h2>
          <p className="text-[15.5px] leading-relaxed text-paper-text max-w-[520px] mx-auto mb-8">
            Book a free, no-obligation consultation. We'll tell you honestly whether litigation,
            mediation, or simple advisory is the right path — and which department should handle it.
          </p>

          {success ? (
            <div className="max-w-[520px] mx-auto bg-white/[0.04] border border-line-dark p-8 text-center">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-brass"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="font-serif text-2xl font-semibold tracking-tight text-paper-text mb-2">
                Thank you.
              </h3>
              <p className="text-sm text-paper-text">
                Your consultation request has been received. Our team will be in touch within one
                business day.
              </p>
            </div>
          ) : (
            <div className="max-w-[520px] mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {practiceAreas.map((area) => (
                  <button
                    key={area.slug}
                    type="button"
                    onClick={() => setForm({ ...form, service: area.title })}
                    aria-pressed={form.service === area.title}
                    className={`p-3 text-center border text-sm font-mono tracking-wide uppercase transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2 ${
                      form.service === area.title
                        ? "bg-brass text-ink border-brass"
                        : "bg-transparent text-paper-text border-line-dark hover:border-brass-soft hover:text-brass-soft"
                    }`}
                  >
                    {area.title.split(" ")[0]}
                  </button>
                ))}
              </div>

              <form onSubmit={submit} className="space-y-4 text-left">
                <div>
                  <label
                    htmlFor="book-service"
                    className="block font-mono text-[11px] font-medium uppercase tracking-wider text-brass-soft mb-1.5"
                  >
                    Area of Interest
                  </label>
                  <select
                    id="book-service"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-transparent border border-line-dark px-3 py-2.5 text-sm text-paper-text focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
                  >
                    <option value="" className="bg-ink-2">
                      Select a department
                    </option>
                    {practiceAreas.map((p) => (
                      <option key={p.slug} value={p.title} className="bg-ink-2">
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="book-name"
                      className="block font-mono text-[11px] font-medium uppercase tracking-wider text-brass-soft mb-1.5"
                    >
                      Full name *
                    </label>
                    <input
                      id="book-name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Wanjiru"
                      className="w-full bg-transparent border border-line-dark px-3 py-2.5 text-sm text-paper-text placeholder:text-paper-text/50 focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="book-email"
                      className="block font-mono text-[11px] font-medium uppercase tracking-wider text-brass-soft mb-1.5"
                    >
                      Email *
                    </label>
                    <input
                      id="book-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full bg-transparent border border-line-dark px-3 py-2.5 text-sm text-paper-text placeholder:text-paper-text/50 focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="book-phone"
                    className="block font-mono text-[11px] font-medium uppercase tracking-wider text-brass-soft mb-1.5"
                  >
                    Phone
                  </label>
                  <input
                    id="book-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+254 700 000 000"
                    className="w-full bg-transparent border border-line-dark px-3 py-2.5 text-sm text-paper-text placeholder:text-paper-text/50 focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="book-message"
                    className="block font-mono text-[11px] font-medium uppercase tracking-wider text-brass-soft mb-1.5"
                  >
                    Brief description
                  </label>
                  <textarea
                    id="book-message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    placeholder="A few sentences about your matter…"
                    className="w-full bg-transparent border border-line-dark px-3 py-2.5 text-sm text-paper-text placeholder:text-paper-text/50 focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-mono text-[13px] tracking-wide bg-clay text-paper-text py-[14px] border border-clay transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(138,60,41,0.28)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Request Consultation
                </button>
                <p className="font-mono text-[11px] text-paper-text/60 text-center">
                  Your details are confidential and used only to respond to your enquiry.
                </p>
              </form>
            </div>
          )}

          <div className="flex gap-3.5 flex-wrap justify-center mt-10">
            <a
              href="tel:0707329013"
              className="font-mono text-[13px] tracking-wide bg-clay text-paper-text px-[22px] py-[14px] border border-clay transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(138,60,41,0.28)]"
            >
              Call 0707 329 013
            </a>
            <a
              href="https://wa.me/254707329013"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[13px] tracking-wide bg-transparent text-paper-text px-[22px] py-[14px] border border-paper-text-dim transition-all duration-150 hover:-translate-y-0.5 hover:border-brass-soft hover:text-brass-soft"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink-2 text-paper-text border-t border-line-dark text-[13.5px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr] gap-9 pb-[46px] pt-[60px]">
            <div>
              <h4 className="font-mono text-[11px] tracking-[0.1em] uppercase text-brass-soft mb-3.5">
                NKM Advocates
              </h4>
              <p className="max-w-[240px] text-paper-text/70 mb-4">
                Wilkem Edge Business Center, 1st Floor, Matasia, Ngong.
              </p>
              <p className="text-paper-text/70">
                contact@nkm-advocates.co.ke
                <br />
                0707 329 013
              </p>
            </div>
            <div>
              <h4 className="font-mono text-[11px] tracking-[0.1em] uppercase text-brass-soft mb-3.5">
                Departments
              </h4>
              <ul className="list-none grid gap-2.5">
                {[
                  "Business &amp; SME Advisory",
                  "Real Estate",
                  "Debt Recovery",
                  "Mediation &amp; ADR",
                  "Intellectual Property",
                  "NGO Registration",
                  "Family Law",
                  "Data Protection",
                ].map((d) => (
                  <li key={d}>
                    <a
                      href="#departments"
                      className="hover:text-paper-text transition-colors"
                      dangerouslySetInnerHTML={{ __html: d }}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[11px] tracking-[0.1em] uppercase text-brass-soft mb-3.5">
                Firm
              </h4>
              <ul className="list-none grid gap-2.5">
                {["Who We Serve", "Insights", "Podcast", "Our Team", "Careers"].map((l) => (
                  <li key={l}>
                    <a
                      href={l === "Careers" ? "#" : "#" + l.toLowerCase().replace(/\s+/g, "")}
                      className="hover:text-paper-text transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[11px] tracking-[0.1em] uppercase text-brass-soft mb-3.5">
                Quick Links
              </h4>
              <ul className="list-none grid gap-2.5">
                {["Privacy Policy", "Disclaimer", "FAQ"].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-paper-text transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[11px] tracking-[0.1em] uppercase text-brass-soft mb-3.5">
                Subscribe to Insights
              </h4>
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent border border-line-dark text-paper-text px-3 py-2.5 font-sans text-[13px] placeholder:text-paper-text/50 rounded mb-2 focus:outline-none focus:border-brass"
              />
              <a
                href="#"
                className="font-mono text-[13px] tracking-wide bg-clay text-paper-text px-[22px] py-[14px] border border-clay transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(138,60,41,0.28)] block text-center mt-1"
              >
                Subscribe
              </a>
            </div>
          </div>
          <div className="border-t border-line-dark py-[22px] flex flex-wrap justify-between gap-2.5 text-[11px] font-mono tracking-wide text-paper-text/70">
            <span className="flex flex-wrap gap-x-4 gap-y-1">
              <span>&copy; 2026 NKM Advocates</span>
              <span>Mon – Sat, 9am – 5pm · Wilkem Edge, Matasia</span>
            </span>
            <span className="flex gap-3.5">
              <a
                href="https://www.linkedin.com/in/nkm-a-9844b135"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brass-soft transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://www.facebook.com/NkmAdvocates"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brass-soft transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://x.com/NkmAdvocates"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brass-soft transition-colors"
              >
                X
              </a>
              <a
                href="https://tiktok.com/@nkmadvocates"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brass-soft transition-colors"
              >
                TikTok
              </a>
              <a
                href="https://instagram.com/nkmadvocates"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brass-soft transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com/nkmadvocates"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brass-soft transition-colors"
              >
                Pinterest
              </a>
              <a
                href="https://youtube.com/@nkmadvocates"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brass-soft transition-colors"
              >
                YouTube
              </a>
            </span>
          </div>
        </div>
      </footer>

      <AssistantWidget />
    </div>
  );
}
