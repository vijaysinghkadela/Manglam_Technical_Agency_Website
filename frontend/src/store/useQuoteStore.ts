'use client';

import { create } from 'zustand';

interface QuoteState {
  selectedServices: string[];
  budget: string;
  timeline: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  step: number;
  isOpen: boolean;
  toggleService: (service: string) => void;
  setField: (field: string, value: string) => void;
  setStep: (step: number) => void;
  open: (prefilledService?: string) => void;
  close: () => void;
  reset: () => void;
}

export const useQuoteStore = create<QuoteState>((set) => ({
  selectedServices: [],
  budget: '',
  timeline: '',
  description: '',
  name: '',
  email: '',
  phone: '',
  company: '',
  step: 1,
  isOpen: false,
  toggleService: (service) =>
    set((state) => ({
      selectedServices: state.selectedServices.includes(service)
        ? state.selectedServices.filter((s) => s !== service)
        : [...state.selectedServices, service],
    })),
  setField: (field, value) => set({ [field]: value }),
  setStep: (step) => set({ step }),
  open: (prefilledService) =>
    set((state) => ({
      isOpen: true,
      step: 1,
      selectedServices: prefilledService
        ? [prefilledService]
        : state.selectedServices,
    })),
  close: () => set({ isOpen: false }),
  reset: () =>
    set({
      selectedServices: [],
      budget: '',
      timeline: '',
      description: '',
      name: '',
      email: '',
      phone: '',
      company: '',
      step: 1,
      isOpen: false,
    }),
}));
