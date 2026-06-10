import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" as const, hash: undefined },
  { label: "About", to: "/" as const, hash: "about" },
  { label: "Practice Areas", to: "/" as const, hash: "practice" },
  { label: "Leadership", to: "/" as const, hash: "leadership" },
  { label: "Contact", to: "/" as const, hash: "contact" },
];

const socialLinks = [
  { label: "X", href: "https://x.com/NkmAdvocates", icon: XIcon },
  { label: "LinkedIn", href: "https://ke.linkedin.com/in/nkm-a-9844b135", icon: LinkedinIcon },
  { label: "WhatsApp", href: "https://wa.me/254707329013", icon: WhatsAppIcon },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export { socialLinks };

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-lg"
          : "bg-navy/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wide text-white">
            NKM <span className="text-gold">ADVOCATES</span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash}
              className="text-sm font-medium tracking-wide text-white/80 transition-colors hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link
            to="/"
            hash="contact"
            className="inline-flex items-center gap-2 bg-gold text-navy-deep px-5 py-2.5 text-sm font-semibold tracking-wide hover:bg-gold-soft transition-colors shadow-sm"
          >
            Book Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-navy-deep border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link key={l.label} to={l.to} hash={l.hash} onClick={() => setOpen(false)} className="text-white/80 py-2 font-medium hover:text-gold transition-colors">
                {l.label}
              </Link>
            ))}
            <Link
              to="/"
              hash="contact"
              onClick={() => setOpen(false)}
              className="bg-gold text-navy-deep px-5 py-3 text-sm font-semibold text-center mt-2"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-white/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-display text-2xl tracking-wide text-white">
              NKM <span className="text-gold">ADVOCATES</span>
            </div>
            <p className="mt-4 text-sm text-white/60 max-w-md leading-relaxed">
              Premier legal counsel, corporate governance, and advisory services for corporates, SMEs, and individuals across Kenya.
            </p>
            <div className="mt-6 flex items-center gap-4">
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
          <div>
            <div className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Navigate</div>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} hash={l.hash} className="hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Contact</div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://wa.me/254707329013" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors flex items-center gap-2">
                  <WhatsAppIcon className="w-4 h-4" /> +254 707 329 013
                </a>
              </li>
              <li>
                <a href="mailto:nkionga@gmail.com" className="hover:text-gold transition-colors">nkionga@gmail.com</a>
              </li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 justify-between text-xs text-white/50">
          <div>© {new Date().getFullYear()} NKM Advocates. All rights reserved.</div>
          <div>NKM Advocates is a legal practice registered under the Advocates Act (Kenya).</div>
        </div>
      </div>
    </footer>
  );
}
