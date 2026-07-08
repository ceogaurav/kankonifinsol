"use client";

import { PageShell } from "@/components/site/page-shell";
import { EMICalculator } from "@/components/sections/emi-calculator";
import { EMICalculatorPro } from "@/components/sections/emi-calculator-pro";

export function EmiPage() {
  return (
    <PageShell
      eyebrow="Plan with precision"
      title={<>Interactive <span className="text-gradient-royal">EMI Calculator</span></>}
      description="Calculate your monthly EMI, total interest and amortisation schedule. Switch between loan types for tailored presets and compare across all products."
      maxWidth="wide"
    >
      <EMICalculator />
      <EMICalculatorPro />
    </PageShell>
  );
}
