import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
  // Animasi varian untuk overlay dan modal
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 50 },
    visible: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.9, opacity: 0, y: 50 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-[#05020a]/80 flex items-center justify-center z-50 backdrop-blur-sm p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          onClick={onClose} // Tutup modal saat overlay di-klik
        >
          {/* Modal Container */}
          <motion.div
            className="border border-[#ff0055] bg-[#0a0514] p-8 md:p-10 shadow-[0_0_20px_rgba(255,0,85,0.2)] relative overflow-hidden text-center max-w-lg w-full"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} // Cegah penutupan modal saat konten di-klik
          >
            {/* Background scanner line effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,0,85,0.02)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
            
            {/* Decorative corners ala gambar referensi */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ff0055]"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff0055]"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ff0055]"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ff0055]"></div>

            {/* Ikon X Tipis di Tengah */}
            <div className="relative z-10 mb-6 flex justify-center">
              <div className="text-[#ff0055] drop-shadow-[0_0_10px_rgba(255,0,85,0.8)]">
                {/* Menggunakan strokeWidth 1 agar terlihat tipis seperti digambar */}
                <X size={56} strokeWidth={1} />
              </div>
            </div>

            {/* Judul Merah Menyala */}
            <h3 className="relative z-10 font-press text-sm md:text-base text-[#ff0055] tracking-widest uppercase mb-6 drop-shadow-[0_0_8px_rgba(255,0,85,0.5)]">
              HAPUS AKUN PERMANEN
            </h3>
            
            {/* Teks Deskripsi */}
            <p className="relative z-10 font-secondary text-[10px] md:text-xs text-[#c9bfe6] tracking-widest leading-loose mb-8">
              Gagal mengamankan data? <br/>
              Menghapus akun akan menghilangkan seluruh <br/>
              riwayat sub-space Anda. Silakan konfirmasi.
            </p>
            
            {/* Separator Line (Tidak full width) */}
            <div className="relative z-10 border-t border-[#3b2b5a] mb-6 w-full max-w-[85%] mx-auto"></div>

            {/* Tombol Aksi (Kiri gelap, Kanan menyala) */}
            <div className="relative z-10 flex flex-col md:flex-row gap-4 items-center justify-center font-secondary w-full max-w-[85%] mx-auto">
              <button
                onClick={onClose} 
                className="flex-1 w-full py-3 border border-[#3b2b5a] text-[#c9bfe6] hover:bg-[#3b2b5a]/30 font-secondary text-[10px] tracking-widest uppercase transition-colors"
              >
                KEMBALI
              </button>
              <button
                onClick={onConfirm} 
                className="flex-1 w-full py-3 border border-[#ff0055] bg-[#ff0055]/5 text-[#ff0055] hover:bg-[#ff0055]/20 shadow-[0_0_10px_rgba(255,0,85,0.3)] font-secondary text-[10px] tracking-widest uppercase transition-all"
              >
                HAPUS DATA
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}