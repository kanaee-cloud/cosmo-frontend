import { motion } from 'framer-motion';
import { Zap, Shield, Cpu, Heart } from 'lucide-react';

export const OperatorStatus = ({ matrixColor, currentExp }) => {
  return (
    <motion.div
      className="border-2 p-6 transition-all duration-500"
      style={{ borderColor: `${matrixColor.hex}99`, background: `linear-gradient(135deg, ${matrixColor.hex}15 0%, transparent 100%)` }}
      whileHover={{ borderColor: matrixColor.hex }}
    >
      <div className="mb-4">
        <p className="font-primary text-[10px] tracking-[0.3em] mb-3" style={{ color: matrixColor.hex }}>
          [ OPERATOR STATUS ]
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          className="border-2 p-3 transition-all duration-300"
          style={{ borderColor: matrixColor.hex + '60', background: matrixColor.hex + '10' }}
          whileHover={{ borderColor: matrixColor.hex, boxShadow: `0 0 15px ${matrixColor.hex}40`, transform: 'translateY(-4px)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap size={12} style={{ color: matrixColor.hex }} />
            <p className="font-mono text-[10px] tracking-wider" style={{ color: matrixColor.hex }}>EXP</p>
          </div>
          <p className="text-white font-black text-lg">{currentExp}</p>
        </motion.div>

        <motion.div 
          className="border-2 p-3 transition-all duration-300"
          style={{ borderColor: matrixColor.hex + '60', background: matrixColor.hex + '10' }}
          whileHover={{ borderColor: matrixColor.hex, boxShadow: `0 0 15px ${matrixColor.hex}40`, transform: 'translateY(-4px)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield size={12} style={{ color: matrixColor.hex }} />
            <p className="font-mono text-[10px] tracking-wider" style={{ color: matrixColor.hex }}>STATUS</p>
          </div>
          <p className="text-white font-black text-sm">ACTIVE</p>
        </motion.div>

        <motion.div 
          className="border-2 p-3 transition-all duration-300"
          style={{ borderColor: matrixColor.hex + '60', background: matrixColor.hex + '10' }}
          whileHover={{ borderColor: matrixColor.hex, boxShadow: `0 0 15px ${matrixColor.hex}40`, transform: 'translateY(-4px)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Cpu size={12} style={{ color: matrixColor.hex }} />
            <p className="font-mono text-[10px] tracking-wider" style={{ color: matrixColor.hex }}>SYNC</p>
          </div>
          <p className="text-white font-black text-sm">100%</p>
        </motion.div>

        <motion.div 
          className="border-2 p-3 transition-all duration-300"
          style={{ borderColor: matrixColor.hex + '60', background: matrixColor.hex + '10' }}
          whileHover={{ borderColor: matrixColor.hex, boxShadow: `0 0 15px ${matrixColor.hex}40`, transform: 'translateY(-4px)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Heart size={12} style={{ color: matrixColor.hex }} />
            <p className="font-mono text-[10px] tracking-wider" style={{ color: matrixColor.hex }}>CORE</p>
          </div>
          <p className="text-white font-black text-sm">OK</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
