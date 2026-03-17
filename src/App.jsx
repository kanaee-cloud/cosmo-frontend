import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore'; // IMPORT THEME STORE
import { router } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
    },
  },
});

function App() {
  const { initialize, isInitializing } = useAuthStore();
  
  // Use separate selectors for better performance and to avoid re-render loops
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const matrixColor = useThemeStore((state) => state.matrixColor);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // APPLY MATRIX COLOR GLOBALLY (ONLY --color-matrix)
  useEffect(() => {
    if (matrixColor?.rgb) {
      document.documentElement.style.setProperty('--color-matrix', matrixColor.rgb);
      // Explicitly remove the primary override to fix any lingering pink background
      document.documentElement.style.removeProperty('--color-primary');
    }
  }, [matrixColor]);

  // EFFECT UNTUK MENGGANTI TEMA DI BODY
  useEffect(() => {
    // Hapus semua class tema tambahan terlebih dahulu
    document.body.classList.remove('theme-zenith');
    
    // Jika bukan tema default (nexus), tambahkan class-nya
    if (activeTheme !== 'nexus') {
      document.body.classList.add(`theme-${activeTheme}`);
    }
  }, [activeTheme]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center font-primary tracking-[0.3em]">
        <div className="animate-pulse mb-4 text-xl text-accent border border-accent p-4 bg-accent/10 shadow-[0_0_20px_rgba(138,109,252,0.3)]">
          [ SYSTEM BOOTING ]
        </div>
        <p className="text-[10px] text-gray-500 animate-pulse">ESTABLISHING SECURE CONNECTION...</p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;