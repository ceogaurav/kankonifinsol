"use client";

import { motion } from "framer-motion";
import {
  FileText, GitCompare, BadgeCheck, Wallet, ArrowRight,
} from "lucide-react";
import { SectionHeading, Reveal, staggerContainer, staggerItem } from "@/components/site/primitives";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Apply in 60 seconds",
    desc: "Fill one simple application with your basic details. No paperwork, no branch visits — start entirely online from your phone or laptop.",
    accent: "royal",
    duration: "60 seconds",
  },
  {
    icon: GitCompare,
    step: "02",
    title: "Compare 100+ banks",
    desc: "Our engine instantly fetches real offers from 100+ banks and NBFCs. See interest rates, EMIs and tenure side-by-side, transparently.",
    accent: "gold",
    duration: "Instant",
  },
  {
    icon: BadgeCheck,
    step: "03",
    title: "Get approved fast",
    desc: "Your dedicated relationship manager negotiates the best rate, collects documents at your doorstep and pushes your file to approval.",
    accent: "royal",
    duration: "24–72 hours",
  },
  {
    icon: Wallet,
    step: "04",
    title: "Money in your account",
    desc: "Once approved, the loan amount is disbursed directly to your bank account. Track every stage in real-time on your dashboard.",
    accent: "gold",
    duration: "Same day*",
  },
];

const accentBg: Record<string, string> = {
  royal: "bg-royal/10 text-royal group-hover:bg-royal group-hover:text-white",
  gold: "bg-gold/15 text-gold group-hover:bg-gold group-hover:text-navy-deep",
};

export function HowItWorks() {
  return (
    <section id="process" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Four steps · Zero friction"
          title={
            <>
              From application to <span className="text-gradient-gold">disbursal</span>, simplified
            </>
          }
          description="A premium, fully-digital journey designed to get you funded faster than any bank can on its own. Here's exactly how it works."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-14"
        >
          {/* Connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-12 hidden h-0.5 origin-left bg-gradient-to-r from-royal via-gold to-royal lg:block"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                variants={staggerItem}
                className="group relative flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                {/* Step circle */}
                <div className="relative z-10 mb-5">
                  <div className={`grid h-24 w-24 place-items-center rounded-3xl border border-border/60 bg-card/70 backdrop-blur transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-premium ${i % 2 === 0 ? "group-hover:border-royal/40" : "group-hover:border-gold/40"}`}>
                    <s.icon className={`h-9 w-9 transition-colors ${i % 2 === 0 ? "text-royal group-hover:text-royal" : "text-gold group-hover:text-gold"}`} />
                    <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-royal-gradient text-[10px] font-bold text-white shadow-royal-glow">
                      {s.step}
                    </span>
                  </div>
                </div>

                <span className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur">
                  ⏱ {s.duration}
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.desc}</p>

                {/* Arrow between steps (desktop) */}
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-10 hidden h-5 w-5 text-border lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-col items-center justify-center gap-4 rounded-2xl border border-gold/30 bg-gold/5 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-display text-lg font-semibold">Ready to start your journey?</p>
              <p className="text-sm text-muted-foreground">One application. 100+ banks. Lowest rates guaranteed.</p>
            </div>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-royal-gradient px-6 py-3 text-sm font-semibold text-white shadow-royal-glow"
            >
              Start Application <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
