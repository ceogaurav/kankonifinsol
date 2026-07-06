"use client";

import { create } from "zustand";

interface QuickApplyState {
  open: boolean;
  serviceName: string;
  prefillAmount?: string;
  prefillSource?: string;
  openModal: (service?: string, opts?: { amount?: string; source?: string }) => void;
  closeModal: () => void;
}

export const useQuickApply = create<QuickApplyState>()((set) => ({
  open: false,
  serviceName: "Personal Loan",
  prefillAmount: undefined,
  prefillSource: undefined,
  openModal: (service, opts) =>
    set({
      open: true,
      serviceName: service || "Personal Loan",
      prefillAmount: opts?.amount,
      prefillSource: opts?.source,
    }),
  closeModal: () =>
    set({ open: false, prefillAmount: undefined, prefillSource: undefined }),
}));
