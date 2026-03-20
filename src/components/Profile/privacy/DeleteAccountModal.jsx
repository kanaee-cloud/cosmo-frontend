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
          className="fixed inset-0 bg-primary flex items-center justify-center z-50 backdrop-blur-sm p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          onClick={onClose} // Tutup modal saat overlay di-klik
        >
          {/* Modal Container */}
          <motion.div
            className="border border-accent bg-secondary p-8 md:p-10 shadow-[0_0_20px_rgb(var(--color-accent)_/_0.2)] relative overflow-hidden text-center max-w-lg w-full"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} // Cegah penutupan modal saat konten di-klik
          >
            {/* Background scanner line effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgb(var(--color-accent)_/_0.02)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
            
            {/* Decorative corners ala gambar referensi */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent"></div>

            {/* Ikon X Tipis di Tengah */}
            <div className="relative z-10 mb-6 flex justify-center">
              <div className="text-accent drop-shadow-[0_0_10px_rgb(var(--color-accent)_/_0.8)]">
                {/* Menggunakan strokeWidth 1 agar terlihat tipis seperti digambar */}
                <X size={56} strokeWidth={1} />
              </div>
            </div>

            {/* Judul Merah Menyala */}
            <h3 className="relative z-10 font-press text-sm md:text-base text-accent tracking-widest uppercase mb-6 drop-shadow-[0_0_8px_rgb(var(--color-accent)_/_0.5)]">
              HAPUS AKUN PERMANEN
            </h3>
            
            {/* Teks Deskripsi */}
            <p className="relative z-10 font-secondary text-[10px] md:text-xs text-light tracking-widest leading-loose mb-8">
              Gagal mengamankan data? <br/>
              Menghapus akun akan menghilangkan seluruh <br/>
              riwayat sub-space Anda. Silakan konfirmasi.
            </p>
            
            {/* Separator Line (Tidak full width) */}
            <div className="relative z-10 border-t border-tertiary mb-6 w-full max-w-[85%] mx-auto"></div>

            {/* Tombol Aksi (Kiri gelap, Kanan menyala) */}
            <div className="relative z-10 flex flex-col md:flex-row gap-4 items-center justify-center font-secondary w-full max-w-[85%] mx-auto">
              <button
                onClick={onClose} 
                className="flex-1 w-full py-3 border border-tertiary text-light hover:bg-[#3b2b5a]/30 font-secondary text-[10px] tracking-widest uppercase transition-colors"
              >
                KEMBALI
              </button>
              <button
                onClick={onConfirm} 
                className="flex-1 w-full py-3 border border-accent bg-[#ff0055]/5 text-accent hover:bg-accent/20 shadow-[0_0_10px_rgb(var(--color-accent)_/_0.3)] font-secondary text-[10px] tracking-widest uppercase transition-all"
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