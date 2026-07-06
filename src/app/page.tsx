import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Services } from "@/components/sections/services";
import { EligibilityChecker } from "@/components/sections/eligibility-checker";
import { EMICalculator } from "@/components/sections/emi-calculator";
import { CompareLoans } from "@/components/sections/compare-loans";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Reviews } from "@/components/sections/reviews";
import { BankingPartners } from "@/components/sections/banking-partners";
import { Resources } from "@/components/sections/resources";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { AIAssistant } from "@/components/sections/ai-assistant";
import {
  WhatsAppButton, StickyApplyCTA, ExitIntentPopup,
} from "@/components/sections/floating-widgets";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Services />
        <EligibilityChecker />
        <EMICalculator />
        <CompareLoans />
        <WhyChooseUs />
        <BankingPartners />
        <Reviews />
        <Resources />
        <Contact />
      </main>
      <Footer />

      {/* Floating / overlay widgets */}
      <AIAssistant />
      <WhatsAppButton />
      <StickyApplyCTA />
      <ExitIntentPopup />
    </div>
  );
}
