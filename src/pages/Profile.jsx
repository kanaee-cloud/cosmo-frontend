import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useToastStore } from '../hooks/useToast';
import AvatarSelector from '../components/Profile/AvatarSelector';

export default function Profile() {
  const { profile, session } = useAuthStore();
  const matrixColor = useThemeStore((state) => state.matrixColor);
  const { success } = useToastStore();

  const [displayName, setDisplayName] = useState('UNKNOWN OPERATOR');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👨‍🚀');
  const [stats, setStats] = useState({
    rating: '34.25%',
    kills: '13.65',
    playtime: '12304',
    victories: '4858+',
  });

  // Load avatar from localStorage on mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setSelectedAvatar(savedAvatar);
    }
  }, []);

  // Sync displayName from profile
  useEffect(() => {
    const name = profile?.user_name || profile?.username || session?.user?.email?.split('@')[0]?.toUpperCase() || 'UNKNOWN OPERATOR';
    setDisplayName(name);
    setTempName(name);
  }, [profile, session]);

  const handleAvatarChange = (emoji) => {
    setSelectedAvatar(emoji);
    localStorage.setItem('userAvatar', emoji);
    success('AVATAR UPDATED', 'Avatar profil berhasil diubah');
  };

  const handleSaveName = async () => {
    if (!tempName.trim()) return;
    const newName = tempName.trim().toUpperCase();

    if (newName === displayName) {
      setIsEditingName(false);
      return;
    }

    try {
      const { data, error } = await useAuthStore.getState().supabase.auth.updateUser({
        data: { user_name: newName },
      });

      if (error) throw error;

      setDisplayName(newName);
      setIsEditingName(false);
      success('NAME UPDATED', 'Nama profil berhasil diperbarui');
    } catch (err) {
      console.error('Error updating name:', err);
    }
  };

  return (
    <div className="min-h-screen w-full p-8 overflow-auto">
      {/* Background glow */}
      <div
        className="fixed top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: matrixColor.hex, filter: `blur(120px)` }}
      />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Page Title */}
        <div className="mb-8">
          <motion.h1
            className="font-primary text-4xl tracking-[0.3em] text-white mb-2 relative inline-block"
            style={{
              textShadow: `0 0 20px ${matrixColor.hex}80`,
            }}
          >
            PROFIL PEMAIN
            <motion.div
              className="absolute bottom-0 left-0 h-1"
              style={{ backgroundColor: matrixColor.hex }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.h1>
        </div>

        {/* Main Profile Card */}
        <motion.div
          className="border-2 rounded-lg p-8 mb-8 backdrop-blur-md bg-gradient-to-br from-black/40 to-black/20"
          style={{ borderColor: matrixColor.hex }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Avatar & Name */}
            <div className="flex flex-col items-center lg:items-start lg:col-span-1">
              <AvatarSelector
                currentAvatar={selectedAvatar}
                onAvatarChange={handleAvatarChange}
                matrixColor={matrixColor}
              />

              {/* Name Section */}
              <div className="mt-6 w-full">
                {isEditingName ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="w-full bg-black/30 border border-[#3d2278]/80 text-white font-primary text-sm tracking-wider px-3 py-2 outline-none focus:border-bright-magenta transition-all"
                      style={{ borderColor: matrixColor.hex }}
                      placeholder="Enter name"
                    />
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSaveName}
                        className="flex-1 px-3 py-2 bg-bright-magenta text-white font-primary text-xs tracking-widest rounded hover:bg-bright-magenta/80 transition-all"
                      >
                        SAVE
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsEditingName(false);
                          setTempName(displayName);
                        }}
                        className="flex-1 px-3 py-2 bg-black/50 border border-[#3d2278]/50 text-gray-400 font-primary text-xs tracking-widest rounded hover:border-bright-magenta/50 transition-all"
                      >
                        CANCEL
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h2
                      className="font-primary text-xl tracking-[0.15em] text-white line-clamp-2"
                      style={{ textShadow: `0 0 10px ${matrixColor.hex}60` }}
                    >
                      {displayName}
                    </h2>
                    <p className="font-secondary text-xs tracking-wider text-gray-500 mb-3">
                      RANK ASCENDING
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditingName(true)}
                      className="px-4 py-2 border-2 rounded text-white font-primary text-xs tracking-widest transition-all hover:bg-white/10"
                      style={{
                        borderColor: matrixColor.hex,
                        color: matrixColor.hex,
                      }}
                    >
                      <Edit3 size={14} className="inline mr-2" />
                      EDIT NAMA
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            {/* Middle - Stats */}
            <div className="lg:col-span-1 space-y-4">
              <div className="font-primary text-sm tracking-[0.2em] text-white mb-4 uppercase">
                [STATISTIK]
              </div>

              {[
                { label: 'Rating', value: stats.rating },
                { label: 'K/D Ratio', value: stats.kills },
                { label: 'Playtime (h)', value: stats.playtime },
                { label: 'Victories', value: stats.victories },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="flex justify-between items-center pb-3 border-b border-[#3d2278]/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                >
                  <span className="font-secondary text-xs text-gray-400 tracking-wider">
                    {stat.label}
                  </span>
                  <span
                    className="font-primary text-sm font-bold"
                    style={{ color: matrixColor.hex }}
                  >
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Right - Perks/Features */}
            <div className="lg:col-span-1">
              <div className="font-primary text-sm tracking-[0.2em] text-white mb-4 uppercase">
                [PERKEMBANGAN]
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: '⚡', label: 'Speed', color: '#06FFA5' },
                  { icon: '🛡️', label: 'Defence', color: '#3A86FF' },
                  { icon: '💪', label: 'Power', color: '#FF006E' },
                  { icon: '🎯', label: 'Accuracy', color: '#FFB703' },
                  { icon: '🔥', label: 'Firepower', color: '#FB5607' },
                  { icon: '🔐', label: 'Security', color: '#8338EC' },
                ].map((perk, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square flex flex-col items-center justify-center rounded-lg border-2 bg-black/30 backdrop-blur-sm cursor-pointer transition-all hover:bg-black/50"
                    style={{ borderColor: perk.color }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
                  >
                    <span className="text-3xl mb-1">{perk.icon}</span>
                    <span className="text-[8px] font-primary tracking-widest uppercase" style={{ color: perk.color }}>
                      {perk.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Account Info */}
          <div
            className="border-2 rounded-lg p-6 backdrop-blur-md bg-black/20"
            style={{ borderColor: matrixColor.hex }}
          >
            <h3
              className="font-primary text-sm tracking-[0.2em] text-white mb-4 uppercase"
              style={{ color: matrixColor.hex }}
            >
              [Account Information]
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-secondary">Email:</span>
                <span className="text-white font-primary tracking-wider">
                  {session?.user?.email || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-secondary">Status:</span>
                <span className="font-primary text-bright-magenta">ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div
            className="border-2 rounded-lg p-6 backdrop-blur-md bg-black/20 flex flex-col justify-between"
            style={{ borderColor: matrixColor.hex }}
          >
            <h3
              className="font-primary text-sm tracking-[0.2em] text-white mb-4 uppercase"
              style={{ color: matrixColor.hex }}
            >
              [Quick Actions]
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-4 py-3 border-2 border-red-900/50 bg-red-900/20 hover:bg-red-900/40 text-red-400 font-primary text-xs tracking-[0.15em] rounded transition-all"
            >
              <LogOut size={14} className="inline mr-2" />
              LOGOUT
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
