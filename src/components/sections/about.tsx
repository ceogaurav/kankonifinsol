"use client";

import { motion } from "framer-motion";
import {
  Target, Eye, Award, TrendingUp, Users, Building2, ShieldCheck,
  Sparkles, Star, Quote,
} from "lucide-react";
import { SectionHeading, Reveal, AnimatedCounter, staggerContainer, staggerItem } from "@/components/site/primitives";

const milestones = [
  { year: "2018", title: "The beginning", desc: "Kankoni Finsol founded in Bengaluru with a mission to democratise premium financial services for every Indian." },
  { year: "2020", title: "100+ bank partnerships", desc: "Crossed our first century of banking partnerships, becoming one of India's most-connected loan aggregators." },
  { year: "2022", title: "₹100 Cr disbursed", desc: "Facilitated over ₹100 crore in loans, earning a 4.9★ Google rating from 10,000+ happy customers." },
  { year: "2023", title: "AI-powered platform", desc: "Launched our AI eligibility engine and digital-first doorstep service across 50+ cities pan-India." },
  { year: "2025", title: "₹500 Cr+ & ISO certified", desc: "Facilitated ₹500 crore+ in loans, achieved ISO 27001 certification and expanded to 12 branch offices." },
];

const leaders = [
  { name: "Dayanandam Kankoni", role: "Founder & CEO", bio: "20+ years in banking. Ex-VP at a leading private bank. CFA.", avatar: "DK", accent: "royal" },
  { name: "Anjali Mehta", role: "Chief Financial Officer", bio: "Chartered Accountant. 15+ years in financial planning & risk.", avatar: "AM", accent: "gold" },
  { name: "Vikram Shah", role: "Head of Lending", bio: "18 years in credit & underwriting across 4 major banks.", avatar: "VS", accent: "royal" },
  { name: "Sneha Reddy", role: "Head of Advisory", bio: "CFP, SEBI-registered advisor. Wealth management expert.", avatar: "SR", accent: "gold" },
];

const awards = [
  { icon: Award, title: "Best Fintech Startup 2024", org: "Indian Fintech Awards" },
  { icon: ShieldCheck, title: "ISO 27001 Certified", org: "Information Security" },
  { icon: Star, title: "4.9★ Google Rating", org: "10,000+ reviews" },
  { icon: TrendingUp, title: "Top 10 Loan Advisor", org: "Money Today 2024" },
];

const accentMap: Record<string, string> = {
  royal: "bg-royal/10 text-royal",
  gold: "bg-gold/15 text-gold",
};

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-royal/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our story · Our promise"
          title={
            <>
              Built to make finance <span className="text-gradient-royal">fair, fast & premium</span>
            </>
          }
          description="Kankoni Finsol was born from a simple belief — every Indian deserves access to the best financial products, served with the dedication of private banking, without the price tag."
        />

        {/* Mission & Vision cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-7 backdrop-blur transition-all duration-300 hover:border-royal/40 hover:shadow-premium sm:p-8">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-royal/10 blur-2xl transition-opacity group-hover:opacity-100" />
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-royal/10 text-royal">
                <Target className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">Our Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                To be India's most trusted financial partner — empowering every individual and business with
                transparent access to the best loans, investments and insurance, delivered with white-glove
                dedication and bank-grade security.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-7 backdrop-blur transition-all duration-300 hover:border-gold/40 hover:shadow-premium sm:p-8">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl" />
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold">
                <Eye className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">Our Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A future where securing the right financial product takes minutes, not weeks — where one
                application unlocks the entire banking ecosystem, and where a dedicated expert guides every
                decision. That future is here.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Journey timeline */}
        <Reveal delay={0.15}>
          <div className="mt-16">
            <h3 className="text-center font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Our <span className="text-gradient-gold">journey</span>
            </h3>
            <div className="relative mt-10">
              {/* vertical line */}
              <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-royal via-gold to-transparent sm:left-1/2 sm:-translate-x-1/2" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className={`relative flex items-start gap-6 pl-12 sm:pl-0 ${i % 2 === 0 ? "sm:flex-row sm:pr-1/2" : "sm:flex-row-reverse sm:pl-1/2"}`}
                  >
                    {/* node */}
                    <span className="absolute left-4 top-1 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-royal-gradient text-[10px] font-bold text-white shadow-royal-glow sm:left-1/2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
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
        </Reveal>

        {/* Leadership */}
        <Reveal delay={0.1}>
          <div className="mt-20">
            <h3 className="text-center font-display text-2xl font-bold tracking-tight sm:text-3xl">
              The minds behind <span className="text-gradient-royal">Kankoni</span>
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
              Decades of combined experience across India's leading banks, unified by one mission.
            </p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {leaders.map((l) => (
                <motion.div
                  key={l.name}
                  variants={staggerItem}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 text-center backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
                >
                  <span className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl font-display text-lg font-bold ${accentMap[l.accent]}`}>
                    {l.avatar}
                  </span>
                  <h4 className="mt-4 font-display text-base font-semibold">{l.name}</h4>
                  <p className="text-xs font-medium uppercase tracking-wider text-gold">{l.role}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{l.bio}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>

        {/* Awards */}
        <Reveal delay={0.15}>
          <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {awards.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card/40 p-5 text-center backdrop-blur"
              >
                <a.icon className="h-7 w-7 text-gold" />
                <p className="text-sm font-semibold leading-tight">{a.title}</p>
                <p className="text-[11px] text-muted-foreground">{a.org}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Impact strip */}
        <Reveal delay={0.2}>
          <div className="mt-16 grid grid-cols-2 gap-4 rounded-3xl border border-border/60 bg-royal-gradient p-8 text-white sm:grid-cols-4 sm:p-10">
            {[
              { icon: Users, value: 10000, suffix: "+", label: "Happy Customers" },
              { icon: Building2, value: 100, suffix: "+", label: "Banking Partners" },
              { icon: TrendingUp, value: 500, prefix: "₹", suffix: " Cr+", label: "Loans Facilitated" },
              { icon: ShieldCheck, value: 50, suffix: "+", label: "Cities Served" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto h-6 w-6 text-gold" />
                <p className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={2.2} />
                </p>
                <p className="text-xs text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
