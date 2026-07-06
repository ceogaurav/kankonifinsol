"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Loader2, Building2, Percent, IndianRupee, ShieldCheck,
  TrendingUp, CheckCircle2, ArrowRight, Lightbulb,
} from "lucide-react";
import { SectionHeading, Reveal } from "@/components/site/primitives";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface EligibilityResult {
  eligible: boolean;
  approvalChance: number;
  eligibleBanks: { bank: string; rate: string; maxAmount: string }[];
  estimatedEMI: string;
  interestRate: string;
  loanAmount: string;
  tenure: string;
  summary: string;
  suggestions: string[];
}

export function EligibilityChecker() {
  const [income, setIncome] = React.useState(75000);
  const [employment, setEmployment] = React.useState("Salaried");
  const [creditScore, setCreditScore] = React.useState(760);
  const [loanAmount, setLoanAmount] = React.useState(1500000);
  const [city, setCity] = React.useState("Mumbai");
  const [age, setAge] = React.useState(32);
  const [loanType, setLoanType] = React.useState("Personal Loan");

  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<EligibilityResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function check() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          income, employment, creditScore, loanAmount, city, age, loanType,
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setResult(data.result);
      } else {
        setError(data.error || "Unable to assess eligibility. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and retry.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "h-11 rounded-xl border border-border/70 bg-background/60 px-3 text-sm transition-colors focus-visible:border-royal focus-visible:ring-royal/20";

  return (
    <section id="eligibility" className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-royal/8 blur-[130px]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="AI-Powered · Instant"
          title={
            <>
              Check your <span className="text-gradient-gold">loan eligibility</span> in seconds
            </>
          }
          description="Our intelligent engine analyses your profile against 100+ banks in real-time and shows your approval odds, eligible lenders and estimated EMI — before you apply."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Form */}
          <Reveal>
            <div className="rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur shadow-premium sm:p-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Loan Type</Label>
                  <select
                    value={loanType}
                    onChange={(e) => setLoanType(e.target.value)}
                    className={`${inputCls} mt-1.5 w-full`}
                  >
                    {["Personal Loan","Business Loan","Home Loan","Loan Against Property","Working Capital Loan","New Car Loan","Gold Loan","MSME Finance"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Employment</Label>
                  <select
                    value={employment}
                    onChange={(e) => setEmployment(e.target.value)}
                    className={`${inputCls} mt-1.5 w-full`}
                  >
                    <option>Salaried</option>
                    <option>Self-Employed</option>
                    <option>Business</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-muted-foreground">Monthly Income</Label>
                    <span className="text-sm font-semibold">₹{income.toLocaleString("en-IN")}</span>
                  </div>
                  <Slider value={[income]} onValueChange={(v) => setIncome(v[0])} min={15000} max={1000000} step={5000} className="mt-2" />
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-muted-foreground">Credit Score (CIBIL)</Label>
                    <span className="text-sm font-semibold">{creditScore}</span>
                  </div>
                  <Slider value={[creditScore]} onValueChange={(v) => setCreditScore(v[0])} min={300} max={900} step={5} className="mt-2" />
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-muted-foreground">Desired Loan Amount</Label>
                    <span className="text-sm font-semibold">₹{loanAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <Slider value={[loanAmount]} onValueChange={(v) => setLoanAmount(v[0])} min={100000} max={50000000} step={100000} className="mt-2" />
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">City</Label>
                  <Input value={city} onChange={(e) => setCity(e.target.value)} className="mt-1.5 h-11 rounded-xl bg-background/60" />
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Age</Label>
                  <Input type="number" value={age} min={21} max={70} onChange={(e) => setAge(Number(e.target.value))} className="mt-1.5 h-11 rounded-xl bg-background/60" />
                </div>
              </div>

              <Button
                onClick={check}
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-royal-gradient py-6 text-sm font-semibold text-white shadow-royal-glow hover:opacity-95"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analysing across 100+ banks…</>
                ) : (
                  <><Sparkles className="mr-2 h-4 w-4" /> Check My Eligibility</>
                )}
              </Button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Free · No impact on credit score · Instant results
              </p>
            </div>
          </Reveal>

          {/* Result */}
          <Reveal delay={0.1}>
            <div className="relative h-full min-h-[28rem] rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur shadow-premium sm:p-8">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid h-full place-items-center text-center"
                  >
                    <div>
                      <ShieldCheck className="mx-auto h-10 w-10 text-destructive" />
                      <p className="mt-3 text-sm font-medium">{error}</p>
                      <Button onClick={check} variant="outline" className="mt-4 rounded-xl">Retry</Button>
                    </div>
                  </motion.div>
                )}

                {!result && !error && !loading && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid h-full place-items-center text-center"
                  >
                    <div>
                      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-royal/10 text-royal">
                        <Sparkles className="h-8 w-8" />
                      </div>
                      <p className="mt-4 font-display text-lg font-semibold">Your results appear here</p>
                      <p className="mx-auto mt-1 max-w-xs text-sm text-muted-foreground">
                        Fill in your profile and let our AI match you with the best banks and rates in real time.
                      </p>
                    </div>
                  </motion.div>
                )}

                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid h-full place-items-center text-center"
                  >
                    <div>
                      <Loader2 className="mx-auto h-10 w-10 animate-spin text-royal" />
                      <p className="mt-4 text-sm font-medium">Comparing 100+ banks…</p>
                      <p className="mt-1 text-xs text-muted-foreground">Crunching approval odds &amp; best rates</p>
                    </div>
                  </motion.div>
                )}

                {result && !loading && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full flex-col"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`grid h-9 w-9 place-items-center rounded-xl ${result.eligible ? "bg-royal/15 text-royal" : "bg-destructive/10 text-destructive"}`}>
                          {result.eligible ? <CheckCircle2 className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                        </span>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground">Status</p>
                          <p className="font-display text-base font-bold">{result.eligible ? "Eligible" : "Limited Options"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">Approval Chance</p>
                        <p className={`font-display text-2xl font-bold ${result.approvalChance >= 70 ? "text-royal" : result.approvalChance >= 50 ? "text-gold" : "text-destructive"}`}>
                          {result.approvalChance}%
                        </p>
                      </div>
                    </div>

                    {/* Approval bar */}
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.approvalChance}%` }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className={result.approvalChance >= 70 ? "h-full bg-royal" : result.approvalChance >= 50 ? "h-full bg-gold" : "h-full bg-destructive"}
                      />
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{result.summary}</p>

                    {/* Key metrics */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[
                        { icon: IndianRupee, label: "Loan Amount", val: result.loanAmount },
                        { icon: Percent, label: "Interest Rate", val: result.interestRate },
                        { icon: TrendingUp, label: "Est. EMI", val: result.estimatedEMI },
                      ].map((m) => (
                        <div key={m.label} className="rounded-xl border border-border/60 bg-background/50 p-3 text-center">
                          <m.icon className="mx-auto h-4 w-4 text-gold" />
                          <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</p>
                          <p className="text-xs font-bold">{m.val}</p>
                        </div>
                      ))}
                    </div>

                    {/* Eligible banks */}
                    <div className="mt-4">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <Building2 className="h-3.5 w-3.5" /> Eligible Banks
                      </p>
                      <div className="mt-2 space-y-2">
                        {result.eligibleBanks.slice(0, 4).map((b) => (
                          <div key={b.bank} className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 px-3 py-2">
                            <span className="text-sm font-medium">{b.bank}</span>
                            <span className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{b.rate}</span>
                              <span className="font-semibold text-foreground">{b.maxAmount}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Suggestions */}
                    {result.suggestions?.length > 0 && (
                      <div className="mt-4 rounded-xl border border-gold/30 bg-gold/5 p-3">
                        <p className="flex items-center gap-1.5 text-xs font-semibold text-gold">
                          <Lightbulb className="h-3.5 w-3.5" /> Recommendations
                        </p>
                        <ul className="mt-2 space-y-1">
                          {result.suggestions.slice(0, 3).map((s, i) => (
                            <li key={i} className="text-xs text-foreground/80">• {s}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <a
                      href="#contact"
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-royal-gradient py-3 text-sm font-semibold text-white shadow-royal-glow"
                    >
                      Apply Now <ArrowRight className="h-4 w-4" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
