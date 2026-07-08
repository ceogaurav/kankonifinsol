"use client";

import { PageShell } from "@/components/site/page-shell";
import { CompareLoans } from "@/components/sections/compare-loans";
import { CompareMatrix } from "@/components/sections/compare-matrix";

export function ComparePage() {
  return (
    <PageShell
      eyebrow="Side-by-side · Transparent"
      title={<>Compare loans <span className="text-gradient-royal">across 100+ banks</span></>}
      description="See interest rates, processing fees, tenure and benefits compared transparently. Use the feature matrix to find the perfect loan type for your needs."
      maxWidth="wide"
    >
      <CompareLoans />
      <CompareMatrix />
    </PageShell>
  );
}
