# NKM Advocates — Website Repositioning Strategy & Sitemap

*From solo-advocate site to multi-disciplinary firm with two membership communities.*

---

## 1. The strategic shift

The current site reads as **one experienced advocate**. The new site must read as **a firm** — a multi-disciplinary team of lawyers, HR specialists, and tax experts — that businesses and diaspora Kenyans can *belong to*, not just hire.

This matters because the buying objection you identified is real: SMEs and corporates hesitate to give serious, cross-cutting matters (a dispute that touches tax, an HR exit that touches employment law and compliance) to a single person. A solo practitioner carries **key-person risk** — what happens when that one lawyer is on leave, conflicted out, or simply outside their depth? A team answers both objections at once. Every line of copy should therefore default to **"we," "our team," "the firm"** — never "I" or a single person as the centre of gravity.

### The honesty principle (important)

You are still building the bench. The site must reflect **who is actually engaged**, not who you hope to recruit. Listing lawyers and experts who are not yet committed creates two risks:

1. **Client trust** — a client asks to meet "the tax expert" who does not exist.
2. **Regulatory exposure** — the Advocates Act and the LSK treat misrepresentation of a firm's composition seriously.

**The chosen approach (per your decision):** Agnes is the one named principal. Every other role is shown as a **role-based capability card** — "Tax Advisory," "HR & Employment," "Corporate & Commercial" — describing the *function* the firm delivers, with an honest "growing team" framing. As real people join (as employees, consultants, or *of counsel*), they replace the cards. This is honest, legally safe, and *still reads as a firm with depth* rather than a one-person shop.

---

## 2. Audience & positioning

The site serves **two primary audiences** through **two membership communities**, plus standard one-off legal work.

| Audience | Their world | What they need | The club |
|---|---|---|---|
| **SMEs & corporates** | Running a business in Kenya; compliance, contracts, HR, tax, disputes | Ongoing, multi-disciplinary support without a crisis every time | **SME Club** |
| **Diaspora Kenyans** | Living abroad; assets, family, and obligations back home | A trusted firm to act on land, succession, family, investment, and compliance matters in Kenya | **Diaspora Club** |

**Both clubs are free to join; members pay for actual services.** So the clubs are not a subscription product — they are **lead-generation and community engines**. The value of membership is access, education, priority response, and trust — and the firm earns revenue when members instruct it on real matters.

### Positioning statement (internal — not website copy)

> NKM Advocates is a multi-disciplinary Kenyan law firm where businesses and diaspora families get law, HR, and tax under one roof — and where membership means you are never facing a legal problem alone.

---

## 3. What the clubs actually offer (so they are not empty promises)

A "club" must give members something concrete or it reads as a mailing list with a fancy name.

### SME Club (free membership)
- Plain-language legal, HR, and tax updates relevant to running a business in Kenya
- Priority response on enquiries (e.g. within one business day)
- Member rates on retainers, contract templates, and compliance packages
- Invitations to webinars and clinics (you already run these — Luma + M-Pesa infrastructure exists)
- A quarterly "compliance calendar" so members never miss statutory deadlines

### Diaspora Club (free membership)
- Guidance on land, succession, wills, family, and investment matters back home
- A vetted, accountable firm to act locally on the member's behalf
- Plain-language explainers (your *Legal Kenyan* / *Law Meets Now* content is the perfect feed here)
- Member rates on document drafting, due diligence, and representation
- Webinars timed for diaspora time zones

> **Note:** The clubs are where your existing content engine (The Legal Kenyan, the magazine, YouTube, webinars) becomes a firm asset rather than a side project. The website should connect them.

---

## 4. Recommended sitemap

```
HOME
│
├── ABOUT
│     ├── Who we are (the firm, not the person)
│     ├── Why a firm, not a freelancer  ← answers the trust objection
│     ├── Our values / how we work
│     └── Credentials & affiliations (LSK, CPS(K), Certified Mediator …)
│
├── PRACTICE AREAS  (keep existing 6 + add HR/Employment + Tax)
│     ├── Corporate Governance & Company Secretarial
│     ├── Property & Real Estate Law
│     ├── Business & Startup Law
│     ├── Mediation & Dispute Resolution
│     ├── Private Client Services (wills, succession, estates)
│     ├── Non-Profit & Advisory
│     ├── HR & Employment Law            ← NEW (supports the team story)
│     └── Tax Advisory & Compliance      ← NEW (supports the team story)
│
├── OUR TEAM
│     ├── Agnes Nyawira — Managing Partner (named, photo, full bio)
│     └── Capability cards: Corporate & Commercial · HR & Employment ·
│         Tax Advisory · Dispute Resolution · Conveyancing
│         (role-based now; replaced by named people as they join)
│
├── SME CLUB          ← primary nav, its own page + join form
│
├── DIASPORA CLUB     ← primary nav, its own page + join form
│
├── INSIGHTS          ← The Legal Kenyan hub: articles, magazine, videos
│
├── CONTACT
│     ├── Consultation form (with practice-area + audience selector)
│     ├── Physical address + embedded map (Matasia, Ngong)
│     └── Professional email + WhatsApp + phone
│
└── (Footer) Privacy Policy · Terms · Disclaimer
```

---

## 5. Priority fixes carried over from the audit

These remain true regardless of the repositioning and should be done in the build:

1. **Custom domain + professional email.** Move off `vercel.app` to `nkmadvocates.co.ke` (or `.com`); replace the Gmail address with `info@` / `agnes@` on that domain. This is the single biggest credibility lever.
2. **Real address + map.** Wilkem Edge Arcade, Matasia Shopping Centre, Ngong — a physical address is a core trust signal.
3. **Named principal + real photo.** Agnes Nyawira, Advocate of the High Court of Kenya — your name and face are the firm's strongest current asset. Remove all "upload coming soon" placeholders before launch.
4. **Privacy Policy & Terms.** Especially given the firm's own data-protection specialism under the DPA 2019 — their absence is conspicuous.
5. **Working contact form.** Ensure submissions actually deliver (Formspree, or a real backend) — many static forms fail silently.
6. **Social proof.** Add testimonials / anonymised outcomes / recognitions as they become available.
7. **Resolve the tagline mismatch.** "Defending Your Rights / Securing Your Future" reads litigation-and-solo; replace with firm-and-membership language.

---

## 6. Homepage section order (the build)

1. **Hero** — firm + dual audience + membership idea. CTA: "Join the SME Club" / "Join the Diaspora Club" + "Book a consultation."
2. **Trust strip** — credentials/affiliations + honest stats.
3. **Why a firm, not a freelancer** — the trust-objection answer; introduces law + HR + tax under one roof.
4. **Practice areas** — the eight areas as a clean grid.
5. **The two clubs** — side-by-side, each with its own value proposition and join CTA.
6. **Our team** — Agnes named; capability cards for the rest, framed as a growing team.
7. **Insights** — pull from The Legal Kenyan / the magazine.
8. **Consultation / contact** — form + real address + map + professional channels.

---

## 7. Phased rollout (so nothing on the live site is fiction)

- **Phase 1 (now):** Repositioned copy, two club pages with join forms, Agnes named + capability cards, professional email + domain, address + map, privacy/terms.
- **Phase 2 (as bench fills):** Replace capability cards with named lawyers/experts; add their bios and photos.
- **Phase 3:** Add testimonials, case outcomes, recognitions; expand Insights into a full content hub; consider a members' area / login if club value grows.

---

*Prepared for Agnes Nyawira, NKM Advocates. Next deliverable: homepage visual mockup reflecting this structure.*
