"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Check, FileText, Award, ListChecks, ArrowRight, Clock,
  ShieldCheck, TrendingUp, Users, Sparkles, Calculator,
} from "lucide-react";
import { services, type Service } from "@/lib/site-data";
import { useQuickApply } from "@/lib/quick-apply-store";

interface ProductDetail {
  eligibility: string[];
  documents: string[];
  process: { step: string; desc: string }[];
  benefits: string[];
}

/** Generate detailed, sensible content per service. */
function getDetail(s: Service): ProductDetail {
  const baseDocs = ["PAN Card", "Aadhaar Card", "Address proof (Voter ID / Passport)", "Latest passport-size photograph"];

  switch (s.slug) {
    case "personal-loan":
      return {
        eligibility: ["Age 21–60 years", "Salaried with ₹15,000+ net income", "CIBIL score 685+", "Minimum 1 year work experience", "Indian resident"],
        documents: [...baseDocs, "Last 3 months salary slips", "Form 16 (latest)", "Last 6 months bank statements"],
        process: [
          { step: "Apply online", desc: "Fill the 60-second application with basic details." },
          { step: "Get matched", desc: "Our engine compares 100+ banks instantly." },
          { step: "Submit docs", desc: "Doorstep document collection by your RM." },
          { step: "Disbursal", desc: "Money in your account within 24 hours." },
        ],
        benefits: ["No collateral required", "Same-day approval", "Flexible tenure 1–7 years", "No foreclosure charges"],
      };
    case "home-loan":
      return {
        eligibility: ["Age 21–65 years", "Salaried or self-employed", "Net income ₹25,000+", "CIBIL score 750+", "Property must be approved"],
        documents: [...baseDocs, "Last 6 months salary slips / 2 yrs ITR", "Form 16 / Audited financials", "6 months bank statements", "Property documents (sale agreement, NOC, approved plan)"],
        process: [
          { step: "Apply", desc: "Submit application with property details." },
          { step: "Legal & technical", desc: "Free property valuation and legal vetting." },
          { step: "Sanction", desc: "Receive sanction letter in 3–5 days." },
          { step: "Disbursal", desc: "Funds released to seller/builder." },
        ],
        benefits: ["Lowest rates from 8.35% p.a.", "Tenure up to 30 years", "PMAY subsidy eligible", "Free legal & technical check", "Zero prepayment charges"],
      };
    case "business-loan":
      return {
        eligibility: ["Business vintage 2+ years", "Annual turnover ₹10 Lakh+", "ITR filed for 2 years", "CIBIL score 700+", "Current account in business name"],
        documents: [...baseDocs, "2 years ITR + computation", "Audited financials / P&L", "GST returns (12 months)", "6 months current account statements", "Business continuity proof"],
        process: [
          { step: "Apply", desc: "Share business & financial details." },
          { step: "Assessment", desc: "Bank evaluates your business profile." },
          { step: "Approval", desc: "Get approval within 48–72 hours." },
          { step: "Disbursal", desc: "Funds credited to your current account." },
        ],
        benefits: ["Collateral-free up to ₹1 Cr", "Quick 48-hour approval", "Tax-deductible interest", "Flexible repayment", "Top-up facility"],
      };
    default:
      return {
        eligibility: ["Age 21+ years", "Indian resident", "CIBIL score 700+", "Stable income source", "Valid KYC documents"],
        documents: [...baseDocs, "Income proof (salary slips / ITR)", "Last 6 months bank statements", "Asset/property documents (if applicable)"],
        process: [
          { step: "Apply", desc: "Submit your application online in minutes." },
          { step: "Compare", desc: "See offers from 100+ banks side-by-side." },
          { step: "Approve", desc: "Dedicated RM negotiates the best rate." },
          { step: "Disburse", desc: "Funds credited directly to your account." },
        ],
        benefits: ["Lowest interest rates", "Dedicated relationship manager", "Doorstep documentation", "100% digital process", "End-to-end support"],
      };
  }
}

interface ProductDetailModalProps {
  service: Service | null;
  open: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ service, open, onClose }: ProductDetailModalProps) {
  const openApply = useQuickApply((s) => s.openModal);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const detail = service ? getDetail(service) : null;

  return (
    <AnimatePresence>
      {open && service && detail && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] grid place-items-center bg-navy-deep/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${service.name} details`}
        >
          <motion.div
            initial={{ scale: 0.95, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 24, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-border/60 bg-card shadow-premium"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-background/60 backdrop-blur transition-colors hover:bg-background"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="relative overflow-hidden bg-royal-gradient p-6 text-white sm:p-8">
              <div className="absolute inset-0 bg-mesh opacity-40" />
              <div className="relative flex items-start gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                  <service.icon className="h-7 w-7" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/70">{service.category}</p>
                  <h3 className="font-display text-2xl font-bold leading-tight">{service.name}</h3>
                  <p className="mt-1 text-sm text-white/80">{service.tagline}</p>
                </div>
              </div>
              <div className="relative mt-5 flex flex-wrap gap-2">
                {[
                  { icon: TrendingUp, label: `Rate from ${service.rateFrom}` },
                  { icon: ShieldCheck, label: `Max ${service.maxAmount}` },
                  { icon: Clock, label: service.tenure },
                ].map((b) => (
                  <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur">
                    <b.icon className="h-3.5 w-3.5 text-gold" /> {b.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="max-h-[calc(88vh-13rem)] overflow-y-auto premium-scrollbar p-6 sm:p-8">
              <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>

              {/* Benefits */}
              <div className="mt-6">
                <h4 className="flex items-center gap-2 font-display text-base font-semibold">
                  <Award className="h-4 w-4 text-gold" /> Key Benefits
                </h4>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {detail.benefits.map((b) => (
                    <span key={b} className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background/40 px-3 py-2 text-xs text-foreground/80">
                      <Check className="h-3.5 w-3.5 shrink-0 text-royal" /> {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Eligibility + Documents */}
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <h4 className="flex items-center gap-2 font-display text-base font-semibold">
                    <ListChecks className="h-4 w-4 text-royal" /> Eligibility
                  </h4>
                  <ul className="mt-3 space-y-1.5">
                    {detail.eligibility.map((e) => (
                      <li key={e} className="flex items-start gap-2 text-xs text-foreground/80">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-royal" /> {e}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-display text-base font-semibold">
                    <FileText className="h-4 w-4 text-gold" /> Documents Required
                  </h4>
                  <ul className="mt-3 space-y-1.5">
                    {detail.documents.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs text-foreground/80">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Process */}
              <div className="mt-6">
                <h4 className="flex items-center gap-2 font-display text-base font-semibold">
                  <Sparkles className="h-4 w-4 text-royal" /> How it works
                </h4>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {detail.process.map((p, i) => (
                    <div key={p.step} className="rounded-xl border border-border/50 bg-background/40 p-3">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-royal-gradient text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="mt-2 text-xs font-semibold">{p.step}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-7 flex flex-col gap-3 border-t border-border/50 pt-5 sm:flex-row">
                <button
                  onClick={() => { onClose(); openApply(service.name); }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-royal-gradient py-3.5 text-sm font-semibold text-white shadow-royal-glow"
                >
                  <Sparkles className="h-4 w-4" /> Apply for {service.name}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="#emi"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-background/50 px-6 py-3.5 text-sm font-semibold hover:border-royal/50"
                >
                  <Calculator className="h-4 w-4 text-royal" /> Calculate EMI
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Hook to manage product detail modal state. */
export function useProductDetail() {
  const [service, setService] = React.useState<Service | null>(null);
  const [open, setOpen] = React.useState(false);
  const openDetail = React.useCallback((s: Service) => {
    setService(s);
    setOpen(true);
  }, []);
  const close = React.useCallback(() => setOpen(false), []);
  return { service, open, openDetail, close };
}
