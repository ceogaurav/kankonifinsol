"use client";

import { PageShell } from "@/components/site/page-shell";
import { Resources } from "@/components/sections/resources";
import { ReferralBanner } from "@/components/sections/referral-banner";

export function ResourcesPage() {
  return (
    <PageShell
      eyebrow="Knowledge · Insights · Guidance"
      title={<>Financial resources, <span className="text-gradient-gold">made simple</span></>}
      description="Expert-written guides, latest finance news and answers to the questions India asks most — to help you borrow, invest and save smarter."
      maxWidth="wide"
    >
      <Resources />
      <ReferralBanner />
    </PageShell>
  );
}
