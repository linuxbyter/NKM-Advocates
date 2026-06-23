import { Home, Handshake, Shield, HeartHandshake, Scale, FileText, Lock, type LucideIcon } from "lucide-react";

export type PracticeArea = {
  slug: string;
  icon: LucideIcon;
  fileNo: string;
  title: string;
  short: string;
  tagline: string;
  legalBasis: string;
  overview: string;
  services: { name: string; description: string }[];
  diasporaAdvantage: string[];
  whoWeServe: string[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "business-sme-advisory",
    icon: Handshake,
    fileNo: "SME-01",
    title: "Business & SME Advisory",
    short: "Formation, contracts, compliance and tax structuring for founders and growing businesses.",
    tagline: "Empowering businesses with legal clarity.",
    legalBasis: "Companies Act No. 17 of 2015 \u00b7 Registration of Business Names Act (Cap. 499) \u00b7 Income Tax Act (Cap. 470) \u00b7 Value Added Tax Act, 2013 \u00b7 Employment Act, 2007 \u00b7 Companies (Beneficial Ownership Information) Regulations, 2020",
    overview: "Starting and growing a business in Kenya involves navigating a layered set of legal and regulatory obligations. Our Business & SME Advisory department provides founders, entrepreneurs, and established businesses with the structural and contractual foundation they need to operate lawfully, protect their interests, and scale without unnecessary risk.",
    services: [
      { name: "Business Formation & Registration", description: "We advise on the most appropriate legal structure for your business \u2014 sole proprietorship, private limited company, partnership, or branch of a foreign company \u2014 and handle registration with the Business Registration Service (BRS) via the eCitizen portal under the Companies Act, 2015." },
      { name: "Post-Incorporation Compliance", description: "We manage your mandatory KRA PIN registration, VAT registration (required when annual taxable turnover exceeds KES 5 million), PAYE setup, NSSF and SHIF registration, and annual returns filing with the Registrar of Companies (Form CR29)." },
      { name: "Beneficial Ownership Disclosures", description: "The Companies (Beneficial Ownership Information) Regulations, 2020 require all companies to maintain and file a Register of Beneficial Owners. Any person holding 10% or more of shares or exercising significant influence is a reportable beneficial owner." },
      { name: "Commercial Contracts", description: "We draft, review, and negotiate supply agreements, service contracts, distributor agreements, shareholder agreements, and employment contracts." },
      { name: "Tax Structuring & Advisory", description: "We advise on legal tax structuring for businesses at all stages, including choice of entity, dividend versus salary optimisation, and sector-specific tax reliefs." },
      { name: "Business Licensing & Sector Compliance", description: "We identify the applicable regulatory bodies and guide businesses through licensing requirements at both national and county level." },
    ],
    diasporaAdvantage: [
      "Register and structure your Kenya-based business entirely remotely \u2014 no office visit required",
      "Act as registered office and resident compliance contact for your company while you are abroad",
      "Advise diaspora investors on the right corporate structure for holding Kenyan business assets",
      "Prepare shareholders agreements and governance documents tailored for cross-border ownership",
      "Handle mandatory annual filings and compliance deadlines on your behalf, with updates via WhatsApp or email",
    ],
    whoWeServe: ["SMEs", "Startups", "Entrepreneurs", "Diaspora investors"],
  },
  {
    slug: "real-estate",
    icon: Home,
    fileNo: "RE-02",
    title: "Real Estate",
    short: "Title verification, leases, and protection against fraudulent land transactions.",
    tagline: "Move with certainty on every property transaction.",
    legalBasis: "Land Registration Act, 2012 \u00b7 Land Act No. 6 of 2012 \u00b7 National Land Commission Act, 2012 \u00b7 Land Control Act (Cap. 302) \u00b7 Stamp Duty Act (Cap. 480) \u00b7 Environment and Land Court Act, 2011 \u00b7 Ardhisasa Platform",
    overview: "Land in Kenya is both its most valuable asset class and one of its most litigated. Title fraud, double allocations, and forged succession documents cost Kenyan buyers billions of shillings annually \u2014 and diaspora investors, unable to visit properties in person, are disproportionately targeted. Our Real Estate department provides rigorous, on-the-ground due diligence and transactional support grounded in the current legal framework.",
    services: [
      { name: "Title Verification & Due Diligence", description: "We conduct official searches through the Ardhisasa platform and physically visit the lands registry to confirm the registered owner, check for encumbrances, and verify that the title is genuine and unencumbered." },
      { name: "Sale Agreements & Transfer of Title", description: "We draft and negotiate sale agreements, lodge caveats to protect buyers after signing, conduct stamp duty assessment and payment, and handle the full title transfer process at the relevant lands registry." },
      { name: "Land Control Board Consent", description: "The Land Control Act (Cap. 302) requires prior consent of the Land Control Board for any sale, transfer, lease, or other dealing in agricultural land. Transactions conducted without the required consent are void." },
      { name: "Lease Agreements", description: "We draft commercial and residential lease agreements, advise landlords and tenants on their respective rights and obligations, and review existing leases before signature." },
      { name: "Land Dispute Resolution", description: "Disputes relating to land are heard by the Environment and Land Court. We advise on available legal remedies, including injunctions, caveats, and claims for revocation of fraudulently obtained titles." },
      { name: "Sectional Properties & Off-Plan Purchases", description: "We advise buyers on off-plan and sectional property purchases, including reviewing developer agreements, verifying development approvals, and protecting client deposits." },
    ],
    diasporaAdvantage: [
      "Conduct full physical title verification and property inspection on your behalf \u2014 including GPS coordinates and photographs",
      "Instruct and supervise a licensed land surveyor to verify boundaries and beacons before any money is paid",
      "Register a caveat immediately after your sale agreement is signed to prevent fraudulent re-transfer",
      "Manage the entire transaction from title search to title transfer with WhatsApp progress updates at each stage",
      "Prepare or review Power of Attorney for a Kenya-resident representative to act in land transactions on your behalf",
      "Protect existing property from adverse possession or fraudulent dealing while you are abroad",
    ],
    whoWeServe: ["Individual buyers and sellers", "Diaspora investors", "Developers and landlords"],
  },
  {
    slug: "debt-recovery-small-claims",
    icon: Shield,
    fileNo: "DR-03",
    title: "Debt Recovery & Small Claims",
    short: "Structured collections for unpaid invoices and small claims representation.",
    tagline: "Recover what\u2019s owed, efficiently.",
    legalBasis: "Small Claims Court Act No. 2 of 2016 \u00b7 Debts (Summary Recovery) Act (Cap. 42) \u00b7 Civil Procedure Act (Cap. 21) \u00b7 Civil Procedure Rules, 2010 \u00b7 Magistrates\u2019 Courts Act \u00b7 High Court (Organization and Administration) Act, 2016",
    overview: "Unpaid invoices, dishonoured contracts, and outstanding debts disrupt cash flow and undermine business sustainability. Kenyan law provides a structured, escalating set of mechanisms for recovering money owed \u2014 from demand letters and negotiated settlements through to court-issued judgments and asset attachment.",
    services: [
      { name: "Demand Letters", description: "The first step in any debt recovery action is a formal demand letter, which sets out the amount owed, the basis of the claim, and a reasonable deadline for payment." },
      { name: "Small Claims Court (SCC)", description: "The Small Claims Court handles civil and commercial claims up to KES 1,000,000. The Adjudicator must deliver a decision within 60 days of filing. We prepare and file statements of claim and represent clients at hearings." },
      { name: "Magistrates\u2019 Court Recovery", description: "For claims exceeding the SCC threshold, we file suit in the Magistrates\u2019 Court. We advise on summary judgment applications where the debtor has made written admissions of the debt." },
      { name: "Judgment Enforcement", description: "After obtaining judgment, we pursue enforcement through attachment of the debtor\u2019s movable property, garnishee orders against banks or employers, and where necessary, attachment of immovable property." },
      { name: "Commercial Debt Recovery", description: "For businesses managing multiple outstanding receivables, we provide structured recovery programmes, including debtor profiling, escalation protocols, and batch filing of related claims." },
    ],
    diasporaAdvantage: [
      "Recover debts owed to you in Kenya while you are based abroad \u2014 entirely remotely via WhatsApp and email instructions",
      "Recover unpaid rent from Kenyan tenants in your rental property, including seeking court orders for eviction where necessary",
      "Enforce outstanding judgments obtained before you relocated abroad",
      "Advise on the enforceability of foreign judgments against debtors who have assets in Kenya",
    ],
    whoWeServe: ["SMEs", "Freelancers", "Small business owners", "Individual creditors"],
  },
  {
    slug: "mediation-arbitration-adr",
    icon: Scale,
    fileNo: "ADR-04",
    title: "Mediation, Arbitration & ADR",
    short: "Out-of-court resolution for commercial and family disputes.",
    tagline: "Peaceful solutions, lasting results.",
    legalBasis: "Arbitration Act No. 4 of 1995 (as amended 2009) \u00b7 Constitution of Kenya 2010, Article 159(2)(c) \u00b7 Civil Procedure Act (Cap. 21) \u00b7 Civil Procedure (Court-Annexed Mediation) Rules, 2022 \u00b7 NCIA Rules, 2015 \u00b7 New York Convention",
    overview: "Not every dispute needs a courtroom. Article 159(2)(c) of the Constitution of Kenya expressly mandates that courts promote alternative dispute resolution. Our ADR department provides structured, confidential resolution of commercial and family disputes that preserves relationships, reduces cost, and delivers outcomes far faster than litigation.",
    services: [
      { name: "Mediation", description: "A confidential, voluntary process in which a neutral mediator facilitates dialogue between disputing parties to reach a mutually acceptable agreement. Once signed, the settlement agreement is legally binding." },
      { name: "Arbitration", description: "Governed by the Arbitration Act, 1995. A neutral arbitrator hears both sides and delivers a legally binding arbitral award, enforceable in the High Court and under the New York Convention in foreign jurisdictions." },
      { name: "ADR Clause Drafting", description: "We draft clear dispute resolution clauses for commercial contracts specifying mediation, arbitration, or a tiered process, the governing rules, the seat, and the language of proceedings." },
      { name: "Accredited Mediation Services", description: "Our Managing Partner Agnes Nyawira is an accredited mediator. We provide mediation for commercial disputes, landlord-tenant disputes, partnership disagreements, and family matters." },
      { name: "Settlement Agreements", description: "Where parties have reached a settlement, we document the agreement in a legally enforceable format, advise on its terms, and register it with the court where applicable." },
    ],
    diasporaAdvantage: [
      "Resolve disputes involving Kenyan business partners, tenants, or family members remotely, without requiring your physical presence in Kenya",
      "Mediate estate and succession disputes among Kenya-resident heirs on behalf of diaspora family members",
      "Draft arbitration clauses into cross-border commercial agreements that specify Nairobi as the seat and Kenyan law as the governing law",
      "Enforce foreign arbitral awards against Kenya-resident debtors through the High Court under the New York Convention framework",
    ],
    whoWeServe: ["Corporate clients", "Families", "Partners in business disputes", "Diaspora Kenyans"],
  },
  {
    slug: "intellectual-property",
    icon: Shield,
    fileNo: "IP-05",
    title: "Intellectual Property",
    short: "Trademark, copyright, and brand protection for growing businesses.",
    tagline: "Safeguard your brand and creations.",
    legalBasis: "Trade Marks Act (Cap. 506) \u00b7 Industrial Property Act No. 3 of 2001 \u00b7 Copyright Act (Cap. 130) \u00b7 Anti-Counterfeit Act No. 13 of 2008 \u00b7 KIPI \u00b7 KECOBO \u00b7 Madrid Agreement and Madrid Protocol",
    overview: "Your business name, logo, product design, software, creative content, and proprietary processes are assets. In Kenya\u2019s increasingly competitive market, failing to register and protect these assets creates risk. Our Intellectual Property department protects what you create, under the laws that govern it.",
    services: [
      { name: "Trademark Registration", description: "We conduct clearance searches (Form TM27), file applications with KIPI, and manage the registration process. Registration grants exclusive rights for 10 years, renewable indefinitely. Kenya is a member of the Madrid Protocol." },
      { name: "Trademark Monitoring & Enforcement", description: "We monitor the KIPI Industrial Property Journal during the 60-day opposition window and pursue infringers through cease-and-desist notices, KIPI dispute procedures, and High Court litigation." },
      { name: "Copyright Protection", description: "Copyright in Kenya is automatic upon creation of an original work under the Copyright Act (Cap. 130) and is administered by KECOBO. Protection lasts for the author\u2019s lifetime plus 50 years." },
      { name: "Patents & Industrial Designs", description: "We advise inventors on patentability, file patent applications with KIPI under the Industrial Property Act, 2001, and protect product designs from copying." },
      { name: "IP Licensing & Assignment", description: "We draft licensing agreements for trademarks, copyright works, and patents, and advise on IP assignments as part of business acquisitions and franchise arrangements." },
      { name: "Brand Protection for SMEs", description: "We offer an accessible brand audit and registration service designed specifically for growing businesses that operate without trademark protection." },
    ],
    diasporaAdvantage: [
      "Register your Kenyan trademark or brand remotely before launching a business or product in Kenya",
      "Protect intellectual property created abroad that you intend to exploit in the Kenyan market",
      "File international trademark protection via the Madrid Protocol with Kenya as one of the designated countries",
      "Enforce copyright over Kenyan-published or distributed content in your absence, including through KECOBO",
      "Advise on IP ownership structures for businesses with both Kenyan and foreign shareholders or collaborators",
    ],
    whoWeServe: ["Startups", "Creative agencies", "Tech companies", "Brand owners"],
  },
  {
    slug: "ngo-non-profit-registration",
    icon: HeartHandshake,
    fileNo: "NGO-06",
    title: "NGO & Non-Profit Registration",
    short: "Registration and compliance for nonprofits and diaspora-funded initiatives.",
    tagline: "Building impact with legal certainty.",
    legalBasis: "Public Benefit Organizations Act, 2013 (operationalised May 2024) \u00b7 PBO Regulations, Legal Notice No. 43 of 2026 \u00b7 Societies Act (Cap. 108) \u00b7 Companies Act, 2015 \u00b7 Trustees Act (Cap. 167) \u00b7 Income Tax (Charitable Organizations and Donations) Exemption Rules, 2024",
    overview: "Kenya\u2019s non-profit sector is governed by a significantly updated legal framework. The PBO Act, 2013, operationalised in May 2024, has replaced the old NGO Coordination Act framework. We guide founders, diaspora philanthropists, and international organisations through registration, compliance, and governance under the current law.",
    services: [
      { name: "Entity Selection & Structuring", description: "We advise on the four main options: PBO under the PBO Act 2013; Society under the Societies Act; Company Limited by Guarantee under the Companies Act, 2015; and Charitable Trust under the Trustees Act." },
      { name: "PBO Registration", description: "We handle the full registration process with the PBORA, including constitution drafting, founders\u2019 documentation, submission, and follow-up. Registration is mandatory." },
      { name: "KRA Tax Exemption", description: "Registered PBOs may apply for income tax exemption. We prepare and file KRA exemption applications and advise on maintaining compliance with the exemption conditions." },
      { name: "Governance & Constitution Drafting", description: "We draft constitutions that meet regulatory requirements, establish clear separation between governance and management, and protect the organization\u2019s mission." },
      { name: "Annual Compliance & Reporting", description: "PBOs have mandatory annual reporting obligations. Non-compliance has resulted in the PBORA issuing notices against over 2,800 organisations for deregistration." },
    ],
    diasporaAdvantage: [
      "Establish a Kenya-registered PBO or charitable trust to channel diaspora philanthropy into structured, accountable community programmes",
      "Serve as your required local legal representative and registered office address under the PBO Act\u2019s requirements for international organisations",
      "Structure governance to meet the Act\u2019s requirement that at least one-third of directors be Kenyan citizens resident in Kenya",
      "Obtain KRA tax exemption for your organisation, enabling donors to claim tax deductions on qualifying donations",
      "Manage annual compliance filings on your behalf while you remain abroad \u2014 with updates via WhatsApp or dedicated case email",
    ],
    whoWeServe: ["NGOs", "Community groups", "Diaspora-funded initiatives", "Social enterprises"],
  },
  {
    slug: "family-law",
    icon: FileText,
    fileNo: "FAM-07",
    title: "Family Law",
    short: "Succession, custody, and power of attorney \u2014 with experience supporting clients abroad.",
    tagline: "Protecting families, wherever they are.",
    legalBasis: "Law of Succession Act (Cap. 160) \u00b7 Marriage Act, 2014 \u00b7 Matrimonial Property Act, 2013 \u00b7 Children Act, 2022 \u00b7 Powers of Attorney Act (Cap. 531) \u00b7 Constitution of Kenya 2010, Article 45 \u00b7 Judicature Act (Cap. 8)",
    overview: "Family legal matters are among the most personal a client will ever face. Distance \u2014 particularly when a client is based abroad \u2014 can make these matters more urgent and more complex. Our Family Law department handles succession, estate administration, matrimonial property, custody, and powers of attorney with the sensitivity these matters require and the cross-border understanding our diaspora clients need.",
    services: [
      { name: "Wills & Testamentary Planning", description: "We draft wills that are clear, legally sound, and consistent with the testator\u2019s intentions \u2014 including provisions for minor children, property held in multiple jurisdictions, and business succession." },
      { name: "Grant of Probate & Letters of Administration", description: "We apply for grants of probate (where there is a will) and letters of administration (where there is no will), and manage the estate administration process through to distribution to beneficiaries." },
      { name: "Intestate Succession", description: "Where a person dies without a will, the Law of Succession Act sets out the default distribution rules. We advise families on these rules, identify all assets forming the estate, and manage the administration process." },
      { name: "Power of Attorney", description: "We draft PoAs tailored to specific purposes \u2014 land transactions, business management, bank account operations \u2014 and advise on the scope and limitations of the authority granted. For clients abroad, we advise on notarisation and consular legalisation procedures." },
      { name: "Matrimonial Property & Divorce", description: "The Matrimonial Property Act, 2013 governs the ownership and division of marital property. We advise on matrimonial property rights, represent clients in divorce proceedings, and negotiate property settlement agreements." },
      { name: "Child Custody & Guardianship", description: "The Children Act, 2022 governs all matters relating to children in Kenya. In custody matters, the welfare of the child is the paramount consideration. We represent parents in custody disputes and assist in applying for guardianship orders." },
    ],
    diasporaAdvantage: [
      "Prepare and execute a Kenya Power of Attorney while you are abroad, enabling a trusted representative to manage your property, business, or family affairs in Kenya",
      "Administer a deceased relative\u2019s estate in Kenya entirely remotely \u2014 from grant of representation through to final distribution \u2014 with regular updates via WhatsApp or email",
      "Draft a Kenya-specific will that addresses your Kenyan assets, including land, bank accounts, and business interests, in a form that will be recognised and administered by Kenyan courts",
      "Reseal a foreign grant of probate or letters of administration in the Kenyan High Court under Section 79 of the Law of Succession Act",
      "Advise on cross-border inheritance: where a Kenyan diaspora client holds assets in both Kenya and the UK, US, or Gulf, we identify which law governs each asset class and coordinate with foreign lawyers where needed",
      "Represent your interests in succession disputes among Kenya-resident family members while you remain abroad",
    ],
    whoWeServe: ["Families", "Diaspora Kenyans", "Individuals with cross-border ties"],
  },
  {
    slug: "data-protection",
    icon: Lock,
    fileNo: "DP-08",
    title: "Data Protection",
    short: "Privacy compliance and data governance built into how you operate.",
    tagline: "Secure data, secure future.",
    legalBasis: "Data Protection Act No. 24 of 2019 \u00b7 Data Protection (General) Regulations, 2021 \u00b7 Data Protection (Registration) Regulations, 2021 \u00b7 Data Protection (Complaints Handling) Regulations, 2021 \u00b7 Constitution of Kenya 2010, Article 31(c) and (d) \u00b7 ODPC",
    overview: "Kenya\u2019s Data Protection Act, 2019 (DPA) is the country\u2019s first comprehensive privacy law, modelled on the EU\u2019s GDPR and enacted to give effect to Article 31 of the Constitution. The ODPC is actively enforcing the Act \u2014 issuing penalty notices of up to KES 5 million, conducting compliance audits, and processing thousands of data subject complaints.",
    services: [
      { name: "ODPC Registration", description: "The DPA prohibits any person from acting as a data controller or data processor without registration. Mandatory thresholds include businesses with annual turnover above KES 5 million, more than 10 employees, or processing data of 10,000+ data subjects per year." },
      { name: "Data Protection Compliance Audits", description: "We conduct structured compliance assessments covering data inventory, lawful basis identification, privacy notices, data sharing arrangements, processor contracts, security measures, and breach notification procedures." },
      { name: "Privacy Notices & Consent Frameworks", description: "Every organization that collects personal data must provide a clear, accessible privacy notice. Consent must be freely given, specific, informed, and unambiguous. We draft compliant privacy notices and consent forms." },
      { name: "Data Subject Rights Management", description: "The DPA grants data subjects the rights to access, rectification, erasure, objection, and data portability. We design internal procedures for handling these requests." },
      { name: "Cross-Border Data Transfers", description: "Transferring personal data outside Kenya requires adequate protections, explicit consent, contractual safeguards (SCCs), or Binding Corporate Rules. We advise on compliant transfer mechanisms." },
      { name: "Data Protection Impact Assessments", description: "High-risk processing activities require a DPIA before they begin. We conduct DPIAs for new products, systems, or processes that involve significant data processing." },
      { name: "Data Protection Officer (DPO) Services", description: "We provide outsourced DPO services for organisations that need this function without the cost of a full-time internal appointment." },
    ],
    diasporaAdvantage: [
      "Structure your Kenyan business\u2019s data practices for compliance with both the Kenya DPA and the data protection law of your country of residence (GDPR for UK/EU, similar frameworks for US and Gulf states)",
      "Advise on cross-border data transfer mechanisms when your Kenya-based operation shares data with foreign service providers, investors, or parent entities",
      "Prepare and file ODPC registration for your Kenya-based entity while you manage operations remotely",
      "Conduct a compliance audit of your Kenya business\u2019s data handling practices and produce a remediation roadmap",
    ],
    whoWeServe: ["Corporates", "SMEs", "Healthcare providers", "FinTech firms"],
  },
];

export const getPracticeArea = (slug: string): PracticeArea | undefined => {
  return practiceAreas.find((area) => area.slug === slug);
};
