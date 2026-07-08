"use client";

import { PageShell } from "@/components/site/page-shell";
import { AdminDashboard } from "@/components/sections/admin-dashboard";

export function AdminPage() {
  return (
    <PageShell
      eyebrow="Internal · CRM"
      title={<>Admin <span className="text-gradient-royal">Dashboard</span></>}
      description="Secure lead management, analytics, Kanban pipeline and CRM — accessible to authorised Kankoni Finsol staff only."
      maxWidth="wide"
    >
      <AdminDashboard />
    </PageShell>
  );
}
