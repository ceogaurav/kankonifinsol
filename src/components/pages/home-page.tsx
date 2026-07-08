"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowRight, MessageCircle, CalendarClock, ShieldCheck, BadgeCheck,
  Phone, TrendingUp, Calculator, GitCompare, Building2, Star, BookOpen,
  Briefcase, Users, Home as HomeIcon, Mail, BarChart3, Award, Heart,
} from "lucide-react";
import { MagneticButton, Reveal, AnimatedCounter, staggerContainer, staggerItem } from "@/components/site/primitives";
import { companyInfo, trustStats } from "@/lib/site-data";
import { useRouter, type PageName } from "@/lib/router-store";
import { useQuickApply } from "@/lib/quick-apply-store";

const whatsappLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent("Hi Kankoni Finsol, I'd like to know more about your loan offers.")}`;

const pageCards: { page: PageName; icon: React.ComponentType<{ className?: string }>; title: string; desc: string; accent: "royal" | "gold" | "navy" }[] = [
  { page: "services", icon: Briefcase, title: "All Services", desc: "22 loan & financial products compared across 100+ banks", accent: "royal" },
  { page: "eligibility", icon: ShieldCheck, title: "AI Eligibility Checker", desc: "Instant approval odds from 100+ banks in seconds", accent: "gold" },
  { page: "emi", icon: Calculator, title: "EMI Calculator", desc: "Interactive sliders, charts & loan-type presets", accent: "royal" },
  { page: "compare", icon: GitCompare, title: "Compare Loans", desc: "Side-by-side rates, fees & feature matrix", accent: "navy" },
  { page: "about", icon: HomeIcon, title: "About Us", desc: "Our story, mission, team & 6 office locations", accent: "gold" },
  { page: "partners", icon: Building2, title: "Banking Partners", desc: "100+ banks & NBFCs in our network", accent: "royal" },
  { page: "reviews", icon: Star, title: "Customer Reviews", desc: "10,000+ verified stories & 4.9★ Google rating", accent: "gold" },
  { page: "resources", icon: BookOpen, title: "Resources & Blogs", desc: "Guides, FAQs, financial tips & newsletter", accent: "navy" },
  { page: "contact", icon: Mail, title: "Contact & Apply", desc: "Apply in 60 seconds, get a callback in 30 mins", accent: "royal" },
  { page: "careers", icon: Users, title: "Careers", desc: "8 open roles across 6 cities. Join our mission", accent: "gold" },
  { page: "admin", icon: BarChart3, title: "Admin Dashboard", desc: "Lead CRM, Kanban pipeline & analytics", accent: "navy" },
];

const accentMap: Record<string, { bg: string; text: string; glow: string }> = {
  royal: { bg: "bg-royal/10 group-hover:bg-royal", text: "text-royal group-hover:text-white", glow: "group-hover:shadow-royal-glow" },
  gold: { bg: "bg-gold/15 group-hover:bg-gold", text: "text-gold group-hover:text-navy-deep", glow: "group-hover:shadow-gold-glow" },
  navy: { bg: "bg-navy/15 group-hover:bg-navy", text: "text-royal group-hover:text-white", glow: "group-hover:shadow-royal-glow" },
};

export function HomePage() {
  const navigate = useRouter((s) => s.navigate);
  const openApply = useQuickApply((s) => s.openModal);

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden pt-32 pb-16 sm:pt-36 lg:pt-44 lg:pb-24">
        <div className="absolute inset-0 bg-mesh" aria-hidden />
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-royal/10 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                <Sparkles className="h-3.5 w-3.5" /> India's Premium Financial Partner
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.2rem]">
                Your Complete<br />
                <span className="text-gradient-hero animate-gradient-x">Financial Partner</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Get instant approval from <span className="font-semibold text-foreground">100+ banks</span> with a single application. Lowest interest rates, dedicated relationship manager, doorstep service — all under one premium platform.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <MagneticButton onClick={() => openApply("Personal Loan")} className="group inline-flex items-center gap-2 rounded-full bg-royal-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-royal-glow">
                  <Sparkles className="h-4 w-4" /> Apply Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </MagneticButton>
                <MagneticButton onClick={() => navigate("eligibility")} className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur hover:bg-card">
                  Check Eligibility
                </MagneticButton>
                <MagneticButton as="a" href={whatsappLink} ariaLabel="Chat on WhatsApp" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-lg">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Expert
                </MagneticButton>
                <MagneticButton onClick={() => navigate("contact")} className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-3.5 text-sm font-semibold text-gold hover:bg-gold/15">
                  <CalendarClock className="h-4 w-4" /> Book Consultation
                </MagneticButton>
              </div>
            </Reveal>
            <Reveal delay={0.34}>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-royal" /> ISO 27001 Certified</span>
                <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-gold" /> SSL Protected</span>
                <span className="inline-flex items-center gap-1.5"><Phone className="h-4 w-4 text-royal" /> {companyInfo.phone}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="relative py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {trustStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur transition-colors hover:border-gold/40 sm:p-6">
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-royal/10 blur-2xl transition-opacity group-hover:bg-gold/10" />
                  <stat.icon className="h-6 w-6 text-gold" />
                  <div className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={2.2} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Cards to All Pages */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Explore Everything
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.9rem]">
                Every tool, <span className="text-gradient-gold">one click away</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                From AI eligibility to EMI calculators, loan comparison to careers — dive into any function below.
              </p>
            </div>
          </Reveal>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pageCards.map((card) => {
              const accent = accentMap[card.accent];
              return (
                <motion.button
                  key={card.page}
                  variants={staggerItem}
                  onClick={() => navigate(card.page)}
                  className={`group relative flex flex-col items-start overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 ${accent.glow} hover:border-royal/40`}
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-royal/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className={`grid h-12 w-12 place-items-center rounded-xl transition-colors duration-300 ${accent.bg} ${accent.text}`}>
                    <card.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-royal">
                    Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="relative py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gold/30 bg-gold/5 p-6 text-center sm:flex-row sm:text-left">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold"><Award className="h-5 w-5" /></span>
                <div>
                  <p className="text-sm font-semibold">Ready to get started?</p>
                  <p className="text-xs text-muted-foreground">One application. 100+ banks. Lowest rates. Your financial partner, today.</p>
                </div>
              </div>
              <button onClick={() => openApply("Personal Loan")} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-royal-gradient px-6 py-3 text-sm font-semibold text-white shadow-royal-glow">
                <Sparkles className="h-4 w-4" /> Apply Now <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
