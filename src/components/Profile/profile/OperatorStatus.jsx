import { motion } from 'framer-motion';
import { Shield, Cpu, Heart } from 'lucide-react';

export const OperatorStatus = () => {
  return (
    <div className="p-4 md:p-5 border-b border-[#3b2b5a]">
      <div className="mb-4">
        <p className="font-secondary text-[10px] md:text-xs text-[#6a6a9a] tracking-[0.2em] mb-2">
          [ STATUS RIG ]
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.div 
          className="border border-[#3b2b5a] p-2 md:p-3 bg-[#1a0f2e] hover:border-[#00f0ff] transition-colors"
        >
          <div className="flex items-center gap-2 mb-1">
            <Shield size={12} className="text-[#00f0ff]" />
            <p className="font-secondary text-[9px] md:text-[10px] tracking-wider text-[#00f0ff]">STATUS</p>
          </div>
          <p className="text-white font-press text-[9px] md:text-[10px] mt-2">ACTIVE</p>
        </motion.div>

        <motion.div 
          className="border border-[#3b2b5a] p-2 md:p-3 bg-[#1a0f2e] hover:border-[#00f0ff] transition-colors"
        >
          <div className="flex items-center gap-2 mb-1">
            <Cpu size={12} className="text-[#00f0ff]" />
            <p className="font-secondary text-[9px] md:text-[10px] tracking-wider text-[#00f0ff]">SYNC</p>
          </div>
          <p className="text-white font-press text-[9px] md:text-[10px] mt-2">100%</p>
        </motion.div>

        <motion.div 
          className="border border-[#3b2b5a] p-2 md:p-3 bg-[#1a0f2e] hover:border-[#00f0ff] transition-colors col-span-2"
        >
          <div className="flex items-center gap-2 mb-1">
            <Heart size={12} className="text-[#00f0ff]" />
            <p className="font-secondary text-[9px] md:text-[10px] tracking-wider text-[#00f0ff]">CORE SYSTEM</p>
          </div>
          <p className="text-white font-press text-[9px] md:text-[10px] mt-2 text-center text-[#06FFA5]">OPTIMAL</p>
        </motion.div>
      </div>
    </div>
  );
};