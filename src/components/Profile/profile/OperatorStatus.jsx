import { motion } from 'framer-motion';
import { Shield, Cpu, Heart } from 'lucide-react';

export const OperatorStatus = () => {
  return (
    <div className="p-4 md:p-5 border-b border-tertiary transition-colors duration-500">
      <div className="mb-4">
        <p className="font-secondary text-[10px] md:text-xs text-light/60 tracking-[0.2em] mb-2 transition-colors duration-500">
          [ STATUS RIG ]
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.div 
          className="border border-tertiary p-2 md:p-3 bg-tertiary hover:border-light transition-colors duration-500"
        >
          <div className="flex items-center gap-2 mb-1">
            <Shield size={12} className="text-light transition-colors duration-500" />
            <p className="font-secondary text-[9px] md:text-[10px] tracking-wider text-light transition-colors duration-500">STATUS</p>
          </div>
          <p className="text-text font-press text-[9px] md:text-[10px] mt-2 transition-colors duration-500">ACTIVE</p>
        </motion.div>

        <motion.div 
          className="border border-tertiary p-2 md:p-3 bg-tertiary hover:border-light transition-colors duration-500"
        >
          <div className="flex items-center gap-2 mb-1">
            <Cpu size={12} className="text-light transition-colors duration-500" />
            <p className="font-secondary text-[9px] md:text-[10px] tracking-wider text-light transition-colors duration-500">SYNC</p>
          </div>
          <p className="text-text font-press text-[9px] md:text-[10px] mt-2 transition-colors duration-500">100%</p>
        </motion.div>

        <motion.div 
          className="border border-tertiary p-2 md:p-3 bg-tertiary hover:border-light transition-colors duration-500 col-span-2"
        >
          <div className="flex items-center gap-2 mb-1">
            <Heart size={12} className="text-light transition-colors duration-500" />
            <p className="font-secondary text-[9px] md:text-[10px] tracking-wider text-light transition-colors duration-500">CORE SYSTEM</p>
          </div>
          {/* Warna hijau neon untuk optimal kita gunakan standar tailwind text-green-400 agar rapi */}
          <p className="font-press text-[9px] md:text-[10px] mt-2 text-center text-green-400">OPTIMAL</p>
        </motion.div>
      </div>
    </div>
  );
};