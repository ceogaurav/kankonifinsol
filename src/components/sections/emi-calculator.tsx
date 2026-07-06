"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";
import { IndianRupee, Calendar, Percent, RotateCcw, Loader2, Download } from "lucide-react";
import { SectionHeading, Reveal } from "@/components/site/primitives";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function formatINR(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function EMICalculator() {
  const [principal, setPrincipal] = React.useState(2500000);
  const [rate, setRate] = React.useState(10.49);
  const [tenure, setTenure] = React.useState(5); // years

  const r = rate / 12 / 100;
  const n = tenure * 12;
  const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;

  const pieData = [
    { name: "Principal", value: principal, color: "oklch(0.42 0.2 264)" },
    { name: "Interest", value: totalInterest, color: "oklch(0.78 0.15 84)" },
  ];

  // Amortization (yearly)
  const yearly = React.useMemo(() => {
    let balance = principal;
    const arr: { year: string; principal: number; interest: number; balance: number }[] = [];
    for (let y = 1; y <= tenure; y++) {
      let yp = 0;
      let yi = 0;
      for (let m = 0; m < 12; m++) {
        const interest = balance * r;
        const p = emi - interest;
        yp += p;
        yi += interest;
        balance -= p;
      }
      arr.push({
        year: `Yr ${y}`,
        principal: Math.round(yp),
        interest: Math.round(yi),
        balance: Math.max(0, Math.round(balance)),
      });
    }
    return arr;
  }, [principal, rate, tenure, emi, r]);

  function reset() {
    setPrincipal(2500000);
    setRate(10.49);
    setTenure(5);
  }

  return (
    <section id="emi" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Plan with precision"
          title={
            <>
              Interactive <span className="text-gradient-royal">EMI Calculator</span>
            </>
          }
          description="Drag the sliders to see your monthly EMI, total interest and full amortisation. Instant, accurate and beautifully visualised."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Controls */}
            <div className="lg:col-span-2 rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur shadow-premium sm:p-8">
              <div className="space-y-8">
                {/* Principal */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Loan Amount</label>
                    <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-background/60 px-2.5 py-1">
                      <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(Math.max(10000, Number(e.target.value) || 0))}
                        className="h-6 w-32 border-0 bg-transparent p-0 text-right text-sm font-semibold focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[principal]}
                    onValueChange={(v) => setPrincipal(v[0])}
                    min={50000}
                    max={50000000}
                    step={50000}
                    className="mt-4"
                  />
                  <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                    <span>₹50K</span>
                    <span>₹5 Cr</span>
                  </div>
                </div>

                {/* Rate */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Interest Rate (% p.a.)</label>
                    <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-background/60 px-2.5 py-1">
                      <Percent className="h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        type="number"
                        value={rate}
                        step={0.05}
                        onChange={(e) => setRate(Math.max(1, Math.min(36, Number(e.target.value) || 0)))}
                        className="h-6 w-20 border-0 bg-transparent p-0 text-right text-sm font-semibold focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[rate]}
                    onValueChange={(v) => setRate(v[0])}
                    min={4}
                    max={24}
                    step={0.05}
                    className="mt-4"
                  />
                  <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                    <span>4%</span>
                    <span>24%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Tenure (years)</label>
                    <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-background/60 px-2.5 py-1">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        type="number"
                        value={tenure}
                        onChange={(e) => setTenure(Math.max(1, Math.min(30, Number(e.target.value) || 0)))}
                        className="h-6 w-16 border-0 bg-transparent p-0 text-right text-sm font-semibold focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[tenure]}
                    onValueChange={(v) => setTenure(v[0])}
                    min={1}
                    max={30}
                    step={1}
                    className="mt-4"
                  />
                  <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                    <span>1 yr</span>
                    <span>30 yrs</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="flex-1 rounded-xl"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" /> Reset
                  </Button>
                  <Button
                    onClick={() => window.print()}
                    variant="outline"
                    className="flex-1 rounded-xl"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-royal/30 bg-royal/5 p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Monthly EMI</p>
                  <p className="mt-1 font-display text-2xl font-bold text-gradient-royal sm:text-3xl">
                    {formatINR(emi)}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Total Interest</p>
                  <p className="mt-1 font-display text-2xl font-bold text-gold sm:text-3xl">
                    {formatINR(totalInterest)}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Total Payment</p>
                  <p className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                    {formatINR(totalPayment)}
                  </p>
                </div>
              </div>

              {/* Pie */}
              <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
                <p className="text-sm font-semibold">Principal vs Interest</p>
                <div className="mt-2 h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={3}
                        stroke="none"
                      >
                        {pieData.map((d) => (
                          <Cell key={d.name} fill={d.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v: number) => formatINR(v)}
                        contentStyle={{
                          background: "var(--popover)",
                          border: "1px solid var(--border)",
                          borderRadius: 12,
                          fontSize: 12,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 flex justify-center gap-4 text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-royal" /> Principal
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-gold" /> Interest
                  </span>
                </div>
              </div>

              {/* Bar amortization */}
              <div className="rounded-2xl border border-border/60 bg-card/50 p-5 sm:col-span-2">
                <p className="text-sm font-semibold">Year-wise breakdown</p>
                <div className="mt-2 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={yearly} barGap={2}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} vertical={false} />
                      <XAxis dataKey="year" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                      <YAxis
                        tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => (v >= 10000000 ? `${(v / 10000000).toFixed(1)}Cr` : v >= 100000 ? `${Math.round(v / 100000)}L` : `${v}`)}
                      />
                      <Tooltip
                        formatter={(v: number) => formatINR(v)}
                        contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                      />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="principal" stackId="a" fill="oklch(0.42 0.2 264)" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="interest" stackId="a" fill="oklch(0.78 0.15 84)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
