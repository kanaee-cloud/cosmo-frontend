import React, { useState } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useModalStore } from '../../../store/modalStore';
import { toast } from '../../../hooks/useToast';

export default function DeleteAccount() {
  const openModal = useModalStore(state => state.openModal);

  const handleDeleteRequest = () => {
    openModal({
      type: 'warning',
      title: 'HAPUS AKUN PERMANEN',
      message: 'Gagal mengamankan data?\nMenghapus akun akan menghilangkan seluruh\nriwayat sub-space Anda. Silakan konfirmasi.',
      confirmText: 'HAPUS DATA',
      cancelText: 'KEMBALI',
      showCancel: true,
      onConfirm: handleConfirmDelete
    });
  };

  const handleConfirmDelete = () => {
    // UI-only: tampilkan pesan dan tutup modal
    toast.success('PURGE INITIATED', 'INISIASI PURGE AKUN BERHASIL (UI-ONLY). SELAMAT TINGGAL, OPERATOR.');
  };

  return (
    <>
      <div className="p-6 md:p-8 border-2 border-accent bg-secondary relative shadow-[0_0_20px_rgb(var(--color-accent)_/_0.15)] overflow-hidden mt-6">
        
        {/* Danger Striped Background Effect */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgb(var(--color-accent)_/_0.05)_10px,rgb(var(--color-accent)_/_0.05)_20px)] pointer-events-none"></div>
        
        <h3 className="relative z-10 font-secondary text-accent text-sm md:text-base tracking-widest uppercase mb-4 flex items-center gap-3">
          <AlertTriangle size={18} /> CRITICAL WARNING
        </h3>
        
        <p className="relative z-10 text-[10px] md:text-xs text-accent/80 font-secondary tracking-widest leading-loose mb-6">
          INITIATING THIS PROTOCOL WILL PURGE ALL OPERATOR DATA FROM THE MAINFRAME. <br className="hidden md:block"/>
          <span className="text-accent font-bold border-b border-accent pb-1">THIS ACTION IS IRREVERSIBLE.</span> THIS IS A UI-ONLY DEMO.
        </p>
        
        <button 
          onClick={handleDeleteRequest} // Buka modal saat di-klik
          className="relative z-10 flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 border-2 border-accent bg-accent/10 text-accent hover:bg-accent/30 hover:shadow-[0_0_20px_rgb(var(--color-accent)_/_0.5)] transition-all font-secondary text-xs tracking-widest uppercase font-bold"
        >
          <Trash2 size={16} /> TERMINATE ACCOUNT
        </button>
      </div>

    </>
  );
}