import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { useModalStore } from '../../store/modalStore';

export default function GlobalModal() {
  const { isOpen, modalProps, closeModal } = useModalStore();

  const {
    type = 'success',
    title = 'SYSTEM MESSAGE',
    message = '',
    confirmText = 'PROCEED',
    cancelText = 'CANCEL',
    onConfirm,
    onCancel,
    showCancel = false,
  } = modalProps;

  // Render variables setup based on type
  let Icon = Info;
  let mainColor = '#06FFA5'; // default cyan/info
  let shadowColor = 'rgba(6, 255, 165, 0.6)';

  if (type === 'success') {
    Icon = CheckCircle;
    mainColor = '#8a6dfc'; // Accent purple mapping to existing success style
    shadowColor = 'rgba(138, 109, 252, 0.6)';
  } else if (type === 'error') {
    Icon = ShieldAlert;
    mainColor = '#ef4444'; // Red-500
    shadowColor = 'rgba(239, 68, 68, 0.6)';
  } else if (type === 'warning' || type === 'confirm') {
    Icon = AlertTriangle;
    mainColor = '#eab308'; // Yellow-500
    shadowColor = 'rgba(234, 179, 8, 0.6)';
  }

  // Khusus success text color sesuai desain lama 'SuccessModal' untuk pertahankan ciri khas
  const titleColor = type === 'success' ? '#ff0055' : mainColor;
  const titleShadowColor = type === 'success' ? 'rgba(255, 0, 85, 0.6)' : shadowColor;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    else closeModal(); 
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4 backdrop-blur-sm"
          onClick={closeModal} // klik overlay tutup modal
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
            {/* Background Container */}
            <div className="w-full bg-[#0a0a1a] border border-light/30 p-8 relative overflow-hidden" 
                 style={{ borderColor: mainColor }}>
              {/* Glow effect gradient in the background based on color */}
              <div className="absolute inset-0 pointer-events-none" 
                   style={{ backgroundImage: `linear-gradient(to bottom right, ${mainColor}20, transparent)` }} />

              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                
                {/* Header Icon */}
                <motion.div
                  animate={type !== 'error' ? { scale: [1, 1.1, 1] } : { x: [-3, 3, -3, 3, 0] }}
                  transition={type !== 'error' ? { duration: 2, repeat: Infinity } : { duration: 0.4 }}
                  className="relative"
                >
                  <Icon size={50} style={{ color: mainColor, filter: `drop-shadow(0 0 15px ${shadowColor})` }} />
                </motion.div>

                {/* Title */}
                <h2 className="font-primary text-lg tracking-[0.2em] uppercase max-w-[90%]" 
                    style={{ color: titleColor, textShadow: `0 0 15px ${titleShadowColor}` }}>
                  {title}
                </h2>

                {/* Message / Description  - whitespace-pre-wrap to handle line breaks */}
                <p className="font-secondary text-xs leading-relaxed text-light/80 whitespace-pre-wrap">
                  {message}
                </p>

                {/* Status Indicator Bar */}
                <div className="w-full h-1 bg-white/10 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="h-full" style={{ backgroundColor: mainColor, boxShadow: `0 0 10px ${mainColor}` }}
                  />
                </div>

                {/* Buttons Action Group */}
                <div className="flex w-full gap-3 pt-2">
                  {showCancel && (
                    <button
                      onClick={handleCancel}
                      className="flex-1 py-3 bg-white/5 border text-light/80 hover:bg-white/10 hover:text-white font-secondary text-[10px] tracking-[0.1em] uppercase transition-all"
                      style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                    >
                      {cancelText}
                    </button>
                  )}
                  <button
                    onClick={handleConfirm}
                    className="flex-1 py-3 border font-primary text-[10px] md:text-xs tracking-[0.15em] uppercase transition-all hover:bg-opacity-40"
                    style={{
                      backgroundColor: `${mainColor}15`,
                      borderColor: mainColor,
                      color: titleColor,
                      boxShadow: `0 0 15px ${mainColor}40`
                    }}
                  >
                    {confirmText}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
