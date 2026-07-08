import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { PageRouter } from "@/components/page-router";
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
        <PageRouter />
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
