import { motion } from 'framer-motion';
import { Cpu, Edit2, Check, X } from 'lucide-react';

export const ProfileDetailsCard = ({
  matrixColor,
  profile,
  displayName,
  userEmail,
  displayId,
  isEditingName,
  tempName,
  setTempName,
  handleEditName,
  handleSaveName,
  handleCancelEdit,
  updateName // Assuming this is mutated query object passed for button state
}) => {
  return (
    <div className="lg:col-span-1">
      <motion.div
        className="border-2 p-6 relative overflow-hidden transition-all duration-500"
        style={{
          borderColor: `${matrixColor.hex}99`,
          background: `linear-gradient(135deg, ${matrixColor.hex}15 0%, transparent 100%)`,
        }}
        whileHover={{ borderColor: matrixColor.hex, boxShadow: `0 0 30px ${matrixColor.hex}60` }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${matrixColor.hex}20 0%, transparent 100%)` }} />

        <div className="relative z-10 mb-6 flex justify-center">
          <motion.div className="relative" whileHover={{ scale: 1.05 }}>
            <motion.div
              className="w-32 h-32 rounded-lg border-2 overflow-hidden relative flex items-center justify-center"
              style={{
                borderColor: matrixColor.hex,
                background: `linear-gradient(135deg, ${matrixColor.hex}30 0%, ${matrixColor.hex}10 100%)`,
                boxShadow: `0 0 25px ${matrixColor.hex}40, inset 0 0 25px ${matrixColor.hex}20`,
              }}
              whileHover={{ boxShadow: `0 0 40px ${matrixColor.hex}80, inset 0 0 25px ${matrixColor.hex}40, 0 0 60px ${matrixColor.hex}60` }}
            >
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover mix-blend-screen opacity-80" />
              ) : (
                <div className="text-5xl font-black" style={{ color: matrixColor.hex }}>
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </motion.div>

            <motion.div 
              className="absolute -bottom-2 -right-2 p-2 rounded-lg border-2"
              style={{ borderColor: matrixColor.hex, backgroundColor: matrixColor.hex + '20' }}
              animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Cpu size={16} style={{ color: matrixColor.hex }} />
            </motion.div>
          </motion.div>
        </div>

        {/* Name Edit Section */}
        <div className="relative z-10 mb-6 text-center">
          {!isEditingName ? (
            <motion.div className="group" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-primary text-lg md:text-xl text-white tracking-wider mb-2 uppercase break-words">
                {displayName}
              </h2>
              <motion.button
                onClick={handleEditName}
                className="flex items-center justify-center gap-2 w-full py-2 border-2 transition-all duration-300"
                style={{ borderColor: matrixColor.hex, backgroundColor: matrixColor.hex + '10', color: matrixColor.hex }}
                whileHover={{ backgroundColor: matrixColor.hex + '30', boxShadow: `0 0 15px ${matrixColor.hex}60` }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit2 size={14} />
                <span className="font-primary text-[10px] tracking-widest">EDIT NAME</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <input
                type="text" value={tempName} onChange={(e) => setTempName(e.target.value.toLowerCase())}
                maxLength={20} autoFocus
                className="w-full px-3 py-2 border-2 bg-[#0a0a1a] font-primary text-sm focus:outline-none transition-all"
                style={{ borderColor: matrixColor.hex, color: matrixColor.hex }}
                onFocus={(e) => e.target.style.boxShadow = `0 0 10px ${matrixColor.hex}60, inset 0 0 5px ${matrixColor.hex}30`}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
                placeholder="ENTER NAME"
              />
              <div className="flex gap-2">
                <motion.button
                  onClick={handleSaveName} disabled={updateName.isPending}
                  className="flex-1 flex items-center justify-center gap-2 py-2 border-2 transition-all disabled:opacity-50"
                  style={{ borderColor: '#06FFA5', backgroundColor: updateName.isPending ? '#06FFA530' : '#06FFA580', color: '#06FFA5' }}
                  whileHover={!updateName.isPending ? { backgroundColor: '#06FFA5C0' } : {}}
                  whileTap={!updateName.isPending ? { scale: 0.95 } : {}}
                >
                  <Check size={14} />
                  <span className="font-mono text-[10px]">{updateName.isPending ? 'SAVING...' : 'CONFIRM'}</span>
                </motion.button>
                <motion.button
                  onClick={handleCancelEdit}
                  className="flex-1 flex items-center justify-center gap-2 py-2 border-2 transition-all"
                  style={{ borderColor: '#FF006E', backgroundColor: '#FF006E80', color: '#FF006E' }}
                  whileHover={{ backgroundColor: '#FF006EC0' }} whileTap={{ scale: 0.95 }}
                >
                  <X size={14} />
                  <span className="font-mono text-[10px]">CANCEL</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>

        {/* User Info */}
        <div className="relative z-10 space-y-3 text-[10px] md:text-xs border-t pt-4" style={{ borderColor: matrixColor.hex + '40' }}>
          <div>
            <p className="font-mono tracking-wider mb-1" style={{ color: matrixColor.hex }}>EMAIL</p>
            <p className="text-gray-400 font-mono break-all text-[9px]">{userEmail}</p>
          </div>
          <div>
            <p className="font-mono tracking-wider mb-1" style={{ color: matrixColor.hex }}>OP_ID</p>
            <p className="text-gray-400 font-mono text-[9px]">{displayId}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
