"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar, BookOpen, HelpCircle, Plus, Minus } from "lucide-react";
import { SectionHeading, Reveal, staggerContainer, staggerItem } from "@/components/site/primitives";
import { blogPosts, faqs } from "@/lib/site-data";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const accentBar: Record<string, string> = {
  royal: "from-royal to-royal/40",
  gold: "from-gold to-gold/40",
  navy: "from-navy to-royal/40",
};

export function Resources() {
  const [openFaq, setOpenFaq] = React.useState<string>("item-0");

  return (
    <section id="resources" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Knowledge · Insights · Guidance"
          title={
            <>
              Financial resources, <span className="text-gradient-gold">made simple</span>
            </>
          }
          description="Expert-written guides, latest finance news and answers to the questions India asks most — to help you borrow, invest and save smarter."
        />

        {/* Blog grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.slug}
              variants={staggerItem}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-royal/40 hover:shadow-premium"
            >
              {/* visual header */}
              <div className="relative h-36 overflow-hidden bg-royal-gradient">
                <div className="absolute inset-0 bg-mesh opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-white/30 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className={cn("absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r", accentBar[post.accent])} />
                <span className="absolute left-4 top-4 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readTime} min
                  </span>
                </div>
                <h3 className="mt-3 font-display text-base font-semibold leading-snug tracking-tight group-hover:text-royal">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
                  <span className="text-xs font-medium text-muted-foreground">{post.author}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-royal">
                    Read more <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* FAQs */}
        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-gold">
                <HelpCircle className="h-3.5 w-3.5" /> FAQs
              </span>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Questions, <span className="text-gradient-royal">answered</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Everything you need to know about loans, eligibility, documents and the Kankoni process. Can't find what you're looking for?
              </p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal hover:underline"
              >
                Talk to an expert <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <Accordion
              type="single"
              collapsible
              value={openFaq}
              onValueChange={setOpenFaq}
              className="space-y-3"
            >
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 px-5 backdrop-blur transition-colors data-[state=open]:border-royal/40"
                >
                  <AccordionTrigger className="items-start py-4 text-left hover:no-underline [&>svg]:mt-1">
                    <span className="flex flex-col gap-1 pr-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold">{faq.category}</span>
                      <span className="text-sm font-semibold">{faq.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
