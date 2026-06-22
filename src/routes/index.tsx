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
            <a href="#contact"className="btn btn-primary">Book a Consultation</a>
            <a href="#departments" className="btn btn-ghost">View Departments</a>
          </div>
          <p className="hero-note">Available entirely online — visit our office only if you'd prefer to.</p>
        </div>
      </section>

      <div className="explore">
        <div className="wrap">
          <a href="#departments">Departments</a>
          <a href="#serve">Who We Serve</a>
          <a href="#insights">Insights</a>
          <a href="#podcast">Podcast</a>
          <a href="#team">Our Team</a>
        </div>
      </div>

      <section className="section">
        <div className="wrap about-teaser">
          <div>
            <span className="eyebrow">Why Clients Choose Nkm</span>
            <h2 style={{marginTop:"14px"}}>Distance shouldn't mean disadvantage.</h2>
          </div>
          <div>
            <p>Whether you're growing a business in Nairobi or protecting family land while based abroad, the risk is the same: things move faster than you can follow. We close that gap with specialist departments, advisory-first judgment, and direct, time-zone-aware communication.</p>
            <a href="#" className="read-more">More About Us</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Working With Us</span>
              <h2>The same service, whether you visit or not.</h2>
            </div>
            <p className="note">Every department can be engaged entirely online.</p>
          </div>
          <div className="process-grid">
            <div className="process-step reveal"><span className="num">01</span><h3>Book a Consultation</h3><p>By phone, WhatsApp, or scheduled video call — no office visit required.</p></div>
            <div className="process-step reveal"><span className="num">02</span><h3>Share Documents Directly</h3><p>Send identification, contracts, or title documents via WhatsApp or your dedicated case email — no portal login required.</p></div>
            <div className="process-step reveal"><span className="num">03</span><h3>We Handle the Matter</h3><p>Your case goes to the right department, with updates as it progresses.</p></div>
            <div className="process-step reveal"><span className="num">04</span><h3>Sign &amp; Pay</h3><p>Print, sign, and scan documents back over WhatsApp, then settle fees by bank transfer or M-Pesa — wherever you are.</p></div>
          </div>
        </div>
      </section>

      <section className="section" id="departments" style={{background:"var(--card)"}}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">How We're Organized</span>
              <h2>One firm, eight departments.</h2>
            </div>
            <p className="note">Each matter is filed to the department built for it.</p>
          </div>
          <div className="carousel-wrap">
            <div className="carousel-track" ref={trackRef}>
              <div className="dept-card"><span className="code">FILE NO. SME-01</span><h3>Business &amp; SME Advisory</h3><p>Formation, contracts, compliance and tax structuring for founders and growing businesses.</p><span className="read-more">View Department</span></div>
              <div className="dept-card"><span className="code">FILE NO. RE-02</span><h3>Real Estate</h3><p>Title verification, leases, and protection against fraudulent land transactions.</p><span className="read-more">View Department</span></div>
              <div className="dept-card"><span className="code">FILE NO. DR-03</span><h3>Debt Recovery &amp; Small Claims</h3><p>Structured collections for unpaid invoices and small claims representation.</p><span className="read-more">View Department</span></div>
              <div className="dept-card"><span className="code">FILE NO. ADR-04</span><h3>Mediation, Arbitration &amp; ADR</h3><p>Out-of-court resolution for commercial and family disputes.</p><span className="read-more">View Department</span></div>
              <div className="dept-card"><span className="code">FILE NO. IP-05</span><h3>Intellectual Property</h3><p>Trademark, copyright, and brand protection for growing businesses.</p><span className="read-more">View Department</span></div>
              <div className="dept-card"><span className="code">FILE NO. NGO-06</span><h3>NGO &amp; Non-Profit Registration</h3><p>Registration and compliance for nonprofits and diaspora-funded initiatives.</p><span className="read-more">View Department</span></div>
              <div className="dept-card"><span className="code">FILE NO. FAM-07</span><h3>Family Law</h3><p>Succession, custody, and power of attorney — with experience supporting clients abroad.</p><span className="read-more">View Department</span></div>
              <div className="dept-card"><span className="code">FILE NO. DP-08</span><h3>Data Protection</h3><p>Privacy compliance and data governance built into how you operate.</p><span className="read-more">View Department</span></div>
            </div>
            <div className="carousel-controls">
              <span className="count">1 / 8</span>
              <button className="cbtn" onClick={() => scrollCarousel(-1)} aria-label="Previous department">←</button>
              <button className="cbtn" onClick={() => scrollCarousel(1)} aria-label="Next department">→</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="serve">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Our Reach</span>
              <h2>Who we serve.</h2>
            </div>
            <p className="note">One Kenyan office. Three audiences we know well.</p>
          </div>
          <div className="serve-grid">
            <div className="serve-card reveal">
              <div className="content">
                <span className="eyebrow on-dark">Kenya</span>
                <h3>SMEs &amp; Individuals</h3>
                <p>Company formation, contracts, compliance, and dispute resolution for Kenyan businesses and families — in person or entirely online.</p>
                <a href="#" className="read-more">Learn More</a>
              </div>
            </div>
            <div className="serve-card reveal">
              <div className="content">
                <span className="eyebrow on-dark">The Diaspora</span>
                <h3>UK · US · Gulf</h3>
                <p>Land verification, succession, and power of attorney handled on the ground while you're abroad.</p>
                <a href="#" className="read-more">Diaspora Services</a>
              </div>
            </div>
            <div className="serve-card reveal">
              <div className="content">
                <span className="eyebrow on-dark">Investors</span>
                <h3>Entering Kenya</h3>
                <p>Registration, compliance, and contracts for businesses and investors entering the Kenyan market.</p>
                <a href="#" className="read-more">Invest in Kenya</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="insights" style={{background:"var(--card)"}}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">From the Firm</span>
              <h2>Insights.</h2>
            </div>
            <a href="#" className="read-more">View All</a>
          </div>
          <div className="insights-grid">
            <div className="insight-card reveal">
              <span className="tag">Real Estate · Diaspora</span>
              <h4>Buying Land in Kenya From Overseas: A Pre-Purchase Checklist</h4>
              <span className="date">May 2026</span>
              <span className="sample-flag">Sample — not yet published</span>
            </div>
            <div className="insight-card reveal">
              <span className="tag">SME Advisory</span>
              <h4>Five Contract Clauses Every Kenyan SME Forgets</h4>
              <span className="date">Apr 2026</span>
              <span className="sample-flag">Sample — not yet published</span>
            </div>
            <div className="insight-card reveal">
              <span className="tag">Family Law · Diaspora</span>
              <h4>Power of Attorney From Abroad: What Actually Works in Kenya</h4>
              <span className="date">Mar 2026</span>
              <span className="sample-flag">Sample — not yet published</span>
            </div>
            <div className="insight-card reveal">
              <span className="tag">Debt Recovery</span>
              <h4>Chasing an Unpaid Invoice in Kenya: Demand Letter to Small Claims, Explained</h4>
              <span className="date">Feb 2026</span>
              <span className="sample-flag">Sample — not yet published</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section podcast-section" id="podcast">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow on-dark">On Air</span>
              <h2 style={{color:"var(--paper-text)"}}>The NKM Podcast.</h2>
            </div>
            <a href="#" className="read-more" style={{color:"var(--brass-soft)"}}>All Episodes</a>
          </div>
          <p className="lead">Plain-English conversations on Kenyan business law, diaspora property risk, and what SMEs get wrong before it costs them. New episodes monthly.</p>
          <div className="episode-grid">
            <div className="episode-card reveal"><span className="ep">EP. 01</span><h4>Buying Land in Kenya When You Live Abroad</h4><span className="sample-flag">Sample — not yet recorded</span></div>
            <div className="episode-card reveal"><span className="ep">EP. 02</span><h4>Five Mistakes SMEs Make Before Their First Contract</h4><span className="sample-flag">Sample — not yet recorded</span></div>
            <div className="episode-card reveal"><span className="ep">EP. 03</span><h4>What Actually Counts as a Small Claim in Kenya</h4><span className="sample-flag">Sample — not yet recorded</span></div>
          </div>
          <div className="platform-row"><span className="lbl">Listen on:</span><span>Spotify</span><span>·</span><span>Apple Podcasts</span><span>·</span><span>YouTube</span></div>
        </div>
      </section>

      <section className="section" id="team">
        <div className="wrap team-teaser">
          <div>
            <div className="avatar-row">
              <div className="av">A</div>
              <div className="av">·</div>
              <div className="av">·</div>
              <div className="av">RW</div>
              <div className="av">HM</div>
            </div>
            <span className="eyebrow">The Bench</span>
            <h2 style={{marginTop:"14px"}}>A team, not a single practitioner.</h2>
          </div>
          <div>
            <p>NKM operates across partners, associate advocates, and consulting counsel — each attached to a named department, so your matter is never dependent on one person's availability. Full bios, practising certificate status, and department leads are on the Team page.</p>
            <a href="#" className="read-more">Meet the Full Team</a>
          </div>
        </div>
      </section>

      <section className="final-cta" id="contact">
        <div className="wrap">
          <svg className="seal-sm" viewBox="0 0 200 200" aria-hidden="true" style={{display:"block",margin:"0 auto 22px",width:64}}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#B6883F" strokeWidth={2}/>
            <text x="100" y="112" textAnchor="middle" fontFamily="Fraunces, serif" fontSize={46} fontWeight={700} fill="#D9B97A">N</text>
          </svg>
          <h2>Start with a conversation, not a commitment.</h2>
          <p>Book a free, no-obligation consultation. We'll tell you honestly whether litigation, mediation, or simple advisory is the right path — and which department should handle it.</p>
          <div className="btn-row">
            <a href="tel:0707329013" className="btn btn-primary">Book a Consultation</a>
            <a href="#" className="btn btn-ghost">WhatsApp Us</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrap">
          <div className="foot-top">
            <div>
              <h4>NKM Advocates</h4>
              <p style={{maxWidth:240,color:"#9aa39d",margin:"0 0 16px"}}>Wilkem Edge Business Center, 1st Floor, Matasia, Ngong.</p>
              <p style={{color:"#9aa39d",margin:0}}>contact@nkm-advocates.co.ke<br/>0707 329 013</p>
            </div>
            <div>
              <h4>Departments</h4>
              <ul>
                <li><a href="#departments">Business &amp; SME Advisory</a></li>
                <li><a href="#departments">Real Estate</a></li>
                <li><a href="#departments">Debt Recovery</a></li>
                <li><a href="#departments">Mediation &amp; ADR</a></li>
                <li><a href="#departments">Intellectual Property</a></li>
                <li><a href="#departments">NGO Registration</a></li>
                <li><a href="#departments">Family Law</a></li>
                <li><a href="#departments">Data Protection</a></li>
              </ul>
            </div>
            <div>
              <h4>Firm</h4>
              <ul>
                <li><a href="#serve">Who We Serve</a></li>
                <li><a href="#insights">Insights</a></li>
                <li><a href="#podcast">Podcast</a></li>
                <li><a href="#team">Our Team</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Disclaimer</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div className="newsletter">
              <h4>Subscribe to Insights</h4>
              <input type="email" placeholder="Email address"/>
              <a href="#" className="btn btn-primary">Subscribe</a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>&copy; 2026 NKM Advocates. All rights reserved.</span>
            <span className="foot-social"><a href="#">LinkedIn</a><a href="#">X</a><a href="#">TikTok</a><a href="#">Instagram</a><a href="#">Pinterest</a><a href="#">YouTube</a></span>
          </div>
        </div>
      </footer>

      <AssistantWidget />
    </div>
  );
}
