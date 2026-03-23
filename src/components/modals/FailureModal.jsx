import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export const FailureModal = ({ isOpen, title = 'SYSTEM CRITICAL', message = 'Gagal menyambungkan ke satelit. Periksa kembali koordinat Anda', onClose, onRetry }) => {
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
            <div className="w-96 bg-[#1a0b2e]/90 backdrop-blur-md border-2 border-[#ff0055] p-8 relative overflow-hidden"
              style={{
                boxShadow: '0 0 25px rgba(255, 0, 85, 0.5), inset 0 0 20px rgba(255, 0, 85, 0.1)'
              }}
            >
              {/* Flicker effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  opacity: [0, 0.05, 0]
                }}
                transition={{
                  duration: 0.15,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 0, 85, 0.1), transparent)'
                }}
              />

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff0055]/10 to-transparent pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                {/* Header Icon */}
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <AlertTriangle
                    size={60}
                    className="text-[#ff0055]"
                    style={{
                      filter: 'drop-shadow(0 0 15px rgba(255, 0, 85, 0.8))'
                    }}
                  />
                </motion.div>

                {/* Title */}
                <h2 className="font-primary text-xl tracking-[0.2em] uppercase" style={{
                  color: '#ff0055',
                  textShadow: '0 0 20px rgba(255, 0, 85, 0.8)',
                  fontWeight: 'bold'
                }}>
                  {title}
                </h2>

                {/* Message */}
                <p className="font-secondary text-sm leading-relaxed text-[#8a6dfc]">
                  {message}
                </p>

                {/* Error Indicator */}
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-[#ff0055] rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                      style={{
                        boxShadow: '0 0 10px rgba(255, 0, 85, 0.6)'
                      }}
                    />
                  ))}
                </div>

                {/* Buttons */}
                <div className="w-full flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="flex-1 py-3 bg-[#140724] border-2 border-[#8a6dfc] text-[#8a6dfc] font-primary text-xs tracking-[0.15em] uppercase transition-all"
                    style={{
                      boxShadow: '0 0 10px rgba(138, 109, 252, 0.3)'
                    }}
                  >
                    CLOSE
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onRetry || onClose}
                    className="flex-1 py-3 bg-[#140724] border-2 border-[#ff0055] text-[#ff0055] font-primary text-xs tracking-[0.15em] uppercase transition-all"
                    style={{
                      boxShadow: '0 0 15px rgba(255, 0, 85, 0.4)'
                    }}
                  >
                    RETRY
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
