import { motion, AnimatePresence } from 'framer-motion';
import { Medal } from 'lucide-react';

export const AchievementModal = ({ isOpen, badgeName = 'Galactic Voyager', badgeIcon = Medal, onClose }) => {
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
          {/* Particle effects */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#ff0055] rounded-full pointer-events-none"
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                opacity: 1
              }}
              animate={{
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 400,
                y: window.innerHeight / 2 + (Math.random() - 0.5) * 400,
                opacity: 0
              }}
              transition={{
                duration: 2,
                delay: i * 0.1
              }}
              style={{
                boxShadow: '0 0 10px rgba(255, 0, 85, 0.6)'
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            transition={{ type: 'spring', damping: 12 }}
            className="relative"
            onClick={(e) => e.stopPropagation()}
            style={{
              clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
            }}
          >
            {/* Background */}
            <div className="w-96 bg-gradient-to-b from-[#1a0b2e] to-[#0d0514] backdrop-blur-md border-2 border-[#ff0055] p-8 relative overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff0055]/15 via-transparent to-transparent pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                {/* Achievement Title */}
                <h2 className="font-primary text-lg tracking-[0.2em] uppercase text-[#8a6dfc]">
                  COMMENDATION RECEIVED
                </h2>

                {/* Badge Container */}
                <motion.div
                  className="relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                >
                  {/* Badge Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(255, 0, 85, 0.4)',
                        '0 0 40px rgba(255, 0, 85, 0.8)',
                        '0 0 20px rgba(255, 0, 85, 0.4)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Badge */}
                  <div
                    className="w-24 h-24 bg-[#140724] border-3 border-[#ff0055] rounded-full flex items-center justify-center relative"
                    style={{
                      boxShadow: '0 0 30px rgba(255, 0, 85, 0.6), inset 0 0 20px rgba(255, 0, 85, 0.2)'
                    }}
                  >
                    {badgeIcon && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {badgeIcon({
                          size: 50,
                          color: '#ff0055',
                          style: {
                            filter: 'drop-shadow(0 0 10px rgba(255, 0, 85, 0.8))'
                          }
                        })}
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Badge Name */}
                <div>
                  <p className="font-secondary text-xs text-[#8a6dfc] tracking-widest mb-2">INSIGNIA CLASS</p>
                  <h3 className="font-primary text-2xl tracking-[0.15em] uppercase" style={{
                    color: '#8a6dfc',
                    textShadow: '0 0 15px rgba(138, 109, 252, 0.5)'
                  }}>
                    {badgeName}
                  </h3>
                </div>

                {/* Progress Bar */}
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-secondary text-[10px] text-[#8a6dfc] tracking-widest">COMPLETION</span>
                    <span className="font-secondary text-[10px] text-[#ff0055] tracking-widest">100%</span>
                  </div>
                  <div className="w-full h-2 bg-[#0a0a1a]/50 border border-[#8a6dfc]/30 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[#ff0055] to-[#8a6dfc]"
                      style={{
                        boxShadow: '0 0 20px rgba(255, 0, 85, 0.8), 0 0 10px rgba(138, 109, 252, 0.6)'
                      }}
                    />
                  </div>
                </div>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-full py-3 bg-[#140724] border-2 border-[#ff0055] text-[#ff0055] font-primary text-sm tracking-[0.15em] uppercase transition-all"
                  style={{
                    boxShadow: '0 0 20px rgba(255, 0, 85, 0.6)'
                  }}
                >
                  COLLECT REWARDS
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
