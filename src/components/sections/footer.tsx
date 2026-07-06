"use client";

import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Linkedin, Twitter, Facebook, Instagram, Send } from "lucide-react";
import { companyInfo, footerLinks } from "@/lib/site-data";

const socials = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const whatsappLink = `https://wa.me/${companyInfo.whatsapp}`;

export function Footer() {
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
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-royal-gradient shadow-royal-glow">
                <span className="font-display text-lg font-extrabold text-white">K</span>
              </span>
              <span className="font-display text-base font-bold text-white">
                Kankoni<span className="text-gold"> Finsol</span>
              </span>
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

          {/* Link columns */}
          {Object.values(footerLinks).map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#contact" className="text-sm text-white/70 transition-colors hover:text-gold">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
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
            <a href="#contact" className="hover:text-gold">Privacy</a>
            <a href="#contact" className="hover:text-gold">Terms</a>
            <a href="#contact" className="hover:text-gold">Careers</a>
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
