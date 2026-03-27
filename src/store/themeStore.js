import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Single source of truth untuk semua nama tema yang tersedia
export const THEMES = ['nexus', 'zenith', 'abyss', 'mars'];

export const THEME_COLORS = [
    { name: 'Magenta', hex: '#FF006E', rgb: '255, 0, 110', class: 'text-[#FF006E]' },
    { name: 'Purple', hex: '#8338EC', rgb: '131, 56, 236', class: 'text-[#8338EC]' },
    { name: 'Blue', hex: '#3A86FF', rgb: '58, 134, 255', class: 'text-[#3A86FF]' },
    { name: 'Cyan', hex: '#06FFA5', rgb: '6, 255, 165', class: 'text-[#06FFA5]' },
    { name: 'Orange', hex: '#FFB703', rgb: '255, 183, 3', class: 'text-[#FFB703]' },
    { name: 'Red', hex: '#FB5607', rgb: '251, 86, 7', class: 'text-[#FB5607]' },
];

export const useThemeStore = create(
  persist(
    (set) => ({
      activeTheme: 'nexus', // default theme
      matrixColor: THEME_COLORS[0], // default color
      
      // Fungsi ini murni hanya mengubah state sekarang
      setTheme: (theme) => set({ activeTheme: theme }),
      setMatrixColor: (color) => set({ matrixColor: color }),
    }),
    {
      name: 'cosmo-theme-storage', 
      partialize: (state) => ({ activeTheme: state.activeTheme, matrixColor: state.matrixColor }),
    }
  )
);