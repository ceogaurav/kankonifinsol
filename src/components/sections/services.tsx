"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading, Reveal, staggerContainer, staggerItem } from "@/components/site/primitives";
import { services, serviceCategories, type ServiceCategory } from "@/lib/site-data";
import { useQuickApply } from "@/lib/quick-apply-store";
import { cn } from "@/lib/utils";

const accentMap: Record<string, { ring: string; bg: string; text: string; glow: string }> = {
  royal: {
    ring: "hover:border-royal/50",
    bg: "bg-royal/10 group-hover:bg-royal",
    text: "text-royal group-hover:text-white",
    glow: "group-hover:shadow-royal-glow",
  },
  gold: {
    ring: "hover:border-gold/50",
    bg: "bg-gold/15 group-hover:bg-gold",
    text: "text-gold group-hover:text-navy-deep",
    glow: "group-hover:shadow-gold-glow",
  },
  navy: {
    ring: "hover:border-royal/50",
    bg: "bg-navy/15 group-hover:bg-navy",
    text: "text-royal group-hover:text-white",
    glow: "group-hover:shadow-royal-glow",
  },
};

export function Services() {
  const [active, setActive] = React.useState<ServiceCategory | "All">("All");
  const openModal = useQuickApply((s) => s.openModal);
  const filtered = active === "All" ? services : services.filter((s) => s.category === active);

  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="One Platform · Every Product"
          title={
            <>
              Complete financial solutions,{" "}
              <span className="text-gradient-gold">beautifully unified</span>
            </>
          }
          description="From personal loans to project finance, insurance to mutual funds — 22 premium products compared across 100+ banks, served with white-glove dedication."
        />

        {/* Category filter */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {serviceCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  active === cat.value
                    ? "border-royal bg-royal text-white shadow-royal-glow"
                    : "border-border/70 bg-card/40 text-muted-foreground hover:border-royal/40 hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div
          key={active}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((s) => {
            const accent = accentMap[s.accent];
            return (
              <motion.article
                key={s.slug}
                variants={staggerItem}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1",
                  accent.ring,
                  accent.glow,
                  s.popular && "ring-1 ring-gold/40"
                )}
              >
                {s.popular && (
                  <span className="absolute right-4 top-4 rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
                    Popular
                  </span>
                )}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-royal/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-xl transition-colors duration-300",
                    accent.bg,
                    accent.text
                  )}
                >
                  <s.icon className="h-6 w-6" />
                </span>

                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                  {s.name}
                </h3>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-gold/90">
                  {s.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-foreground/80">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-royal" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/50 pt-4 text-center">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Rate</p>
                    <p className="text-xs font-bold text-foreground">{s.rateFrom}</p>
                  </div>
                  <div className="border-x border-border/50">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Max</p>
                    <p className="text-xs font-bold text-foreground">{s.maxAmount}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Tenure</p>
                    <p className="text-xs font-bold text-foreground">{s.tenure}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openModal(s.name)}
                  className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-background/60 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-royal/50 hover:bg-royal hover:text-white"
                >
                  Apply Now
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
