import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Scale, Phone, Mail, MapPin, ArrowRight, CheckCircle2, Camera, Loader2, X,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { SiteHeader, SiteFooter, socialLinks } from "@/components/SiteHeader";
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Index() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

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
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  LinkedIn Profile
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
            <ContactForm onSuccess={() => setShowSuccessModal(true)} />

            <aside className="lg:col-span-2 bg-navy text-white p-8 lg:p-10 shadow-md">
              <h3 className="font-display text-2xl text-white">Contact Details</h3>
              <p className="mt-2 text-white/65 text-sm">We're here to help. Reach us directly through any of the channels below.</p>
              <div className="mt-8 space-y-6">
                <a href="https://wa.me/254707329013" target="_blank" rel="noopener noreferrer" className="flex gap-4 group">
                  <div className="w-11 h-11 flex items-center justify-center bg-gold text-navy-deep shrink-0 group-hover:bg-gold-soft transition-colors">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gold-soft">WhatsApp</div>
                    <div className="mt-1 text-white group-hover:text-gold transition-colors">+254 707 329 013</div>
                  </div>
                </a>
                <a href="tel:+254707329013" className="flex gap-4 group">
                  <div className="w-11 h-11 flex items-center justify-center bg-gold text-navy-deep shrink-0 group-hover:bg-gold-soft transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gold-soft">Phone</div>
                    <div className="mt-1 text-white group-hover:text-gold transition-colors">+254 707 329 013</div>
                  </div>
                </a>
                <a href="mailto:nkionga@gmail.com" className="flex gap-4 group">
                  <div className="w-11 h-11 flex items-center justify-center bg-gold text-navy-deep shrink-0 group-hover:bg-gold-soft transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gold-soft">Email</div>
                    <div className="mt-1 text-white group-hover:text-gold transition-colors">nkionga@gmail.com</div>
                  </div>
                </a>
                <div className="flex gap-4">
                  <div className="w-11 h-11 flex items-center justify-center bg-gold text-navy-deep shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gold-soft">Office</div>
                    <div className="mt-1 text-white">Nairobi, Kenya</div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/15">
                <div className="text-xs uppercase tracking-wider text-gold-soft mb-3">Follow Us</div>
                <div className="flex items-center gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 flex items-center justify-center bg-white/10 text-white/70 hover:bg-gold hover:text-navy-deep transition-colors"
                    >
                      <s.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/15">
                <div className="text-xs uppercase tracking-wider text-gold-soft mb-2">Office Hours</div>
                <div className="text-sm text-white/80">Mon – Fri · 8:30 AM – 5:30 PM EAT</div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter />
      <AssistantWidget />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-background border border-border shadow-2xl max-w-md w-full p-8 text-center relative">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-gold/10 rounded-full">
              <CheckCircle2 className="w-10 h-10 text-gold" />
            </div>
            <h3 className="mt-5 font-display text-2xl text-navy">Enquiry Sent Successfully</h3>
            <p className="mt-3 text-slate-ink leading-relaxed">
              Thank you for reaching out to NKM Advocates. Your enquiry has been received and our team will get back to you within one business day.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-6 bg-navy text-white px-6 py-3 text-sm font-semibold tracking-wide hover:bg-navy-deep transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
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

function ContactForm({ onSuccess }: { onSuccess: () => void }) {
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
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      onSuccess();
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
