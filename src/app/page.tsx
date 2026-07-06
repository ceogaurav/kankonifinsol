import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Services } from "@/components/sections/services";
import { HowItWorks } from "@/components/sections/how-it-works";
import { EligibilityChecker } from "@/components/sections/eligibility-checker";
import { EMICalculator } from "@/components/sections/emi-calculator";
import { EMICalculatorPro } from "@/components/sections/emi-calculator-pro";
import { CompareLoans } from "@/components/sections/compare-loans";
import { CompareMatrix } from "@/components/sections/compare-matrix";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { About } from "@/components/sections/about";
import { InsightsDashboard } from "@/components/sections/insights-dashboard";
import { BankingPartners } from "@/components/sections/banking-partners";
import { Reviews } from "@/components/sections/reviews";
import { Resources } from "@/components/sections/resources";
import { ReferralBanner } from "@/components/sections/referral-banner";
import { Contact } from "@/components/sections/contact";
import { AdminDashboard } from "@/components/sections/admin-dashboard";
import { Footer } from "@/components/sections/footer";
import { AIAssistant } from "@/components/sections/ai-assistant";
import {
  WhatsAppButton, StickyApplyCTA, ExitIntentPopup,
} from "@/components/sections/floating-widgets";
import { BackToTop } from "@/components/sections/back-to-top";
import { QuickApplyModal } from "@/components/sections/quick-apply-modal";
import { AdminNotifications } from "@/components/sections/admin-notifications";
import { ScrollProgress } from "@/components/site/scroll-progress";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Services />
        <HowItWorks />
        <EligibilityChecker />
        <EMICalculator />
        <EMICalculatorPro />
        <CompareLoans />
        <CompareMatrix />
        <WhyChooseUs />
        <About />
        <InsightsDashboard />
        <BankingPartners />
        <Reviews />
        <Resources />
        <ReferralBanner />
        <Contact />
        <AdminDashboard />
      </main>
      <Footer />

      {/* Floating / overlay widgets */}
      <AIAssistant />
      <WhatsAppButton />
      <StickyApplyCTA />
      <BackToTop />
      <ExitIntentPopup />
      <QuickApplyModal />
      <AdminNotifications />
    </div>
  );
}
