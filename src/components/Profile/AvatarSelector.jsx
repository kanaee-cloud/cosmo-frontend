import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X } from 'lucide-react';

const AVATAR_OPTIONS = [
  { id: 1, name: 'Avatar 1', emoji: '👨‍🚀' },
  { id: 2, name: 'Avatar 2', emoji: '👩‍🚀' },
  { id: 3, name: 'Avatar 3', emoji: '🧑‍💻' },
  { id: 4, name: 'Avatar 4', emoji: '👨‍⚕️' },
  { id: 5, name: 'Avatar 5', emoji: '👩‍⚕️' },
  { id: 6, name: 'Avatar 6', emoji: '🕵️' },
  { id: 7, name: 'Avatar 7', emoji: '👨‍🔬' },
  { id: 8, name: 'Avatar 8', emoji: '👩‍🔬' },
];

const AvatarSelector = ({ currentAvatar, onAvatarChange, matrixColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectAvatar = (emoji) => {
    onAvatarChange(emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Avatar Display */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative w-32 h-32 flex items-center justify-center cursor-pointer"
      >
        <div
          className="absolute inset-0 rounded-lg opacity-30 blur-xl"
          style={{ backgroundColor: matrixColor.hex }}
        />
        <motion.div
          className="relative w-full h-full flex items-center justify-center rounded-lg border-2 bg-black/40 backdrop-blur-sm text-6xl transition-all"
          style={{ borderColor: matrixColor.hex }}
          whileHover={{ borderColor: '#ff0055' }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {currentAvatar || '👨‍🚀'}
          <motion.div
            className="absolute bottom-2 right-2 p-2 rounded-full bg-black/80 border"
            style={{ borderColor: matrixColor.hex }}
            whileHover={{ backgroundColor: 'rgba(255, 0, 85, 0.2)' }}
          >
            <Camera size={16} style={{ color: matrixColor.hex }} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Avatar Selector Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-96 p-6 rounded-lg border-2 bg-gradient-to-br from-[#1a0b2e] to-[#0d0514]"
              style={{ borderColor: matrixColor.hex }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-primary text-light text-lg tracking-[0.2em] uppercase">
                  [SELECT AVATAR]
                </h3>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <X size={20} color={matrixColor.hex} />
                </motion.button>
              </div>

              {/* Avatar Grid */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {AVATAR_OPTIONS.map((avatar) => (
                  <motion.button
                    key={avatar.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectAvatar(avatar.emoji)}
                    className={`aspect-square flex items-center justify-center text-4xl rounded-lg border-2 transition-all ${
                      currentAvatar === avatar.emoji
                        ? 'border-bright-magenta bg-bright-magenta/20'
                        : 'border-[#3d2278]/50 bg-black/30 hover:border-bright-magenta/60'
                    }`}
                    style={{
                      borderColor:
                        currentAvatar === avatar.emoji
                          ? '#ff0055'
                          : matrixColor.hex + '80',
                    }}
                  >
                    {avatar.emoji}
                  </motion.button>
                ))}
              </div>

              {/* Info Text */}
              <p className="text-[10px] text-gray-500 font-secondary tracking-wider text-center">
                PILIH AVATAR ANDA UNTUK MEMULAI
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarSelector;
