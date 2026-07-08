"use client";

import { create } from "zustand";

export type PageName =
  | "home"
  | "services"
  | "eligibility"
  | "emi"
  | "compare"
  | "about"
  | "partners"
  | "reviews"
  | "resources"
  | "contact"
  | "admin"
  | "careers";

interface RouterState {
  page: PageName;
  navigate: (page: PageName) => void;
}

export const useRouter = create<RouterState>()((set) => ({
  page: "home",
  navigate: (page) => {
    set({ page });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  },
}));

export const navItems: { label: string; page: PageName }[] = [
  { label: "Home", page: "home" },
  { label: "Services", page: "services" },
  { label: "Eligibility", page: "eligibility" },
  { label: "EMI Calculator", page: "emi" },
  { label: "Compare", page: "compare" },
  { label: "About", page: "about" },
  { label: "Partners", page: "partners" },
  { label: "Reviews", page: "reviews" },
  { label: "Resources", page: "resources" },
  { label: "Contact", page: "contact" },
  { label: "Careers", page: "careers" },
];
