"use client";

import { PageShell } from "@/components/site/page-shell";
import { BankingPartners } from "@/components/sections/banking-partners";

export function PartnersPage() {
  return (
    <PageShell
      eyebrow="100+ partners · One application"
      title={<>India's leading banks, <span className="text-gradient-royal">all in one place</span></>}
      description="We're empanelled with every major public, private and NBFC lender — so you always get the widest choice and the most competitive rate."
    >
      <BankingPartners />
    </PageShell>
  );
}
