"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Phone, Mail, MapPin, Calendar, User, Briefcase, Wallet,
  ShieldCheck, CreditCard, MessageSquare, Ticket, Clock, ChevronDown,
  Check, Loader2, Sparkles, Send, History, RefreshCw,
} from "lucide-react";
import { employees } from "@/lib/site-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  service: string;
  loanAmount: string | null;
  employment: string | null;
  income: string | null;
  creditScore: string | null;
  message: string | null;
  source: string;
  status: string;
  promoCode: string | null;
  assignedTo: string | null;
  createdAt: string;
}

const STATUS_OPTIONS = ["new", "contacted", "qualified", "disbursed", "rejected"] as const;
type Status = (typeof STATUS_OPTIONS)[number];

const statusColors: Record<Status, string> = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  contacted: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  qualified: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  disbursed: "bg-green-500/15 text-green-400 border-green-500/30",
  rejected: "bg-red-500/15 text-red-400 border-red-500/30",
};

interface LeadDrawerProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
  adminKey: string;
  onUpdateStatus: (leadId: string, status: string) => Promise<void>;
  onUpdateAssignee: (leadId: string, assignee: string) => Promise<void>;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/40 p-3">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-royal/10 text-royal">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value || <span className="text-muted-foreground/40">—</span>}</p>
      </div>
    </div>
  );
}

interface LeadNote {
  id: string;
  author: string;
  type: string;
  content: string;
  createdAt: string;
}

const noteTypeConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; label: string }> = {
  note: { icon: MessageSquare, color: "bg-royal/10 text-royal", label: "Note" },
  status_change: { icon: RefreshCw, color: "bg-amber-500/15 text-amber-400", label: "Status" },
  assignment: { icon: User, color: "bg-purple-500/15 text-purple-400", label: "Assignment" },
};

export function LeadDrawer({ lead, open, onClose, adminKey, onUpdateStatus, onUpdateAssignee }: LeadDrawerProps) {
  const [updating, setUpdating] = React.useState(false);
  const [notes, setNotes] = React.useState<LeadNote[]>([]);
  const [notesLoading, setNotesLoading] = React.useState(false);
  const [noteInput, setNoteInput] = React.useState("");
  const [postingNote, setPostingNote] = React.useState(false);

  // Fetch notes when drawer opens / lead changes
  const fetchNotes = React.useCallback(async () => {
    if (!lead || !adminKey) return;
    setNotesLoading(true);
    try {
      const res = await fetch(`/api/leads/${lead.id}/notes?key=${encodeURIComponent(adminKey)}`);
      const data = await res.json();
      if (data.success) setNotes(data.notes || []);
    } catch {
      // ignore
    } finally {
      setNotesLoading(false);
    }
  }, [lead, adminKey]);

  React.useEffect(() => {
    if (open && lead) fetchNotes();
    if (!open) { setNotes([]); setNoteInput(""); }
  }, [open, lead, fetchNotes]);

  // Refresh notes after a status/assignee update completes
  React.useEffect(() => {
    if (open && lead && !updating) {
      const t = setTimeout(fetchNotes, 600);
      return () => clearTimeout(t);
    }
  }, [updating, open, lead, fetchNotes]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function postNote(e: React.FormEvent) {
    e.preventDefault();
    if (!lead || !noteInput.trim()) return;
    setPostingNote(true);
    try {
      const res = await fetch(`/api/leads/${lead.id}/notes?key=${encodeURIComponent(adminKey)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: noteInput.trim(), type: "note", author: "Admin" }),
      });
      const data = await res.json();
      if (data.success) {
        setNoteInput("");
        fetchNotes();
        toast.success("Note added");
      } else {
        toast.error(data.error || "Could not add note");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setPostingNote(false);
    }
  }

  async function handleStatus(newStatus: string) {
    if (!lead || newStatus === lead.status) return;
    setUpdating(true);
    await onUpdateStatus(lead.id, newStatus);
    setUpdating(false);
  }

  async function handleAssignee(assignee: string) {
    if (!lead) return;
    setUpdating(true);
    await onUpdateAssignee(lead.id, assignee);
    setUpdating(false);
  }

  return (
    <AnimatePresence>
      {open && lead && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[75] bg-navy-deep/60 backdrop-blur-sm"
          />
          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-y-0 right-0 z-[76] flex w-full max-w-md flex-col border-l border-border/60 bg-card shadow-premium"
            role="dialog"
            aria-modal="true"
            aria-label={`Lead details for ${lead.name}`}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between overflow-hidden bg-royal-gradient p-5 text-white">
              <div className="absolute inset-0 bg-mesh opacity-30" />
              <div className="relative flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 font-display text-sm font-bold backdrop-blur">
                  {lead.name.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-white/60">Lead Detail</p>
                  <h3 className="truncate font-display text-base font-bold">{lead.name}</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="relative grid h-9 w-9 place-items-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto premium-scrollbar p-5">
              {/* Status + Assignment controls */}
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Status</p>
                  <div className="relative">
                    <select
                      value={lead.status}
                      disabled={updating}
                      onChange={(e) => handleStatus(e.target.value)}
                      className={cn(
                        "w-full cursor-pointer appearance-none rounded-xl border py-2 pl-3 pr-8 text-xs font-semibold capitalize outline-none transition-colors disabled:opacity-50",
                        statusColors[lead.status as Status] || "border-border/60 bg-muted text-muted-foreground"
                      )}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s} className="bg-card capitalize text-foreground">{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-60" />
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Assigned To</p>
                  <div className="relative">
                    <select
                      value={lead.assignedTo || ""}
                      disabled={updating}
                      onChange={(e) => handleAssignee(e.target.value)}
                      className="w-full cursor-pointer appearance-none rounded-xl border border-border/60 bg-background/50 py-2 pl-3 pr-8 text-xs font-medium outline-none transition-colors disabled:opacity-50 hover:border-royal/40"
                    >
                      <option value="" className="bg-card text-foreground">Unassigned</option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.name} className="bg-card text-foreground">{emp.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-60" />
                  </div>
                </div>
              </div>

              {updating && (
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-royal/10 px-3 py-1 text-[11px] font-medium text-royal">
                  <Loader2 className="h-3 w-3 animate-spin" /> Updating…
                </div>
              )}

              {/* Service + source badges */}
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-royal/10 px-2.5 py-1 text-[11px] font-semibold text-royal">
                  <Briefcase className="h-3 w-3" /> {lead.service}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground capitalize">
                  <Sparkles className="h-3 w-3" /> {lead.source.replace(/-/g, " ")}
                </span>
                {lead.promoCode && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-bold text-gold">
                    <Ticket className="h-3 w-3" /> {lead.promoCode}
                  </span>
                )}
              </div>

              {/* Fields */}
              <div className="space-y-2.5">
                <Field icon={Phone} label="Phone" value={lead.phone} />
                <Field icon={Mail} label="Email" value={lead.email} />
                <Field icon={MapPin} label="City" value={lead.city} />
                <Field icon={Wallet} label="Loan Amount" value={lead.loanAmount} />
                <Field icon={User} label="Employment" value={lead.employment} />
                <Field icon={Briefcase} label="Income" value={lead.income} />
                <Field icon={CreditCard} label="Credit Score" value={lead.creditScore} />
                <Field icon={Clock} label="Created" value={formatDate(lead.createdAt)} />
              </div>

              {/* Message */}
              {lead.message && (
                <div className="mt-4">
                  <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    <MessageSquare className="h-3 w-3" /> Message
                  </p>
                  <div className="rounded-xl border border-border/50 bg-background/40 p-3 text-sm leading-relaxed text-muted-foreground">
                    {lead.message}
                  </div>
                </div>
              )}

              {/* Activity Log / Timeline */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    <History className="h-3 w-3" /> Activity Log
                  </p>
                  {notesLoading && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
                </div>

                {/* Timeline */}
                <div className="relative space-y-2.5 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-border/60">
                  {notes.length === 0 && !notesLoading && (
                    <p className="py-3 text-center text-[11px] text-muted-foreground/60">No activity yet</p>
                  )}
                  {notes.map((n) => {
                    const cfg = noteTypeConfig[n.type] || noteTypeConfig.note;
                    return (
                      <div key={n.id} className="relative flex gap-3">
                        <span className={cn("z-10 mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full", cfg.color)}>
                          <cfg.icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="min-w-0 flex-1 rounded-lg border border-border/50 bg-background/40 p-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              {cfg.label} · {n.author}
                            </span>
                            <span className="shrink-0 text-[10px] text-muted-foreground/60">
                              {new Date(n.createdAt).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs leading-relaxed text-foreground/90">{n.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add note */}
                <form onSubmit={postNote} className="mt-3 flex gap-2">
                  <input
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Add a note…"
                    className="flex-1 rounded-xl border border-border/70 bg-background/60 px-3 py-2 text-xs outline-none transition-colors focus:border-royal"
                  />
                  <button
                    type="submit"
                    disabled={postingNote || !noteInput.trim()}
                    aria-label="Add note"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-royal-gradient text-white transition-opacity disabled:opacity-40"
                  >
                    {postingNote ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                  </button>
                </form>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border/50 p-4">
              <a
                href={`tel:${lead.phone}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-royal-gradient py-3 text-sm font-semibold text-white shadow-royal-glow"
              >
                <Phone className="h-4 w-4" /> Call Lead
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/** Hook to manage drawer state */
export function useLeadDrawer() {
  const [lead, setLead] = React.useState<Lead | null>(null);
  const [open, setOpen] = React.useState(false);
  const openDrawer = React.useCallback((l: Lead) => { setLead(l); setOpen(true); }, []);
  const close = React.useCallback(() => setOpen(false), []);
  return { lead, open, openDrawer, close };
}
