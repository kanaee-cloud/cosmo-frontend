import { motion } from 'framer-motion';

export const UserInfoHeader = ({ displayName, level, profile, matrixColor }) => {
  return (
    <motion.div 
      className="relative w-full mb-8 border-b-2 pb-4 transition-all duration-500"
      style={{ borderColor: matrixColor.hex }}
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4">
        {/* Mini Avatar */}
        <motion.div
          className="w-16 h-16 rounded-lg border-2 flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{
            borderColor: matrixColor.hex,
            background: `linear-gradient(135deg, ${matrixColor.hex}30 0%, ${matrixColor.hex}10 100%)`,
            boxShadow: `0 0 15px ${matrixColor.hex}40, inset 0 0 15px ${matrixColor.hex}20`,
          }}
          whileHover={{ boxShadow: `0 0 25px ${matrixColor.hex}70, inset 0 0 15px ${matrixColor.hex}40` }}
        >
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover mix-blend-screen opacity-80" />
          ) : (
            <div className="text-3xl font-black" style={{ color: matrixColor.hex }}>
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </motion.div>

        {/* Username + Level */}
        <div className="flex-1 min-w-0">
          <motion.h1 
            className="font-primary text-2xl md:text-3xl tracking-[0.2em] uppercase truncate mb-1"
            style={{ color: matrixColor.hex, textShadow: `0 0 10px ${matrixColor.hex}60` }}
          >
            {displayName}
          </motion.h1>
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm tracking-widest text-gray-400">LVL</span>
            <span className="font-primary text-base md:text-lg font-bold" style={{ color: matrixColor.hex }}>
              {level}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
