"use client";

import { PageShell } from "@/components/site/page-shell";
import { EligibilityChecker } from "@/components/sections/eligibility-checker";

export function EligibilityPage() {
  return (
    <PageShell
      eyebrow="AI-Powered · Instant"
      title={<>Check your <span className="text-gradient-gold">loan eligibility</span></>}
      description="Our intelligent engine analyses your profile against 100+ banks in real-time and shows your approval odds, eligible lenders and estimated EMI — before you apply."
    >
      <EligibilityChecker />
    </PageShell>
  );
}
