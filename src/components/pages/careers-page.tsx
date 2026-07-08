"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, MapPin, Briefcase, Clock, ArrowRight, Sparkles, Heart, Zap,
  ShieldCheck, TrendingUp, Users, Check, Send, Loader2, Building2, Coffee,
  GraduationCap, Plane, X,
} from "lucide-react";
import { useRouter } from "@/lib/router-store";
import { jobOpenings, type JobOpening, companyInfo } from "@/lib/site-data";
import { Reveal } from "@/components/site/primitives";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const perks = [
  { icon: TrendingUp, title: "Performance Bonuses", desc: "Quarterly bonuses + disbursal incentives. Top performers earn 40% above base." },
  { icon: ShieldCheck, title: "Health Insurance", desc: "Comprehensive family health cover (₹10L) + term life insurance for every employee." },
  { icon: GraduationCap, title: "Learning Budget", desc: "₹50,000/yr for courses, certifications and conferences. Grow your skills, on us." },
  { icon: Plane, title: "Paid Leave", desc: "20 days annual leave + 12 sick days + flexible remote options. Balance matters." },
  { icon: Coffee, title: "Premium Workspaces", desc: "Grade-A offices in BKC, Cyber Hub & HITEC City. Plus free meals and snacks." },
  { icon: Users, title: "Mentorship", desc: "1:1 mentorship with industry veterans. Structured growth path from day one." },
];

const departments = ["All", "Sales & Lending", "Credit & Underwriting", "Technology", "Marketing", "Operations", "Customer Experience"];

export function CareersPage() {
  const navigate = useRouter((s) => s.navigate);
  const [activeDept, setActiveDept] = React.useState("All");
  const [selectedJob, setSelectedJob] = React.useState<JobOpening | null>(null);

  const filtered = activeDept === "All" ? jobOpenings : jobOpenings.filter((j) => j.department === activeDept);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative pt-28 pb-20 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-mesh opacity-40" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <button onClick={() => navigate("home")} className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/50 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur transition-colors hover:border-royal/40 hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </button>

        {/* Hero */}
        <div className="text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              <Briefcase className="h-3.5 w-3.5" /> Careers at Kankoni
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Build the future of <span className="text-gradient-gold">Indian finance</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We're a team of bankers, engineers and problem-solvers on a mission to make finance fair, fast and premium for every Indian. Join us and shape the next decade of fintech.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-royal" /> 150+ team members</span>
              <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4 text-royal" /> 6 offices</span>
              <span className="inline-flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-gold" /> 3x YoY growth</span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Why join */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <Reveal><h2 className="text-center font-display text-3xl font-bold sm:text-4xl">Why join <span className="text-gradient-royal">Kankoni?</span></h2></Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="group rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-premium">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal/10 text-royal transition-colors group-hover:bg-royal group-hover:text-white"><p.icon className="h-5 w-5" /></span>
                <h4 className="mt-4 font-display text-base font-semibold">{p.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Open positions */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Open <span className="text-gradient-gold">positions</span></h2>
          <p className="mt-2 text-sm text-muted-foreground">{jobOpenings.length} roles open across India</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {departments.map((dept) => (
              <button key={dept} onClick={() => setActiveDept(dept)}
                className={cn("rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all", activeDept === dept ? "border-royal bg-royal text-white shadow-royal-glow" : "border-border/70 bg-card/40 text-muted-foreground hover:border-royal/40 hover:text-foreground")}>
                {dept}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="mt-6 space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((job) => (
              <motion.div key={job.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
                className="group cursor-pointer rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur transition-all hover:border-royal/40 hover:shadow-premium"
                onClick={() => setSelectedJob(job)}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-base font-semibold">{job.title}</h3>
                      <span className="rounded-full bg-royal/10 px-2 py-0.5 text-[10px] font-semibold text-royal">{job.department}</span>
                      {job.type === "Internship" && <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-gold">{job.type}</span>}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                      <span className="inline-flex items-center gap-1"><Briefcase className="h-3 w-3" />{job.experience}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{job.type}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-xl border border-border/70 bg-background/50 px-3 py-2 text-xs font-semibold transition-all group-hover:border-royal/50 group-hover:bg-royal group-hover:text-white">View <ArrowRight className="h-3 w-3" /></span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* General CTA */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <Reveal>
          <div className="rounded-3xl border border-border/60 bg-card/50 p-8 backdrop-blur sm:p-10">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-royal-gradient text-white"><Sparkles className="h-7 w-7" /></span>
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold">Don't see the right role?</h3>
                <p className="mt-1 text-sm text-muted-foreground">Send us your resume and we'll reach out when a matching role opens.</p>
              </div>
              <a href="mailto:careers@kankonifinsol.com" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-royal-gradient px-5 py-3 text-sm font-semibold text-white shadow-royal-glow"><Send className="h-4 w-4" /> Apply Generally</a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-border/50 py-6 text-center"><p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {companyInfo.name} Pvt. Ltd. · careers@kankonifinsol.com</p></div>

      {/* Job detail modal */}
      <AnimatePresence>
        {selectedJob && <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}

function JobDetailModal({ job, onClose }: { job: JobOpening; onClose: () => void }) {
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", cover: "" });
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error("Please enter your name and email."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, phone: form.phone || "0000000000", service: `Job Application: ${job.title}`, source: "careers-page", message: form.cover || `Application for ${job.title}` }) });
      const data = await res.json();
      if (data.success) { setDone(true); toast.success("Application submitted!"); } else { toast.error(data.error || "Something went wrong."); }
    } catch { toast.error("Network error."); } finally { setLoading(false); }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[90] grid place-items-center bg-navy-deep/70 p-4 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.95, y: 24, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 24, opacity: 0 }} transition={{ duration: 0.3 }} onClick={(e) => e.stopPropagation()} className="relative max-h-[88vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-border/60 bg-card shadow-premium">
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-background/60 backdrop-blur hover:bg-background"><X className="h-4 w-4" /></button>
        <div className="relative overflow-hidden bg-royal-gradient p-6 text-white sm:p-8">
          <div className="absolute inset-0 bg-mesh opacity-40" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">{job.department}</span>
              {job.type === "Internship" && <span className="rounded-full bg-gold/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold backdrop-blur">{job.type}</span>}
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold">{job.title}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/80">
              <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
              <span className="inline-flex items-center gap-1"><Briefcase className="h-3 w-3" />{job.experience}</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{job.type}</span>
            </div>
          </div>
        </div>
        <div className="max-h-[calc(88vh-13rem)] overflow-y-auto premium-scrollbar p-6 sm:p-8">
          {done ? (
            <div className="grid place-items-center py-8 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-royal/15 text-royal"><Check className="h-9 w-9" /></span>
              <h4 className="mt-4 font-display text-xl font-bold">Application submitted!</h4>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">Thank you, {form.name}. Our HR team will reach out within 5 business days.</p>
              <Button onClick={onClose} className="mt-5 rounded-xl">Done</Button>
            </div>
          ) : (
            <>
              <p className="text-sm leading-relaxed text-muted-foreground">{job.description}</p>
              <div className="mt-5"><h4 className="flex items-center gap-2 font-display text-sm font-semibold"><Check className="h-4 w-4 text-royal" /> Key Responsibilities</h4><ul className="mt-2 space-y-1.5">{job.responsibilities.map((r) => (<li key={r} className="flex items-start gap-2 text-xs text-foreground/80"><span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-royal" /> {r}</li>))}</ul></div>
              <div className="mt-5"><h4 className="flex items-center gap-2 font-display text-sm font-semibold"><Sparkles className="h-4 w-4 text-gold" /> Requirements</h4><ul className="mt-2 space-y-1.5">{job.requirements.map((r) => (<li key={r} className="flex items-start gap-2 text-xs text-foreground/80"><span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gold" /> {r}</li>))}</ul></div>
              <div className="mt-6 border-t border-border/50 pt-5">
                <h4 className="font-display text-sm font-semibold">Apply for this role</h4>
                <form onSubmit={submit} className="mt-3 space-y-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div><Label className="text-xs font-medium text-muted-foreground">Full Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 h-10 rounded-xl bg-background/60" placeholder="Your name" /></div>
                    <div><Label className="text-xs font-medium text-muted-foreground">Email *</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" className="mt-1 h-10 rounded-xl bg-background/60" placeholder="you@example.com" /></div>
                  </div>
                  <div><Label className="text-xs font-medium text-muted-foreground">Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 h-10 rounded-xl bg-background/60" placeholder="+91 90000 00000" /></div>
                  <div><Label className="text-xs font-medium text-muted-foreground">Cover Note</Label><Textarea value={form.cover} onChange={(e) => setForm({ ...form, cover: e.target.value })} className="mt-1 min-h-[80px] rounded-xl bg-background/60" placeholder="Tell us why you'd be great for this role…" /></div>
                  <Button type="submit" disabled={loading} className="w-full rounded-xl bg-royal-gradient py-5 text-sm font-semibold text-white shadow-royal-glow">{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</> : <><Send className="mr-2 h-4 w-4" /> Submit Application</>}</Button>
                </form>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
