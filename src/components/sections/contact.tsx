"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Send, Loader2,
  CheckCircle2, Sparkles,
} from "lucide-react";
import { SectionHeading, Reveal } from "@/components/site/primitives";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { services, companyInfo } from "@/lib/site-data";
import { toast } from "sonner";

const whatsappLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
  "Hi Kankoni Finsol, I'd like to apply for a loan."
)}`;

export function Contact() {
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "", phone: "", email: "", city: "", service: services[0].name, loanAmount: "", message: "",
  });

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
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setDone(true);
        toast.success("Application received!", {
          description: "Our relationship manager will call you within 30 minutes.",
        });
        setForm({ name: "", phone: "", email: "", city: "", service: services[0].name, loanAmount: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls = "h-11 rounded-xl border border-border/70 bg-background/60 px-3 text-sm transition-colors focus-visible:border-royal focus-visible:ring-royal/20";

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/4 h-[30rem] w-[30rem] rounded-full bg-royal/10 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Apply in 60 seconds"
          title={
            <>
              Let's get you <span className="text-gradient-gold">funded</span>
            </>
          }
          description="Fill in your details and our dedicated relationship manager will call you back within 30 minutes with the best offers from 100+ banks."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur shadow-premium sm:p-8">
              {done ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="grid h-full min-h-[24rem] place-items-center text-center"
                >
                  <div>
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-royal/15 text-royal">
                      <CheckCircle2 className="h-9 w-9" />
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-bold">Application received!</h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                      Thank you, {form.name || "valued customer"}. Your relationship manager will reach out within 30 minutes with tailored offers.
                    </p>
                    <Button onClick={() => setDone(false)} variant="outline" className="mt-5 rounded-xl">
                      Submit another application
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Full Name *</Label>
                      <Input value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-1.5 h-11 rounded-xl bg-background/60" placeholder="Rohit Sharma" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Mobile Number *</Label>
                      <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1.5 h-11 rounded-xl bg-background/60" placeholder="+91 72040 12527" inputMode="tel" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Email</Label>
                      <Input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" className="mt-1.5 h-11 rounded-xl bg-background/60" placeholder="rohit@example.com" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">City</Label>
                      <Input value={form.city} onChange={(e) => update("city", e.target.value)} className="mt-1.5 h-11 rounded-xl bg-background/60" placeholder="Mumbai" />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Loan Type</Label>
                      <select value={form.service} onChange={(e) => update("service", e.target.value)} className={`${inputCls} mt-1.5 w-full`}>
                        {services.map((s) => (
                          <option key={s.slug}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Desired Loan Amount</Label>
                      <Input value={form.loanAmount} onChange={(e) => update("loanAmount", e.target.value)} className="mt-1.5 h-11 rounded-xl bg-background/60" placeholder="₹25,00,000" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">Message (optional)</Label>
                    <Textarea value={form.message} onChange={(e) => update("message", e.target.value)} className="mt-1.5 min-h-[90px] rounded-xl bg-background/60" placeholder="Tell us about your requirement…" />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 rounded-xl bg-royal-gradient py-6 text-sm font-semibold text-white shadow-royal-glow hover:opacity-95"
                    >
                      {loading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</>
                      ) : (
                        <><Send className="mr-2 h-4 w-4" /> Submit Application</>
                      )}
                    </Button>
                    <a
                      href={whatsappLink}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-lg"
                    >
                      <MessageCircle className="h-4 w-4" /> WhatsApp Us
                    </a>
                  </div>
                  <p className="text-center text-[11px] text-muted-foreground">
                    <Sparkles className="mr-1 inline h-3 w-3 text-gold" />
                    Free consultation · No obligation · 100% secure
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* Contact info + map */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { icon: Phone, label: "Call Us", val: companyInfo.phone, href: companyInfo.phoneHref },
                  { icon: Mail, label: "Email", val: companyInfo.email, href: `mailto:${companyInfo.email}` },
                  { icon: Clock, label: "Hours", val: companyInfo.hours },
                  { icon: MapPin, label: "Visit", val: "Bandra Kurla Complex, Mumbai" },
                ].map((c) => {
                  const Inner = (
                    <>
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-royal/10 text-royal">
                        <c.icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.label}</p>
                        <p className="truncate text-sm font-semibold">{c.val}</p>
                      </div>
                    </>
                  );
                  return c.href ? (
                    <a key={c.label} href={c.href} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/50 p-4 backdrop-blur transition-colors hover:border-royal/40">
                      {Inner}
                    </a>
                  ) : (
                    <div key={c.label} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/50 p-4 backdrop-blur">
                      {Inner}
                    </div>
                  );
                })}
              </div>

              {/* Map */}
              <div className="relative flex-1 overflow-hidden rounded-2xl border border-border/60 bg-card/50 backdrop-blur">
                <iframe
                  title="Kankoni Finsol office location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=72.86%2C19.05%2C72.90%2C19.08&layer=mapnik&marker=19.065%2C72.88"
                  className="h-full min-h-[14rem] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-4 text-center">
                <p className="text-sm font-semibold text-gold">Need an instant callback?</p>
                <p className="mt-1 text-xs text-muted-foreground">Tap the floating WhatsApp or call button anytime.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
