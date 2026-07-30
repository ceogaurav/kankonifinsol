"use client";

import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Linkedin, Twitter, Facebook, Instagram, Send, AtSign } from "lucide-react";
import { companyInfo, footerLinks } from "@/lib/site-data";
import { useRouter, type PageName } from "@/lib/router-store";

const socials = [
  { icon: Twitter, href: "https://x.com/kankoni_finsol", label: "Twitter" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61591992620858", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/kankoni_finsol/", label: "Instagram" },
  { icon: AtSign, href: "https://www.threads.com/@kankoni_finsol", label: "Threads" },
];

const whatsappLink = `https://wa.me/${companyInfo.whatsapp}`;

export function Footer() {
  const navigate = useRouter((s) => s.navigate);

  function handleLink(link: string): PageName | null {
    const m: Record<string, PageName> = {
      "About Us": "about", "Careers": "careers", "Contact": "contact",
      "Blogs": "resources", "EMI Calculator": "emi", "Eligibility Checker": "eligibility",
      "Bank Partners": "partners", "Customer Stories": "reviews", "FAQs": "resources",
    };
    return m[link] || null;
  }
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border/60 bg-navy-deep text-white/80">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh opacity-30" />
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[60rem] -translate-x-1/2 rounded-full bg-royal/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        {/* CTA strip */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:flex-row sm:p-8">
          <div>
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to get funded?
            </h3>
            <p className="mt-1 text-sm text-white/70">
              One application. 100+ banks. Lowest rates. Your financial partner, today.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-navy-deep shadow-gold-glow">
              <Send className="h-4 w-4" /> Apply Now
            </a>
            <a href={whatsappLink} className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex h-14 w-[200px] sm:h-16 sm:w-[230px] items-center justify-center rounded-xl border border-white/25 bg-white px-3.5 py-2 shadow-md">
              <img src="/logo.png" alt="Kankoni Finsol Logo" className="max-h-full w-full object-contain" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              India's premium financial solutions partner. Complete financial services under one platform — with white-glove dedication.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-gold/40 hover:text-gold"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-gold">
              {footerLinks.products.title}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerLinks.products.links.slice(0, 6).map((l) => (
                <li key={l}>
                  <a href="#services" onClick={(e) => { e.preventDefault(); navigate("services"); }} className="transition-colors hover:text-white">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-gold">
              {footerLinks.cards.title}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerLinks.cards.links.map((l) => (
                <li key={l}>
                  <a href="#services" onClick={(e) => { e.preventDefault(); navigate("services"); }} className="transition-colors hover:text-white">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-gold">
              {footerLinks.company.title}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerLinks.company.links.map((l) => (
                <li key={l}>
                  <a href="#about" onClick={(e) => { e.preventDefault(); const p = handleLink(l); if (p) navigate(p); }} className="transition-colors hover:text-white">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-gold">
              {footerLinks.resources.title}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerLinks.resources.links.map((l) => (
                <li key={l}>
                  <a href="#resources" onClick={(e) => { e.preventDefault(); navigate("resources"); }} className="transition-colors hover:text-white">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* All Office Locations Grid in Footer */}
        <div className="mt-12 border-t border-white/10 pt-10">
          <h4 className="mb-6 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-gold">
            <MapPin className="h-4 w-4" /> Our Branch Offices across India
          </h4>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold text-white">Bengaluru Main (HQ)</span>
                <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold text-gold">HQ</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                18/8, Vishal Tower, Mizzaina Floor, Door no MZ210, 16th Cross Rd, Near SR Nagar Police Station, Sampangi Rama Nagar, Bengaluru 560027
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs">
                <a href="tel:7204012527" className="flex items-center gap-1.5 font-semibold text-gold hover:underline">
                  <Phone className="h-3 w-3" /> 7204012527
                </a>
                <a href="https://maps.app.goo.gl/a7xFQquqELzLB1v1A" target="_blank" rel="noreferrer" className="text-white/80 underline hover:text-white">
                  Map →
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold text-white">Vaniyambadi (TN)</span>
                <span className="rounded-full bg-royal/40 px-2 py-0.5 text-[10px] font-semibold text-white">Branch</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                No.1302, 1st floor, PJN Road, Shakirabad, Vaniyambadi, Tamil Nadu 635751
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs">
                <a href="tel:9626424142" className="flex items-center gap-1.5 font-semibold text-gold hover:underline">
                  <Phone className="h-3 w-3" /> 9626424142
                </a>
                <a href="https://maps.app.goo.gl/zYPUiab9kFoUJv8g6" target="_blank" rel="noreferrer" className="text-white/80 underline hover:text-white">
                  Map →
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold text-white">Electronic City</span>
                <span className="rounded-full bg-royal/40 px-2 py-0.5 text-[10px] font-semibold text-white">Bengaluru</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                193, 1st floor, Konappana Agrahara, Electronic City, Konappana Agrahara, Karnataka 560100
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs">
                <a href="tel:9036240631" className="flex items-center gap-1.5 font-semibold text-gold hover:underline">
                  <Phone className="h-3 w-3" /> 9036240631
                </a>
                <a href="https://maps.app.goo.gl/r4hpDqR9EeUownwx5" target="_blank" rel="noreferrer" className="text-white/80 underline hover:text-white">
                  Map →
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold text-white">Chennai Branch</span>
                <span className="rounded-full bg-royal/40 px-2 py-0.5 text-[10px] font-semibold text-white">Tamil Nadu</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                No : 100, Sathyamoorthy Nagar, Fish Market Street, Poonamallee High Road, Maduravayal, Chennai - 600 095
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs">
                <a href="tel:8072859827" className="flex items-center gap-1.5 font-semibold text-gold hover:underline">
                  <Phone className="h-3 w-3" /> 8072859827
                </a>
                <a href="https://maps.app.goo.gl/cUbb8JMmdLhLWkt18" target="_blank" rel="noreferrer" className="text-white/80 underline hover:text-white">
                  Map →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact row */}
        <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
          <a href={companyInfo.phoneHref} className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-gold">
            <Phone className="h-4 w-4 text-gold" /> {companyInfo.phone}
          </a>
          <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-gold">
            <Mail className="h-4 w-4 text-gold" /> {companyInfo.email}
          </a>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <MapPin className="h-4 w-4 text-gold" /> {companyInfo.address}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Kankoni Finsol Pvt. Ltd. All rights reserved. GST: {companyInfo.gst}</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); navigate("privacy"); }} className="hover:text-gold">Privacy</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); navigate("terms"); }} className="hover:text-gold">Terms</a>
            <a href="#careers" onClick={(e) => { e.preventDefault(); navigate("careers"); }} className="hover:text-gold">Careers</a>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" /> ISO 27001
            </span>
          </div>
        </div>

        <p className="mt-6 text-[10px] leading-relaxed text-white/40">
          Disclaimer: Kankoni Finsol is a financial services facilitator. Loans, credit facilities and investments are subject to lender/norms and at the discretion of the partner institution. All interest rates, fees and tenure shown are indicative and may vary based on individual profile assessment. Mutual fund investments are subject to market risks; read all scheme-related documents carefully. CIBIL is a registered trademark of TransUnion CIBIL Limited.
        </p>
      </div>
    </footer>
  );
}
