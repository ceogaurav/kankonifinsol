"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Loader2, CheckCircle2, Send, Sparkles, ShieldCheck, Clock, Phone, Ticket,
} from "lucide-react";
import { useQuickApply } from "@/lib/quick-apply-store";
import { services, companyInfo } from "@/lib/site-data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function QuickApplyModal() {
  const { open, serviceName, prefillAmount, prefillSource, closeModal } = useQuickApply();
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "", phone: "", email: "", city: "", loanAmount: "", promoCode: "",
  });

  // Auto-detect promo/referral code from URL (?ref=CODE or ?promo=CODE)
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || params.get("promo") || "";
    if (ref) {
      setForm((p) => ({ ...p, promoCode: ref.toUpperCase() }));
    }
  }, []);

  // reset when opened — prefill amount from eligibility result if provided
  React.useEffect(() => {
    if (open) {
      setDone(false);
      setForm((p) => ({
        name: "", phone: "", email: "", city: "",
        loanAmount: prefillAmount || "",
        promoCode: p.promoCode, // preserve detected promo code
      }));
    }
  }, [open, serviceName, prefillAmount]);

  // close on Escape
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeModal]);

  function update(k: string, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please enter your name and phone number.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          service: serviceName,
          source: prefillSource || "quick-apply-modal",
          promoCode: form.promoCode || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDone(true);
        toast.success("Application received!", {
          description: "Our relationship manager will call you within 30 minutes.",
        });
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const selectedService = services.find((s) => s.name === serviceName);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 z-[70] grid place-items-center bg-navy-deep/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Quick apply for ${serviceName}`}
        >
          <motion.div
            initial={{ scale: 0.94, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 24, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border/60 bg-card shadow-premium"
          >
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-background/60 backdrop-blur transition-colors hover:bg-background"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="relative overflow-hidden bg-royal-gradient p-6 text-white">
              <div className="absolute inset-0 bg-mesh opacity-40" />
              <div className="relative flex items-center gap-3">
                {selectedService && (
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 backdrop-blur">
                    <selectedService.icon className="h-5 w-5" />
                  </span>
                )}
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/70">Quick Apply</p>
                  <h3 className="font-display text-lg font-bold">{serviceName}</h3>
                </div>
              </div>
              {selectedService && (
                <div className="relative mt-4 flex flex-wrap gap-3 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 backdrop-blur">
                    <Sparkles className="h-3 w-3 text-gold" /> Rate from {selectedService.rateFrom}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 backdrop-blur">
                    <ShieldCheck className="h-3 w-3" /> Max {selectedService.maxAmount}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 backdrop-blur">
                    <Clock className="h-3 w-3" /> {selectedService.tenure}
                  </span>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="max-h-[60vh] overflow-y-auto premium-scrollbar p-6">
              {done ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="grid place-items-center py-8 text-center"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-royal/15 text-royal">
                    <CheckCircle2 className="h-9 w-9" />
                  </span>
                  <h4 className="mt-4 font-display text-xl font-bold">Application received!</h4>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
                    Thank you{form.name ? `, ${form.name}` : ""}. Your dedicated relationship manager will call you within 30 minutes with the best {serviceName} offers.
                  </p>
                  <Button onClick={closeModal} className="mt-5 rounded-xl">Done</Button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Full Name *</Label>
                      <Input value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-1.5 h-11 rounded-xl bg-background/60" placeholder="Your name" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Mobile *</Label>
                      <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1.5 h-11 rounded-xl bg-background/60" placeholder="+91 72040 12527" inputMode="tel" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Email</Label>
                      <Input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" className="mt-1.5 h-11 rounded-xl bg-background/60" placeholder="you@example.com" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">City</Label>
                      <Input value={form.city} onChange={(e) => update("city", e.target.value)} className="mt-1.5 h-11 rounded-xl bg-background/60" placeholder="Mumbai" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">Desired Loan Amount</Label>
                    <Input value={form.loanAmount} onChange={(e) => update("loanAmount", e.target.value)} className="mt-1.5 h-11 rounded-xl bg-background/60" placeholder="₹25,00,000" />
                  </div>

                  {/* Promo / Referral code */}
                  <div className="relative">
                    <Label className="text-xs font-medium text-muted-foreground">Promo / Referral Code (optional)</Label>
                    <div className="relative mt-1.5">
                      <Ticket className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                      <Input
                        value={form.promoCode}
                        onChange={(e) => update("promoCode", e.target.value.toUpperCase())}
                        className="h-11 rounded-xl bg-background/60 pl-10 uppercase placeholder:normal-case"
                        placeholder="Enter code for extra benefits"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-royal-gradient py-6 text-sm font-semibold text-white shadow-royal-glow hover:opacity-95"
                  >
                    {loading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</>
                    ) : (
                      <><Send className="mr-2 h-4 w-4" /> Get Instant Offers</>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-royal" /> 100% Secure</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3 text-gold" /> 30-min callback</span>
                    <a href={companyInfo.phoneHref} className="inline-flex items-center gap-1 hover:text-foreground"><Phone className="h-3 w-3" /> Call instead</a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
