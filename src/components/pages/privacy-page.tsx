"use client";

import { Reveal } from "@/components/site/primitives";
import { ShieldCheck } from "lucide-react";
import { companyInfo } from "@/lib/site-data";

export function PrivacyPage() {
  return (
    <section className="relative min-h-screen pt-32 pb-24 overflow-hidden">
      <div className="container mx-auto max-w-3xl px-4 relative z-10">
        <Reveal>
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-royal/20 bg-royal/5 px-4 py-1.5 text-sm font-semibold text-royal shadow-sm">
              <ShieldCheck className="h-4 w-4" /> Privacy Policy
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Privacy <span className="text-royal">Policy</span>
            </h1>
            <p className="mt-4 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-sm md:prose-base prose-slate dark:prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to {companyInfo.name}. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>

            <h2>2. The Data We Collect About You</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul>
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Financial Data</strong> includes bank account and payment card details for loan processing.</li>
            </ul>

            <h2>3. How We Use Your Personal Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul>
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>

            <h2>5. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at <strong>{companyInfo.email}</strong>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
