"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Sparkles, GitCompare } from "lucide-react";
import { SectionHeading, Reveal } from "@/components/site/primitives";
import { compareLoanTypes, compareFeatures } from "@/lib/site-data";
import { useQuickApply } from "@/lib/quick-apply-store";
import { cn } from "@/lib/utils";

export function CompareMatrix() {
  const openApply = useQuickApply((s) => s.openModal);
  const [highlight, setHighlight] = React.useState<string | null>(null);

  return (
    <section id="compare-matrix" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-royal/8 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Feature-by-feature · At a glance"
          title={
            <>
              Which loan type <span className="text-gradient-gold">fits you?</span>
            </>
          }
          description="A transparent side-by-side matrix of rates, tenure, collateral, tax benefits and more — so you can pick the right product in seconds, not hours."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur shadow-premium">
            <div className="overflow-x-auto premium-scrollbar">
              <table className="w-full min-w-[820px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="sticky left-0 z-10 bg-card/80 p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur">
                      <span className="inline-flex items-center gap-1.5">
                        <GitCompare className="h-3.5 w-3.5 text-gold" /> Feature
                      </span>
                    </th>
                    {compareLoanTypes.map((lt) => (
                      <th
                        key={lt.id}
                        onMouseEnter={() => setHighlight(lt.id)}
                        onMouseLeave={() => setHighlight(null)}
                        className={cn(
                          "p-4 text-center transition-colors",
                          highlight === lt.id ? "bg-royal/10" : "bg-card/40"
                        )}
                      >
                        <div className="flex flex-col items-center gap-1.5">
                          <span className={cn(
                            "grid h-10 w-10 place-items-center rounded-xl transition-colors",
                            highlight === lt.id ? "bg-royal text-white" : "bg-royal/10 text-royal"
                          )}>
                            <lt.icon className="h-5 w-5" />
                          </span>
                          <span className="text-xs font-semibold">{lt.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareFeatures.map((row, ri) => (
                    <motion.tr
                      key={row.feature}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ri * 0.03 }}
                      className="border-b border-border/40 transition-colors hover:bg-accent/30"
                    >
                      <td className="sticky left-0 z-10 bg-card/80 p-4 text-left text-xs font-medium text-foreground backdrop-blur">
                        {row.feature}
                      </td>
                      {compareLoanTypes.map((lt) => {
                        const val = row.values[lt.id];
                        const isBool = typeof val === "boolean";
                        return (
                          <td
                            key={lt.id}
                            onMouseEnter={() => setHighlight(lt.id)}
                            onMouseLeave={() => setHighlight(null)}
                            className={cn(
                              "p-4 text-center text-xs transition-colors",
                              highlight === lt.id && "bg-royal/5"
                            )}
                          >
                            {isBool ? (
                              val ? (
                                <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-royal/15 text-royal">
                                  <Check className="h-3.5 w-3.5" />
                                </span>
                              ) : (
                                <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-muted text-muted-foreground">
                                  <X className="h-3.5 w-3.5" />
                                </span>
                              )
                            ) : (
                              <span className="font-medium text-foreground/90">{val}</span>
                            )}
                          </td>
                        );
                      })}
                    </motion.tr>
                  ))}
                  {/* CTA row */}
                  <tr>
                    <td className="sticky left-0 z-10 bg-card/80 p-4 backdrop-blur" />
                    {compareLoanTypes.map((lt) => (
                      <td key={lt.id} className="p-4 text-center">
                        <button
                          onClick={() => openApply(lt.name, { source: "compare-matrix" })}
                          className="inline-flex items-center gap-1 rounded-xl border border-border/70 bg-background/50 px-3 py-2 text-[11px] font-semibold transition-all hover:border-royal/50 hover:bg-royal hover:text-white"
                        >
                          Apply <ArrowRight className="h-3 w-3" />
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-5 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Not sure which loan is right for you?</p>
                <p className="text-xs text-muted-foreground">Our AI eligibility checker recommends the best fit in seconds.</p>
              </div>
            </div>
            <a
              href="#eligibility"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-royal-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-royal-glow"
            >
              Check Eligibility <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
