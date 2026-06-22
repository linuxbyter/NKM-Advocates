import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitLead } from "@/lib/leads.functions";
import { AssistantWidget } from "@/components/AssistantWidget";
import { Loader2 } from "lucide-react";
import leaderPhoto from "@/assets/leader-photo.jpg";
import "../nkm-mockup.css";

export const Route = createFileRoute("/")({ component: Index });

function useReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useReveal();

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
      toast.error("Could not send. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="topbar">
        <div className="wrap">
          <span>Mon – Sat, 9am – 5pm · Wilkem Edge, Matasia</span>
          <span className="socials">
            <a href="https://ke.linkedin.com/in/nkm-a-9844b135" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://x.com/NkmAdvocates" target="_blank" rel="noopener noreferrer">X</a>
            <a href="#">TikTok</a>
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">YouTube</a>
          </span>
        </div>
      </div>

      <header className={"site-header" + (scrolled ? " scrolled" : "")} id="siteHeader">
        <div className="nav-row">
          <div className="logo">
            <span className="name">NKM ADVOCATES</span>
            <span className="tag">ADVOCATES &amp; CONSULTANTS</span>
          </div>
          <nav className="main-nav nav-links-hide">
            <ul>
              <li className="has-drop">
                <a href="#departments">Departments</a>
                <div className="dropdown">
                  <a href="#departments"><span className="d-code">SME · 01</span><br/><span className="d-name">Business &amp; SME Advisory</span></a>
                  <a href="#departments"><span className="d-code">RE · 02</span><br/><span className="d-name">Real Estate</span></a>
                  <a href="#departments"><span className="d-code">DR · 03</span><br/><span className="d-name">Debt Recovery &amp; Small Claims</span></a>
                  <a href="#departments"><span className="d-code">ADR · 04</span><br/><span className="d-name">Mediation &amp; ADR</span></a>
                  <a href="#departments"><span className="d-code">IP · 05</span><br/><span className="d-name">Intellectual Property</span></a>
                  <a href="#departments"><span className="d-code">NGO · 06</span><br/><span className="d-name">NGO &amp; Non-Profit Registration</span></a>
                  <a href="#departments"><span className="d-code">FAM · 07</span><br/><span className="d-name">Family Law</span></a>
                  <a href="#departments"><span className="d-code">DP · 08</span><br/><span className="d-name">Data Protection</span></a>
                </div>
              </li>
              <li><a href="#serve">Who We Serve</a></li>
              <li><a href="#insights">Insights</a></li>
              <li><a href="#podcast">Podcast</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <a href="#contact" className="btn btn-primary" style={{padding: "11px 18px"}}>Book Consultation</a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-bg">
          <svg viewBox="0 0 1400 800" preserveAspectRatio="xMidYMax slice">
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1B3437"/>
                <stop offset="100%" stopColor="#0B1A1B"/>
              </linearGradient>
            </defs>
            <rect width="1400" height="800" fill="url(#sky)"/>
            <g fill="#0B1A1B" opacity="0.92">
              <rect x="40" y="520" width="70" height="280"/>
              <rect x="130" y="460" width="50" height="340"/>
              <rect x="200" y="560" width="90" height="240"/>
              <rect x="310" y="420" width="60" height="380"/>
              <rect x="390" y="500" width="100" height="300"/>
              <rect x="510" y="380" width="46" height="420"/>
              <rect x="575" y="470" width="120" height="330"/>
              <rect x="715" y="430" width="58" height="370"/>
              <rect x="790" y="510" width="95" height="290"/>
              <rect x="905" y="450" width="50" height="350"/>
              <rect x="970" y="540" width="110" height="260"/>
              <rect x="1095" y="400" width="64" height="400"/>
              <rect x="1175" y="490" width="90" height="310"/>
              <rect x="1280" y="455" width="55" height="345"/>
            </g>
            <g stroke="#B6883F" strokeWidth={1} opacity="0.35">
              <line x1="0" y1="800" x2="1400" y2="800"/>
            </g>
          </svg>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="eyebrow on-dark">Kenya · Diaspora · Cross-Border</span>
          <h1>Structuring your business. Protecting your family. <em>Wherever you are.</em></h1>
          <p>A Kenyan commercial and family law firm built for entrepreneurs, SMEs, foreign investors, and Kenyans living abroad — with a bench of advocates and consultants, not a single point of contact.</p>
          <div className="btn-row">
            <a href="#contact" className="btn btn-primary">Book a Consultation</a>
           melon <a href="#departments" className="btn btn-ghost">View Departments</a>
          </div>
          <p className="hero-note">Available entirely online — visit  ...
