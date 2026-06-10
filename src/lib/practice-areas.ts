import {
  Building2,
  Home,
  Briefcase,
  Handshake,
  Shield,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

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
  {
    slug: "corporate-governance",
    icon: Building2,
    title: "Corporate Governance & Company Secretarial",
    short:
      "Strategic compliance, board advisory, and business formation for corporates and SMEs.",
    tagline: "Boards that operate with clarity, accountability, and confidence.",
    overview:
      "We help boards, founders, and senior management discharge their statutory and fiduciary duties under Kenyan law. From entity formation to annual compliance and board effectiveness, we design governance frameworks that reduce risk and unlock decisive action.",
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
      {
        q: "Do you act as company secretary?",
        a: "Yes — our Managing Partner is a Certified Public Secretary (CPS(K)) and we provide a full company secretarial retainer.",
      },
      {
        q: "How long does incorporation take?",
        a: "Most private limited companies are incorporated within 5–10 business days, subject to BRS turnaround.",
      },
    ],
  },
  {
    slug: "property-real-estate",
    icon: Home,
    title: "Property & Real Estate Law",
    short: "Conveyancing, leasing, property transfers, and due diligence.",
    tagline: "Move with certainty on every property transaction.",
    overview:
      "We manage the full life-cycle of real estate transactions — title verification, sale agreements, transfers, leases, and post-completion compliance — protecting buyers, sellers, landlords, and tenants at every step.",
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
      {
        q: "Can you handle off-plan purchases?",
        a: "Yes. We review the project structure, sale agreement, and security arrangements before any deposit is released.",
      },
    ],
  },
  {
    slug: "business-startup",
    icon: Briefcase,
    title: "Business & Startup Law",
    short: "Commercial contracts, regulatory advice, and legal consulting for growing enterprises.",
    tagline: "Legal foundations that scale with your business.",
    overview:
      "From the first founder agreement to fundraising and commercial expansion, we partner with startups and growth-stage businesses on the legal infrastructure that lets them move quickly without compromising governance.",
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
      {
        q: "Do you advise on the Data Protection Act?",
        a: "Yes — we help businesses register with the ODPC, build privacy notices and DPIAs, and respond to data subject requests.",
      },
    ],
  },
  {
    slug: "mediation-dispute-resolution",
    icon: Handshake,
    title: "Mediation & Dispute Resolution",
    short: "Collaborative problem-solving, civil mediation, and alternative dispute resolution.",
    tagline: "Resolve disputes without breaking relationships — or budgets.",
    overview:
      "Litigation should be the last resort, not the default. Our Managing Partner is an accredited mediator who guides parties through structured, confidential processes to reach durable, commercially sensible outcomes.",
    scope: [
      "Commercial mediation",
      "Family and succession mediation",
      "Negotiated settlement of civil disputes",
      "Drafting of settlement agreements",
      "Pre-litigation strategy and risk assessment",
    ],
    whoWeServe: ["Businesses in dispute", "Co-founders and partners", "Families and estates"],
    faqs: [
      {
        q: "Is mediation legally binding?",
        a: "The mediated agreement is binding once signed by the parties and can be adopted as a court order where appropriate.",
      },
    ],
  },
  {
    slug: "private-client",
    icon: Shield,
    title: "Private Client Services",
    short: "Wills planning law, consumer law, and estate protection.",
    tagline: "Protect what you've built — for the people who matter.",
    overview:
      "We help individuals and families plan with intention. From wills and trusts to succession and consumer-rights matters, we deliver discreet, principled advice that protects assets across generations.",
    scope: [
      "Will drafting and storage",
      "Trusts and succession planning",
      "Estate administration and probate",
      "Powers of attorney",
      "Consumer protection and complaints",
    ],
    whoWeServe: ["Individuals and families", "Executors and trustees", "Beneficiaries"],
    faqs: [
      {
        q: "How often should a will be reviewed?",
        a: "Every 3–5 years, or after major life events such as marriage, divorce, a new child, or significant asset acquisition.",
      },
    ],
  },
  {
    slug: "non-profit-advisory",
    icon: HeartHandshake,
    title: "Non-Profit & Advisory",
    short: "Specialized legal consulting for non-profits and social enterprises.",
    tagline: "Mission-aligned governance for organisations doing meaningful work.",
    overview:
      "We support NGOs, foundations, and social enterprises with the legal architecture they need — registration, governance, donor compliance, and policy development — so they can focus on impact.",
    scope: [
      "NGO, trust, and society registration",
      "Constitutions and bylaws",
      "Donor and grant agreements",
      "Board governance and policy development",
      "Tax exemption applications",
    ],
    whoWeServe: ["NGOs and foundations", "Social enterprises", "Faith-based organisations"],
    faqs: [
      {
        q: "Can you help with PBO Act compliance?",
        a: "Yes. We advise on registration, transition, and ongoing compliance under the Public Benefit Organizations Act.",
      },
    ],
  },
];

export const getPracticeArea = (slug: string) =>
  practiceAreas.find((p) => p.slug === slug);