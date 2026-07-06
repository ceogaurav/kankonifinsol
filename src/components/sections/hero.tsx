"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Phone, MessageCircle, CalendarClock, ShieldCheck,
  TrendingUp, ArrowRight, BadgeCheck, Star,
} from "lucide-react";
import { MagneticButton, Reveal, AnimatedCounter } from "@/components/site/primitives";
import { companyInfo } from "@/lib/site-data";
import { useQuickApply } from "@/lib/quick-apply-store";

const whatsappLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
  "Hi Kankoni Finsol, I'd like to know more about your loan offers."
)}`;

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      {/* Glow base */}
      <div className="absolute inset-8 rounded-[2.5rem] bg-royal-gradient opacity-30 blur-3xl" />

      {/* Orbiting rings */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-[78%] w-[78%] rounded-full border border-border/40">
          <div className="absolute inset-6 rounded-full border border-border/30" />
          <div className="absolute inset-12 rounded-full border border-border/20" />
          {/* orbiting badges */}
          <div className="absolute inset-0 animate-spin-slow">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-border/70 bg-card/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
              <Star className="mr-1 inline h-3 w-3 text-gold" />4.9 Rated
            </span>
          </div>
          <div className="absolute inset-0 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }}>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-border/70 bg-card/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
              <ShieldCheck className="mr-1 inline h-3 w-3 text-royal" />ISO 27001
            </span>
          </div>
        </div>
      </div>

      {/* Center dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="glass-strong rounded-2xl border border-border/60 p-4 shadow-premium">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Loan Approved</p>
              <p className="font-display text-xl font-bold text-gradient-gold">₹24,50,000</p>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-royal/15 text-royal">
              <BadgeCheck className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-3 h-px w-full bg-border/60" />
          {/* mini bar chart */}
          <div className="mt-3 flex items-end gap-1.5">
            {[40, 62, 48, 78, 56, 92, 70].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.7, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 rounded-t bg-gradient-to-t from-royal/40 to-royal"
              />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      </motion.div>

      {/* Floating stat cards */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute left-0 top-12 animate-float"
      >
        <div className="glass-strong rounded-xl border border-border/60 p-3 shadow-premium">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-gold">
              <TrendingUp className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Interest from</p>
              <p className="font-display text-sm font-bold">8.35% p.a.</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.75 }}
        className="absolute right-0 top-1/3 animate-float-slow"
      >
        <div className="glass-strong rounded-xl border border-border/60 p-3 shadow-premium">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Banks compared</p>
          <p className="font-display text-2xl font-bold text-gradient-royal">
            <AnimatedCounter value={100} suffix="+" duration={2} />
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-8 left-1/4 animate-float"
      >
        <div className="glass-strong rounded-xl border border-border/60 p-3 shadow-premium">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-royal/15 text-royal">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Disbursal</p>
              <p className="font-display text-sm font-bold">24 hours</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const openModal = useQuickApply((s) => s.openModal);
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-16 sm:pt-36 lg:pt-44 lg:pb-24"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-mesh" aria-hidden />
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-royal/10 blur-[140px]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8">
        {/* Left: copy */}
        <div className="flex flex-col items-start gap-6 text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              India's Premium Financial Partner
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.2rem]">
              Your Complete
              <br />
              <span className="text-gradient-hero animate-gradient-x">Financial Partner</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Get instant approval from <span className="font-semibold text-foreground">100+ banks</span> with
              a single application. Lowest interest rates, dedicated relationship manager, doorstep service —
              all under one premium platform.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton
                onClick={() => openModal("Personal Loan")}
                className="group inline-flex items-center gap-2 rounded-full bg-royal-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-royal-glow"
              >
                <Sparkles className="h-4 w-4" />
                Apply Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#eligibility"
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur hover:bg-card"
              >
                Check Eligibility
              </MagneticButton>
              <MagneticButton
                as="a"
                href={whatsappLink}
                ariaLabel="Chat on WhatsApp"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-lg"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Expert
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-3.5 text-sm font-semibold text-gold hover:bg-gold/15"
              >
                <CalendarClock className="h-4 w-4" />
                Book Consultation
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-royal" /> ISO 27001 Certified
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-gold" /> SSL Protected
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-royal" /> {companyInfo.phone}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right: visual */}
        <div className="relative">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
