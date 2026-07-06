"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  Lock, Loader2, Download, RefreshCw, TrendingUp, Users, Mail,
  Phone, MapPin, Calendar, Filter, Search, ChevronDown, Database,
  ShieldCheck, ArrowRight, Sparkles, X, Check, AlertCircle,
  UserCog, Gift, PieChart as PieIcon, BarChart3, ListChecks, Trophy,
} from "lucide-react";
import { SectionHeading, Reveal, AnimatedCounter } from "@/components/site/primitives";
import { employees } from "@/lib/site-data";
import { setAdminNotifEnabled } from "@/components/sections/admin-notifications";
import { KanbanBoard } from "@/components/sections/kanban-board";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ADMIN_KEY_DEFAULT = "kankoni-admin";
const STATUS_OPTIONS = ["new", "contacted", "qualified", "disbursed", "rejected"] as const;
type Status = (typeof STATUS_OPTIONS)[number];

const statusColors: Record<Status, string> = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  contacted: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  qualified: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  disbursed: "bg-green-500/15 text-green-400 border-green-500/30",
  rejected: "bg-red-500/15 text-red-400 border-red-500/30",
};

const sourceColors = ["oklch(0.42 0.2 264)", "oklch(0.78 0.15 84)", "oklch(0.6 0.14 200)", "oklch(0.62 0.18 160)", "oklch(0.55 0.2 300)", "oklch(0.65 0.15 100)", "oklch(0.5 0.15 30)"];

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  service: string;
  loanAmount: string | null;
  source: string;
  status: string;
  promoCode: string | null;
  assignedTo: string | null;
  createdAt: string;
}

interface Stats {
  total: number;
  byStatus: { status: string; count: number }[];
  bySource: { source: string; count: number }[];
  byService: { service: string; count: number }[];
  byPromoCode?: { code: string; count: number; disbursed: number; services: number }[];
  byAssignee?: { name: string; count: number; disbursed: number; contacted: number }[];
  last7Days: { date: string; count: number }[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export function AdminDashboard() {
  const [authed, setAuthed] = React.useState(false);
  const [keyInput, setKeyInput] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [key, setKey] = React.useState("");

  const [stats, setStats] = React.useState<Stats | null>(null);
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<"leads" | "pipeline" | "referrals" | "team">("leads");

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (!keyInput.trim()) {
      setAuthError("Please enter the admin key.");
      return;
    }
    setKey(keyInput.trim());
    setAuthed(true);
    setAuthError("");
    setAdminNotifEnabled(true, keyInput.trim());
  }

  const fetchData = React.useCallback(async () => {
    if (!key) return;
    setLoading(true);
    try {
      const [statsRes, leadsRes] = await Promise.all([
        fetch(`/api/leads/stats?key=${encodeURIComponent(key)}`),
        fetch(`/api/leads?key=${encodeURIComponent(key)}`),
      ]);
      const statsData = await statsRes.json();
      const leadsData = await leadsRes.json();
      if (statsData.success) setStats(statsData);
      if (leadsData.success) setLeads(leadsData.leads || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [key]);

  React.useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  async function updateStatus(leadId: string, newStatus: string) {
    setUpdatingId(leadId);
    try {
      const res = await fetch(`/api/leads/${leadId}?key=${encodeURIComponent(key)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
      }
    } catch {
      // ignore
    } finally {
      setUpdatingId(null);
    }
  }

  async function updateAssignee(leadId: string, assignee: string) {
    setUpdatingId(leadId);
    try {
      const res = await fetch(`/api/leads/${leadId}?key=${encodeURIComponent(key)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedTo: assignee || null }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, assignedTo: assignee || null } : l)));
      }
    } catch {
      // ignore
    } finally {
      setUpdatingId(null);
    }
  }

  function exportCSV() {
    const headers = ["Name", "Phone", "Email", "City", "Service", "Loan Amount", "Source", "Status", "Promo Code", "Assigned To", "Created At"];
    const rows = filtered.map((l) => [
      l.name, l.phone, l.email || "", l.city || "", l.service, l.loanAmount || "",
      l.source, l.status, l.promoCode || "", l.assignedTo || "", formatDate(l.createdAt),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kankoni-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = React.useMemo(() => {
    return leads.filter((l) => {
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        l.name.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.email || "").toLowerCase().includes(q) ||
        (l.city || "").toLowerCase().includes(q) ||
        l.service.toLowerCase().includes(q) ||
        (l.promoCode || "").toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [leads, search, statusFilter]);

  // ----- Login screen -----
  if (!authed) {
    return (
      <section id="admin" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Internal · CRM"
            title={
              <>
                Admin <span className="text-gradient-royal">Dashboard</span>
              </>
            }
            description="Secure lead management, analytics and CRM — accessible to authorised Kankoni Finsol staff only."
          />
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-md rounded-3xl border border-border/60 bg-card/60 p-8 backdrop-blur shadow-premium">
              <div className="grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-royal/10 text-royal">
                  <Lock className="h-7 w-7" />
                </span>
              </div>
              <h3 className="mt-4 text-center font-display text-lg font-semibold">Secure Login</h3>
              <p className="mt-1 text-center text-xs text-muted-foreground">
                Enter your admin access key to view the dashboard.
              </p>
              <form onSubmit={login} className="mt-5 space-y-3">
                <Input
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="Admin access key"
                  className="h-11 rounded-xl bg-background/60"
                />
                {authError && <p className="text-xs text-destructive">{authError}</p>}
                <Button type="submit" className="w-full rounded-xl bg-royal-gradient py-5 text-sm font-semibold text-white shadow-royal-glow">
                  <ShieldCheck className="mr-2 h-4 w-4" /> Access Dashboard
                </Button>
              </form>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Demo key: <code className="rounded bg-muted px-1.5 py-0.5 font-mono">kankoni-admin</code>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  // ----- Dashboard -----
  return (
    <section id="admin" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-gold">
              <Database className="h-3.5 w-3.5" /> Admin CRM
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Lead <span className="text-gradient-royal">Dashboard</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={fetchData} variant="outline" className="rounded-xl" disabled={loading}>
              <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} /> Refresh
            </Button>
            <Button onClick={exportCSV} className="rounded-xl bg-royal-gradient text-white shadow-royal-glow">
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <Button onClick={() => { setAdminNotifEnabled(false, ""); setAuthed(false); setKey(""); setKeyInput(""); }} variant="outline" className="rounded-xl">
              <Lock className="mr-2 h-4 w-4" /> Lock
            </Button>
          </div>
        </div>

        {/* KPI summary */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { icon: Users, label: "Total Leads", value: stats?.total ?? 0, color: "text-royal" },
            { icon: TrendingUp, label: "Last 7 Days", value: stats?.last7Days.reduce((a, b) => a + b.count, 0) ?? 0, color: "text-gold" },
            { icon: Check, label: "Disbursed", value: stats?.byStatus.find((s) => s.status === "disbursed")?.count ?? 0, color: "text-green-400" },
            { icon: AlertCircle, label: "New / Pending", value: stats?.byStatus.find((s) => s.status === "new")?.count ?? 0, color: "text-blue-400" },
          ].map((kpi, i) => (
            <Reveal key={kpi.label} delay={i * 0.06}>
              <div className="rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur">
                <span className={cn("grid h-10 w-10 place-items-center rounded-xl bg-muted/60", kpi.color)}>
                  <kpi.icon className="h-5 w-5" />
                </span>
                <p className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                  <AnimatedCounter value={kpi.value} duration={1.5} />
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{kpi.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Lead Status Pipeline */}
        {stats && (
          <Reveal delay={0.1}>
            <div className="mt-6 rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur sm:p-6">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold">
                <ListChecks className="h-5 w-5 text-royal" /> Lead Status Pipeline
              </h3>
              <p className="text-xs text-muted-foreground">Conversion funnel from new lead to disbursal</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {(() => {
                  const order: { key: string; label: string; color: string; barClass: string }[] = [
                    { key: "new", label: "New", color: "text-blue-400", barClass: "bg-blue-500" },
                    { key: "contacted", label: "Contacted", color: "text-amber-400", barClass: "bg-amber-500" },
                    { key: "qualified", label: "Qualified", color: "text-purple-400", barClass: "bg-purple-500" },
                    { key: "disbursed", label: "Disbursed", color: "text-green-400", barClass: "bg-green-500" },
                    { key: "rejected", label: "Rejected", color: "text-red-400", barClass: "bg-red-500" },
                  ];
                  const total = stats.total || 1;
                  return order.map((stage, i) => {
                    const count = stats.byStatus.find((s) => s.status === stage.key)?.count ?? 0;
                    const pct = Math.round((count / total) * 100);
                    return (
                      <div key={stage.key} className="relative">
                        <div className="rounded-xl border border-border/50 bg-background/40 p-3 text-center">
                          <p className={cn("font-display text-2xl font-bold", stage.color)}>
                            <AnimatedCounter value={count} duration={1.2} />
                          </p>
                          <p className="text-[11px] font-medium text-muted-foreground">{stage.label}</p>
                          <p className="text-[10px] text-muted-foreground/70">{pct}%</p>
                          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: i * 0.08 }}
                              className={cn("h-full rounded-full", stage.barClass)}
                            />
                          </div>
                        </div>
                        {i < order.length - 1 && (
                          <ArrowRight className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-border lg:block" />
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </Reveal>
        )}

        {/* Source Conversion Funnel */}
        {stats && (
          <Reveal delay={0.15}>
            <div className="mt-6 rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur sm:p-6">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold">
                <Trophy className="h-5 w-5 text-gold" /> Source Conversion Funnel
              </h3>
              <p className="text-xs text-muted-foreground">Which application entry point drives the most leads</p>
              <div className="mt-5 space-y-2.5">
                {(() => {
                  const total = stats.bySource.reduce((a, b) => a + b.count, 0) || 1;
                  const sorted = [...stats.bySource].sort((a, b) => b.count - a.count);
                  const sourceColors: Record<string, string> = {
                    "quick-apply-modal": "bg-royal",
                    "eligibility-result": "bg-gold",
                    "contact-form": "bg-purple-500",
                    "exit-intent": "bg-amber-500",
                    "compare-matrix": "bg-green-500",
                    "ai-assistant": "bg-blue-500",
                    "callback": "bg-pink-500",
                    "newsletter": "bg-cyan-500",
                    "website": "bg-muted-foreground",
                  };
                  return sorted.map((s, i) => {
                    const pct = Math.round((s.count / total) * 100);
                    const color = sourceColors[s.source] || "bg-royal";
                    return (
                      <div key={s.source} className="flex items-center gap-3">
                        <span className="w-32 shrink-0 truncate text-xs font-medium capitalize text-muted-foreground sm:w-40">
                          {s.source.replace(/-/g, " ")}
                        </span>
                        <div className="relative h-7 flex-1 overflow-hidden rounded-lg bg-muted/50">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.05 }}
                            className={cn("flex h-full items-center justify-end rounded-lg px-2", color)}
                          >
                            <span className="text-[10px] font-bold text-white">{pct}%</span>
                          </motion.div>
                        </div>
                        <span className="w-8 shrink-0 text-right text-xs font-bold">{s.count}</span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </Reveal>
        )}

        {/* Charts */}
        {stats && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <div className="h-full rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur">
                <h3 className="font-display text-base font-semibold">Leads — last 7 days</h3>
                <div className="mt-4 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.last7Days} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={32} />
                      <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                      <Line type="monotone" dataKey="count" stroke="oklch(0.42 0.2 264)" strokeWidth={2.5} dot={{ fill: "oklch(0.42 0.2 264)", r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur">
                <h3 className="font-display text-base font-semibold">By Source</h3>
                <div className="mt-4 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={stats.bySource} dataKey="count" nameKey="source" innerRadius={42} outerRadius={70} paddingAngle={2} stroke="none">
                        {stats.bySource.map((_, i) => <Cell key={i} fill={sourceColors[i % sourceColors.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-3">
              <div className="rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur">
                <h3 className="font-display text-base font-semibold">Leads by Service (top 8)</h3>
                <div className="mt-4 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.byService} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
                      <XAxis dataKey="service" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={32} />
                      <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "var(--muted)", opacity: 0.3 }} />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
                        {stats.byService.map((_, i) => <Cell key={i} fill={i % 2 === 0 ? "oklch(0.42 0.2 264)" : "oklch(0.78 0.15 84)"} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Reveal>
          </div>
        )}

        {/* Tabs */}
        <div className="mt-6 flex gap-2">
          {[
            { id: "leads", label: "Leads", icon: ListChecks },
            { id: "pipeline", label: "Pipeline", icon: BarChart3 },
            { id: "referrals", label: "Referrals", icon: Gift },
            { id: "team", label: "Team", icon: UserCog },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as typeof activeTab)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all",
                activeTab === t.id
                  ? "border-royal bg-royal text-white shadow-royal-glow"
                  : "border-border/70 bg-card/40 text-muted-foreground hover:border-royal/40 hover:text-foreground"
              )}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* Pipeline (Kanban) tab */}
        {activeTab === "pipeline" && (
          <Reveal delay={0.1}>
            <div className="mt-4 rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                    <BarChart3 className="h-5 w-5 text-royal" /> Lead Pipeline Board
                  </h3>
                  <p className="text-xs text-muted-foreground">Drag &amp; drop leads between status columns</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-royal/10 px-3 py-1 text-[11px] font-medium text-royal">
                  <Sparkles className="h-3 w-3" /> {leads.length} leads
                </span>
              </div>
              <KanbanBoard leads={leads} adminKey={key} onUpdateStatus={updateStatus} />
            </div>
          </Reveal>
        )}

        {/* Leads table */}
        {activeTab === "leads" && (
        <Reveal delay={0.1}>
          <div className="mt-4 rounded-2xl border border-border/60 bg-card/50 backdrop-blur">
            {/* Toolbar */}
            <div className="flex flex-col gap-3 border-b border-border/50 p-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, phone, city, service, promo code…"
                  className="h-10 rounded-xl bg-background/60 pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-wrap gap-1">
                  {["all", ...STATUS_OPTIONS].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all",
                        statusFilter === s
                          ? "border-royal bg-royal text-white"
                          : "border-border/70 bg-background/40 text-muted-foreground hover:border-royal/40"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="max-h-[32rem] overflow-auto premium-scrollbar">
              <table className="w-full min-w-[860px] text-sm">
                <thead className="sticky top-0 z-10 bg-card/90 backdrop-blur">
                  <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="p-3 font-semibold">Lead</th>
                    <th className="p-3 font-semibold">Service</th>
                    <th className="p-3 font-semibold">Source</th>
                    <th className="p-3 font-semibold">Promo</th>
                    <th className="p-3 font-semibold">Assigned To</th>
                    <th className="p-3 font-semibold">Date</th>
                    <th className="p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((lead) => (
                      <motion.tr
                        key={lead.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-border/40 transition-colors hover:bg-accent/30"
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-royal/10 text-xs font-bold text-royal">
                              {lead.name.slice(0, 2).toUpperCase()}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate font-medium">{lead.name}</p>
                              <p className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                <span className="inline-flex items-center gap-0.5"><Phone className="h-2.5 w-2.5" />{lead.phone}</span>
                                {lead.city && <span className="inline-flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" />{lead.city}</span>}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="text-xs font-medium">{lead.service}</span>
                          {lead.loanAmount && <p className="text-[11px] text-muted-foreground">{lead.loanAmount}</p>}
                        </td>
                        <td className="p-3">
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{lead.source}</span>
                        </td>
                        <td className="p-3">
                          {lead.promoCode ? (
                            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold">{lead.promoCode}</span>
                          ) : (
                            <span className="text-muted-foreground/40">—</span>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="relative inline-block">
                            <select
                              value={lead.assignedTo || ""}
                              disabled={updatingId === lead.id}
                              onChange={(e) => updateAssignee(lead.id, e.target.value)}
                              className="cursor-pointer appearance-none rounded-full border border-border/60 bg-background/50 py-1 pl-2.5 pr-6 text-[10px] font-medium outline-none transition-colors disabled:opacity-50 hover:border-royal/40"
                            >
                              <option value="" className="bg-card text-foreground">Unassigned</option>
                              {employees.map((emp) => (
                                <option key={emp.id} value={emp.name} className="bg-card text-foreground">{emp.name.split(" ")[0]}</option>
                              ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 opacity-60" />
                          </div>
                        </td>
                        <td className="p-3 text-[11px] text-muted-foreground whitespace-nowrap">{formatDate(lead.createdAt)}</td>
                        <td className="p-3">
                          <div className="relative inline-block">
                            <select
                              value={lead.status}
                              disabled={updatingId === lead.id}
                              onChange={(e) => updateStatus(lead.id, e.target.value)}
                              className={cn(
                                "cursor-pointer appearance-none rounded-full border py-1 pl-2.5 pr-7 text-[10px] font-semibold capitalize outline-none transition-colors disabled:opacity-50",
                                statusColors[lead.status as Status] || "border-border/60 bg-muted text-muted-foreground"
                              )}
                            >
                              {STATUS_OPTIONS.map((s) => (
                                <option key={s} value={s} className="bg-card capitalize text-foreground">{s}</option>
                              ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 opacity-60" />
                            {updatingId === lead.id && <Loader2 className="absolute -right-4 top-1/2 h-3 w-3 -translate-y-1/2 animate-spin" />}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="grid place-items-center py-12 text-center">
                  <Search className="h-8 w-8 text-muted-foreground/40" />
                  <p className="mt-2 text-sm text-muted-foreground">No leads match your filters.</p>
                </div>
              )}
            </div>
            <div className="border-t border-border/50 px-4 py-2.5 text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of <span className="font-semibold text-foreground">{leads.length}</span> leads
            </div>
          </div>
        </Reveal>
        )}

        {/* Referrals tab */}
        {activeTab === "referrals" && (
          <Reveal delay={0.1}>
            <div className="mt-4 rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                    <Gift className="h-5 w-5 text-gold" /> Referral Program Analytics
                  </h3>
                  <p className="text-xs text-muted-foreground">Leads acquired through promo/referral codes</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-bold text-gradient-gold">
                    <AnimatedCounter value={stats?.byPromoCode?.reduce((a, b) => a + b.count, 0) ?? 0} duration={1.5} />
                  </p>
                  <p className="text-xs text-muted-foreground">Total referral leads</p>
                </div>
              </div>

              {/* Summary cards */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Unique Codes", value: stats?.byPromoCode?.length ?? 0, icon: Gift, color: "text-gold" },
                  { label: "Referral Leads", value: stats?.byPromoCode?.reduce((a, b) => a + b.count, 0) ?? 0, icon: TrendingUp, color: "text-royal" },
                  { label: "Disbursed", value: stats?.byPromoCode?.reduce((a, b) => a + b.disbursed, 0) ?? 0, icon: Check, color: "text-green-400" },
                  { label: "Conv. Rate", value: (() => { const t = stats?.byPromoCode?.reduce((a, b) => a + b.count, 0) ?? 0; const d = stats?.byPromoCode?.reduce((a, b) => a + b.disbursed, 0) ?? 0; return t > 0 ? Math.round((d / t) * 100) : 0; })(), suffix: "%", icon: Trophy, color: "text-royal" },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl border border-border/50 bg-background/40 p-3 text-center">
                    <c.icon className={cn("mx-auto h-4 w-4", c.color)} />
                    <p className="mt-1 font-display text-lg font-bold">
                      <AnimatedCounter value={c.value} suffix={c.suffix} duration={1.2} />
                    </p>
                    <p className="text-[10px] text-muted-foreground">{c.label}</p>
                  </div>
                ))}
              </div>

              {/* Promo codes table */}
              <div className="mt-5 overflow-x-auto premium-scrollbar">
                <table className="w-full min-w-[560px] text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="p-3 font-semibold">Promo Code</th>
                      <th className="p-3 font-semibold text-center">Leads</th>
                      <th className="p-3 font-semibold text-center">Disbursed</th>
                      <th className="p-3 font-semibold text-center">Services</th>
                      <th className="p-3 font-semibold text-center">Conv. Rate</th>
                      <th className="p-3 font-semibold text-right">Est. Reward</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(stats?.byPromoCode?.length ?? 0) > 0 ? (
                      stats?.byPromoCode.map((p) => {
                        const conv = p.count > 0 ? Math.round((p.disbursed / p.count) * 100) : 0;
                        const reward = p.disbursed * 2000;
                        return (
                          <tr key={p.code} className="border-b border-border/40 transition-colors hover:bg-accent/30">
                            <td className="p-3">
                              <span className="rounded-full bg-gold/15 px-2.5 py-1 font-mono text-xs font-bold text-gold">{p.code}</span>
                            </td>
                            <td className="p-3 text-center font-semibold">{p.count}</td>
                            <td className="p-3 text-center text-green-400 font-semibold">{p.disbursed}</td>
                            <td className="p-3 text-center text-muted-foreground">{p.services}</td>
                            <td className="p-3 text-center">
                              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", conv >= 50 ? "bg-green-500/15 text-green-400" : conv >= 25 ? "bg-amber-500/15 text-amber-400" : "bg-muted text-muted-foreground")}>
                                {conv}%
                              </span>
                            </td>
                            <td className="p-3 text-right font-semibold text-gold">₹{reward.toLocaleString("en-IN")}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-sm text-muted-foreground">
                          <Gift className="mx-auto h-8 w-8 text-muted-foreground/40" />
                          <p className="mt-2">No referral leads yet. Share your referral link to get started!</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">
                * Reward estimate = disbursed leads × ₹2,000 cashback. Actual payouts per referral program terms.
              </p>
            </div>
          </Reveal>
        )}

        {/* Team tab */}
        {activeTab === "team" && (
          <Reveal delay={0.1}>
            <div className="mt-4 space-y-4">
              {/* Assignee performance */}
              {(stats?.byAssignee && stats.byAssignee.length > 0) && (
                <div className="rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur sm:p-6">
                  <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                    <BarChart3 className="h-5 w-5 text-royal" /> Lead Assignment Performance
                  </h3>
                  <div className="mt-4 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.byAssignee} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} tickFormatter={(v) => v.split(" ")[0]} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={32} />
                        <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "var(--muted)", opacity: 0.3 }} />
                        <Legend wrapperStyle={{ fontSize: 11 }} />
                        <Bar dataKey="count" name="Assigned" fill="oklch(0.42 0.2 264)" radius={[6, 6, 0, 0]} barSize={28} />
                        <Bar dataKey="disbursed" name="Disbursed" fill="oklch(0.78 0.15 84)" radius={[6, 6, 0, 0]} barSize={28} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Employee cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {employees.map((emp) => {
                  const agg = stats?.byAssignee?.find((a) => a.name === emp.name);
                  const assignedCount = agg?.count ?? 0;
                  const disbursed = agg?.disbursed ?? 0;
                  const convRate = assignedCount > 0 ? Math.round((disbursed / assignedCount) * 100) : 0;
                  return (
                    <div key={emp.id} className="rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur transition-all hover:border-royal/40 hover:shadow-premium">
                      <div className="flex items-center gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-xl bg-royal-gradient font-display text-sm font-bold text-white">
                          {emp.avatar}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold">{emp.name}</p>
                          <p className="text-xs font-medium text-gold">{emp.role}</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                        <p className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {emp.email}</p>
                        <p className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {emp.phone}</p>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border/50 pt-3 text-center">
                        <div>
                          <p className="font-display text-base font-bold">{assignedCount}</p>
                          <p className="text-[10px] text-muted-foreground">Assigned</p>
                        </div>
                        <div className="border-x border-border/50">
                          <p className="font-display text-base font-bold text-green-400">{disbursed}</p>
                          <p className="text-[10px] text-muted-foreground">Disbursed</p>
                        </div>
                        <div>
                          <p className="font-display text-base font-bold text-gold">{convRate}%</p>
                          <p className="text-[10px] text-muted-foreground">Conv.</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
