export type InsightArticle = {
  slug: string;
  kicker: string;
  title: string;
  metaLine: string;
  lead: string;
  seoTitle: string;
  seoDescription: string;
  sections: (
    | { type: "paragraph"; content: string }
    | { type: "pullquote"; content: string }
    | { type: "heading"; content: string }
    | { type: "callout"; variant: "brass" | "teal" | "danger"; title: string; content: string[] }
    | { type: "list"; items: { bold?: string; text: string }[] }
    | { type: "cta"; heading: string; body: string }
  )[];
};

export const insights: InsightArticle[] = [
  {
    slug: "buying-land-in-kenya-from-overseas",
    kicker: "REAL ESTATE \u00b7 DIASPORA \u00b7 MAY 2026",
    title: "Buying Land in Kenya From Overseas: A Pre-Purchase Checklist",
    metaLine: "May 2026 \u00b7 Real Estate \u00b7 8-minute read",
    lead: "You saved for years. You found the perfect plot. You transferred the money. Then the phone stopped ringing. This is not a hypothetical. It happens every week in Kenya \u2014 and diaspora buyers are the most targeted group.",
    seoTitle: "Buying Land in Kenya From Overseas: A Pre-Purchase Checklist | NKM Advocates",
    seoDescription: "Land fraud in Kenya costs diaspora buyers billions of shillings annually. NKM Advocates explains the 7-step due diligence checklist every overseas buyer must follow before any money moves.",
    sections: [
      { type: "paragraph", content: "In 2024, the Ministry of Lands had over 10,000 land fraud cases under active investigation. Losses ran into billions of shillings. And the single most common victim profile? A Kenyan living abroad \u2014 trusting a cousin, an agent, or a WhatsApp group \u2014 who wired money without ever setting foot on the land." },
      { type: "paragraph", content: "We don\u2019t say this to frighten you away from buying land in Kenya. Land remains one of the most reliable stores of wealth in this country. We say it because the same transactions that devastate uninformed buyers are entirely safe when done correctly. The difference between a disaster and a done deal is a checklist \u2014 and the discipline to follow it, no matter how much pressure you\u2019re under to move quickly." },
      { type: "pullquote", content: "\"Another buyer is interested. You need to decide by Friday.\" That sentence has cost Kenyan diaspora buyers more money than any other in the history of property fraud." },
      { type: "heading", content: "Why Diaspora Buyers Are Specifically Targeted" },
      { type: "paragraph", content: "Land fraudsters are not random. They are organised, patient, and sophisticated. They know that a buyer based in Manchester or Houston cannot visit the land. They know you trust family introductions. They know urgency works \u2014 the artificial deadline, the competing buyer who doesn\u2019t exist, the price that won\u2019t last. And they know that a scanned PDF of a title deed looks exactly the same whether it is real or not." },
      { type: "paragraph", content: "Under Section 26 of the Land Registration Act, 2012, a title obtained through fraud is voidable \u2014 not automatically void. That single word, voidable, means you must go to court to have it set aside. Courts. Lawyers. Years. Money you no longer have, spent fighting for land you already paid for. Prevention is not just better than cure \u2014 in land fraud, it may be the only cure." },
      { type: "callout", variant: "danger", title: "THE FRAUD PLAYBOOK \u2014 KNOW WHAT YOU\u2019RE FACING", content: [
        "\u2192 Forged title deeds \u2014 printed on specialist paper stolen from the Government Printer (a real 2024 criminal case).",
        "\u2192 Impersonation \u2014 someone uses a forged Power of Attorney to sell land belonging to an absent owner. You are the absent owner.",
        "\u2192 Double allocation \u2014 the same plot sold to multiple buyers simultaneously, race to register wins.",
        "\u2192 Ghost plots \u2014 land that exists on paper, on a road reserve or riparian zone, but cannot legally be sold or developed.",
        "\u2192 \u2018Buy now, transfer later\u2019 \u2014 deposits taken for off-plan plots on land the developer does not own.",
      ]},
      { type: "heading", content: "The Pre-Purchase Checklist \u2014 Do Not Skip Steps" },
      { type: "paragraph", content: "This is not a suggestion list. These are the steps that separate a protected buyer from a defrauded one. Miss any of them, and you have introduced a gap that a fraudster can walk through." },
      { type: "list", items: [
        { bold: "STEP 1 \u2014 Run an official title search on Ardhisasa.", text: "Kenya\u2019s National Land Information Management System (ardhisasa.lands.go.ke) allows anyone with an internet connection to confirm who the registered owner of a parcel is, whether there are encumbrances \u2014 mortgages, cautions, caveats, court orders \u2014 and the official subdivision status. The search costs KES 500. You can run it from London, Houston, or Dubai. Do not accept a scan of a title deed as verification. The title deed is what the fraudster has forged. The Ardhisasa record is what tells you the truth." },
        { bold: "STEP 2 \u2014 Instruct an advocate to conduct a physical registry search.", text: "Ardhisasa covers Nairobi, Murang\u2019a, and a growing number of counties \u2014 but not all of Kenya. Where the land sits outside Ardhisasa\u2019s coverage, your advocate conducts a manual search at the county land registry." },
        { bold: "STEP 3 \u2014 Commission a licensed surveyor to visit the land.", text: "A surveyor physically visits the parcel, verifies the beacons on the ground against the survey map from the Ministry of Lands, confirms boundaries, and photographs the location. No amount of digital verification replaces boots on the ground." },
        { bold: "STEP 4 \u2014 Cross-check with the county government.", text: "Ask your advocate to confirm that the land is not earmarked for compulsory acquisition, is not in a restricted zone, and that all land rates are up to date." },
        { bold: "STEP 5 \u2014 Lodge a caveat the moment you sign the sale agreement.", text: "A caveat under the Land Registration Act is a legal notice that the land is under transaction. It prevents the seller from transferring the title to anyone else while your purchase is in progress." },
        { bold: "STEP 6 \u2014 Verify the Land Control Board consent requirement.", text: "The Land Control Act (Cap. 302) requires prior consent from the Land Control Board for any transfer of agricultural land. A transaction conducted without the required consent is void \u2014 not voidable, void." },
        { bold: "STEP 7 \u2014 Engage an advocate to handle the full transfer.", text: "The title transfer process in Kenya currently takes 30 to 120 days depending on the county. Your advocate manages this process, tracks progress, and ensures your title is clean, registered, and unencumbered when it is issued." },
      ]},
      { type: "callout", variant: "brass", title: "ABOUT POWER OF ATTORNEY \u2014 READ THIS CAREFULLY", content: [
        "If you are buying land from abroad, you will likely need to appoint a Kenya-resident representative to act on your behalf under a Power of Attorney.",
        "A Power of Attorney in a land transaction must be registered with the Land Registry to be valid for that purpose. It must name the specific parcel, specify the exact acts the attorney is authorised to perform, and include a revocation mechanism.",
        "A general Power of Attorney \u2014 \u2018do everything on my behalf\u2019 \u2014 is an invitation to abuse. We have handled cases where trusted family members sold land they had no authority to sell, pocketed the proceeds, and disappeared.",
        "Have your PoA drafted by an advocate. Specify what it covers. Limit the duration. Build in an accounting obligation.",
      ]},
      { type: "heading", content: "The Hardest Truth About Land Fraud" },
      { type: "paragraph", content: "Most diaspora buyers who lose money on fraudulent land transactions are not naive. They are intelligent, hardworking people who trusted someone they should have been able to trust. Fraud does not announce itself. It looks exactly like a genuine transaction \u2014 right up until the moment it doesn\u2019t." },
      { type: "paragraph", content: "The checklist above is not complicated. It is not expensive relative to the price of the land. And it will not slow down a legitimate deal by more than a few weeks. What it will do is make a fraudulent deal impossible to complete \u2014 because fraudsters cannot survive scrutiny, and every step on this list is scrutiny." },
      { type: "paragraph", content: "Do not let urgency bypass your due diligence. The right land will still be available after verification. And if it isn\u2019t \u2014 the seller who won\u2019t wait for a title search is the seller who knows the title won\u2019t survive one." },
      { type: "cta", heading: "READY TO PROTECT WHAT MATTERS?", body: "Your land purchase is one of the most significant financial decisions of your life. NKM Advocates conducts full pre-purchase due diligence for diaspora buyers \u2014 title searches, physical verification, caveat registration, and title transfer. Start with a free consultation. We will tell you exactly what the land needs before a shilling moves." },
    ],
  },
  {
    slug: "five-contract-clauses-every-kenyan-sme-forgets",
    kicker: "SME ADVISORY \u00b7 APRIL 2026",
    title: "Five Contract Clauses Every Kenyan SME Forgets",
    metaLine: "April 2026 \u00b7 Business & SME Advisory \u00b7 7-minute read",
    lead: "The deal felt solid. You shook hands. You started work. And then, six weeks later, the client decided the scope was different from what you \u2018agreed\u2019 \u2014 and they have the WhatsApp messages to prove it. Except you have different WhatsApp messages. Welcome to the most common legal crisis facing Kenyan SMEs.",
    seoTitle: "Five Contract Clauses Every Kenyan SME Forgets | NKM Advocates",
    seoDescription: "The most common legal crises facing Kenyan SMEs start with missing contract clauses. NKM Advocates breaks down the five provisions every business agreement in Kenya needs.",
    sections: [
      { type: "paragraph", content: "Under the Law of Contract Act (Cap. 23), a valid contract requires offer, acceptance, consideration, and intention to create legal relations. Here is the thing that surprises most business owners: those elements can exist in a WhatsApp exchange. A message saying \u2018I\u2019ll deliver 500 units by Friday for KES 120,000\u2019 and a reply saying \u2018Perfect, confirmed\u2019 is, technically, a contract." },
      { type: "paragraph", content: "But technically enforceable and practically enforceable are two very different things. When that contract is disputed in the Small Claims Court or the Magistrates\u2019 Court, you will spend more time fighting over what was agreed than on the actual dispute \u2014 because nothing was written down with enough precision to settle the question." },
      { type: "paragraph", content: "The five clauses below are not legal theory. They are the five specific provisions that our SME clients are most often missing when they walk through our doors with a contract crisis. Each one is a gap. Each gap is a risk. Here is how to close them." },
      { type: "heading", content: "Clause 1 \u2014 Scope of Work: The Clause That Prevents the Invisible Goalposts" },
      { type: "paragraph", content: "\u2018We agreed on a website.\u2019 Did you agree on five pages or fifteen? With a contact form or without? Including hosting for how long? Mobile-responsive? With an admin panel? Revisions \u2014 how many rounds?" },
      { type: "paragraph", content: "Without a written, specific scope of work, every one of those questions becomes a dispute. The client will always remember the maximum version of what was promised. You will remember the minimum. Neither of you is necessarily lying \u2014 you just genuinely understood different things, because the contract did not specify." },
      { type: "pullquote", content: "\"Without a written scope, the client will always remember the maximum version of what was promised. You will remember the minimum.\"" },
      { type: "heading", content: "Clause 2 \u2014 Payment Terms: The Clause That Funds Your Business" },
      { type: "paragraph", content: "\u2018Payment on completion\u2019 is not a payment term. It is a trigger for a dispute. What is completion? Who decides it has been reached? What if the client says it hasn\u2019t?" },
      { type: "paragraph", content: "A proper payment clause specifies the total amount, the payment schedule (deposit, milestone payments, final payment), the specific trigger for each payment, what happens if payment is late \u2014 including a clearly stated interest rate, which is enforceable under Kenyan law \u2014 and the consequence of non-payment (suspension of work, termination, referral to debt recovery)." },
      { type: "callout", variant: "brass", title: "THE KES 200,000 LESSON", content: [
        "A Nairobi creative agency completed a full brand identity project. The client paid 50% upfront. When the project was delivered, the client refused the final payment, claiming the logo \u2018wasn\u2019t what was discussed.\u2019",
        "There was no written brief. No approval stage documented. No written acceptance of delivered files. The agency had WhatsApp voice notes \u2014 not easy to produce as court evidence.",
        "The dispute cost more in legal fees and lost time than the KES 200,000 outstanding. The clause that would have prevented it: a written approval process requiring the client\u2019s sign-off in writing at each stage, and a clause stating that a signed delivery acknowledgment triggers the final invoice.",
      ]},
      { type: "heading", content: "Clause 3 \u2014 Termination: The Exit You Need Before You Need It" },
      { type: "paragraph", content: "What happens when a client disappears mid-project? Or you discover the client is acting in bad faith? Or the client simply decides they no longer want the service \u2014 three months in, with your resources already committed?" },
      { type: "paragraph", content: "Without a termination clause, Kenyan courts will apply common law principles \u2014 which are neither predictable nor client-friendly for service providers. With a termination clause, you control the narrative." },
      { type: "heading", content: "Clause 4 \u2014 Intellectual Property: The Clause That Decides Who Owns What You Build" },
      { type: "paragraph", content: "You build a software product for a client. You write the code, design the interface, and deliver a working system. Who owns the intellectual property? If your contract is silent, the answer is not obvious \u2014 and the legal default under the Copyright Act (Cap. 130) is not necessarily what you expect." },
      { type: "paragraph", content: "In Kenya, copyright in a commissioned work vests in the author (you, the creator) unless there is a written assignment. That means a client who paid you to build something does not automatically own it \u2014 unless your contract says they do." },
      { type: "heading", content: "Clause 5 \u2014 Dispute Resolution: The Clause That Keeps You Out of Court" },
      { type: "paragraph", content: "When something goes wrong \u2014 and in business, something always eventually goes wrong \u2014 where do you go? If your contract is silent, the default path is litigation. The Magistrates\u2019 Court or the High Court. Public proceedings. Months or years. Legal fees that dwarf the original dispute." },
      { type: "paragraph", content: "A dispute resolution clause lets you choose a different path. Under the Arbitration Act, 1995, an arbitration clause in a contract is binding and enforceable. Arbitration is private. The arbitrator can be someone with expertise in your industry." },
      { type: "callout", variant: "teal", title: "THE AMENDMENT BILL YOU NEED TO KNOW ABOUT", content: [
        "The Law of Contract (Amendment) Bill, 2025 \u2014 currently before Parliament \u2014 proposes the most significant changes to Kenyan contract law in decades.",
        "Key changes: prohibition of clauses that exclude liability for death or negligence; a statutory \u2018reasonableness\u2019 test for limitation of liability clauses; heightened scrutiny of consumer-facing contracts.",
        "If enacted, many standard-form contracts used by Kenyan SMEs will need to be reviewed and redrafted.",
        "Now is the right time to have your contracts reviewed \u2014 before the law changes, not after.",
      ]},
      { type: "cta", heading: "READY TO PROTECT WHAT MATTERS?", body: "Your contract is your first line of defence \u2014 and your first revenue protection tool. NKM Advocates drafts, reviews, and negotiates commercial contracts for Kenyan SMEs. One review today can prevent a dispute that costs ten times more tomorrow. Book a free consultation and bring your current contract. We will show you exactly where the gaps are." },
    ],
  },
  {
    slug: "power-of-attorney-from-abroad-kenya",
    kicker: "FAMILY LAW \u00b7 DIASPORA \u00b7 MARCH 2026",
    title: "Power of Attorney From Abroad: What Actually Works in Kenya",
    metaLine: "March 2026 \u00b7 Family Law \u00b7 7-minute read",
    lead: "You gave someone authority to handle your affairs in Kenya while you were abroad. It seemed like the safe thing to do. Then you found out what they did with it.",
    seoTitle: "Power of Attorney From Abroad: What Actually Works in Kenya | NKM Advocates",
    seoDescription: "A poorly drafted Power of Attorney is more dangerous than having none. NKM Advocates explains exactly what diaspora Kenyans in the UK, US, and Gulf must include \u2014 and how to execute it correctly.",
    sections: [
      { type: "paragraph", content: "This is a story we hear more often than we should. A diaspora Kenyan \u2014 in the UK, in Texas, in Sharjah \u2014 grants a Power of Attorney to a family member or trusted friend. The PoA is broad. \u2018To act on my behalf in all matters related to my property and finances in Kenya.\u2019 It seemed comprehensive. It felt safe." },
      { type: "paragraph", content: "What it actually was, in legal terms, was a blank cheque. And blank cheques, when given to people who face financial pressure, temptation, or simply poor judgment, tend to get written in unexpected ways." },
      { type: "paragraph", content: "We have seen family members sell land they were only authorised to manage. We have seen attorneys withdraw funds from bank accounts for \u2018repairs\u2019 that were never made. We have seen signature pages attached to documents that the donor never saw. A Power of Attorney is one of the most powerful legal instruments in Kenyan law \u2014 and one of the most dangerous when poorly drafted." },
      { type: "pullquote", content: "\"A general Power of Attorney \u2014 to act on my behalf in all matters \u2014 is not a legal document. It is an invitation.\"" },
      { type: "heading", content: "What a Power of Attorney Actually Is \u2014 And Is Not" },
      { type: "paragraph", content: "A Power of Attorney (PoA) under the Powers of Attorney Act (Cap. 531) is a written authority given by one person (the donor) to another (the attorney) to act on the donor\u2019s behalf. The attorney does not own anything. They do not have independent rights. They are legally required to act strictly within the scope of the authority given \u2014 and within the donor\u2019s best interests." },
      { type: "heading", content: "The Four Things Every Diaspora PoA Must Include" },
      { type: "list", items: [
        { bold: "SPECIFICITY", text: "\u2014 A specific, limited purpose. \u2018To manage the rental property known as [address], collect rental income, and pay the associated utility bills and maintenance costs\u2019 is a valid PoA purpose. \u2018To manage all my affairs\u2019 is not a purpose \u2014 it is a delegation of your entire legal and financial life." },
        { bold: "DURATION", text: "\u2014 A defined duration. An open-ended PoA that runs until revoked is a long-running liability. Build a natural expiry date into the PoA. One year is usually sufficient for most property transactions." },
        { bold: "ACCOUNTABILITY", text: "\u2014 An accounting obligation. Your attorney must keep records of every action taken under the PoA \u2014 every payment received, every payment made, every document signed. An attorney who objects to accountability is an attorney you should not appoint." },
        { bold: "REVOCATION", text: "\u2014 A revocation mechanism. State clearly that the PoA may be revoked in writing at any time by the donor, and that the attorney must immediately cease acting on receipt of a revocation notice." },
      ]},
      { type: "heading", content: "The Land PoA: A Special Case" },
      { type: "paragraph", content: "A Power of Attorney used in a land transaction has an additional requirement that most diaspora clients do not know: under the Land Registration Act, 2012, a PoA used to transfer land must be registered at the relevant lands registry before it can be relied upon in that transaction." },
      { type: "paragraph", content: "An unregistered PoA cannot be used to transfer a title deed. Full stop. We have seen transactions collapse \u2014 sometimes at the very last moment \u2014 because the PoA was not registered." },
      { type: "heading", content: "Executing a PoA From Abroad \u2014 What Kenya Requires" },
      { type: "list", items: [
        { bold: "UK", text: " \u2014 The document must be signed before a UK Notary Public, authenticated by the FCDO, and then legalised at the Kenyan High Commission in London." },
        { bold: "USA", text: " \u2014 The document is notarised before a US Notary Public or at a US Apostille authority, then authenticated at the Kenyan Embassy in Washington D.C. or the nearest consulate." },
        { bold: "GULF", text: " \u2014 Execution before a UAE Notary Public, followed by authentication at the UAE Ministry of Foreign Affairs, followed by legalisation at the Kenyan Embassy in Abu Dhabi. Note that Kenya is not a member of the Hague Apostille Convention." },
      ]},
      { type: "callout", variant: "danger", title: "THE MOST DANGEROUS WORDS IN A POWER OF ATTORNEY", content: [
        "These phrases \u2014 which appear in many DIY PoA templates \u2014 create unlimited authority and unlimited risk:",
        "\u2192 \u2018To act on my behalf in all matters\u2019",
        "\u2192 \u2018To do anything I myself could lawfully do\u2019",
        "\u2192 \u2018Including but not limited to the sale, transfer, or disposal of any assets\u2019",
        "\u2192 \u2018For an indefinite period until revoked\u2019",
        "If your PoA contains any of these phrases without specific limiting language, have it reviewed and redrafted before it is used. The cost of a legal review is immaterial compared to the cost of the authority you have handed over.",
      ]},
      { type: "cta", heading: "READY TO PROTECT WHAT MATTERS?", body: "A Power of Attorney that is too broad is more dangerous than having none at all. NKM Advocates drafts diaspora Powers of Attorney that are specific, time-limited, and enforceable \u2014 and advises on the execution process from the UK, US, UAE, and beyond. Book a free consultation before you sign anything \u2014 or before anyone signs on your behalf." },
    ],
  },
  {
    slug: "chasing-an-unpaid-invoice-kenya",
    kicker: "DEBT RECOVERY \u00b7 FEBRUARY 2026",
    title: "Chasing an Unpaid Invoice in Kenya: Demand Letter to Small Claims, Explained",
    metaLine: "February 2026 \u00b7 Debt Recovery & Small Claims \u00b7 7-minute read",
    lead: "They got the work. They signed the delivery note. They promised to pay Friday. It is now three months later, your calls go to voicemail, and they have not replied to a single WhatsApp message. You are owed money. They know it. And they are betting you won\u2019t do anything about it.",
    seoTitle: "Chasing an Unpaid Invoice in Kenya: From Demand Letter to Small Claims Court | NKM Advocates",
    seoDescription: "Kenya\u2019s Small Claims Court handles debts up to KES 1,000,000 with a 60-day decision requirement. NKM Advocates walks through every step \u2014 demand letter, filing, hearing, and enforcement.",
    sections: [
      { type: "paragraph", content: "The bet pays off more often than it should. Most Kenyan SMEs \u2014 and most individuals \u2014 never formally pursue unpaid debts. They assume the process will be slow, expensive, and ultimately futile. They write off the money as a loss and move on." },
      { type: "paragraph", content: "That assumption is wrong. And in a business environment where cash flow is the difference between surviving a quarter and not, it is an assumption that can be fatal." },
      { type: "paragraph", content: "Kenya has a legal system specifically designed for this problem. The Small Claims Court, established under the Small Claims Court Act No. 2 of 2016, handles disputes up to KES 1,000,000. The Adjudicator must deliver a decision within 60 days of filing. Filing costs KES 1,000. And the judgment, when you win, is enforceable with the full power of the court behind it." },
      { type: "pullquote", content: "\"Most debtors are not counting on your patience. They are counting on your inaction. A demand letter tells them the inaction is over.\"" },
      { type: "heading", content: "Why the Demand Letter Comes First \u2014 and Why It Actually Works" },
      { type: "paragraph", content: "Before any court action, before any filing, there is the demand letter. It is not a formality. It is often the most effective tool in the recovery process \u2014 and it costs you almost nothing to send." },
      { type: "paragraph", content: "A properly drafted demand letter from an advocate does three things at once. First, it tells the debtor that you are serious \u2014 that this is no longer an informal request between two people who know each other, but a formal legal demand with a named consequence. Second, it establishes a paper trail of your attempts to resolve the matter before litigation \u2014 courts look favourably on creditors who demonstrate reasonable effort before filing. Third, and most importantly, it gives the debtor a deadline \u2014 7 to 14 days is standard \u2014 after which your next communication is a court filing." },
      { type: "heading", content: "What the Demand Letter Must Say" },
      { type: "list", items: [
        { text: "The precise amount owed, broken down by invoice or obligation \u2014 not a round number, but the exact figure you will claim in court." },
        { text: "The legal basis for the claim \u2014 goods supplied, services rendered, loan, rent arrears, deposit not returned \u2014 citing the relevant contractual document, delivery note, M-Pesa receipt, or bank transfer." },
        { text: "A clear, hard deadline \u2014 \u2018on or before [specific date], being 14 days from the date of this letter\u2019 \u2014 not \u2018as soon as possible.\u2019" },
        { text: "The specific legal consequence of non-compliance \u2014 that you will file proceedings in the appropriate court and seek judgment for the debt, plus interest and costs." },
        { text: "An invitation to respond in writing \u2014 this creates an opportunity for the debtor to admit the debt, propose a payment plan, or raise a specific defence." },
      ]},
      { type: "heading", content: "If the Letter Fails: The Small Claims Court Process" },
      { type: "paragraph", content: "If 14 days pass without payment or a serious response, you file. The Small Claims Court requires a Statement of Claim, your supporting evidence \u2014 contracts, invoices, delivery notes, M-Pesa or bank transfer records, WhatsApp messages that acknowledge the debt \u2014 and the KES 1,000 filing fee." },
      { type: "callout", variant: "teal", title: "THE SIX DOCUMENTS THAT WIN DEBT RECOVERY CASES", content: [
        "1. The contract or service agreement \u2014 written evidence of what was agreed.",
        "2. The invoice \u2014 precisely matching the amount claimed.",
        "3. The delivery note or completion acknowledgement \u2014 signed by the debtor, confirming receipt.",
        "4. Any written acknowledgement of the debt \u2014 an email, a WhatsApp message, a promise to pay by a specific date.",
        "5. Bank transfer records or M-Pesa statements showing what has been paid and what remains outstanding.",
        "6. A record of your attempts to recover the debt before filing \u2014 calls, messages, the demand letter, any response.",
      ]},
      { type: "heading", content: "After the Judgment: Enforcement \u2014 The Part Nobody Warns You About" },
      { type: "paragraph", content: "You have a judgment in your favour. The Adjudicator has confirmed the debt. The debtor owes you the money, and the court has said so in writing. Then nothing happens." },
      { type: "paragraph", content: "This is normal. And it is why enforcement strategy matters as much as the claim itself. A judgment without an enforcement plan is a document \u2014 an important document, legally significant, but not yet money in your account." },
      { type: "list", items: [
        { bold: "GARNISHEE ORDER", text: " \u2014 If you know where the debtor banks, or who owes the debtor money, a garnishee order intercepts those funds and redirects them to you. A garnishee order against a bank account is one of the fastest ways to turn a judgment into actual payment." },
        { bold: "ATTACHMENT OF MOVABLE PROPERTY", text: " \u2014 A warrant issued by the court authorises a court bailiff to seize and sell the debtor\u2019s assets \u2014 stock, equipment, vehicles \u2014 in satisfaction of the judgment." },
      ]},
      { type: "heading", content: "The Six-Year Deadline You Cannot Afford to Miss" },
      { type: "paragraph", content: "Under the Limitation of Actions Act (Cap. 22), a contractual debt claim must be brought within six years of the date the debt became due. Wait longer than six years, and you may lose your legal right to enforce it \u2014 permanently." },
      { type: "paragraph", content: "Six years sounds generous. But it goes quickly, particularly where debts are disputed informally for months or years before a creditor decides to act. If you are owed money and you have been waiting \u2014 stop waiting. The clock has been running since the day they should have paid." },
      { type: "cta", heading: "READY TO PROTECT WHAT MATTERS?", body: "Someone owes you money. The question is whether you will recover it. NKM Advocates handles debt recovery from demand letter through to judgment enforcement \u2014 for unpaid invoices, rental arrears, and contractual debts up to and beyond KES 1,000,000. Book a free consultation. Bring your invoice, your delivery note, and your evidence. We will tell you exactly what you can recover \u2014 and how." },
    ],
  },
];

export const getInsight = (slug: string): InsightArticle | undefined => {
  return insights.find((a) => a.slug === slug);
};
