import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Scale, Phone, Mail, MapPin, ArrowRight, CheckCircle2, Camera, Linkedin, Loader2,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { AssistantWidget } from "@/components/AssistantWidget";
import { practiceAreas } from "@/lib/practice-areas";
import { submitLead } from "@/lib/leads.functions";
import leaderPhoto from "@/assets/leader-photo.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NKM Advocates — Defending Your Rights. Securing Your Future." },
      { name: "description", content: "Premier legal counsel, corporate governance, and advisory services. Trusted by corporates, SMEs, and individuals across Kenya." },
      { property: "og:title", content: "NKM Advocates — Premier Legal Counsel" },
      { property: "og:description", content: "Strategic corporate governance and advisory services tailored to align legal expertise with business strategy." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader transparentTop />

      {/* HERO */}
      <section id="home" className="relative hero-pattern text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/40 to-navy-deep/90" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-40 pb-28 lg:pt-48 lg:pb-36">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="gold-divider" />
              <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">Advocates · Nairobi, Kenya</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-white">
              Defending Your Rights.<br />
              <span className="text-gold">Securing Your Future.</span>
            </h1>
            <p className="mt-7 text-lg lg:text-xl text-white/75 leading-relaxed max-w-2xl">
              NKM Advocates delivers premier legal counsel, strategic corporate governance, and robust advisory services tailored to align legal expertise with business strategy.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/" hash="contact" className="inline-flex items-center gap-2 bg-gold text-navy-deep px-7 py-4 text-sm font-semibold tracking-wide hover:bg-gold-soft transition-colors">
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/" hash="practice" className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-4 text-sm font-semibold tracking-wide hover:bg-white/10 transition-colors">
                Our Services
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl border-t border-white/15 pt-8">
              {[
                { k: "8+", v: "Years of Practice" },
                { k: "200+", v: "Clients Advised" },
                { k: "6", v: "Practice Areas" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-3xl text-gold">{s.k}</div>
                  <div className="text-xs text-white/60 mt-1 uppercase tracking-wider">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-4 border border-gold/40 -z-10 hidden lg:block" />
            <ImagePlaceholder label="Office photo — upload coming soon" ratio="aspect-[4/5]" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="gold-divider" />
              <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">About the Firm</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight">
              Uncompromising Integrity. <span className="text-gold">Proven Results.</span>
            </h2>
            <p className="mt-6 text-slate-ink leading-relaxed text-lg">
              At NKM Advocates, our team delivers reliable legal and company secretarial services to corporates, SMEs, and individuals. We bring a multifaceted approach to legal and corporate governance matters, focusing on collaborative problem-solving, policy development, and tailored, comprehensive legal solutions to meet diverse client needs.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Trusted counsel grounded in strategic business insight",
                "Tailored solutions for corporates, SMEs, and individuals",
                "Collaborative, ethics-first problem solving",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-slate-ink">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section id="practice" className="py-24 lg:py-32 bg-secondary">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="gold-divider" />
              <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">Practice Areas</span>
              <span className="gold-divider" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight">
              Comprehensive Legal Expertise
            </h2>
            <p className="mt-5 text-slate-ink text-lg">
              A full spectrum of services rooted in corporate insight and unwavering professional standards.
            </p>
          </div>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.slug}
                  to="/practice/$slug"
                  params={{ slug: p.slug }}
                  className="group bg-background border border-border p-8 transition-all duration-300 hover:border-gold hover:-translate-y-1 hover:shadow-xl block"
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-navy text-gold group-hover:bg-gold group-hover:text-navy transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="mt-6 font-display text-xl text-navy leading-snug">{p.title}</h3>
                  <p className="mt-3 text-slate-ink text-sm leading-relaxed">{p.short}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
                    Learn More <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="gold-divider" />
              <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">Leadership</span>
              <span className="gold-divider" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight">Our Leadership</h2>
          </div>
          <div className="mt-16 max-w-5xl mx-auto bg-navy text-white overflow-hidden grid md:grid-cols-5 shadow-2xl">
            <div className="md:col-span-2 relative bg-navy-deep">
              <img
                src={leaderPhoto.url}
                alt="NKM A., Managing Partner of NKM Advocates"
                className="w-full h-full object-cover aspect-[4/5] md:aspect-auto"
                loading="lazy"
              />
            </div>
            <div className="md:col-span-3 p-10 lg:p-12">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-5 h-5 text-gold" />
                <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">Managing Partner</span>
              </div>
              <h3 className="font-display text-4xl lg:text-5xl text-white">NKM A.</h3>
              <p className="mt-4 text-gold-soft text-sm leading-relaxed">
                Managing Partner · Advocate of the High Court of Kenya · Certified Public Secretary (CPS(K)) · Certified Mediator
              </p>
              <div className="my-6 h-px bg-white/15" />
              <p className="text-white/75 leading-relaxed">
                A Managing Partner with over eight years of experience, specializing in aligning legal expertise with business strategy. Her focus areas include corporate governance, data protection compliance under Kenya's Data Protection Act (2019), policy development, and mediation. She writes and speaks frequently on data protection, governance, and social causes including children's rights and education.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link to="/" hash="contact" className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide hover:gap-3 transition-all">
                  Schedule a Meeting <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://ke.linkedin.com/in/nkm-a-9844b135"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-gold text-sm font-semibold tracking-wide transition-colors"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 lg:py-32 bg-secondary">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="gold-divider" />
              <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">Get in Touch</span>
              <span className="gold-divider" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-navy leading-tight">
              Request a Confidential Consultation
            </h2>
            <p className="mt-5 text-slate-ink text-lg">
              Speak with our team about your matter. We respond to all enquiries within one business day.
            </p>
          </div>

          <div className="mt-16 grid lg:grid-cols-5 gap-10">
            <ContactForm />

            <aside className="lg:col-span-2 bg-navy text-white p-8 lg:p-10 shadow-md">
              <h3 className="font-display text-2xl text-white">Contact Details</h3>
              <p className="mt-2 text-white/65 text-sm">We're here to help. Reach us directly through any of the channels below.</p>
              <div className="mt-8 space-y-6">
                {[
                  { icon: Phone, label: "Phone", value: "+254 707 329 013" },
                  { icon: Mail, label: "Email", value: "nkionga@gmail.com" },
                  { icon: MapPin, label: "Office", value: "Nairobi, Kenya" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-11 h-11 flex items-center justify-center bg-gold text-navy-deep shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-gold-soft">{label}</div>
                      <div className="mt-1 text-white">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-white/15">
                <div className="text-xs uppercase tracking-wider text-gold-soft mb-2">Office Hours</div>
                <div className="text-sm text-white/80">Mon – Fri · 8:30 AM – 5:30 PM EAT</div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter />
      <AssistantWidget />
    </div>
  );
}

function ImagePlaceholder({
  label,
  ratio = "aspect-[4/5]",
  variant = "light",
}: {
  label: string;
  ratio?: string;
  variant?: "light" | "navy";
}) {
  const isNavy = variant === "navy";
  return (
    <div
      className={`w-full ${ratio} flex flex-col items-center justify-center gap-4 ${
        isNavy
          ? "bg-navy-deep border border-white/10"
          : "bg-secondary border border-dashed border-border"
      }`}
    >
      <div
        className={`w-16 h-16 flex items-center justify-center rounded-full ${
          isNavy ? "bg-white/5 text-gold" : "bg-background text-slate-ink"
        }`}
      >
        <Camera className="w-7 h-7" />
      </div>
      <div className={`text-xs font-semibold uppercase tracking-[0.2em] ${isNavy ? "text-gold-soft" : "text-muted-foreground"}`}>
        {label}
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
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
      toast.success("Enquiry sent. We'll be in touch within one business day.");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Could not send your enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="lg:col-span-3 bg-background p-8 lg:p-10 shadow-md border border-border">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full Name *" id="name" type="text" placeholder="Jane Wanjiru" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="Email Address *" id="email" type="email" placeholder="jane@example.com" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="Phone" id="phone" type="tel" placeholder="+254 700 000 000" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <div>
          <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-navy mb-2">
            Service Needed
          </label>
          <select
            id="service"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full bg-background border border-border px-4 py-3 text-sm text-slate-ink focus:outline-none focus:border-gold transition-colors"
          >
            <option value="">Select a practice area</option>
            {practiceAreas.map((p) => (
              <option key={p.slug} value={p.title}>{p.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-navy mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Briefly describe your matter..."
          className="w-full bg-background border border-border px-4 py-3 text-sm text-slate-ink focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex items-center gap-2 bg-navy text-white px-7 py-4 text-sm font-semibold tracking-wide hover:bg-navy-deep transition-colors disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
        Send Enquiry
      </button>
    </form>
  );
}

function Field({
  label, id, type, placeholder, value, onChange,
}: { label: string; id: string; type: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-navy mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-background border border-border px-4 py-3 text-sm text-slate-ink focus:outline-none focus:border-gold transition-colors"
      />
    </div>
  );
}
