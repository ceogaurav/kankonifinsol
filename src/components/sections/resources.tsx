"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Clock, Calendar, BookOpen, HelpCircle, Search,
  Mail, Loader2, CheckCircle2, Sparkles, Send, TrendingUp,
} from "lucide-react";
import { SectionHeading, Reveal, staggerContainer, staggerItem } from "@/components/site/primitives";
import { blogPosts, faqs, type BlogPost } from "@/lib/site-data";
import { BlogDetailModal, useBlogDetail } from "@/components/sections/blog-detail-modal";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const accentBar: Record<string, string> = {
  royal: "from-royal to-royal/40",
  gold: "from-gold to-gold/40",
  navy: "from-navy to-royal/40",
};

const categories = ["All", "Loan Guides", "Credit Score", "Tax Saving", "EMI Guide", "Business Finance"];

export function Resources() {
  const [openFaq, setOpenFaq] = React.useState<string>("item-0");
  const [query, setQuery] = React.useState("");
  const [activeCat, setActiveCat] = React.useState("All");
  const blogDetail = useBlogDetail();

  // Newsletter state
  const [email, setEmail] = React.useState("");
  const [subLoading, setSubLoading] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);

  const filtered = React.useMemo(() => {
    return blogPosts.filter((p) => {
      const matchesCat = activeCat === "All" || p.category === activeCat;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, activeCat]);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    setSubLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribed(true);
        toast.success("Subscribed!", {
          description: data.alreadySubscribed
            ? "You're already on our list. Watch your inbox!"
            : "You'll receive financial insights every week.",
        });
        setEmail("");
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubLoading(false);
    }
  }

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

        {/* Search + filter bar */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, guides, tips…"
                className="h-11 rounded-xl border-border/70 bg-card/50 pl-10 backdrop-blur"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                    activeCat === cat
                      ? "border-royal bg-royal text-white shadow-royal-glow"
                      : "border-border/70 bg-card/40 text-muted-foreground hover:border-royal/40 hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Blog grid */}
        <motion.div
          key={activeCat + query}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.article
                key={post.slug}
                layout
                variants={staggerItem}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => blogDetail.openDetail(post)}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-royal/40 hover:shadow-premium"
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
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-border/60 bg-card/30 py-16 text-center">
            <Search className="h-8 w-8 text-muted-foreground/50" />
            <p className="mt-3 text-sm font-medium">No articles found</p>
            <p className="mt-1 text-xs text-muted-foreground">Try a different search term or category.</p>
          </div>
        )}

        {/* Newsletter strip */}
        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-border/60 bg-royal-gradient p-6 text-white sm:p-8">
            <div className="absolute inset-0 bg-mesh opacity-30" />
            <div className="relative flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div className="max-w-lg text-center lg:text-left">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
                  <Sparkles className="h-3 w-3 text-gold" /> Weekly Insights
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                  Get smarter with money, every week.
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  Join 50,000+ subscribers receiving loan tips, EMI hacks and market insights — straight to your inbox. No spam, ever.
                </p>
              </div>
              <div className="w-full max-w-md">
                {subscribed ? (
                  <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                    <CheckCircle2 className="h-7 w-7 text-gold" />
                    <div>
                      <p className="font-semibold">You're subscribed!</p>
                      <p className="text-xs text-white/70">Watch your inbox for our next issue.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={subscribe} className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="h-12 rounded-xl border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/50 focus-visible:border-gold focus-visible:ring-gold/30"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={subLoading}
                      className="h-12 rounded-xl bg-gold-gradient px-6 text-sm font-semibold text-navy-deep shadow-gold-glow hover:opacity-95"
                    >
                      {subLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="mr-1.5 h-4 w-4" /> Subscribe</>}
                    </Button>
                  </form>
                )}
                <p className="mt-2 text-center text-[11px] text-white/60 sm:text-left">
                  🔒 100% secure · Unsubscribe anytime
                </p>
              </div>
            </div>
          </div>
        </Reveal>

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

      <BlogDetailModal
        post={blogDetail.post}
        open={blogDetail.open}
        onClose={blogDetail.close}
      />
    </section>
  );
}
