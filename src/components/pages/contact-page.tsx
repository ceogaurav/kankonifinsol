"use client";

import { PageShell } from "@/components/site/page-shell";
import { Contact } from "@/components/sections/contact";

export function ContactPage() {
  return (
    <PageShell
      eyebrow="Apply in 60 seconds"
      title={<>Let's get you <span className="text-gradient-gold">funded</span></>}
      description="Fill in your details and our dedicated relationship manager will call you back within 30 minutes with the best offers from 100+ banks."
    >
      <Contact />
    </PageShell>
  );
}
