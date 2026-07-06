"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { IndianRupee, Percent, Calendar, ArrowRight, TrendingDown, Sparkles, GitCompare } from "lucide-react";
import { SectionHeading, Reveal } from "@/components/site/primitives";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loanPresets, type LoanPreset } from "@/lib/site-data";
import { useQuickApply } from "@/lib/quick-apply-store";
import { cn } from "@/lib/utils";

function formatINR(n: number) {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function calcEMI(principal: number, rate: number, tenureYrs: number) {
  const r = rate / 12 / 100;
  const n = tenureYrs * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

const accentTab: Record<string, { active: string; ring: string }> = {
  royal: { active: "bg-royal text-white shadow-royal-glow", ring: "text-royal" },
  gold: { active: "bg-gold text-navy-deep shadow-gold-glow", ring: "text-gold" },
  navy: { active: "bg-navy text-white", ring: "text-royal" },
};

export function EMICalculatorPro() {
  const [activeId, setActiveId] = React.useState(loanPresets[0].id);
  const preset = loanPresets.find((p) => p.id === activeId)!;
  const [principal, setPrincipal] = React.useState(preset.amountDefault);
  const [rate, setRate] = React.useState(preset.rateDefault);
  const [tenure, setTenure] = React.useState(preset.tenureDefault);
  const openApply = useQuickApply((s) => s.openModal);

  // When preset changes, reset to defaults
  React.useEffect(() => {
    setPrincipal(preset.amountDefault);
    setRate(preset.rateDefault);
    setTenure(preset.tenureDefault);
  }, [preset]);

  const emi = calcEMI(principal, rate, tenure);
  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - principal;

  const pieData = [
    { name: "Principal", value: principal, color: "oklch(0.42 0.2 264)" },
    { name: "Interest", value: totalInterest, color: "oklch(0.78 0.15 84)" },
  ];

  // Balance-over-time for area chart
  const balanceData = React.useMemo(() => {
    const r = rate / 12 / 100;
    let balance = principal;
    const arr: { month: string; balance: number; paid: number }[] = [
      { month: "0", balance: Math.round(principal), paid: 0 },
    ];
    const totalMonths = tenure * 12;
    const step = Math.max(1, Math.floor(totalMonths / 24));
    for (let m = 1; m <= totalMonths; m++) {
      const interest = balance * r;
      const p = emi - interest;
      balance -= p;
      if (m % step === 0 || m === totalMonths) {
        arr.push({
          month: String(m),
          balance: Math.max(0, Math.round(balance)),
          paid: Math.round((emi * m)),
        });
      }
    }
    return arr;
  }, [principal, rate, tenure, emi]);

  // Comparison across all presets at their defaults
  const comparison = loanPresets.map((p) => {
    const e = calcEMI(p.amountDefault, p.rateDefault, p.tenureDefault);
    return {
      name: p.name,
      emi: Math.round(e),
      total: Math.round(e * p.tenureDefault * 12),
      rate: p.rateDefault,
      amount: p.amountDefault,
      tenure: p.tenureDefault,
      accent: p.accent,
    };
  });

  const accent = accentTab[preset.accent];

  return (
    <section id="emi-pro" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-gold/8 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Smart · Comparative · Tailored"
          title={
            <>
              Specialised <span className="text-gradient-gold">EMI calculator</span> for every loan
            </>
          }
          description="Pick your loan type and we'll preset the right rate, amount and tenure ranges. See your EMI, total interest, balance trajectory and compare across all loan types instantly."
        />

        {/* Loan type tabs */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {loanPresets.map((p) => {
              const a = accentTab[p.accent];
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
                    activeId === p.id
                      ? cn("border-transparent", a.active)
                      : "border-border/70 bg-card/40 text-muted-foreground hover:border-royal/40 hover:text-foreground"
                  )}
                >
                  <p.icon className="h-4 w-4" />
                  {p.name}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Controls */}
          <Reveal className="lg:col-span-2">
            <div className="rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur shadow-premium sm:p-8">
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-border/50 bg-background/40 p-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-royal/10 text-royal">
                  <preset.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold">{preset.name}</p>
                  <p className="text-xs text-muted-foreground">{preset.blurb}</p>
                </div>
              </div>

              <div className="space-y-7">
                {/* Principal */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Loan Amount</label>
                    <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-background/60 px-2.5 py-1">
                      <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(Math.max(preset.amountMin, Math.min(preset.amountMax, Number(e.target.value) || 0)))}
                        className="h-6 w-32 border-0 bg-transparent p-0 text-right text-sm font-semibold focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <Slider value={[principal]} onValueChange={(v) => setPrincipal(v[0])} min={preset.amountMin} max={preset.amountMax} step={preset.amountMin} className="mt-3" />
                  <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
                    <span>{formatINR(preset.amountMin)}</span>
                    <span>{formatINR(preset.amountMax)}</span>
                  </div>
                </div>

                {/* Rate */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Interest Rate (% p.a.)</label>
                    <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-background/60 px-2.5 py-1">
                      <Percent className="h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        type="number"
                        value={rate}
                        step={0.05}
                        onChange={(e) => setRate(Math.max(preset.rateMin, Math.min(preset.rateMax, Number(e.target.value) || 0)))}
                        className="h-6 w-20 border-0 bg-transparent p-0 text-right text-sm font-semibold focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <Slider value={[rate]} onValueChange={(v) => setRate(v[0])} min={preset.rateMin} max={preset.rateMax} step={0.05} className="mt-3" />
                  <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
                    <span>{preset.rateMin}%</span>
                    <span>{preset.rateMax}%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Tenure (years)</label>
                    <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-background/60 px-2.5 py-1">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        type="number"
                        value={tenure}
                        onChange={(e) => setTenure(Math.max(preset.tenureMin, Math.min(preset.tenureMax, Number(e.target.value) || 0)))}
                        className="h-6 w-16 border-0 bg-transparent p-0 text-right text-sm font-semibold focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <Slider value={[tenure]} onValueChange={(v) => setTenure(v[0])} min={preset.tenureMin} max={preset.tenureMax} step={1} className="mt-3" />
                  <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
                    <span>{preset.tenureMin} yr</span>
                    <span>{preset.tenureMax} yr</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => openApply(preset.name)}
                className="mt-7 w-full rounded-xl bg-royal-gradient py-6 text-sm font-semibold text-white shadow-royal-glow hover:opacity-95"
              >
                <Sparkles className="mr-2 h-4 w-4" /> Apply for {preset.name}
              </Button>
            </div>
          </Reveal>

          {/* Results */}
          <div className="lg:col-span-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-royal/30 bg-royal/5 p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Monthly EMI</p>
                <p className="mt-1 font-display text-2xl font-bold text-gradient-royal sm:text-3xl">
                  {formatINR(emi)}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Total Interest</p>
                <p className="mt-1 font-display text-2xl font-bold text-gold sm:text-3xl">
                  {formatINR(totalInterest)}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Total Payment</p>
                <p className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                  {formatINR(totalPayment)}
                </p>
              </div>
            </Reveal>

            {/* Pie */}
            <Reveal delay={0.2} className="sm:col-span-1">
              <div className="h-full rounded-2xl border border-border/60 bg-card/50 p-5">
                <p className="text-sm font-semibold">Breakdown</p>
                <div className="mt-1 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" innerRadius={42} outerRadius={66} paddingAngle={3} stroke="none">
                        {pieData.map((d) => <Cell key={d.name} fill={d.color} />)}
                      </Pie>
                      <Tooltip formatter={(v: number) => formatINR(v)} contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-1 flex justify-center gap-3 text-[11px]">
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-royal" /> Principal</span>
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-gold" /> Interest</span>
                </div>
              </div>
            </Reveal>

            {/* Balance area chart */}
            <Reveal delay={0.25} className="sm:col-span-2">
              <div className="h-full rounded-2xl border border-border/60 bg-card/50 p-5">
                <p className="text-sm font-semibold">Outstanding balance over time</p>
                <div className="mt-2 h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={balanceData} margin={{ top: 6, right: 6, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="oklch(0.42 0.2 264)" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="oklch(0.42 0.2 264)" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `M${v}`} interval="preserveStartEnd" minTickGap={28} />
                      <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => formatINR(v)} width={48} />
                      <Tooltip formatter={(v: number) => formatINR(v)} labelFormatter={(l) => `Month ${l}`} contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                      <Area type="monotone" dataKey="balance" stroke="oklch(0.42 0.2 264)" strokeWidth={2} fill="url(#balGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Reveal>

            {/* Comparison strip */}
            <Reveal delay={0.3} className="sm:col-span-3">
              <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
                <div className="flex items-center gap-2">
                  <GitCompare className="h-4 w-4 text-gold" />
                  <p className="text-sm font-semibold">Compare EMI across loan types</p>
                  <span className="text-[11px] text-muted-foreground">(at each loan's default amount &amp; tenure)</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {comparison.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setActiveId(loanPresets.find((p) => p.name === c.name)!.id)}
                      className={cn(
                        "rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5",
                        activeId === loanPresets.find((p) => p.name === c.name)!.id
                          ? "border-royal/50 bg-royal/5"
                          : "border-border/50 bg-background/40 hover:border-royal/30"
                      )}
                    >
                      <p className="text-[11px] font-medium text-muted-foreground">{c.name}</p>
                      <p className="mt-1 font-display text-base font-bold">{formatINR(c.emi)}<span className="text-[10px] font-normal text-muted-foreground">/mo</span></p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{c.rate}% · {c.tenure}yr</p>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
