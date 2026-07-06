"use client";

import { SectionHeading, Reveal } from "@/components/site/primitives";
import { banks } from "@/lib/site-data";

function BankLogo({ bank }: { bank: { name: string; short: string; type: string; color: string } }) {
  return (
    <div className="group relative flex w-44 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-border/50 bg-card/40 px-6 py-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-royal/40 hover:shadow-premium">
      <span
        className="grid h-12 w-12 place-items-center rounded-xl font-display text-sm font-bold text-white shadow-lg"
        style={{ background: bank.color }}
      >
        {bank.short.slice(0, 2)}
      </span>
      <span className="text-center text-xs font-semibold leading-tight">{bank.short}</span>
      <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
        {bank.type}
      </span>
    </div>
  );
}

export function BankingPartners() {
  const doubled = [...banks, ...banks];
  return (
    <section id="partners" className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="100+ partners · One application"
          title={
            <>
              India's leading banks,{" "}
              <span className="text-gradient-royal">all in one place</span>
            </>
          }
          description="We're empanelled with every major public, private and NBFC lender — so you always get the widest choice and the most competitive rate."
        />
      </div>

      <Reveal delay={0.1}>
        <div className="relative mt-12">
          {/* fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

          <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
            {doubled.map((bank, i) => (
              <BankLogo key={`${bank.name}-${i}`} bank={bank} />
            ))}
          </div>
          <div className="mt-4 flex w-max animate-marquee-slow gap-4 hover:[animation-play-state:paused]">
            {[...doubled].reverse().map((bank, i) => (
              <BankLogo key={`${bank.name}-rev-${i}`} bank={bank} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          And <span className="font-semibold text-foreground">80+ more</span> NBFCs, co-operative banks and fintech lenders in our network.
        </p>
      </Reveal>
    </section>
  );
}
