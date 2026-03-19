import { create } from 'zustand';

let toastId = 0;

export const useToastStore = create((set) => ({
  toasts: [],

  addToast: (type, title, message, duration = 4000) => {
    const id = toastId++;
    const newToast = { id, type, title, message, duration };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    return id;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  clearAll: () => {
    set({ toasts: [] });
  },

  success: (title, message, duration) =>
    useToastStore.getState().addToast('success', title, message, duration),

  error: (title, message, duration) =>
    useToastStore.getState().addToast('error', title, message, duration),
}));
