import { create } from 'zustand';

export const useModalStore = create((set) => ({
  isOpen: false,
  modalProps: {
    type: 'success', // 'success', 'error', 'warning', 'confirm', 'info'
    title: '',
    message: '',
    confirmText: 'PROCEED',
    cancelText: 'CANCEL',
    onConfirm: null,
    onCancel: null,
    showCancel: false,
  },
  openModal: (props) => set({ isOpen: true, modalProps: { ...props } }),
  closeModal: () => set((state) => ({ isOpen: false, modalProps: state.modalProps })), // Tetap simpan modalProps lama saat animating out
}));
