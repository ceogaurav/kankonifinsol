"use client";

import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";
import { TrendingUp, Users, Building2, Wallet, ArrowUpRight } from "lucide-react";
import { SectionHeading, Reveal, AnimatedCounter } from "@/components/site/primitives";

// Quarterly loan disbursement trend (₹ in Cr)
const trend = [
  { q: "Q1 '23", value: 42 },
  { q: "Q2 '23", value: 58 },
  { q: "Q3 '23", value: 71 },
  { q: "Q4 '23", value: 89 },
  { q: "Q1 '24", value: 112 },
  { q: "Q2 '24", value: 138 },
  { q: "Q3 '24", value: 167 },
  { q: "Q4 '24", value: 204 },
  { q: "Q1 '25", value: 248 },
  { q: "Q2 '25", value: 312 },
];

// Loan distribution by category
const distribution = [
  { name: "Home", value: 34, color: "oklch(0.42 0.2 264)" },
  { name: "Personal", value: 22, color: "oklch(0.78 0.15 84)" },
  { name: "Business", value: 18, color: "oklch(0.6 0.14 200)" },
  { name: "LAP", value: 12, color: "oklch(0.62 0.18 160)" },
  { name: "Car", value: 8, color: "oklch(0.55 0.2 300)" },
  { name: "Other", value: 6, color: "oklch(0.65 0.15 100)" },
];

const kpis = [
  { icon: Wallet, label: "Loans Facilitated", value: 312, prefix: "₹", suffix: " Cr", delta: "+28%", color: "text-gold" },
  { icon: Users, label: "New Customers", value: 8420, suffix: "+", delta: "+34%", color: "text-royal" },
  { icon: Building2, label: "Active Banks", value: 104, suffix: "+", delta: "+8", color: "text-royal" },
  { icon: TrendingUp, label: "Avg. Approval Rate", value: 94, suffix: "%", delta: "+3%", color: "text-gold" },
];

export function InsightsDashboard() {
  return (
    <section id="insights" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Transparency · By the numbers"
          title={
            <>
              The momentum behind <span className="text-gradient-gold">Kankoni Finsol</span>
            </>
          }
          description="Real growth, real impact. Here's a live look at the scale and trust we've built across India's financial landscape."
        />

        {/* KPI cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpis.map((kpi, i) => (
            <Reveal key={kpi.label} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-premium">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-royal/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl bg-muted/60 ${kpi.color}`}>
                    <kpi.icon className="h-5 w-5" />
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-royal/10 px-2 py-0.5 text-[10px] font-bold text-royal">
                    <ArrowUpRight className="h-2.5 w-2.5" /> {kpi.delta}
                  </span>
                </div>
                <p className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  <AnimatedCounter value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} duration={2.2} />
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{kpi.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Charts */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Trend area chart */}
          <Reveal className="lg:col-span-3">
            <div className="h-full rounded-3xl border border-border/60 bg-card/50 p-6 backdrop-blur shadow-premium sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold">Loans facilitated trend</h3>
                  <p className="text-xs text-muted-foreground">Quarterly disbursal (₹ Crore)</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-gold/10 px-2.5 py-1 text-[10px] font-semibold text-gold">
                  <TrendingUp className="h-3 w-3" /> +642% YoY
                </span>
              </div>
              <div className="mt-5 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trend} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                    <defs>
                      <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.42 0.2 264)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="oklch(0.42 0.2 264)" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="trendLine" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="oklch(0.42 0.2 264)" />
                        <stop offset="100%" stopColor="oklch(0.78 0.15 84)" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
                    <XAxis dataKey="q" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}Cr`} width={56} />
                    <Tooltip
                      formatter={(v: number) => [`₹${v} Cr`, "Disbursed"]}
                      contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                    />
                    <Area type="monotone" dataKey="value" stroke="url(#trendLine)" strokeWidth={2.5} fill="url(#trendGrad)" dot={{ fill: "oklch(0.42 0.2 264)", r: 3 }} activeDot={{ r: 5 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          {/* Distribution bar chart */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="h-full rounded-3xl border border-border/60 bg-card/50 p-6 backdrop-blur shadow-premium sm:p-8">
              <h3 className="font-display text-lg font-semibold">Loan mix</h3>
              <p className="text-xs text-muted-foreground">Share by product category</p>
              <div className="mt-5 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distribution} layout="vertical" margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={56} />
                    <Tooltip
                      formatter={(v: number) => [`${v}%`, "Share"]}
                      contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                      cursor={{ fill: "var(--muted)", opacity: 0.3 }}
                    />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={16}>
                      {distribution.map((d) => <Cell key={d.name} fill={d.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom note */}
        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-border/50 bg-card/30 px-6 py-4 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
            <span>📈 Data shown is illustrative of Kankoni Finsol's growth trajectory.</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              Updated quarterly · Last refresh Q2 2025
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
