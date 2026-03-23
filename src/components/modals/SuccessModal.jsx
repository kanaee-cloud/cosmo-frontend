import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export const SuccessModal = ({ isOpen, title = 'COMMUNICATION ESTABLISHED', message = 'Data berhasil diunggah ke mainframe', onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -50 }}
            transition={{ type: 'spring', damping: 15 }}
            className="relative"
            onClick={(e) => e.stopPropagation()}
            style={{
              clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
            }}
          >
            {/* Background */}
            <div className="w-96 bg-[#1a0b2e]/90 backdrop-blur-md border border-[#8a6dfc]/80 p-8 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8a6dfc]/10 to-transparent pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                {/* Header Icon */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative"
                >
                  <CheckCircle
                    size={60}
                    className="text-[#8a6dfc]"
                    style={{
                      filter: 'drop-shadow(0 0 15px rgba(138, 109, 252, 0.6))'
                    }}
                  />
                </motion.div>

                {/* Title */}
                <h2 className="font-primary text-xl tracking-[0.2em] uppercase" style={{
                  color: '#ff0055',
                  textShadow: '0 0 20px rgba(255, 0, 85, 0.6)'
                }}>
                  {title}
                </h2>

                {/* Message */}
                <p className="font-secondary text-sm leading-relaxed text-[#8a6dfc]">
                  {message}
                </p>

                {/* Status Indicator */}
                <div className="w-full h-1 bg-[#0a0a1a]/50 border border-[#8a6dfc]/30 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="h-full bg-[#8a6dfc]"
                    style={{
                      boxShadow: '0 0 10px rgba(138, 109, 252, 0.8)'
                    }}
                  />
                </div>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-full py-3 bg-[#140724] border-2 border-[#ff0055] text-[#ff0055] font-primary text-sm tracking-[0.15em] uppercase transition-all"
                  style={{
                    boxShadow: '0 0 15px rgba(255, 0, 85, 0.4)'
                  }}
                >
                  PROCEED
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
