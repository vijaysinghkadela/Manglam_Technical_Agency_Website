'use client';

import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  activeMegaMenu: string | null;
  setMobileMenuOpen: (open: boolean) => void;
  setActiveMegaMenu: (menu: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  activeMegaMenu: null,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setActiveMegaMenu: (menu) => set({ activeMegaMenu: menu }),
}));
