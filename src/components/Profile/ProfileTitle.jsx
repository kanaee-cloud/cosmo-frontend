import { motion } from 'framer-motion';

export const ProfileTitle = ({ matrixColor }) => {
  return (
    <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="font-primary text-4xl md:text-5xl font-black tracking-[0.2em] uppercase mb-2" style={{ color: matrixColor.hex }}>
        PROFILE
      </h1>
      <p className="text-xs md:text-sm text-gray-400 tracking-widest">[ CAPTAIN STATUS OVERVIEW ]</p>
    </motion.div>
  );
};
