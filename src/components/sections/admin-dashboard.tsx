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
} from "lucide-react";
import { SectionHeading, Reveal, AnimatedCounter } from "@/components/site/primitives";
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

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (!keyInput.trim()) {
      setAuthError("Please enter the admin key.");
      return;
    }
    setKey(keyInput.trim());
    setAuthed(true);
    setAuthError("");
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
            <Button onClick={() => { setAuthed(false); setKey(""); setKeyInput(""); }} variant="outline" className="rounded-xl">
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

        {/* Leads table */}
        <Reveal delay={0.1}>
          <div className="mt-6 rounded-2xl border border-border/60 bg-card/50 backdrop-blur">
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
      </div>
    </section>
  );
}
