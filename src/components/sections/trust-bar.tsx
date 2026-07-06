"use client";

import { motion } from "framer-motion";
import { Reveal, AnimatedCounter } from "@/components/site/primitives";
import { trustStats, certifications } from "@/lib/site-data";
import { ShieldCheck, Lock, FileCheck, Award } from "lucide-react";

const certIcons = [ShieldCheck, Lock, FileCheck, Award, ShieldCheck, Lock];

export function TrustBar() {
  return (
    <section className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {trustStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur transition-colors hover:border-gold/40 sm:p-6">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-royal/10 blur-2xl transition-opacity group-hover:bg-gold/10" />
                <stat.icon className="h-6 w-6 text-gold" />
                <div className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2.2}
                  />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Certifications marquee */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-border/50 bg-card/30 px-6 py-5 backdrop-blur sm:flex-row sm:justify-between">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Trusted &amp; Certified
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {certifications.map((cert, i) => {
                const Icon = certIcons[i % certIcons.length];
                return (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80"
                  >
                    <Icon className="h-4 w-4 text-royal" />
                    {cert}
                  </span>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
