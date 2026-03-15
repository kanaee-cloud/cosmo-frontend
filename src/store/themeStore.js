// src/store/themeStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      activeTheme: 'nexus', // default theme
      setTheme: (theme) => set({ activeTheme: theme }),
    }),
    {
      name: 'cosmo-theme-storage', // nama key di local storage
    }
  )
);