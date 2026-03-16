import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export const ProfileHeader = ({ username, level = 1, selectedColor }) => {
  const displayName = username || 'USERNAME_GOES_HERE';
  const initials = displayName.substring(0, 3).toUpperCase();

  return (
    <motion.div
      className="relative w-full mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main Container */}
      <div className="relative">
        {/* Background with glow */}
        <div 
          className="absolute inset-0 rounded-lg blur-xl opacity-30 transition-all duration-500"
          style={{
            backgroundColor: selectedColor.hex,
          }}
        />

        {/* Content Container */}
        <div 
          className="relative border-2 p-6 transition-all duration-500 backdrop-blur-sm"
          style={{
            borderColor: selectedColor.hex,
            backgroundColor: `${selectedColor.hex}10`,
            boxShadow: `0 0 30px ${selectedColor.hex}40, inset 0 0 20px ${selectedColor.hex}10`,
          }}
        >
          {/* Main Flex Container */}
          <div className="flex items-center gap-6">
            {/* Avatar Section */}
            <motion.div
              className="relative flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Avatar Background with border */}
              <div
                className="w-24 h-24 rounded-lg border-2 flex items-center justify-center relative overflow-hidden"
                style={{
                  borderColor: selectedColor.hex,
                  backgroundColor: `${selectedColor.hex}20`,
                  boxShadow: `0 0 20px ${selectedColor.hex}60, inset 0 0 15px ${selectedColor.hex}30`,
                }}
              >
                {/* Avatar Icon */}
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <User 
                      size={40} 
                      style={{ color: selectedColor.hex }}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  <p className="text-[10px] font-mono mt-1" style={{ color: selectedColor.hex }}>
                    {initials}
                  </p>
                </div>

                {/* Pulsing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg border-2"
                  style={{ borderColor: selectedColor.hex }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Username and Level Section */}
            <div className="flex-1 min-w-0">
              {/* Username Display */}
              <motion.div
                className="flex items-baseline justify-between gap-4 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 
                  className="font-primary text-lg md:text-2xl tracking-[0.2em] uppercase truncate"
                  style={{ 
                    color: selectedColor.hex,
                    textShadow: `0 0 10px ${selectedColor.hex}60`,
                    fontWeight: 'bold',
                  }}
                >
                  {displayName}
                </h2>
                <span 
                  className="font-primary text-sm md:text-base tracking-[0.15em] whitespace-nowrap flex-shrink-0"
                  style={{ 
                    color: selectedColor.hex,
                    textShadow: `0 0 8px ${selectedColor.hex}40`,
                  }}
                >
                  LVL {level}
                </span>
              </motion.div>

              {/* Bottom line */}
              <motion.div
                className="w-full h-0.5 relative overflow-hidden rounded-full"
                style={{
                  backgroundColor: `${selectedColor.hex}30`,
                }}
              >
                <motion.div
                  className="h-full"
                  style={{
                    backgroundColor: selectedColor.hex,
                    boxShadow: `0 0 10px ${selectedColor.hex}`,
                  }}
                  animate={{
                    width: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <motion.div
        className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 rounded-tr-lg"
        style={{ borderColor: selectedColor.hex }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 rounded-bl-lg"
        style={{ borderColor: selectedColor.hex }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};
