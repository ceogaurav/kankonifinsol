"use client";

import { motion } from "framer-motion";
import { SectionHeading, Reveal, staggerContainer, staggerItem } from "@/components/site/primitives";
import { whyChooseUs } from "@/lib/site-data";

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-mesh opacity-60"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The Kankoni advantage"
          title={
            <>
              Why India chooses <span className="text-gradient-gold">Kankoni Finsol</span>
            </>
          }
          description="We're not an aggregator that sells your data. We're your dedicated financial partner — negotiating, advising and executing on your behalf, end to end."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-premium"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-royal/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute left-0 top-0 h-1 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-royal/10 text-royal transition-colors duration-300 group-hover:bg-royal group-hover:text-white">
                <item.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              <span className="absolute bottom-4 right-4 font-display text-3xl font-bold text-foreground/5 transition-colors group-hover:text-gold/20">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
