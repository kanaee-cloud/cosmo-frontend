import { create } from 'zustand';

let toastId = 0;

export const useToastStore = create((set, get) => ({
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
    get().addToast('success', title, message, duration),

  error: (title, message, duration) =>
    get().addToast('error', title, message, duration),

  info: (title, message, duration) =>
    get().addToast('info', title, message, duration),
    
  warning: (title, message, duration) =>
    get().addToast('warning', title, message, duration),
}));

export const toast = {
  success: (title, message, duration) =>
    useToastStore.getState().addToast('success', title, message, duration),
  error: (title, message, duration) =>
    useToastStore.getState().addToast('error', title, message, duration),
  info: (title, message, duration) =>
    useToastStore.getState().addToast('info', title, message, duration),
  warning: (title, message, duration) =>
    useToastStore.getState().addToast('warning', title, message, duration),
  remove: (id) => useToastStore.getState().removeToast(id),
  clear: () => useToastStore.getState().clearAll(),
};
