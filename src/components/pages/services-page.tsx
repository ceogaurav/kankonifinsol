"use client";

import { PageShell } from "@/components/site/page-shell";
import { Services as ServicesSection } from "@/components/sections/services";

export function ServicesPage() {
  return (
    <PageShell
      eyebrow="One Platform · Every Product"
      title={<>Complete financial <span className="text-gradient-gold">solutions</span></>}
      description="22 premium products compared across 100+ banks — from personal loans to project finance, insurance to mutual funds, all served with white-glove dedication."
      maxWidth="wide"
    >
      <ServicesSection />
    </PageShell>
  );
}
