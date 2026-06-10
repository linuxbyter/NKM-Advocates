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

export function SiteHeader({ transparentTop = false }: { transparentTop?: boolean }) {
  const [scrolled, setScrolled] = useState(!transparentTop);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!transparentTop) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentTop]);

  const solid = scrolled || !transparentTop;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        solid ? "bg-background/95 backdrop-blur border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className={`font-display text-2xl tracking-wide ${solid ? "text-navy" : "text-white"}`}>
            NKM <span className="text-gold">ADVOCATES</span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                solid ? "text-slate-ink" : "text-white/85"
              }`}
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
          className={`lg:hidden ${solid ? "text-navy" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link key={l.label} to={l.to} hash={l.hash} onClick={() => setOpen(false)} className="text-slate-ink py-2 font-medium">
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
              <li>nkionga@gmail.com</li>
              <li>+254 707 329 013</li>
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