"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Gift, Copy, Check, Share2, Sparkles, Users, TrendingUp, ArrowRight,
} from "lucide-react";
import { SectionHeading, Reveal } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function genReferralCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "KANKONI-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export function ReferralBanner() {
  const [code, setCode] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    // Persist generated code in localStorage so it's stable per visitor
    const stored = typeof window !== "undefined" ? localStorage.getItem("kankoni-referral") : null;
    if (stored) {
      setCode(stored);
    } else {
      const c = genReferralCode();
      setCode(c);
      if (typeof window !== "undefined") localStorage.setItem("kankoni-referral", c);
    }
  }, []);

  const referralLink = typeof window !== "undefined" ? `${window.location.origin}/?ref=${code}` : "";

  function copy() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("Referral link copied!", { description: "Share it with friends to earn rewards." });
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function share() {
    if (navigator.share) {
      navigator.share({
        title: "Kankoni Finsol — Get the best loan rates",
        text: `Use my referral code ${code} for exclusive benefits on your loan with Kankoni Finsol!`,
        url: referralLink,
      }).catch(() => {});
    } else {
      copy();
    }
  }

  function regenerate() {
    const c = genReferralCode();
    setCode(c);
    if (typeof window !== "undefined") localStorage.setItem("kankoni-referral", c);
    toast.success("New referral code generated!");
  }

  return (
    <section id="referral" className="relative overflow-hidden py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-royal-gradient p-6 text-white shadow-royal-glow sm:p-10">
            <div aria-hidden className="absolute inset-0 bg-mesh opacity-30" />
            {/* Floating decorative shapes */}
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl animate-float" />
            <div aria-hidden className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-white/10 blur-3xl animate-float-slow" />

            <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              {/* Left: copy */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur">
                  <Gift className="h-3.5 w-3.5 text-gold" /> Refer &amp; Earn
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                  Share Kankoni. <br />
                  <span className="text-gradient-gold">Earn rewards together.</span>
                </h3>
                <p className="mt-3 max-w-md text-sm text-white/80">
                  Refer friends and family to Kankoni Finsol. When they apply with your code, both of you unlock exclusive rate discounts and cashback on disbursal.
                </p>

                {/* Benefits */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { icon: TrendingUp, label: "0.10%", sub: "Rate discount" },
                    { icon: Sparkles, label: "₹2,000", sub: "Cashback on disbursal" },
                    { icon: Users, label: "Unlimited", sub: "Referrals allowed" },
                  ].map((b) => (
                    <div key={b.label} className="rounded-xl border border-white/15 bg-white/5 p-3 text-center backdrop-blur">
                      <b.icon className="mx-auto h-4 w-4 text-gold" />
                      <p className="mt-1 font-display text-sm font-bold">{b.label}</p>
                      <p className="text-[10px] text-white/60">{b.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: referral code card */}
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur sm:p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-white/60">Your referral code</p>
                <div className="mt-2 flex items-center gap-3">
                  <code className="flex-1 rounded-xl border border-dashed border-gold/40 bg-navy-deep/30 px-4 py-3 font-mono text-lg font-bold tracking-wider text-gold">
                    {code || "Generating…"}
                  </code>
                  <button
                    onClick={regenerate}
                    aria-label="Generate new code"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/5 text-white/70 transition-colors hover:text-white"
                  >
                    <Sparkles className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-white/60">Your referral link</p>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    readOnly
                    value={referralLink}
                    className="flex-1 truncate rounded-xl border border-white/15 bg-navy-deep/30 px-3 py-2.5 text-xs text-white/80 outline-none"
                  />
                  <button
                    onClick={copy}
                    aria-label="Copy referral link"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold text-navy-deep transition-transform hover:scale-105"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button onClick={share} className="flex-1 rounded-xl bg-gold-gradient py-5 text-sm font-semibold text-navy-deep shadow-gold-glow hover:opacity-95">
                    <Share2 className="mr-2 h-4 w-4" /> Share Now
                  </Button>
                  <a href="#contact" className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                    Apply <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-3 text-center text-[10px] text-white/50">
                  🔒 Code is stored locally on your device. Terms &amp; conditions apply.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
