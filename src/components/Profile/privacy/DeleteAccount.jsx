import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useModalStore } from '../../../store/modalStore';
import { useProfileSettings } from '../../../hooks/useProfileSettings';

export default function DeleteAccount() {
  const openModal = useModalStore(state => state.openModal);
  
  // Tarik mesin penghancur dari hook
  const { deleteAccount } = useProfileSettings();

  const handleDeleteRequest = () => {
    openModal({
      type: 'warning',
      title: 'CRITICAL: HAPUS AKUN PERMANEN',
      message: 'Gagal mengamankan data?\nMenghapus akun akan menghilangkan seluruh\nriwayat sub-space, misi, dan pencapaian Anda secara permanen. Silakan konfirmasi.',
      confirmText: 'INISIASI PURGE',
      cancelText: 'BATALKAN',
      showCancel: true,
      onConfirm: handleConfirmDelete
    });
  };

  const handleConfirmDelete = () => {
    // Eksekusi mutasi delete
    deleteAccount.mutate();
  };

  return (
    <div className="p-6 md:p-8 border-2 border-red-500/80 bg-[#0A0505] relative shadow-[0_0_20px_rgb(220,38,38)_/_0.15] overflow-hidden mt-6">
      
      {/* Danger Striped Background Effect */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(220,38,38,0.05)_10px,rgba(220,38,38,0.05)_20px)] pointer-events-none"></div>
      
      {/* Red Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(220,38,38,0.05)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
      
      <h3 className="relative z-10 font-secondary text-red-500 text-sm md:text-base tracking-widest uppercase mb-4 flex items-center gap-3">
        <AlertTriangle size={18} className="animate-pulse" /> CRITICAL WARNING
      </h3>
      
      <p className="relative z-10 text-[10px] md:text-xs text-red-400/80 font-secondary tracking-widest leading-loose mb-6">
        INITIATING THIS PROTOCOL WILL PURGE ALL OPERATOR DATA FROM THE MAINFRAME. <br className="hidden md:block"/>
        <span className="text-red-500 font-bold border-b border-red-500 pb-1">THIS ACTION IS IRREVERSIBLE.</span> ALL CLEARANCE WILL BE REVOKED.
      </p>
      
      <button 
        onClick={handleDeleteRequest} 
        disabled={deleteAccount.isPending}
        className="relative z-10 flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 border-2 border-red-600 bg-red-900/20 text-red-500 hover:bg-red-600 hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all duration-300 font-secondary text-xs tracking-widest uppercase font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Trash2 size={16} className={deleteAccount.isPending ? "animate-pulse" : ""} /> 
        {deleteAccount.isPending ? 'PURGING DATA...' : 'TERMINATE ACCOUNT'}
      </button>
    </div>
  );
}