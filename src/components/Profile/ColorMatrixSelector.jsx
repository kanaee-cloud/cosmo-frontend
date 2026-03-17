import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { THEME_COLORS } from '../../store/themeStore';

export const ColorMatrixSelector = ({ matrixColor, setMatrixColor }) => {
  return (
    <motion.div
      className="border-2 p-6 transition-all duration-500"
      style={{ borderColor: `${matrixColor.hex}99`, background: `linear-gradient(135deg, ${matrixColor.hex}15 0%, transparent 100%)` }}
      whileHover={{ borderColor: matrixColor.hex }}
    >
      <div className="mb-4">
        <p className="font-primary text-[10px] tracking-[0.3em] mb-3" style={{ color: matrixColor.hex }}>
          [ COLOR MATRIX ]
        </p>
      </div>

      <div className="grid grid-cols-6 gap-3">
        {THEME_COLORS.map((color, idx) => (
          <motion.div
            key={idx} onClick={() => setMatrixColor(color)}
            className="relative aspect-square border-2 cursor-pointer transition-all duration-300 rounded-sm overflow-hidden group"
            style={{
              backgroundColor: color.hex,
              borderColor: matrixColor.name === color.name ? color.hex : 'rgba(255,255,255,0.2)',
              boxShadow: matrixColor.name === color.name ? `0 0 20px ${color.hex}80, inset 0 0 10px ${color.hex}40` : `0 0 10px ${color.hex}40`,
            }}
            whileHover={{ scale: 1.15, boxShadow: `0 0 30px ${color.hex}80, inset 0 0 10px ${color.hex}60` }}
          >
            {matrixColor.name === color.name && (
              <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                <Check size={20} color="white" strokeWidth={3} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
