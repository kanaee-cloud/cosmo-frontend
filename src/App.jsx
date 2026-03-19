import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/authStore';
import { useToastStore } from './hooks/useToast';
import { ToastContainer } from './components/toast';
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
  const { toasts, removeToast } = useToastStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex flex-col items-center justify-center font-primary tracking-[0.3em]">
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
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </QueryClientProvider>
  );
}

export default App;