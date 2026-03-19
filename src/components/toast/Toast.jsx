import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

const Toast = ({ id, type = 'success', title, message, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const isSuccess = type === 'success';
  const isError = type === 'error';

  const borderColor = isSuccess ? '#8a6dfc' : isError ? '#ff0055' : '#8a6dfc';
  const textColor = isSuccess ? '#8a6dfc' : isError ? '#ff0055' : '#8a6dfc';
  const glowColor = isSuccess ? 'rgba(255, 0, 85, 0.3)' : 'rgba(255, 0, 85, 0.4)';
  const iconColor = isSuccess ? '#8a6dfc' : isError ? '#ff0055' : '#8a6dfc';

  return (
    <motion.div
      layout
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
      className="w-[320px] mb-3"
    >
      <div
        className="relative overflow-hidden backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(26, 11, 46, 0.95)',
          border: `1px solid ${borderColor}`,
          borderRadius: '2px',
          boxShadow: `0 0 15px ${glowColor}, inset 0 0 20px rgba(0, 0, 0, 0.4)`,
          padding: '14px 16px',
        }}
      >
        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${isSuccess ? '#8a6dfc' : '#ff0055'}, transparent)`,
            boxShadow: `0 0 8px ${isSuccess ? '#8a6dfc' : '#ff0055'}80`,
          }}
        />

        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 pt-0.5">
            {isSuccess ? (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle size={20} color={iconColor} strokeWidth={2} />
              </motion.div>
            ) : (
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <AlertCircle size={20} color={iconColor} strokeWidth={2} />
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <div
                className="font-primary text-xs tracking-[0.1em] font-semibold uppercase"
                style={{ color: textColor }}
              >
                {title}
              </div>
            )}
            {message && (
              <div
                className="font-secondary text-xs tracking-wider mt-1"
                style={{ color: textColor, opacity: 0.9 }}
              >
                {message}
              </div>
            )}
          </div>

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="flex-shrink-0 p-1 rounded transition-all duration-200 hover:bg-white/5"
            style={{
              color: '#8a6dfc',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ff0055';
              e.currentTarget.style.textShadow = '0 0 10px rgba(255, 0, 85, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#8a6dfc';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            <X size={16} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Toast;
