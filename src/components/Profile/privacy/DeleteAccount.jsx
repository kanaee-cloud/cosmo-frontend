import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useProfileSettings } from '../../../hooks/useProfileSettings';
import { useToastStore } from '../../../hooks/useToast';

export default function DeleteAccount() {
  const navigate = useNavigate();
  const { success } = useToastStore();
  const { deleteAccount } = useProfileSettings();
  
  // State modal lokal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteRequest = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // 1. Eksekusi mutasi delete di background
    deleteAccount.mutate(null, {
      onSuccess: () => {
        // 2. Tutup modal lokal
        setIsModalOpen(false);
        // 3. Langsung lempar user ke halaman depan agar UI dashboard hilang
        navigate('/');
        // Notifikasi sudah dikirim dari hook saat success, tidak perlu double
      }
    });
  };

  return (
    <>
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

      {/* Modal Konfirmasi Lokal */}
      {createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4 backdrop-blur-sm"
              onClick={() => !deleteAccount.isPending && setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                className="relative max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
                style={{
                  clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
                }}
              >
                <div className="w-full bg-[#0a0a1a] border border-red-500/30 p-8 relative overflow-hidden" style={{ borderColor: '#eab308' }}>
                  <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom right, #eab30820, transparent)` }} />

                  <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="relative"
                    >
                      <AlertTriangle size={50} style={{ color: '#eab308', filter: `drop-shadow(0 0 15px rgba(234, 179, 8, 0.6))` }} />
                    </motion.div>

                    <h2 className="font-primary text-lg tracking-[0.2em] uppercase max-w-[90%]" style={{ color: '#eab308', textShadow: `0 0 15px rgba(234, 179, 8, 0.6)` }}>
                      CRITICAL: HAPUS AKUN PERMANEN
                    </h2>

                    <p className="font-secondary text-xs leading-relaxed text-light/80 whitespace-pre-wrap">
                      Gagal mengamankan data?{'\n'}Menghapus akun akan menghilangkan seluruh{'\n'}riwayat sub-space, misi, dan pencapaian Anda secara permanen. Silakan konfirmasi.
                    </p>

                    <div className="w-full h-1 bg-white/10 relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="h-full" style={{ backgroundColor: '#eab308', boxShadow: `0 0 10px #eab308` }}
                      />
                    </div>

                    <div className="flex w-full gap-3 pt-2">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        disabled={deleteAccount.isPending}
                        className="flex-1 py-3 bg-white/5 border text-light/80 hover:bg-white/10 hover:text-white font-secondary text-[10px] tracking-[0.1em] uppercase transition-all disabled:opacity-50"
                        style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                      >
                        BATALKAN
                      </button>
                      <button
                        onClick={handleConfirmDelete}
                        disabled={deleteAccount.isPending}
                        className="flex-1 py-3 border font-primary text-[10px] md:text-xs tracking-[0.15em] uppercase transition-all hover:bg-opacity-40 disabled:opacity-50"
                        style={{
                          backgroundColor: `#eab30815`,
                          borderColor: '#eab308',
                          color: '#eab308',
                          boxShadow: `0 0 15px #eab30840`
                        }}
                      >
                        {deleteAccount.isPending ? 'PURGING...' : 'INISIASI PURGE'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}