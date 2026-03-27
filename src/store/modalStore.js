import { create } from 'zustand';

const DEFAULT_MODAL_PROPS = {
  type: 'success',
  title: '',
  message: '',
  confirmText: 'PROCEED',
  cancelText: 'CANCEL',
  onConfirm: null,
  onCancel: null,
  showCancel: false,
};

export const useModalStore = create((set) => ({
  isOpen: false,
  modalProps: { ...DEFAULT_MODAL_PROPS },
  openModal: (props) => set({ isOpen: true, modalProps: { ...DEFAULT_MODAL_PROPS, ...props } }),
  closeModal: () => {
    set({ isOpen: false });
    // Reset props setelah animasi exit selesai (~300ms) agar tidak ada stale content
    setTimeout(() => set({ modalProps: { ...DEFAULT_MODAL_PROPS } }), 350);
  },
}));
