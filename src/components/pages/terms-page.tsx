"use client";

import { Reveal } from "@/components/site/primitives";
import { FileText } from "lucide-react";
import { companyInfo } from "@/lib/site-data";

export function TermsPage() {
  return (
    <section className="relative min-h-screen pt-32 pb-24 overflow-hidden">
      <div className="container mx-auto max-w-3xl px-4 relative z-10">
        <Reveal>
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-royal/20 bg-royal/5 px-4 py-1.5 text-sm font-semibold text-royal shadow-sm">
              <FileText className="h-4 w-4" /> Terms of Service
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Terms of <span className="text-royal">Service</span>
            </h1>
            <p className="mt-4 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-sm md:prose-base prose-slate dark:prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using {companyInfo.name}'s website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              {companyInfo.name} provides users with access to a rich collection of resources, including various financial tools, loan aggregation, eligibility checking, and related services. You understand and agree that the service is provided "AS-IS" and that {companyInfo.name} assumes no responsibility for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings.
            </p>

            <h2>3. User Obligations</h2>
            <p>
              You agree to use our services only for lawful purposes. You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.
            </p>

            <h2>4. Disclaimer of Warranties</h2>
            <p>
              The information, software, products, and services included in or available through the site may include inaccuracies or typographical errors. Changes are periodically added to the information herein. {companyInfo.name} may make improvements and/or changes in the site at any time.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              In no event shall {companyInfo.name} be liable for any direct, indirect, punitive, incidental, special, consequential damages or any damages whatsoever including, without limitation, damages for loss of use, data or profits, arising out of or in any way connected with the use or performance of the site.
            </p>

            <h2>6. Contact</h2>
            <p>
              For any questions regarding these Terms of Service, please contact us at <strong>{companyInfo.email}</strong>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
