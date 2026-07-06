"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, X, Phone, Sparkles, Gift, ArrowRight, Loader2, CheckCircle2,
} from "lucide-react";
import { companyInfo } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const whatsappLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
  "Hi Kankoni Finsol, I'd like to know more about your loan offers."
)}`;

/* ---------------- WhatsApp button ---------------- */
export function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 200, damping: 15 }}
      className="group fixed bottom-5 left-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg sm:h-14 sm:w-14"
    >
      <span className="absolute inset-0 animate-pulse-ring rounded-full" style={{ animationDuration: "3s" }} />
      <MessageCircle className="h-6 w-6" />
      <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-lg bg-navy-deep px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
        Chat with an expert
      </span>
    </motion.a>
  );
}

/* ---------------- Sticky mobile Apply CTA ---------------- */
export function StickyApplyCTA() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-border/60 glass-nav px-4 py-3 sm:hidden"
        >
          <div className="flex items-center gap-2">
            <a
              href={companyInfo.phoneHref}
              aria-label="Call now"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border/70 bg-card/60 text-royal"
            >
              <Phone className="h-5 w-5" />
            </a>
            <a
              href="#contact"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-royal-gradient py-3 text-sm font-semibold text-white shadow-royal-glow"
            >
              <Sparkles className="h-4 w-4" /> Apply Now — Free
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Exit-intent popup ---------------- */
export function ExitIntentPopup() {
  const [open, setOpen] = React.useState(false);
  const [shown, setShown] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    if (shown) return;
    const dismissed = sessionStorage.getItem("kankoni-exit-popup");
    if (dismissed) return;

    const trigger = () => {
      if (shown) return;
      setShown(true);
      setOpen(true);
    };

    // Exit intent (desktop): mouse leaves top
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    // Fallback timer (mobile / no mouseleave): 35s
    const timer = setTimeout(trigger, 35000);

    document.addEventListener("mouseout", onLeave);
    return () => {
      document.removeEventListener("mouseout", onLeave);
      clearTimeout(timer);
    };
  }, [shown]);

  function close() {
    setOpen(false);
    sessionStorage.setItem("kankoni-exit-popup", "1");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone) {
      toast.error("Please enter your phone number.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || "Exit-intent lead", phone, preferredTime: "In next 30 minutes", service: "Personal Loan" }),
      });
      const data = await res.json();
      if (data.success) {
        setDone(true);
        toast.success("Callback scheduled!", { description: "We'll call you within 30 minutes." });
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] grid place-items-center bg-navy-deep/60 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border/60 bg-card shadow-premium"
          >
            <button onClick={close} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-background/60 backdrop-blur">
              <X className="h-4 w-4" />
            </button>

            <div className="relative overflow-hidden bg-royal-gradient p-6 text-white">
              <div className="absolute inset-0 bg-mesh opacity-40" />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
                  <Gift className="h-3 w-3" /> Limited Time Offer
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
                  Wait! Get a <span className="text-gold">0.25% lower rate</span> on your loan
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  Leave your number and our expert will call you in 30 minutes with exclusive rates from 100+ banks.
                </p>
              </div>
            </div>

            <div className="p-6">
              {done ? (
                <div className="grid place-items-center py-6 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-royal/15 text-royal">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <p className="mt-3 font-display text-lg font-semibold">Callback scheduled!</p>
                  <p className="mt-1 text-sm text-muted-foreground">Our expert will reach you within 30 minutes.</p>
                  <Button onClick={close} className="mt-4 rounded-xl">Done</Button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-3">
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="h-11 rounded-xl bg-background/60" />
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Mobile number *" inputMode="tel" className="h-11 rounded-xl bg-background/60" />
                  <Button type="submit" disabled={loading} className="w-full rounded-xl bg-royal-gradient py-6 text-sm font-semibold text-white shadow-royal-glow">
                    {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scheduling…</> : <><Sparkles className="mr-2 h-4 w-4" /> Get My Callback <ArrowRight className="ml-1 h-4 w-4" /></>}
                  </Button>
                  <p className="text-center text-[11px] text-muted-foreground">No spam. Unsubscribe anytime. 100% secure.</p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
