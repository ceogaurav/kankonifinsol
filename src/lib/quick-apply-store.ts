"use client";

import { create } from "zustand";

interface QuickApplyState {
  open: boolean;
  serviceName: string;
  openModal: (service?: string) => void;
  closeModal: () => void;
}

export const useQuickApply = create<QuickApplyState>()((set) => ({
  open: false,
  serviceName: "Personal Loan",
  openModal: (service) =>
    set({ open: true, serviceName: service || "Personal Loan" }),
  closeModal: () => set({ open: false }),
}));
