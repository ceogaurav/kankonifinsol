import {
  User, Briefcase, Home, Building2, Landmark, Wallet, CreditCard,
  Truck, HardHat, RefreshCw, Car, CarFront, Coins, ShieldCheck,
  Sparkles, TrendingUp, PiggyBank, Factory, Rocket, LineChart,
  Brain, MessageSquare, type LucideIcon,
} from "lucide-react";

export type ServiceCategory =
  | "Loans"
  | "Cards"
  | "Insurance"
  | "Investments"
  | "Advisory";

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  icon: LucideIcon;
  tagline: string;
  description: string;
  features: string[];
  rateFrom: string;
  maxAmount: string;
  tenure: string;
  popular?: boolean;
  accent: "royal" | "gold" | "navy";
}

export const services: Service[] = [
  {
    slug: "personal-loan",
    name: "Personal Loan",
    category: "Loans",
    icon: User,
    tagline: "Funds for every milestone",
    description:
      "Unsecured instant personal loans starting at 9.99% p.a. with minimal documentation and same-day disbursal for your dreams.",
    features: ["Up to ₹1 Cr", "No collateral", "24-hour disbursal", "Flexible tenure 1–7 yrs"],
    rateFrom: "9.99%",
    maxAmount: "₹1,00,00,000",
    tenure: "1–7 years",
    popular: true,
    accent: "royal",
  },
  {
    slug: "business-loan",
    name: "Business Loan",
    category: "Loans",
    icon: Briefcase,
    tagline: "Fuel your enterprise",
    description:
      "Grow your business with collateral-free working capital and term loans engineered for SMEs and established enterprises.",
    features: ["Up to ₹5 Crore", "Collateral-free options", "Quick 48h approval", "Tax-deductible interest"],
    rateFrom: "14.00%",
    maxAmount: "₹5,00,00,000",
    tenure: "1–5 years",
    popular: true,
    accent: "royal",
  },
  {
    slug: "home-loan",
    name: "Home Loan",
    category: "Loans",
    icon: Home,
    tagline: "Unlock your front door",
    description:
      "Finance your dream home with the lowest home loan interest rates, tenure up to 30 years and zero prepayment charges.",
    features: ["Up to ₹15 Crore", "Tenure up to 30 yrs", "PMAY eligible", "Free legal vetting"],
    rateFrom: "8.35%",
    maxAmount: "₹15,00,00,000",
    tenure: "Up to 30 years",
    popular: true,
    accent: "navy",
  },
  {
    slug: "loan-against-property",
    name: "Loan Against Property",
    category: "Loans",
    icon: Building2,
    tagline: "Liquidity from your assets",
    description:
      "Unlock the value of your residential or commercial property with high-value, low-interest loans against property.",
    features: ["Up to ₹25 Crore", "LTV up to 70%", "Tenure up to 20 yrs", "End-use flexibility"],
    rateFrom: "9.50%",
    maxAmount: "₹25,00,00,000",
    tenure: "Up to 20 years",
    accent: "navy",
  },
  {
    slug: "mortgage-loan",
    name: "Mortgage Loan",
    category: "Loans",
    icon: Landmark,
    tagline: "Capital against real estate",
    description:
      "Structured mortgage finance for high-ticket needs — business expansion, acquisition or refinancing at competitive rates.",
    features: ["Tailored structuring", "Competitive pricing", "Dedicated RM", "End-to-end legal support"],
    rateFrom: "9.75%",
    maxAmount: "₹50,00,00,000",
    tenure: "Up to 25 years",
    accent: "navy",
  },
  {
    slug: "working-capital-loan",
    name: "Working Capital Loan",
    category: "Loans",
    icon: Wallet,
    tagline: "Keep operations fluid",
    description:
      "Bridge cash-flow gaps and fund day-to-day operations with flexible working capital limits tailored to your cycle.",
    features: ["Cash credit & OD", "Seasonal limit enhancements", "Quick top-ups", "Digital monitoring"],
    rateFrom: "11.00%",
    maxAmount: "₹10,00,00,000",
    tenure: "Revolving",
    accent: "royal",
  },
  {
    slug: "od-cc",
    name: "OD / CC Facility",
    category: "Loans",
    icon: CreditCard,
    tagline: "Credit on demand",
    description:
      "Overdraft and Cash Credit facilities giving you the freedom to draw funds as needed and pay interest only on usage.",
    features: ["Interest on utilisation", "Instant drawdown", "Auto-sweep savings", "Revolving credit"],
    rateFrom: "10.75%",
    maxAmount: "₹10,00,00,000",
    tenure: "Revolving",
    accent: "royal",
  },
  {
    slug: "machinery-loan",
    name: "Machinery Loan",
    category: "Loans",
    icon: Truck,
    tagline: "Upgrade, expand, modernise",
    description:
      "Finance new or used machinery and equipment with up to 100% funding and asset-backed structures.",
    features: ["Up to 100% funding", "Used machinery finance", "Moratorium options", "Balloon repayment"],
    rateFrom: "11.50%",
    maxAmount: "₹20,00,00,000",
    tenure: "Up to 7 years",
    accent: "gold",
  },
  {
    slug: "construction-finance",
    name: "Construction Finance",
    category: "Loans",
    icon: HardHat,
    tagline: "Build without bottlenecks",
    description:
      "Stage-wise construction finance for builders and developers with milestone-linked disbursals.",
    features: ["Milestone disbursal", "Builder & developer finance", "Project appraisal", "Refinance options"],
    rateFrom: "12.00%",
    maxAmount: "₹100,00,00,000",
    tenure: "Up to 5 years",
    accent: "gold",
  },
  {
    slug: "balance-transfer",
    name: "Balance Transfer",
    category: "Loans",
    icon: RefreshCw,
    tagline: "Save on existing loans",
    description:
      "Transfer your existing loan to a lower-rate lender and save lakhs — plus top-up options on the same facility.",
    features: ["Lower your EMI", "Top-up facility", "End-to-end transfer", "Zero foreclosure charges"],
    rateFrom: "8.40%",
    maxAmount: "₹15,00,00,000",
    tenure: "Up to 30 years",
    accent: "royal",
  },
  {
    slug: "used-car-loan",
    name: "Used Car Loan",
    category: "Loans",
    icon: Car,
    tagline: "Drive home a pre-loved car",
    description:
      "Finance certified used cars with quick valuation, transparent pricing and flexible EMIs.",
    features: ["Up to 95% of valuation", "Multi-brand", "Quick valuation", "Flexible tenure"],
    rateFrom: "11.00%",
    maxAmount: "₹50,00,000",
    tenure: "Up to 7 years",
    accent: "gold",
  },
  {
    slug: "new-car-loan",
    name: "New Car Loan",
    category: "Loans",
    icon: CarFront,
    tagline: "Your new ride, today",
    description:
      "Drive home a brand-new car with attractive rates, 100% on-road funding and same-day approvals.",
    features: ["100% on-road price", "Same-day approval", "Lowest EMIs", "Electric vehicle finance"],
    rateFrom: "9.20%",
    maxAmount: "₹1,00,00,000",
    tenure: "Up to 8 years",
    popular: true,
    accent: "royal",
  },
  {
    slug: "gold-loan",
    name: "Gold Loan",
    category: "Loans",
    icon: Coins,
    tagline: "Instant cash for your gold",
    description:
      "Unlock instant liquidity against your gold with door-step evaluation and disbursal in 30 minutes.",
    features: ["Disbursal in 30 mins", "Doorstep evaluation", "No end-use restriction", "Flexible repayment"],
    rateFrom: "9.90%",
    maxAmount: "₹1,00,00,000",
    tenure: "Up to 3 years",
    accent: "gold",
  },
  {
    slug: "insurance",
    name: "Insurance",
    category: "Insurance",
    icon: ShieldCheck,
    tagline: "Protect what matters",
    description:
      "Comprehensive life, health, motor and general insurance from India's leading insurers, curated for you.",
    features: ["Life · Health · Motor", "Term & ULIP plans", "Claim assistance", "Best-in-class premiums"],
    rateFrom: "Custom",
    maxAmount: "₹5,00,00,000 cover",
    tenure: "Flexible",
    accent: "navy",
  },
  {
    slug: "credit-cards",
    name: "Credit Cards",
    category: "Cards",
    icon: Sparkles,
    tagline: "Rewards on every spend",
    description:
      "Premium credit cards with travel, cashback and lifestyle rewards — matched to your spending profile.",
    features: ["Lifetime-free options", "Travel & lounge access", "Cashback rewards", "Fuel waivers"],
    rateFrom: "Lifetime Free",
    maxAmount: "₹10,00,000 limit",
    tenure: "Revolving",
    accent: "gold",
  },
  {
    slug: "investment-products",
    name: "Investment Products",
    category: "Investments",
    icon: TrendingUp,
    tagline: "Grow wealth, smartly",
    description:
      "Curated fixed-income, bonds and structured products designed for capital protection and steady growth.",
    features: ["Bonds & NCDs", "Fixed deposits", "Senior citizen plans", "Tax-free options"],
    rateFrom: "7.00%",
    maxAmount: "Unlimited",
    tenure: "1–10 years",
    accent: "royal",
  },
  {
    slug: "mutual-funds",
    name: "Mutual Funds",
    category: "Investments",
    icon: PiggyBank,
    tagline: "Diversified, effortless",
    description:
      "SIP and lumpsum investments across 5,000+ direct mutual funds with zero commission and goal-based planning.",
    features: ["Zero commission", "SIP from ₹500", "Goal planning", "Smart rebalancing"],
    rateFrom: "SIP ₹500/mo",
    maxAmount: "Unlimited",
    tenure: "Flexible",
    popular: true,
    accent: "royal",
  },
  {
    slug: "msme-finance",
    name: "MSME Finance",
    category: "Loans",
    icon: Factory,
    tagline: "Empowering small India",
    description:
      "CGTMSE-covered, collateral-free MSME loans with subsidies and quick turnaround for small enterprises.",
    features: ["CGTMSE covered", "Collateral-free", "Govt. subsidies", "Udyam assistance"],
    rateFrom: "10.50%",
    maxAmount: "₹5,00,00,000",
    tenure: "Up to 7 years",
    accent: "navy",
  },
  {
    slug: "project-finance",
    name: "Project Finance",
    category: "Loans",
    icon: Rocket,
    tagline: "Capital for big vision",
    description:
      "Large-ticket project finance with syndication, structured debt and mezzanine options for infrastructure & industry.",
    features: ["Syndicated debt", "Mezzanine options", "Detailed appraisal", "Stakeholder structuring"],
    rateFrom: "Custom",
    maxAmount: "₹500,00,00,000",
    tenure: "Up to 15 years",
    accent: "navy",
  },
  {
    slug: "startup-funding",
    name: "Startup Funding",
    category: "Advisory",
    icon: Rocket,
    tagline: "From idea to scale",
    description:
      "Equity, debt and grant facilitation for startups with pitch-deck advisory and investor connect.",
    features: ["Equity & debt rounds", "Investor connect", "Valuation advisory", "Grant facilitation"],
    rateFrom: "Custom",
    maxAmount: "₹100,00,00,000",
    tenure: "Equity / Debt",
    accent: "gold",
  },
  {
    slug: "cibil-improvement",
    name: "CIBIL Improvement",
    category: "Advisory",
    icon: LineChart,
    tagline: "Rebuild your score",
    description:
      "Expert credit-health coaching to fix errors, optimise utilisation and rebuild your CIBIL score for better offers.",
    features: ["Credit report audit", "Error rectification", "Utilisation strategy", "Score monitoring"],
    rateFrom: "Advisory",
    maxAmount: "Score 750+",
    tenure: "3–9 months",
    accent: "royal",
  },
  {
    slug: "financial-consultation",
    name: "Financial Consultation",
    category: "Advisory",
    icon: Brain,
    tagline: "A plan, not a product",
    description:
      "Holistic financial planning with certified advisors — wealth, tax, retirement and succession under one roof.",
    features: ["CFP advisors", "Goal mapping", "Tax planning", "Estate & succession"],
    rateFrom: "Free 1st session",
    maxAmount: "Bespoke",
    tenure: "Ongoing",
    accent: "royal",
  },
];

export const serviceCategories: { label: string; value: ServiceCategory | "All" }[] = [
  { label: "All Services", value: "All" },
  { label: "Loans", value: "Loans" },
  { label: "Cards", value: "Cards" },
  { label: "Insurance", value: "Insurance" },
  { label: "Investments", value: "Investments" },
  { label: "Advisory", value: "Advisory" },
];

export interface Bank {
  name: string;
  short: string;
  type: "Private" | "Public" | "NBFC";
  color: string;
}

export const banks: Bank[] = [
  { name: "ICICI Bank", short: "ICICI", type: "Private", color: "#F37320" },
  { name: "HDFC Bank", short: "HDFC", type: "Private", color: "#004C8F" },
  { name: "Axis Bank", short: "AXIS", type: "Private", color: "#97144D" },
  { name: "Kotak Mahindra", short: "KOTAK", type: "Private", color: "#ED1C24" },
  { name: "IDFC First", short: "IDFC", type: "Private", color: "#00A99D" },
  { name: "State Bank of India", short: "SBI", type: "Public", color: "#1E4B7B" },
  { name: "Punjab National Bank", short: "PNB", type: "Public", color: "#0066B3" },
  { name: "Canara Bank", short: "CANARA", type: "Public", color: "#0F4C81" },
  { name: "Bank of Baroda", short: "BOB", type: "Public", color: "#C8102E" },
  { name: "Federal Bank", short: "FEDERAL", type: "Private", color: "#1B6E2D" },
  { name: "Bajaj Finance", short: "BAJAJ FINSERV", type: "NBFC", color: "#00529B" },
  { name: "Tata Capital", short: "TATA CAPITAL", type: "NBFC", color: "#1A1A1A" },
  { name: "Poonawalla Fincorp", short: "POONAWALLA", type: "NBFC", color: "#E63312" },
  { name: "Aditya Birla Capital", short: "ADITYA BIRLA", type: "NBFC", color: "#D52B1E" },
  { name: "L&T Finance", short: "L&T FINANCE", type: "NBFC", color: "#0A3D62" },
  { name: "Yes Bank", short: "YES", type: "Private", color: "#0055A5" },
  { name: "IndusInd Bank", short: "INDUSIND", type: "Private", color: "#7B1FA2" },
  { name: "Standard Chartered", short: "STANCHART", type: "Private", color: "#1A3B6B" },
];

export interface Testimonial {
  name: string;
  city: string;
  service: string;
  rating: number;
  title: string;
  message: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Rohit Sharma",
    city: "Mumbai",
    service: "Home Loan",
    rating: 5,
    title: "Lowest rate, zero hassle",
    message:
      "Kankoni got me a home loan at 8.35% when my own bank offered 9.1%. The relationship manager handled everything end-to-end. Truly premium service.",
    avatar: "RS",
  },
  {
    name: "Priya Nair",
    city: "Bengaluru",
    service: "Business Loan",
    rating: 5,
    title: "Funded my expansion in 48 hours",
    message:
      "I needed ₹75 lakh to scale my manufacturing unit. Within 48 hours the money was in my account. The AI eligibility tool saved me weeks of guessing.",
    avatar: "PN",
  },
  {
    name: "Aman Verma",
    city: "Delhi NCR",
    service: "Personal Loan",
    rating: 5,
    title: "Doorstep service is real",
    message:
      "Document collection happened at my office. Same-day disbursal of ₹8 lakh for my wedding. Felt like private banking without the price tag.",
    avatar: "AV",
  },
  {
    name: "Sneha Reddy",
    city: "Hyderabad",
    service: "Loan Against Property",
    rating: 5,
    title: "Saved ₹14 lakh on transfer",
    message:
      "Their balance-transfer team restructured my LAP and moved me to a 9.5% lender. The savings are real and the team was transparent throughout.",
    avatar: "SR",
  },
  {
    name: "Karthik Iyer",
    city: "Chennai",
    service: "MSME Finance",
    rating: 5,
    title: "CGTMSE loan, collateral-free",
    message:
      "As a small manufacturer, collateral was my biggest fear. Kankoni arranged a CGTMSE-covered loan seamlessly. Genuinely empowering for MSMEs.",
    avatar: "KI",
  },
  {
    name: "Megha Joshi",
    city: "Pune",
    service: "Mutual Funds",
    rating: 5,
    title: "Goal-based investing done right",
    message:
      "Their advisor mapped my daughter's education and my retirement into one SIP plan. Zero commission, smart rebalancing. My wealth finally has direction.",
    avatar: "MJ",
  },
];

export interface FAQ {
  q: string;
  a: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    category: "General",
    q: "How is Kankoni Finsol different from other loan aggregators?",
    a: "Unlike aggregator portals that just pass on leads, Kankoni assigns a dedicated relationship manager, negotiates the lowest rate with 100+ banks, provides doorstep documentation and tracks your application until disbursal — all on a single platform with bank-grade security.",
  },
  {
    category: "General",
    q: "Is there any fee for using Kankoni Finsol's services?",
    a: "Consultation is completely free. We earn from our banking partners, never from you. You pay only the standard bank charges — nothing extra, ever.",
  },
  {
    category: "Eligibility",
    q: "What credit score do I need for a loan?",
    a: "A CIBIL score of 750+ unlocks the best rates. However, several of our banking partners approve loans from 685 onwards. Our AI eligibility checker shows your real approval odds across lenders instantly.",
  },
  {
    category: "Eligibility",
    q: "Can I get a loan if I'm self-employed?",
    a: "Absolutely. We have dedicated products for self-employed professionals, business owners and freelancers — including business loans, OD/CC and MSME finance with flexible income proof options.",
  },
  {
    category: "Process",
    q: "How quickly can I get my loan disbursed?",
    a: "Personal and gold loans can be disbursed within 24 hours. Home and business loans typically take 3–7 working days. Our digital-first process and doorstep documentation dramatically cut turnaround time.",
  },
  {
    category: "Process",
    q: "What documents will I need?",
    a: "Standard KYC (PAN, Aadhaar), income proof (salary slips / ITR), bank statements and a passport-size photograph. For secured loans, property/asset documents are additionally required. Your RM shares a custom checklist.",
  },
  {
    category: "Process",
    q: "Do you offer doorstep service across India?",
    a: "Yes. We currently provide doorstep documentation collection in 50+ cities and process loans digitally pan-India from our 12 branch offices.",
  },
  {
    category: "Rates",
    q: "Will applying through Kankoni increase my interest rate?",
    a: "Never. You get the exact same rate the bank offers — and often lower, because we negotiate on your behalf using our aggregated volume. The rate you see is the rate you pay.",
  },
  {
    category: "Security",
    q: "Is my data secure with Kankoni Finsol?",
    a: "We are ISO 27001 certified and SSL-protected. Your data is encrypted at rest and in transit, access is role-based with full audit logs, and we never share your information without explicit consent.",
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  date: string;
  author: string;
  accent: "royal" | "gold" | "navy";
}

export const blogPosts: BlogPost[] = [
  {
    slug: "home-loan-interest-rates-2025",
    title: "Home Loan Interest Rates in 2025: The Complete Guide",
    excerpt:
      "RBI repo dynamics, the best banks right now, and how to negotiate 0.5% below the card rate.",
    category: "Loan Guides",
    readTime: 8,
    date: "2025-01-12",
    author: "Kankoni Research",
    accent: "navy",
  },
  {
    slug: "cibil-score-750-guide",
    title: "How to Take Your CIBIL Score From 650 to 750 in 90 Days",
    excerpt:
      "Five actionable steps — utilisation, mix, dispute resolution and the myths that hold people back.",
    category: "Credit Score",
    readTime: 6,
    date: "2025-01-08",
    author: "Anjali Mehta",
    accent: "royal",
  },
  {
    slug: "tax-saving-2025",
    title: "Tax-Saving Investments Under ₹1.5 Lakh: Ranked for 2025",
    excerpt:
      "ELSS vs PPF vs NPS — the data-driven comparison that maximises your Section 80C benefit.",
    category: "Tax Saving",
    readTime: 7,
    date: "2025-01-04",
    author: "Kankoni Research",
    accent: "gold",
  },
  {
    slug: "emi-decoded",
    title: "EMI Decoded: The Math That Banks Don't Show You",
    excerpt:
      "Understand principal, interest and amortisation — and why tenure isn't always your friend.",
    category: "EMI Guide",
    readTime: 5,
    date: "2024-12-28",
    author: "Rahul Khanna",
    accent: "royal",
  },
  {
    slug: "msme-loan-schemes",
    title: "5 Government Loan Schemes Every MSME Owner Must Know",
    excerpt:
      "From CGTMSE to PMMY — the schemes that fund your business without collateral.",
    category: "Business Finance",
    readTime: 6,
    date: "2024-12-20",
    author: "Kankoni Research",
    accent: "navy",
  },
  {
    slug: "balance-transfer-right-time",
    title: "When Is the Right Time for a Balance Transfer?",
    excerpt:
      "A simple break-even formula that tells you exactly how much you'll save — and when not to switch.",
    category: "Loan Guides",
    readTime: 5,
    date: "2024-12-14",
    author: "Sneha Reddy",
    accent: "gold",
  },
];

export const trustStats = [
  { label: "Banking Partners", value: 100, suffix: "+", icon: Landmark },
  { label: "Happy Customers", value: 10000, suffix: "+", icon: User },
  { label: "Loans Facilitated", value: 500, prefix: "₹", suffix: " Cr+", icon: Wallet },
  { label: "Customer Satisfaction", value: 98, suffix: "%", icon: ShieldCheck },
];

export const whyChooseUs = [
  { icon: TrendingUp, title: "Lowest Interest Rates", desc: "We negotiate with 100+ banks using aggregated volume to secure rates often below the card rate." },
  { icon: Rocket, title: "Fast Approval", desc: "AI-driven eligibility and digital-first process mean approvals in hours, not weeks." },
  { icon: Building2, title: "100+ Banks Compared", desc: "One application, multiple lenders. See real offers side-by-side and pick the best." },
  { icon: User, title: "Dedicated Relationship Manager", desc: "A single expert owns your case end-to-end — no call-centre merry-go-round." },
  { icon: HardHat, title: "Doorstep Service", desc: "Document collection and verification at your home or office in 50+ cities." },
  { icon: CreditCard, title: "100% Digital", desc: "Paperless, presence-less, cashless. Apply from anywhere, track in real-time." },
  { icon: ShieldCheck, title: "Secure Documentation", desc: "ISO 27001 certified, 256-bit encrypted, role-based access with full audit logs." },
  { icon: Brain, title: "Expert Advice", desc: "Certified financial planners and chartered accountants on call for every customer." },
];

export const certifications = [
  "ISO 27001 Certified",
  "SSL Protected",
  "Data Encrypted",
  "RBI Compliant",
  "SEBI Registered",
  "IRDAI Licensed",
];

export const companyInfo = {
  name: "Kankoni Finsol",
  tagline: "Your Complete Financial Partner",
  phone: "+91 72040 12527",
  phoneHref: "tel:+917204012527",
  whatsapp: "917204012527",
  email: "contact@kankonifinsol.com",
  address: "18/8, Vishal Tower, Mizzaina Floor, Door no MZ210, 16th Cross Road, Near SR Nagar Police Station, Sampangi Rama Nagar, Bengaluru, Karnataka 560027",
  hours: "Mon–Sat, 9:30 AM – 7:00 PM IST",
  gst: "27AABCK1234F1Z5",
};

export const footerLinks = {
  products: {
    title: "Loan Products",
    links: [
      "Personal Loan", "Business Loan", "Home Loan", "Loan Against Property",
      "Working Capital Loan", "Machinery Loan", "Used Car Loan", "New Car Loan", "Gold Loan",
    ],
  },
  cards: {
    title: "Cards & Insurance",
    links: ["Credit Cards", "Life Insurance", "Health Insurance", "Motor Insurance", "Term Plans"],
  },
  investments: {
    title: "Investments",
    links: ["Mutual Funds", "Investment Products", "SIP Plans", "Fixed Deposits", "Bonds & NCDs"],
  },
  resources: {
    title: "Resources",
    links: ["Blogs", "EMI Calculator", "Eligibility Checker", "Bank Partners", "Customer Stories", "FAQs"],
  },
  company: {
    title: "Company",
    links: ["About Us", "Careers", "Contact", "Privacy Policy", "Terms of Service"],
  },
};

/* ---------------- Loan-type EMI presets ---------------- */
export interface LoanPreset {
  id: string;
  name: string;
  icon: LucideIcon;
  rateMin: number;
  rateMax: number;
  rateDefault: number;
  amountMin: number;
  amountMax: number;
  amountDefault: number;
  tenureMin: number;
  tenureMax: number;
  tenureDefault: number;
  accent: "royal" | "gold" | "navy";
  blurb: string;
}

export const loanPresets: LoanPreset[] = [
  {
    id: "home",
    name: "Home Loan",
    icon: Home,
    rateMin: 8, rateMax: 12, rateDefault: 8.35,
    amountMin: 500000, amountMax: 50000000, amountDefault: 5000000,
    tenureMin: 5, tenureMax: 30, tenureDefault: 20,
    accent: "navy",
    blurb: "Longest tenure, lowest rates. Fund your dream home.",
  },
  {
    id: "personal",
    name: "Personal Loan",
    icon: User,
    rateMin: 10, rateMax: 24, rateDefault: 10.49,
    amountMin: 50000, amountMax: 4000000, amountDefault: 800000,
    tenureMin: 1, tenureMax: 7, tenureDefault: 4,
    accent: "royal",
    blurb: "Unsecured, instant. Money for every milestone.",
  },
  {
    id: "car",
    name: "Car Loan",
    icon: CarFront,
    rateMin: 9, rateMax: 16, rateDefault: 9.2,
    amountMin: 100000, amountMax: 2000000, amountDefault: 900000,
    tenureMin: 1, tenureMax: 8, tenureDefault: 5,
    accent: "gold",
    blurb: "Drive home your new or used car today.",
  },
  {
    id: "business",
    name: "Business Loan",
    icon: Briefcase,
    rateMin: 11, rateMax: 22, rateDefault: 14,
    amountMin: 500000, amountMax: 50000000, amountDefault: 1500000,
    tenureMin: 1, tenureMax: 5, tenureDefault: 3,
    accent: "royal",
    blurb: "Fuel your enterprise with collateral-free capital.",
  },
  {
    id: "lap",
    name: "Loan Against Property",
    icon: Building2,
    rateMin: 9, rateMax: 14, rateDefault: 9.5,
    amountMin: 1000000, amountMax: 250000000, amountDefault: 20000000,
    tenureMin: 3, tenureMax: 20, tenureDefault: 12,
    accent: "navy",
    blurb: "High-value liquidity from your property.",
  },
];

/* ---------------- Blog full content (for detail modal) ---------------- */
export const blogContent: Record<string, string> = {
  "home-loan-interest-rates-2025": `The RBI's repo rate decisions in 2025 continue to shape home loan pricing. With most major banks now linking their home loan rates to external benchmarks, your EMI moves in lockstep with policy rates.

## What's happening with rates right now
Home loan interest rates in 2025 start as low as 8.35% p.a. for salaried borrowers with CIBIL scores above 800. The spread between the card rate and the effective rate has narrowed, but most banks still offer 0.25–0.50% concessions during festive seasons or for women borrowers.

## How to negotiate below the card rate
1. **Leverage your CIBIL score** — A score above 800 gives you genuine negotiating power. Quote competing offers.
2. **Compare 3+ lenders** — Banks match rates when they see a rival offer in writing.
3. **Ask for processing-fee waivers** — Often easier to secure than a rate cut and saves ₹10,000–₹50,000 upfront.
4. **Consider balance transfer** — If your current rate is 9.5%+, a transfer can save lakhs over the tenure.

## The Kankoni advantage
Because we aggregate volume across 100+ banks, we negotiate rates that individual borrowers rarely access. Our average customer saves 0.4% on their home loan rate — translating to ₹6–12 lakh on a ₹50 lakh, 20-year loan.`,
  "cibil-score-750-guide": `Your CIBIL score is the single biggest factor in determining the interest rate you pay. Moving from 650 to 750 can reduce your borrowing cost by 1–2%, saving lakhs over a loan's life.

## Why 750 matters
Most prime lenders use 750 as the threshold for their best rates. Below 750, you're often shifted to a higher-risk bucket with steeper pricing.

## Five steps to 750 in 90 days

### 1. Reduce credit utilisation to under 30%
If your credit card limit is ₹2 lakh, never carry a balance above ₹60,000 into the billing cycle. High utilisation signals over-dependence on credit.

### 2. Never miss a due date — even by a day
A single 30-day-late mark can drop your score by 50–80 points. Set auto-pay for at least the minimum due.

### 3. Dispute errors on your report
Pull your report from all four bureaus (CIBIL, Experian, Equifax, CRIF). Incorrect "written-off" or "settled" flags are common and devastating. Raise disputes immediately.

### 4. Maintain a healthy credit mix
A combination of one revolving account (credit card) and one instalment account (personal or auto loan) signals responsible usage.

### 5. Don't close old accounts
The age of your oldest credit line contributes to your score. Keep old cards active with small, occasional transactions.

## The myth that holds people back
Many believe checking their own score hurts it. It doesn't. Soft enquiries (your own checks) have zero impact. Only hard enquiries (lender checks when you apply) matter — and even those recover within 3–6 months.`,
  "tax-saving-2025": `Section 80C lets you deduct up to ₹1.5 lakh from your taxable income every year. The question isn't whether to use it — it's which instrument fits your goals.

## The five main contenders

### ELSS Mutual Funds
- **Lock-in:** 3 years (shortest of all 80C options)
- **Returns:** Market-linked, historically 12–15% over 5+ years
- **Risk:** Equity risk — suitable for long-term horizons
- **Best for:** Young earners with 7+ year horizons who want growth + tax savings

### Public Provident Fund (PPF)
- **Lock-in:** 15 years (partial withdrawal after 7 years)
- **Returns:** Government-set, currently 7.1% p.a. (tax-free)
- **Risk:** Sovereign-backed, capital-protected
- **Best for:** Conservative savers building a retirement corpus

### National Pension System (NPS)
- **Lock-in:** Until age 60 (partial withdrawal allowed)
- **Returns:** Market-linked (equity + debt), historically 10–12%
- **Extra benefit:** Additional ₹50,000 deduction under 80CCD(1B)
- **Best for:** Long-horizon retirement planning

### 5-Year Tax-Saver Fixed Deposit
- **Lock-in:** 5 years
- **Returns:** 6.5–7.5% p.a. (taxable)
- **Risk:** Capital-protected (DICGC insured up to ₹5 lakh)
- **Best for:** Risk-averse investors who want guaranteed returns

### Life Insurance Premium
- **Lock-in:** Policy term
- **Returns:** Low (4–6% IRR) — insurance is not an investment
- **Best for:** Only if you genuinely need life cover; pure term plans are cheaper

## The verdict
For most investors under 45, a **monthly SIP in ELSS** maximises both tax savings and long-term wealth. The 3-year lock-in is the shortest in the 80C universe, and the power of compounding equity returns over 10+ years is unmatched.

## Beyond 80C
Don't stop at ₹1.5 lakh. NPS gives you another ₹50,000 under 80CCD(1B). Health insurance premiums are deductible under 80D (up to ₹25,000, or ₹50,000 for senior parents). Stack these intelligently and you can save ₹1 lakh+ in taxes annually while building real wealth.`,

  "emi-decoded": `Your EMI isn't just a monthly number — it's a carefully engineered blend of principal and interest that shifts dramatically over your loan's life. Understanding it can save you lakhs.

## The EMI formula, demystified
EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1)

Where P = principal, r = monthly interest rate (annual rate ÷ 12 ÷ 100), and n = number of months.

## The hidden truth: interest is front-loaded
In the first year of a 20-year home loan, nearly 80% of each EMI goes toward interest. Only in the later years does the principal repayment dominate. This is why prepaying early saves dramatically more than prepaying late.

### Example: ₹50 lakh home loan @ 8.5% for 20 years
- **EMI:** ₹43,391/month
- **Total payment over 20 years:** ₹1.04 crore (you pay more in interest than the principal itself!)
- **Year 1:** ~78% of EMI is interest
- **Year 15:** ~45% of EMI is interest
- **Year 20:** ~8% of EMI is interest

## Tenure isn't always your friend
A longer tenure reduces your EMI but inflates your total interest dramatically. The same ₹50 lakh loan over 30 years instead of 20:
- EMI drops from ₹43,391 to ₹38,446 (₹4,945 less/month)
- But total interest jumps from ₹54 lakh to ₹88 lakh (₹34 lakh more!)

## The prepayment superpower
Even one extra EMI per year can cut a 20-year loan to 16 years. A 10% lump-sum prepayment in year 3 can save 3–4 years of tenure. Always direct prepayments toward **principal reduction**, not "advance EMIs".

## The Kankoni approach
We don't just find you the lowest rate — we model your amortisation, identify the optimal tenure for your cash flow, and build a prepayment strategy that saves you lakhs. Use our EMI calculator with the amortisation chart to see exactly where your money goes.`,

  "msme-loan-schemes": `India runs over 63 million MSMEs, yet most owners don't know the government has earmarked thousands of crores in collateral-free credit specifically for them. Here are five schemes every small business owner should know.

## 1. CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises)
- **What:** Collateral-free loans up to ₹5 crore
- **Who:** Micro and small enterprises (manufacturing & services)
- **Coverage:** 75–85% of the loan amount is guaranteed by the government
- **Key benefit:** No collateral, no third-party guarantee needed
- **How to access:** Through any scheduled commercial bank — Kankoni can fast-track your application

## 2. PMMY / Mudra Loan
- **What:** Loans up to ₹10 lakh in three categories
  - Shishu (up to ₹50,000) — for startups
  - Kishore (₹50,001–₹5 lakh) — for early-stage businesses
  - Tarun (₹5 lakh–₹10 lakh) — for growth-stage ventures
- **Who:** Non-corporate, non-farm small businesses
- **Key benefit:** Extremely low interest rates, minimal documentation

## 3. Stand-Up India
- **What:** Loans between ₹10 lakh and ₹1 crore
- **Who:** SC/ST and women entrepreneurs setting up greenfield enterprises
- **Key benefit:** 7-year tenure with a moratorium of up to 18 months

## 4. PSB Loans in 59 Minutes
- **What:** In-principle approval for loans up to ₹5 crore in under an hour
- **Who:** MSMEs with a GST, income-tax and bank statement history
- **Key benefit:** Speed — the platform connects directly to PSU banks

## 5. SIDBI Small Finance
- **What:** Direct financing from the Small Industries Development Bank
- **Who:** Established MSMEs needing growth capital
- **Key benefit:** Sector-specific expertise and longer tenures

## How Kankoni helps MSMEs
We assess your Udyam registration, GST returns and financials to match you with the right scheme and the right bank — often securing blended structures (e.g. a CGTMSE-covered term loan + an overdraft facility) that no single bank would proactively offer. Our MSME specialists handle the paperwork end-to-end.`,

  "balance-transfer-right-time": `A balance transfer can save you lakhs — or cost you money if done wrong. Here's the simple break-even formula that tells you exactly when to switch.

## When a balance transfer makes sense
A transfer is worth it when the interest savings over the remaining tenure exceed the total cost of switching.

### The break-even formula
**Net savings = (Current rate − New rate) × Outstanding principal × Remaining years − [Processing fee + Legal/valuation charges + Stamp duty]**

If net savings > 0, switch. If < 0, don't.

### A worked example
- Outstanding home loan: ₹40 lakh
- Current rate: 9.8% p.a.
- New rate offered: 8.5% p.a.
- Remaining tenure: 18 years
- Switching cost: ₹40,000 (processing + legal + stamp)

**Interest saved per year:** (9.8% − 8.5%) × ₹40 lakh = ₹52,000
**Total savings over 18 years:** ~₹5.2 lakh (reducing balance, so actual is ~₹3.8 lakh)
**Net savings:** ₹3.8 lakh − ₹40,000 = **₹3.4 lakh** → switch!

## When NOT to transfer
1. **Less than 3 years remaining** — the switching cost often exceeds the savings
2. **Your current rate is within 0.3% of the best offer** — switching costs eat the gain
3. **You plan to prepay within 2 years** — you'll close the loan before realising savings
4. **Your CIBIL has dropped since origination** — you may not qualify for the best new rate

## Hidden costs to watch for
- **Foreclosure charges** on your current loan (RBI bars these on floating-rate home loans, but fixed-rate loans may charge 2–4%)
- **Processing fee** on the new loan (0.25–0.50% of the outstanding)
- **Legal and valuation charges** (₹5,000–₹15,000)
- **Stamp duty** on the new mortgage (varies by state)
- **Top-up opportunity** — a transfer often unlocks a top-up loan at the same low rate

## The Kankoni transfer service
We compute your exact break-even, negotiate the switching-cost waivers, handle all documentation, and often secure a top-up facility at the new lower rate. Our average customer saves ₹4–8 lakh on a balance transfer — and pays nothing for the service.`,

};

export function getBlogContent(slug: string): string {
  return blogContent[slug] || `This is a comprehensive guide brought to you by Kankoni Finsol's research desk. Our financial experts break down the essentials, share actionable strategies and help you make smarter money decisions.

In this article, we cover the fundamentals, real-world examples specific to the Indian context, and practical steps you can take today. Whether you're a first-time borrower or a seasoned investor, the insights here are designed to save you money and time.

**Key takeaways:**
- Understand the core concepts and how they apply to your situation
- Compare your options across 100+ banks with a single application
- Speak to a dedicated relationship manager for personalised guidance

Ready to act on what you've learned? Use our AI eligibility checker or apply now for instant offers from India's leading banks.`;
}

/* ---------------- Service comparison matrix ---------------- */
export interface CompareFeature {
  feature: string;
  // values keyed by loan-type id (home, personal, car, business, lap)
  values: Record<string, string | boolean>;
}

export const compareLoanTypes = [
  { id: "home", name: "Home Loan", icon: Home },
  { id: "personal", name: "Personal Loan", icon: User },
  { id: "car", name: "Car Loan", icon: CarFront },
  { id: "business", name: "Business Loan", icon: Briefcase },
  { id: "lap", name: "Loan Against Property", icon: Building2 },
];

export const compareFeatures: CompareFeature[] = [
  {
    feature: "Interest rates",
    values: { home: "8.35% p.a.", personal: "9.99% p.a.", car: "9.20% p.a.", business: "14.00% p.a.", lap: "9.50% p.a." },
  },
  {
    feature: "Maximum amount",
    values: { home: "₹15 Crore", personal: "₹1 Crore", car: "₹1 Crore", business: "₹5 Crore", lap: "₹25 Crore" },
  },
  {
    feature: "Tenure",
    values: { home: "Up to 30 yrs", personal: "1–7 yrs", car: "Up to 8 yrs", business: "1–5 yrs", lap: "Up to 20 yrs" },
  },
  {
    feature: "Collateral required",
    values: { home: true, personal: false, car: true, business: false, lap: true },
  },
  {
    feature: "Disbursal speed",
    values: { home: "3–7 days", personal: "24 hours", car: "Same day", business: "48 hours", lap: "5–10 days" },
  },
  {
    feature: "Tax benefit",
    values: { home: "§80C + §24", personal: false, car: false, business: "Interest deductible", lap: "If business use" },
  },
  {
    feature: "Prepayment charges",
    values: { home: "Nil", personal: "Nil", car: "Nil", business: "2–4%", lap: "Nil" },
  },
  {
    feature: "Balance transfer",
    values: { home: true, personal: true, car: true, business: true, lap: true },
  },
  {
    feature: "Top-up facility",
    values: { home: true, personal: false, car: false, business: true, lap: true },
  },
  {
    feature: "Doorstep service",
    values: { home: true, personal: true, car: true, business: true, lap: true },
  },
];

/* ---------------- Employees (for admin lead assignment) ---------------- */
export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
}

export const employees: Employee[] = [
  { id: "emp1", name: "Rajesh Kankoni", role: "Senior RM", email: "rajesh@kankonifinsol.com", phone: "+91 72040 12527", avatar: "RK" },
  { id: "emp2", name: "Anjali Mehta", role: "Lending Head", email: "anjali@kankonifinsol.com", phone: "+91 72040 12527", avatar: "AM" },
  { id: "emp3", name: "Vikram Shah", role: "Credit Specialist", email: "vikram@kankonifinsol.com", phone: "+91 72040 12527", avatar: "VS" },
  { id: "emp4", name: "Sneha Reddy", role: "Wealth Advisor", email: "sneha@kankonifinsol.com", phone: "+91 72040 12527", avatar: "SR" },
  { id: "emp5", name: "Amit Patel", role: "MSME RM", email: "amit@kankonifinsol.com", phone: "+91 72040 12527", avatar: "AP" },
  { id: "emp6", name: "Priya Iyer", role: "Home Loan RM", email: "priya@kankonifinsol.com", phone: "+91 72040 12527", avatar: "PI" },
];



/* ---------------- Career / Job listings ---------------- */
export const milestones = [
  { year: "2018", title: "The beginning", desc: "Kankoni Finsol founded in Mumbai with a mission to democratise premium financial services for every Indian." },
  { year: "2020", title: "100+ bank partnerships", desc: "Crossed our first century of banking partnerships, becoming one of India's most-connected loan aggregators." },
  { year: "2022", title: "₹100 Cr disbursed", desc: "Facilitated over ₹100 crore in loans, earning a 4.9★ Google rating from 10,000+ happy customers." },
  { year: "2023", title: "AI-powered platform", desc: "Launched our AI eligibility engine and digital-first doorstep service across 50+ cities pan-India." },
  { year: "2025", title: "₹500 Cr+ & ISO certified", desc: "Facilitated ₹500 crore+ in loans, achieved ISO 27001 certification and expanded to 12 branch offices." },
];

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  posted: string;
}

export const jobOpenings: JobOpening[] = [
  { id: "job1", title: "Senior Relationship Manager — Loans", department: "Sales & Lending", location: "Mumbai, MH", type: "Full-time", experience: "4–7 years", description: "Own a portfolio of high-value loan clients across home, LAP and business loans. Drive end-to-end disbursal while delivering white-glove service that defines the Kankoni experience.", responsibilities: ["Manage a portfolio of 80+ active loan files from application to disbursal", "Negotiate with 100+ partner banks to secure the best rates for clients", "Conduct client consultations and financial needs analysis", "Maintain disbursal targets and conversion metrics"], requirements: ["4–7 years in retail lending, loan advisory or banking sales", "Deep knowledge of home loans, LAP and business loan products", "Excellent communication and negotiation skills"], posted: "2025-01-10" },
  { id: "job2", title: "Credit Analyst", department: "Credit & Underwriting", location: "Bengaluru, KA", type: "Full-time", experience: "2–5 years", description: "Assess loan applications across product lines, perform financial analysis and risk assessment, and make data-driven recommendations to partner banks.", responsibilities: ["Analyse financial statements, bank statements and credit reports", "Assess borrower creditworthiness and recommend loan structures", "Build and maintain credit risk models"], requirements: ["2–5 years in credit analysis or underwriting", "CA/MBA Finance or equivalent", "Strong Excel and financial modelling skills"], posted: "2025-01-08" },
  { id: "job3", title: "Full-Stack Developer (Next.js)", department: "Technology", location: "Remote / Hybrid — Pune", type: "Full-time", experience: "3–6 years", description: "Build and scale the Kankoni digital platform — from AI-powered eligibility engines to the admin CRM. Work with Next.js, TypeScript, Prisma and the latest fintech tooling.", responsibilities: ["Develop and maintain Next.js 16 features end-to-end", "Build REST APIs and integrate with banking/NBFC partner systems", "Implement AI/LLM-powered features (eligibility, chatbot)"], requirements: ["3–6 years in full-stack web development", "Strong TypeScript, React and Node.js experience", "Experience with Prisma/PostgreSQL/SQLite"], posted: "2025-01-12" },
  { id: "job4", title: "AI/ML Engineer — Financial Products", department: "Technology", location: "Mumbai, MH", type: "Full-time", experience: "3–6 years", description: "Design and deploy ML models that power our AI eligibility engine, credit scoring and personalised loan recommendations.", responsibilities: ["Build and deploy ML models for credit scoring and eligibility", "Fine-tune LLMs for financial advisory and chatbot use cases", "Develop recommendation engines for loan product matching"], requirements: ["3–6 years in ML/AI engineering", "Strong Python, PyTorch/TensorFlow skills", "Experience with LLM fine-tuning and RAG pipelines"], posted: "2025-01-05" },
  { id: "job5", title: "Marketing & Growth Lead", department: "Marketing", location: "Mumbai, MH", type: "Full-time", experience: "5–8 years", description: "Own the growth engine — from performance marketing to brand. Drive customer acquisition across digital channels and build Kankoni into India's most trusted financial brand.", responsibilities: ["Design and execute performance marketing campaigns (Google, Meta, LinkedIn)", "Manage SEO, content marketing and social media strategy", "Analyse funnel metrics and optimise CAC/LTV"], requirements: ["5–8 years in growth/marketing, preferably in fintech", "Strong analytical and data-driven approach", "Experience managing ₹1 Cr+ monthly ad budgets"], posted: "2025-01-03" },
  { id: "job6", title: "Operations & Compliance Manager", department: "Operations", location: "Delhi NCR", type: "Full-time", experience: "4–7 years", description: "Ensure smooth operations across document collection, verification and disbursal. Maintain compliance with RBI, SEBI and IRDAI regulations.", responsibilities: ["Manage the loan processing operations team (15+ members)", "Ensure compliance with RBI, SEBI, IRDAI and data protection regulations", "Optimise TAT across the loan lifecycle"], requirements: ["4–7 years in banking operations or compliance", "Deep knowledge of RBI lending guidelines and KYC norms", "Strong process orientation and team management skills"], posted: "2025-01-06" },
  { id: "job7", title: "Customer Success Specialist", department: "Customer Experience", location: "Hyderabad, TS", type: "Full-time", experience: "1–3 years", description: "Be the voice of Kankoni for our customers. Guide borrowers through their loan journey, resolve queries and ensure every interaction reflects our premium service promise.", responsibilities: ["Handle customer queries via phone, email, WhatsApp and chat", "Guide customers through document submission and verification", "Coordinate with RMs and partner banks for status updates"], requirements: ["1–3 years in customer service, preferably in financial services", "Excellent communication in English and Hindi", "Empathy, patience and problem-solving mindset"], posted: "2025-01-09" },
  { id: "job8", title: "Business Development Intern", department: "Sales & Lending", location: "Chennai, TN", type: "Internship", experience: "0–1 year", description: "Kickstart your career in fintech! Support the BD team in market research, lead generation and partner onboarding. A 6-month internship with a strong possibility of a full-time offer.", responsibilities: ["Conduct market research on lending trends and competitor offerings", "Support lead generation and outreach to potential partners", "Assist in preparing pitch decks and sales collateral"], requirements: ["MBA/PGDM student or recent graduate (Finance/Marketing)", "Strong analytical and presentation skills", "Available for 6 months, full-time"], posted: "2025-01-11" },
];

export interface OfficeLocation {
  id: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  isHQ: boolean;
  mapSrc: string;
  link?: string;
}

export const officeLocations: OfficeLocation[] = [
  {
    id: "bangalore-main",
    city: "Bengaluru Main Office (HQ)",
    address: "18/8, Vishal Tower, Mizzaina Floor, Door no MZ210, 16th Cross Road, Near SR Nagar Police Station, Sampangi Rama Nagar, Bengaluru, Karnataka 560027",
    phone: "7204012527",
    email: "contact@kankonifinsol.com",
    hours: "Mon–Sat, 9:30 AM – 7:00 PM IST",
    isHQ: true,
    link: "https://maps.app.goo.gl/a7xFQquqELzLB1v1A",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.134475926789!2d77.59122597505274!3d12.963245687351316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15d9a156a599%3A0x639b6ebf7aaa77cd!2sKankoni%20Fin%20Sol!5e0!3m2!1sen!2sin!4v1783512237802!5m2!1sen!2sin",
  },
  {
    id: "vaniyambadi",
    city: "Vaniyambadi (Tamil Nadu)",
    address: "No.1302, 1st floor, PJN Road, Shakirabad, Vaniyambadi 635751",
    phone: "9626424142",
    email: "contact@kankonifinsol.com",
    hours: "Mon–Sat, 9:30 AM – 7:00 PM IST",
    isHQ: false,
    link: "https://maps.app.goo.gl/zYPUiab9kFoUJv8g6",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d243.27907692620786!2d78.61700298094597!3d12.683029301913242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDQwJzU4LjkiTiA3OMKwMzcnMDEuNSJF!5e0!3m2!1sen!2sin!4v1783503263839!5m2!1sen!2sin",
  },
  {
    id: "electronic-city",
    city: "Electronic City (Bengaluru)",
    address: "193, 1st floor, Konappana Agrahara, Electronic City, Konappana Agrahara, Karnataka 560100",
    phone: "9036240631",
    email: "contact@kankonifinsol.com",
    hours: "Mon–Sat, 9:30 AM – 7:00 PM IST",
    isHQ: false,
    link: "https://maps.app.goo.gl/r4hpDqR9EeUownwx5",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3889.8349303147893!2d77.66344699999999!3d12.853935999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDUxJzE0LjIiTiA3N8KwMzknNDguNCJF!5e0!3m2!1sen!2sin!4v1783511811325!5m2!1sen!2sin",
  },
  {
    id: "chennai",
    city: "Chennai Branch (Tamil Nadu)",
    address: "No : 100, Sathyamoorthy Nagar, Fish Market Street, Poonamallee High Road, Maduravayal, Chennai - 600 095. Near Chennai Ford Car Service Centre.",
    phone: "8072859827",
    email: "contact@kankonifinsol.com",
    hours: "Mon–Sat, 9:30 AM – 7:00 PM IST",
    isHQ: false,
    link: "https://maps.app.goo.gl/cUbb8JMmdLhLWkt18",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3886.517279312224!2d80.17092587507808!3d13.066369387257764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDAzJzU4LjkiTiA4MMKwMTAnMjQuNiJF!5e0!3m2!1sen!2sin!4v1783512142486!5m2!1sen!2sin",
  },
];
