import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowRight } from "lucide-react";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nkm-a-9844b135" },
  { label: "X", href: "https://x.com/NkmAdvocates" },
  { label: "TikTok", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "YouTube", href: "#" },
];

const navLinks = [
  { label: "Home", to: "/" as const, hash: undefined },
  { label: "About", to: "/", hash: "about" as const },
  { label: "Departments", to: "/", hash: "departments" as const },
  { label: "Who We Serve", to: "/", hash: "serve" as const },
  { label: "Insights", to: "/", hash: "insights" as const },
  { label: "Podcast", to: "/", hash: "podcast" as const },
  { label: "Team", to: "/", hash: "team" as const },
  { label: "Contact", to: "/", hash: "contact" as const },
];

export { socialLinks };

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-[#0B1A1B] shadow-lg" : "bg-gradient-to-b from-[#0B1A1B]/60 to-transparent"
        }`}
      >
        <div className="max-w-[1180px] mx-auto px-7 flex items-center justify-between h-[70px] md:h-[60px]">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-serif font-bold text-[19px] text-[#F2EEE1] tracking-wide">
              NKM ADVOCATES
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-[#D9B97A] mt-[3px]">
              ADVOCATES & CONSULTANTS
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                hash={l.hash}
                className="text-[14px] text-[#C9C2AE] font-medium px-3 py-2 hover:text-[#F2EEE1] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:0707329013"
              className="hidden md:inline-flex items-center gap-2 bg-[#8A3C29] text-[#F2EEE1] border border-[#8A3C29] px-[18px] py-2.5 text-[13px] font-mono tracking-wide hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              Book Consultation
            </a>
            <button
              className="lg:hidden text-[#F2EEE1]"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden bg-[#0B1A1B] border-t border-[#23393B]">
            <div className="px-7 py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  hash={l.hash}
                  onClick={() => setOpen(false)}
                  className="text-[#C9C2AE] py-2 font-medium hover:text-[#F2EEE1] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="tel:0707329013"
                className="bg-[#8A3C29] text-[#F2EEE1] px-5 py-3 text-[13px] font-mono text-center mt-2 inline-flex items-center justify-center gap-2"
              >
                Book Consultation <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#0B1A1B] text-[#C9C2AE] pt-[60px] border-t border-[#23393B] text-[13.5px]">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-9 pb-[46px]">
          <div className="lg:col-span-1">
            <h4 className="font-mono text-[11px] tracking-[0.1em] text-[#D9B97A] uppercase mb-[14px]">NKM Advocates</h4>
            <p className="text-[#9aa39d] max-w-[240px] mb-4">Wilkem Edge Business Center, 1st Floor, Matasia, Ngong.</p>
            <p className="text-[#9aa39d] mb-0">contact@nkm-advocates.co.ke<br />0707 329 013</p>
          </div>
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.1em] text-[#D9B97A] uppercase mb-[14px]">Departments</h4>
            <ul className="grid gap-[9px]">
              <li><a href="#departments" className="hover:text-[#F2EEE1]">Business & SME Advisory</a></li>
              <li><a href="#departments" className="hover:text-[#F2EEE1]">Real Estate</a></li>
              <li><a href="#departments" className="hover:text-[#F2EEE1]">Debt Recovery</a></li>
              <li><a href="#departments" className="hover:text-[#F2EEE1]">Mediation & ADR</a></li>
              <li><a href="#departments" className="hover:text-[#F2EEE1]">Intellectual Property</a></li>
              <li><a href="#departments" className="hover:text-[#F2EEE1]">NGO Registration</a></li>
              <li><a href="#departments" className="hover:text-[#F2EEE1]">Family Law</a></li>
              <li><a href="#departments" className="hover:text-[#F2EEE1]">Data Protection</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.1em] text-[#D9B97A] uppercase mb-[14px]">Firm</h4>
            <ul className="grid gap-[9px]">
              <li><a href="#serve" className="hover:text-[#F2EEE1]">Who We Serve</a></li>
              <li><a href="#insights" className="hover:text-[#F2EEE1]">Insights</a></li>
              <li><a href="#podcast" className="hover:text-[#F2EEE1]">Podcast</a></li>
              <li><a href="#team" className="hover:text-[#F2EEE1]">Our Team</a></li>
              <li><a href="#" className="hover:text-[#F2EEE1]">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.1em] text-[#D9B97A] uppercase mb-[14px]">Quick Links</h4>
            <ul className="grid gap-[9px]">
              <li><a href="#" className="hover:text-[#F2EEE1]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#F2EEE1]">Disclaimer</a></li>
              <li><a href="#" className="hover:text-[#F2EEE1]">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.1em] text-[#D9B97A] uppercase mb-[14px]">Subscribe to Insights</h4>
            <input type="email" placeholder="Email address" className="w-full bg-transparent border border-[#23393B] text-[#F2EEE1] px-3 py-[10px] text-[13px] rounded-sm block mb-2 focus:outline-none focus:border-[#B6883F]" />
            <a href="#" className="inline-flex items-center justify-center gap-2 bg-[#8A3C29] text-[#F2EEE1] border border-[#8A3C29] px-5 py-2.5 text-[13px] font-mono tracking-wide w-full text-center">Subscribe</a>
          </div>
        </div>
        <div className="py-[18px] border-t border-[#23393B] flex flex-col sm:flex-row justify-between gap-2 text-[11px] font-mono tracking-wide text-[#6E7A75]">
          <span>© {new Date().getFullYear()} NKM Advocates</span>
          <span>Mon – Sat, 9am – 5pm · Wilkem Edge, Matasia</span>
          <span className="flex gap-[14px]">
            {socialLinks.slice(0, 6).map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-[#D9B97A] transition-colors">{s.label}</a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
