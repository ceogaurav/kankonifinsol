"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Star } from "lucide-react";
import { SectionHeading, Reveal } from "@/components/site/primitives";

interface LoanRow {
  bank: string;
  type: string;
  rate: string;
  processing: string;
  tenure: string;
  benefits: string[];
  best?: boolean;
}

const loans: LoanRow[] = [
  {
    bank: "Kankoni Preferred",
    type: "Home Loan",
    rate: "8.35% – 9.10%",
    processing: "Nil",
    tenure: "Up to 30 yrs",
    benefits: ["Zero prepayment charges", "Free legal vetting", "Dedicated RM", "PMAY eligible"],
    best: true,
  },
  {
    bank: "HDFC Bank",
    type: "Personal Loan",
    rate: "Starting 9.99%",
    processing: "Up to 2.50%",
    tenure: "Up to 6 yrs",
    benefits: ["10-second disbursal for customers", "Flexible repayment", "No hidden charges"],
  },
  {
    bank: "ICICI Bank",
    type: "Personal Loan",
    rate: "Starting 9.99%",
    processing: "Up to 2.50%",
    tenure: "Up to 6 yrs",
    benefits: ["Instant approval", "Minimal documentation", "Top-up facility"],
  },
  {
    bank: "Axis Bank",
    type: "Personal Loan",
    rate: "Starting 13.00%",
    processing: "Up to 2.00%",
    tenure: "Up to 5 yrs",
    benefits: ["Quick disbursal", "Balance transfer", "Special rates for salary accounts"],
  },
  {
    bank: "Aditya Birla",
    type: "Personal Loan",
    rate: "Starting 13.00%",
    processing: "Up to 2.00%",
    tenure: "Up to 5 yrs",
    benefits: ["Customized offers", "Simple process", "High loan amount"],
  },
  {
    bank: "IDFC First Bank",
    type: "Personal Loan",
    rate: "Starting 9.99%",
    processing: "Up to 2.00%",
    tenure: "Up to 5 yrs",
    benefits: ["Paperless journey", "Competitive rates", "Instant funds"],
  },
];

export function CompareLoans() {
  return (
    <section id="compare" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Side-by-side · Transparent"
          title={
            <>
              Compare loans <span className="text-gradient-royal">across 100+ banks</span>
            </>
          }
          description="No more juggling tabs. See interest rates, processing fees, tenure and benefits compared transparently — then apply to the best one in a click."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur shadow-premium">
            <div className="overflow-x-auto premium-scrollbar">
              <table className="w-full min-w-[820px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-background/40 text-left">
                    <th className="p-5 font-semibold">Lender</th>
                    <th className="p-5 font-semibold">Interest Rate</th>
                    <th className="p-5 font-semibold">Processing Fee</th>
                    <th className="p-5 font-semibold">Tenure</th>
                    <th className="p-5 font-semibold">Key Benefits</th>
                    <th className="p-5 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((row, i) => (
                    <motion.tr
                      key={row.bank}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className={`border-b border-border/40 transition-colors hover:bg-accent/40 ${
                        row.best ? "bg-gold/5" : ""
                      }`}
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <span className={`grid h-10 w-10 place-items-center rounded-xl text-xs font-bold ${row.best ? "bg-royal-gradient text-white" : "bg-royal/10 text-royal"}`}>
                            {row.bank.slice(0, 2).toUpperCase()}
                          </span>
                          <div>
                            <p className="font-semibold leading-tight">{row.bank}</p>
                            <p className="text-xs text-muted-foreground">{row.type}</p>
                          </div>
                          {row.best && (
                            <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
                              <Star className="h-2.5 w-2.5 fill-gold" /> Best
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-5">
                        <span className={`font-semibold ${row.best ? "text-gradient-gold" : ""}`}>{row.rate}</span>
                      </td>
                      <td className="p-5 text-muted-foreground">{row.processing}</td>
                      <td className="p-5 text-muted-foreground">{row.tenure}</td>
                      <td className="p-5">
                        <ul className="space-y-1">
                          {row.benefits.map((b) => (
                            <li key={b} className="flex items-center gap-1.5 text-xs text-foreground/80">
                              <Check className="h-3 w-3 shrink-0 text-royal" /> {b}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-5 text-right">
                        <a
                          href="#contact"
                          className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                            row.best
                              ? "bg-royal-gradient text-white shadow-royal-glow"
                              : "border border-border/70 bg-background/50 hover:border-royal/50 hover:text-royal"
                          }`}
                        >
                          Apply <ArrowRight className="h-3 w-3" />
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            * Rates are indicative and subject to bank approval. Final offer shared by your relationship manager after profile assessment.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
