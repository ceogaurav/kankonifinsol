"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, User, Sparkles } from "lucide-react";
import { useQuickApply } from "@/lib/quick-apply-store";

interface AdminNotifState {
  authed: boolean;
  key: string;
}

interface LeadNotif {
  id: string;
  name: string;
  service: string;
  source: string;
  createdAt: string;
}

/**
 * Polls for new leads (every 20s) when the admin dashboard is authed.
 * Shows a slide-in toast for each new lead.
 * State is shared via a tiny module-level store so AdminDashboard can enable it.
 */
let enableFn: ((authed: boolean, key: string) => void) | null = null;

export function setAdminNotifEnabled(authed: boolean, key: string) {
  if (enableFn) enableFn(authed, key);
}

export function AdminNotifications() {
  const [enabled, setEnabled] = React.useState(false);
  const [key, setKey] = React.useState("");
  const [notifs, setNotifs] = React.useState<LeadNotif[]>([]);
  const lastCheckRef = React.useRef<string>("");
  const openApply = useQuickApply((s) => s.openModal);

  // Register the enable function so AdminDashboard can toggle polling
  React.useEffect(() => {
    enableFn = (authed: boolean, k: string) => {
      setEnabled(authed);
      setKey(k);
      if (authed) lastCheckRef.current = new Date().toISOString();
    };
    return () => { enableFn = null; };
  }, []);

  // Poll for new leads
  React.useEffect(() => {
    if (!enabled || !key) return;
    const poll = async () => {
      try {
        const since = lastCheckRef.current || new Date(Date.now() - 60_000).toISOString();
        const res = await fetch(`/api/leads?key=${encodeURIComponent(key)}&since=${encodeURIComponent(since)}`);
        const data = await res.json();
        if (data.success && data.leads?.length > 0) {
          const newNotifs: LeadNotif[] = data.leads.map((l: LeadNotif) => ({
            id: l.id, name: l.name, service: l.service, source: l.source, createdAt: l.createdAt,
          }));
          setNotifs((prev) => [...prev, ...newNotifs]);
          lastCheckRef.current = new Date().toISOString();
          // Auto-dismiss after 8s
          newNotifs.forEach((n) => {
            setTimeout(() => {
              setNotifs((prev) => prev.filter((p) => p.id !== n.id));
            }, 8000);
          });
        }
      } catch {
        // ignore
      }
    };
    poll();
    const interval = setInterval(poll, 20_000);
    return () => clearInterval(interval);
  }, [enabled, key]);

  function dismiss(id: string) {
    setNotifs((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[80] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:left-auto sm:right-24 sm:translate-x-0">
      <AnimatePresence>
        {notifs.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto relative overflow-hidden rounded-2xl border border-royal/40 bg-card/95 p-4 shadow-royal-glow backdrop-blur"
          >
            <button
              onClick={() => dismiss(n.id)}
              aria-label="Dismiss"
              className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-royal-gradient text-white">
                <Bell className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-xs font-semibold text-royal">
                  <Sparkles className="h-3 w-3" /> New Lead Received!
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                  <User className="h-3 w-3 text-muted-foreground" /> {n.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {n.service} · <span className="capitalize">{n.source}</span>
                </p>
                <button
                  onClick={() => { dismiss(n.id); openApply(n.service); }}
                  className="mt-2 text-[11px] font-semibold text-royal hover:underline"
                >
                  View details →
                </button>
              </div>
            </div>
            {/* progress bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 8, ease: "linear" }}
              className="absolute bottom-0 left-0 h-0.5 bg-royal"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
