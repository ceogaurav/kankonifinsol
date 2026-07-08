"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Sparkles, Target, Eye, Award, TrendingUp, Users, Building2,
  ShieldCheck, Star, MapPin, Phone, Clock, Globe, ArrowRight, Heart, Zap,
} from "lucide-react";
import { useRouter } from "@/lib/router-store";
import { useQuickApply } from "@/lib/quick-apply-store";
import {
  officeLocations, companyInfo, milestones,
} from "@/lib/site-data";
import { AnimatedCounter, Reveal } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

const values = [
  { icon: ShieldCheck, title: "Trust & Transparency", desc: "We never sell your data. Every rate, fee and term is disclosed upfront — no hidden charges, ever." },
  { icon: Zap, title: "Speed & Efficiency", desc: "From application to disbursal in hours, not weeks. Our AI engine and digital-first process make it possible." },
  { icon: Heart, title: "Customer-First", desc: "A dedicated relationship manager for every customer. We win when you get the best deal, not the first deal." },
  { icon: Award, title: "Excellence", desc: "ISO 27001 certified, 4.9★ rated. We hold ourselves to the highest standards in everything we do." },
];

const awards = [
  { icon: Award, title: "Best Fintech Startup 2024", org: "Indian Fintech Awards" },
  { icon: ShieldCheck, title: "ISO 27001 Certified", org: "Information Security" },
  { icon: Star, title: "4.9★ Google Rating", org: "10,000+ reviews" },
  { icon: TrendingUp, title: "Top 10 Loan Advisor", org: "Money Today 2024" },
];

const leadership = [
  { name: "Rajesh Kankoni", role: "Founder & CEO", bio: "20+ years in banking. Ex-VP at a leading private bank. CFA.", avatar: "RK" },
  { name: "Anjali Mehta", role: "Chief Financial Officer", bio: "Chartered Accountant. 15+ years in financial planning & risk.", avatar: "AM" },
  { name: "Vikram Shah", role: "Head of Lending", bio: "18 years in credit & underwriting across 4 major banks.", avatar: "VS" },
  { name: "Sneha Reddy", role: "Head of Advisory", bio: "CFP, SEBI-registered advisor. Wealth management expert.", avatar: "SR" },
];

export function AboutPage() {
  const navigate = useRouter((s) => s.navigate);
  const openApply = useQuickApply((s) => s.openModal);
  const [activeOffice, setActiveOffice] = React.useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative pt-28 pb-20 sm:pt-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-mesh opacity-40" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <button onClick={() => navigate("home")} className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/50 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur transition-colors hover:border-royal/40 hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </button>

        {/* Hero */}
        <div className="text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              <Sparkles className="h-3.5 w-3.5" /> Our Story
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Building India's most <span className="text-gradient-gold">trusted financial partner</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Kankoni Finsol was founded in 2018 with a simple belief — every Indian deserves access to the best financial products, served with the dedication of private banking, without the price tag. Today, we've facilitated over ₹500 crore in loans and earned the trust of 10,000+ customers across 50+ cities.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Impact stats */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-border/60 bg-card/50 p-6 backdrop-blur sm:p-8 lg:grid-cols-4">
          {[
            { icon: Users, value: 10000, suffix: "+", label: "Happy Customers" },
            { icon: Building2, value: 100, suffix: "+", label: "Banking Partners" },
            { icon: TrendingUp, value: 500, prefix: "₹", suffix: " Cr+", label: "Loans Facilitated" },
            { icon: MapPin, value: 50, suffix: "+", label: "Cities Served" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto h-6 w-6 text-gold" />
              <p className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={2.2} />
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-border/60 bg-card/50 p-7 backdrop-blur">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-royal/10 text-royal"><Target className="h-6 w-6" /></span>
              <h3 className="mt-4 font-display text-xl font-semibold">Our Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">To be India's most trusted financial partner — empowering every individual and business with transparent access to the best loans, investments and insurance, delivered with white-glove dedication and bank-grade security.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-border/60 bg-card/50 p-7 backdrop-blur">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold"><Eye className="h-6 w-6" /></span>
              <h3 className="mt-4 font-display text-xl font-semibold">Our Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">A future where securing the right financial product takes minutes, not weeks — where one application unlocks the entire banking ecosystem, and where a dedicated expert guides every decision. That future is here.</p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Values */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <Reveal><h2 className="text-center font-display text-3xl font-bold sm:text-4xl">What we <span className="text-gradient-gold">stand for</span></h2></Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="group rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-premium">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal/10 text-royal transition-colors group-hover:bg-royal group-hover:text-white"><v.icon className="h-5 w-5" /></span>
                <h4 className="mt-4 font-display text-base font-semibold">{v.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Journey */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <Reveal><h2 className="text-center font-display text-3xl font-bold sm:text-4xl">Our <span className="text-gradient-royal">journey</span></h2></Reveal>
        <div className="relative mt-10">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-royal via-gold to-transparent sm:left-1/2 sm:-translate-x-1/2" />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }}
                className={cn("relative flex items-start gap-6 pl-12 sm:pl-0", i % 2 === 0 ? "sm:flex-row sm:pr-1/2" : "sm:flex-row-reverse sm:pl-1/2")}>
                <span className="absolute left-4 top-1 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-royal-gradient text-[10px] font-bold text-white shadow-royal-glow sm:left-1/2">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1 rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur transition-colors hover:border-gold/40 sm:max-w-md">
                  <span className="font-display text-sm font-bold text-gold">{m.year}</span>
                  <h4 className="mt-1 font-display text-base font-semibold">{m.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
                <div className="hidden flex-1 sm:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <Reveal><h2 className="text-center font-display text-3xl font-bold sm:text-4xl">The minds behind <span className="text-gradient-royal">Kankoni</span></h2></Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.08}>
              <div className="group rounded-2xl border border-border/60 bg-card/50 p-6 text-center backdrop-blur transition-all hover:-translate-y-1 hover:shadow-premium">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-royal-gradient font-display text-lg font-bold text-white">{l.avatar}</span>
                <h4 className="mt-4 font-display text-base font-semibold">{l.name}</h4>
                <p className="text-xs font-medium uppercase tracking-wider text-gold">{l.role}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{l.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Awards */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card/40 p-5 text-center backdrop-blur">
                <a.icon className="h-7 w-7 text-gold" />
                <p className="text-sm font-semibold leading-tight">{a.title}</p>
                <p className="text-[11px] text-muted-foreground">{a.org}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Office Locations with Map */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <Reveal><h2 className="text-center font-display text-3xl font-bold sm:text-4xl">Our <span className="text-gradient-gold">offices</span></h2></Reveal>
        <Reveal delay={0.05}><p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">6 offices across India, serving 50+ cities. Visit us in person or connect digitally — we're always here to help.</p></Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-2">
            {officeLocations.map((office, i) => (
              <button key={office.id} onClick={() => setActiveOffice(i)}
                className={cn("w-full rounded-2xl border p-4 text-left transition-all", activeOffice === i ? "border-royal/50 bg-royal/5 shadow-premium" : "border-border/60 bg-card/40 hover:border-royal/30")}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className={cn("h-4 w-4", activeOffice === i ? "text-royal" : "text-muted-foreground")} />
                    <span className="font-display text-sm font-semibold">{office.city}</span>
                  </div>
                  {office.isHQ && <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold">HQ</span>}
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{office.address}</p>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-muted-foreground">
                  <span className="inline-flex items-center gap-0.5"><Phone className="h-2.5 w-2.5" />{office.phone}</span>
                  <span className="inline-flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" />{office.hours}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/50 shadow-premium">
              <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-royal" />
                  <span className="font-display text-sm font-semibold">{officeLocations[activeOffice].city}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">{officeLocations[activeOffice].email}</span>
              </div>
              <iframe key={officeLocations[activeOffice].id} title={`${officeLocations[activeOffice].city} office`} src={officeLocations[activeOffice].mapSrc} className="h-80 w-full sm:h-96" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-royal-gradient p-8 text-center text-white shadow-royal-glow sm:p-12">
            <div className="absolute inset-0 bg-mesh opacity-30" />
            <div className="relative">
              <h3 className="font-display text-2xl font-bold sm:text-3xl">Ready to experience the Kankoni difference?</h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-white/80">Join 10,000+ customers who've saved time and money with India's premium financial partner.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button onClick={() => openApply("Personal Loan")} className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3.5 text-sm font-semibold text-navy-deep shadow-gold-glow">
                  <Sparkles className="h-4 w-4" /> Apply Now
                </button>
                <button onClick={() => navigate("services")} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold backdrop-blur hover:bg-white/15">
                  Explore Services <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </motion.div>
  );
}
