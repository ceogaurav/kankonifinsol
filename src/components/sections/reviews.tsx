"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, BadgeCheck, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { SectionHeading, Reveal } from "@/components/site/primitives";
import { testimonials, type Testimonial } from "@/lib/site-data";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? "fill-gold text-gold" : "text-muted-foreground/40"}`}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const [active, setActive] = React.useState(0);
  const count = testimonials.length;

  const next = () => setActive((p) => (p + 1) % count);
  const prev = () => setActive((p) => (p - 1 + count) % count);

  React.useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, []);

  const current: Testimonial = testimonials[active];

  return (
    <section id="reviews" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Loved by 10,000+ customers"
          title={
            <>
              Real stories. <span className="text-gradient-gold">Real savings.</span>
            </>
          }
          description="From first-time borrowers to seasoned entrepreneurs — here's what makes Kankoni Finsol India's most recommended financial partner."
        />

        {/* Google rating banner */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-lg font-bold shadow">
                <span className="text-[#4285F4]">G</span>
              </div>
              <div>
                <p className="text-sm font-semibold">Google Reviews</p>
                <p className="text-xs text-muted-foreground">Verified customers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-display text-2xl font-bold text-gradient-gold">4.9</p>
                <Stars rating={5} />
              </div>
              <div className="h-10 w-px bg-border/60" />
              <div className="text-right">
                <p className="font-display text-2xl font-bold">10,000+</p>
                <p className="text-xs text-muted-foreground">Reviews</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Featured testimonial */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur shadow-premium sm:p-8">
              <Quote className="absolute right-6 top-6 h-16 w-16 text-royal/8" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  <Stars rating={current.rating} />
                  <h3 className="mt-4 font-display text-xl font-semibold sm:text-2xl">
                    &ldquo;{current.title}&rdquo;
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {current.message}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-royal-gradient text-sm font-bold text-white">
                      {current.avatar}
                    </span>
                    <div>
                      <p className="flex items-center gap-1 text-sm font-semibold">
                        {current.name}
                        <BadgeCheck className="h-3.5 w-3.5 text-royal" />
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {current.city} · {current.service}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    aria-label="Previous review"
                    className="grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-background/50 transition-colors hover:border-royal/50 hover:text-royal"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next review"
                    className="grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-background/50 transition-colors hover:border-royal/50 hover:text-royal"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Go to review ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === active ? "w-6 bg-royal" : "w-1.5 bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Video testimonial card */}
          <Reveal delay={0.15}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-royal-gradient p-6 text-white shadow-royal-glow">
              <div className="absolute inset-0 bg-mesh opacity-40" />
              <div className="relative flex flex-1 flex-col">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
                  <Play className="h-3 w-3 fill-white" /> Video Testimonial
                </span>
                <div className="mt-6 grid place-items-center">
                  <button className="group relative grid h-20 w-20 place-items-center rounded-full bg-white/15 backdrop-blur transition-transform hover:scale-105">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full" />
                    <Play className="h-7 w-7 fill-white text-white" />
                  </button>
                </div>
                <p className="mt-6 text-center text-lg font-semibold leading-snug">
                  &ldquo;They funded my dream home at the lowest rate I could find anywhere.&rdquo;
                </p>
                <p className="mt-2 text-center text-sm text-white/80">Rohit Sharma, Mumbai</p>
                <div className="mt-auto pt-6 text-center text-xs text-white/70">
                  500+ video stories · Watch now
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
