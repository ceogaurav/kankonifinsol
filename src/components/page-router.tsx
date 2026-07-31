"use client";

import * as React from "react";
import { useRouter, type PageName } from "@/lib/router-store";
import { HomePage } from "@/components/pages/home-page";
import { ServicesPage } from "@/components/pages/services-page";
import { EligibilityPage } from "@/components/pages/eligibility-page";
import { EmiPage } from "@/components/pages/emi-page";
import { ComparePage } from "@/components/pages/compare-page";
import { AboutPage } from "@/components/pages/about-page";
import { PartnersPage } from "@/components/pages/partners-page";
import { ReviewsPage } from "@/components/pages/reviews-page";
import { ResourcesPage } from "@/components/pages/resources-page";
import { ContactPage } from "@/components/pages/contact-page";
import { AdminPage } from "@/components/pages/admin-page";
import { CareersPage } from "@/components/pages/careers-page";
import { PrivacyPage } from "@/components/pages/privacy-page";
import { TermsPage } from "@/components/pages/terms-page";

export function PageRouter({ initialPage = "home" }: { initialPage?: string }) {
  const storePage = useRouter((s) => s.page);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (initialPage && initialPage !== "home") {
      useRouter.setState({ page: initialPage as PageName });
    }
  }, [initialPage]);

  const activePage = mounted ? storePage : initialPage;

  switch (activePage) {
    case "services":
      return <ServicesPage />;
    case "eligibility":
      return <EligibilityPage />;
    case "emi":
      return <EmiPage />;
    case "compare":
      return <ComparePage />;
    case "about":
      return <AboutPage />;
    case "partners":
      return <PartnersPage />;
    case "reviews":
      return <ReviewsPage />;
    case "resources":
      return <ResourcesPage />;
    case "contact":
      return <ContactPage />;
    case "admin":
      return <AdminPage />;
    case "careers":
      return <CareersPage />;
    case "privacy":
      return <PrivacyPage />;
    case "terms":
      return <TermsPage />;
    default:
      return <HomePage />;
  }
}

