"use client";

import { PageShell } from "@/components/site/page-shell";
import { Reviews } from "@/components/sections/reviews";

export function ReviewsPage() {
  return (
    <PageShell
      eyebrow="Loved by 10,000+ customers"
      title={<>Real stories. <span className="text-gradient-gold">Real savings.</span></>}
      description="From first-time borrowers to seasoned entrepreneurs — here's what makes Kankoni Finsol India's most recommended financial partner."
    >
      <Reviews />
    </PageShell>
  );
}
