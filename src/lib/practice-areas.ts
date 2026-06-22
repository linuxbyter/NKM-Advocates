import { Building2, Home, Briefcase, Handshake, Shield, HeartHandshake, type LucideIcon, type PracticeArea } from "lucide-react";

export type PracticeArea = {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  tagline: string;
  overview: string;
  scope: string[];
  whoWeServe: string[];
  faqs: { q: string; a: string }[];
};

export const practiceAreas: PracticeArea[] = [
  // Corporate Governance & Company Secretarial
  {
    slug: "corporate-governance",
    icon: Building2,
    title: "Corporate Governance & Company Secretarial",
    short: "Strategic compliance, board advisory, and business formation for corporates and SMEs.",
    tagline: "Boards that operate with clarity, accountability, and confidence.",
    overview: "We help boards, founders, and senior management discharge their statutory and fiduciary duties under Kenyan law. From entity formation to annual compliance and board effectiveness, we design governance frameworks that reduce risk and unlock decisive action.",
    scope: [
      "Company incorporation, conversions, and restructuring",
      "Company secretarial services and statutory filings",
      "Board charters, policies, and committee terms of reference",
      "Shareholder agreements and resolutions",
      "Annual general meeting facilitation and minutes",
      "Compliance audits under the Companies Act (Kenya)",
    ],
    whoWeServe: ["Listed and private companies", "SMEs and family businesses", "Non-profits and trusts"],
    faqs: [
      { q: "Do you act as company secretary?", a: "Yes — our Managing Partner is a Certified Public Secretary (CPS(K)) and we provide a full company secretarial retainer." },
      { q: "How long does incorporation take?", a: "Most private limited companies are incorporated within 5–10 business days, subject to BRS turnaround." },
    ],
  },
  // Property & Real Estate Law
  {
    slug: "property-real-estate",
    icon: Home,
    title: "Property & Real Estate Law",
    short: "Conveyancing, leasing, property transfers, and due diligence.",
    tagline: "Move with certainty on every property transaction.",
    overview: "We manage the full life-cycle of real estate transactions — title verification, sale agreements, transfers, leases, and post-completion compliance — protecting buyers, sellers, landlords, and tenants at every step.",
    scope: [
      "Conveyancing and title transfers",
      "Title due diligence and search reports",
      "Commercial and residential leases",
      "Joint venture and development agreements",
      "Charge / mortgage documentation",
      "Stamp duty and land control board representation",
    ],
    whoWeServe: ["Individual buyers and sellers", "Developers and landlords", "Lenders"],
    faqs: [
      { q: "Can you handle off-plan purchases?", a: "Yes. We review the project structure, sale agreement, and security arrangements before any deposit is released." },
    ],
  },
  // Business & Startup Law
  {
    slug: "business-startup",
    icon: Briefcase,
    title: "Business & Startup Law",
    short: "Commercial contracts, regulatory advice, and legal consulting for growing enterprises.",
    tagline: "Legal foundations that scale with your business.",
    overview: "From the first founder agreement to fundraising and commercial expansion, we partner with startups and growth-stage businesses on the legal infrastructure that lets them move quickly without compromising governance.",
    scope: [
      "Founders' agreements and cap table structuring",
      "SAFE, convertible note, and equity round documentation",
      "Commercial and supplier contracts",
      "Employment contracts and ESOP design",
      "Data protection compliance (Data Protection Act, 2019)",
      "Sector-specific licensing and regulatory advice",
    ],
    whoWeServe: ["Founders and startups", "Investors and accelerators", "Scaling SMEs"],
    faqs: [
      { q: "Do you advise on the Data Protection Act?", a: "Yes — we help businesses register with the ODPC, build privacy notices and DPIAs, and respond to data subject requests." },
    ],
  },
  // Business & SME Advisory (new)
  {
    slug: "business-sme-advisory",
    icon: Handshake,
    title: "Business & SME Advisory",
    short: "Formation, contracts, compliance and tax structuring for founders and growing businesses.",
    tagline: "Empowering businesses with legal clarity.",
    overview: "We provide comprehensive legal support for SMEs and startups, covering company formation, contracts, compliance, and tax structuring.",
    scope: [
      "Company incorporation, conversions, and restructuring",
      "Contract drafting and review",
      "Tax structuring and advisory",
      "Compliance and regulatory guidance",
      "Dispute resolution and litigation support",
    ],
    whoWeServe: ["SMEs", "Startups", "Entrepreneurs", "Growing businesses"],
    faqs: [
      { q: "Do you handle company formation?", a: "Yes, we handle incorporation, conversions, and restructuring." },
      { q: "What services are included in the advisory package?", a: "Legal counsel, tax advice, compliance checks, and ongoing support." },
    ],
  },
  // Property & Real Estate Law (existing)
  {
    slug: "property-real-estate",
    icon: Home,
    title: "Property & Real Estate Law",
    short: "Conveyancing, leasing, property transfers, and due diligence.",
    tagline: "Move with certainty on every property transaction.",
    overview: "We manage the full life-cycle of real estate transactions — title verification, sale agreements, transfers, leases, and post-completion compliance — protecting buyers, sellers, landlords, and tenants at every step.",
    scope: [
      "Conveyancing and title transfers",
      "Title due diligence and search reports",
      "Commercial and residential leases",
      "Joint venture and development agreements",
      "Charge / mortgage documentation",
      "Stamp duty and land control board representation",
    ],
    whoWeServe: ["Individual buyers and sellers", "Developers and landlords", "Lenders"],
    faqs: [
      { q: "Can you handle off-plan purchases?", a: "Yes. We review the project structure, sale agreement, and security arrangements before any deposit is released." },
    ],
  },
  // Debt Recovery & Small Claims (new)
  {
    slug: "debt-recovery",
    icon: Shield,
    title: "Debt Recovery & Small Claims",
    short: "Structured collections for unpaid invoices and small claims representation.",
    tagline: "Recover what’s owed, efficiently.",
    overview: "We specialize in structured collections for unpaid invoices and small claims representation, providing a clear, step‑by‑step process.",
    scope: [
      "Demand letter drafting",
      "Small claims court representation",
      "Negotiation and settlement strategies",
      "Enforcement of judgments",
    ],
    whoWeServe: ["SMEs", "Freelancers", "Small business owners", "Individual creditors"],
    faqs: [
      { q: "What is the typical timeline for debt recovery?", a: "Most cases are resolved within 30–90 days." },
      { q: "Do you charge upfront fees?", a: "We work on a contingency or fixed‑fee basis, depending on the case." },
    ],
  },
  // Mediation, Arbitration & ADR (new)
  {
    slug: "mediation-adr",
    icon: Handshake,
    title: "Mediation, Arbitration & ADR",
    short: "Out-of-court resolution for commercial and family disputes.",
    tagline: "Peaceful solutions, lasting results.",
    overview: "We provide mediation, arbitration, and other ADR services to resolve commercial and family disputes efficiently and confidentially.",
    scope: [
      "Mediation session facilitation",
      "Arbitration panel selection and administration",
      "Mediation clause drafting",
      "Confidentiality agreements",
      "Post‑dispute follow‑up and implementation",
    ],
    whoWeServe: ["Corporate clients", "Families", "Partners in business disputes", "Individuals seeking alternatives to litigation"],
    faqs: [
      { q: "How long does mediation take?", a: "Typically 1–4 sessions over a few weeks." },
      { q: "Is mediation binding?", a: "Only when the parties agree to a settlement; otherwise it is non‑binding." },
    ],
  },
  // Intellectual Property (existing)
  {
    slug: "intellectual-property",
    icon: Shield,
    title: "Intellectual Property",
    short: "Trademark, copyright, and brand protection for growing businesses.",
    tagline: "Safeguard your brand and creations.",
    overview: "We protect intellectual property through trademark registration, copyright advice, and enforcement strategies for businesses and creators.",
    scope: [
      "Trademark registration and enforcement",
      "Copyright advice and registration support",
      "Brand protection and monitoring",
      "IP strategy and portfolio management",
      "Licensing and technology transfer agreements",
    ],
    whoWeServe: ["Startups", "Creative agencies", "Tech companies", "Brand owners"],
    faqs: [
      { q: "How long does trademark registration take?", a: "Typically 6–12 months from filing to registration." },
    ],
  },
  // NGO & Non-Profit Registration (new)
  {
    slug: "ngo-registration",
    icon: HeartHandshake,
    title: "NGO & Non-Profit Registration",
    short: "Registration and compliance for nonprofits and diaspora‑funded initiatives.",
    tagline: "Building impact with legal certainty.",
    overview: "We assist NGOs, charities, and diaspora‑funded projects with registration, governance, and ongoing compliance under Kenyan law.",
    scope: [
      "Incorporation and registration of NGOs",
      "Drafting of bylaws and mission statements",
      "Compliance with NGO regulations and reporting",
      "Guidance on foreign funding and donor agreements",
    ],
    whoWeServe: ["NGOs", "Community groups", "Diaspora‑funded initiatives", "Social enterprises"],
    faqs: [
      { q: "Can foreigners establish an NGO in Kenya?", a: "Yes, with a local sponsor or partner and proper registration." },
      { q: "What ongoing compliance is required?", a: "Annual reports, financial statements, and adherence to NGO Act requirements." },
    ],
  },
  // Family Law (new)
  {
    slug: "family-law",
    icon: HeartHandshake,
    title: "Family Law",
    short: "Succession, custody, and power of attorney — with experience supporting clients abroad.",
    tagline: "Protecting families, wherever they are.",
    overview: "We handle succession, custody, and power of attorney matters, offering experienced counsel for families both in Kenya and abroad.",
    scope: [
      "Succession and estate planning",
      "Child custody and vispection arrangements",
      "Power of attorney and guardianship documentation",
      "Prenuptial and postnuptial agreements",
      "Domestic violence restraining orders",
    ],
    whoWeServe: ["Families", "Diaspora Kenyans", "Individuals with cross‑border ties"],
    faqs: [
      { q: "Can a Kenyan lawyer handle inheritance for assets abroad?", a: "Yes, we coordinate with international counsel to ensure enforceability." },
      { q: "How are child custody arrangements determined?", a: "The court considers the best interests of the child, parental capability, and the child's wishes." },
    ],
  },
  // Data Protection (new)
  {
    slug: "data-protection",
    icon: Shield,
    title: "Data Protection",
    short: "Privacy compliance and data governance built into how you operate.",
    tagline: "Secure data, secure future.",
    overview: "We help organisations meet Kenya's Data Protection Act (2019) requirements, from policy creation to breach response.",
    scope: [
      "Data protection impact assessments (DPIAs)",
      "Privacy policy and notice drafting",
      "Data subject request handling",
      "Employee training and data governance frameworks",
      "Incident response and breach notification",
    ],
    whoWeServe: ["Corporates", "SMEs", "Healthcare providers", "FinTech firms"],
    faqs: [
      { q: "What are the penalties for non‑compliance?", a: "Fines up to KES 5 million and potential imprisonment." },
      { q: "Do we need a Data Protection Officer?", a: "Organizations processing personal data at scale should appoint a DPO." },
    ],
  },
];

export const getPracticeArea = (slug: string): PracticeArea | undefined => {
  return practiceAreas.find((area) => area.slug === slug);
};