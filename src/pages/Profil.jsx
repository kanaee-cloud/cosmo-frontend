import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, X, Camera } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useToastStore } from '../hooks/useToast';

const AVATAR_OPTIONS = [
  { id: 1, emoji: '👨‍🚀' },
  { id: 2, emoji: '👩‍🚀' },
  { id: 3, emoji: '🧑‍💻' },
  { id: 4, emoji: '👨‍⚕️' },
  { id: 5, emoji: '👩‍⚕️' },
  { id: 6, emoji: '🕵️' },
  { id: 7, emoji: '👨‍🔬' },
  { id: 8, emoji: '👩‍🔬' },
  { id: 9, emoji: '🧑‍🎨' },
  { id: 10, emoji: '👨‍🍳' },
  { id: 11, emoji: '👩‍🎓' },
  { id: 12, emoji: '🧑‍💼' },
];

const COLORS = [
  '#FF0055', // Neon Magenta
  '#8a6dfc', // Bright Lavender
  '#06FFA5', // Cyan
  '#3A86FF', // Blue
  '#FFB703', // Orange
  '#FB5607', // Red
  '#8338EC', // Purple
  '#FF006E', // Pink
];

const ITEMS = [
  { id: 1, icon: '🛡️', name: 'Shield' },
  { id: 2, icon: '⚡', name: 'Lightning' },
  { id: 3, icon: '💎', name: 'Diamond' },
  { id: 4, icon: '🔥', name: 'Fire' },
  { id: 5, icon: '❄️', name: 'Ice' },
  { id: 6, icon: '⚔️', name: 'Sword' },
];

export default function ProfileStandalone() {
  const { profile, session } = useAuthStore();
  const matrixColor = useThemeStore((state) => state.matrixColor);
  const setMatrixColor = useThemeStore((state) => state.setMatrixColor);
  const { success } = useToastStore();

  const [displayName, setDisplayName] = useState('UNKNOWN OPERATOR');
  const [tempName, setTempName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('👨‍🚀');
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [selectedItems, setSelectedItems] = useState([1, 3, 5]);

  // Load data from localStorage
  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) setSelectedAvatar(savedAvatar);
  }, []);

  // Sync name from profile
  useEffect(() => {
    const name = profile?.user_name || profile?.username || session?.user?.email?.split('@')[0]?.toUpperCase() || 'UNKNOWN OPERATOR';
    setDisplayName(name);
    setTempName(name);
  }, [profile, session]);

  const handleAvatarChange = (emoji) => {
    setSelectedAvatar(emoji);
    localStorage.setItem('userAvatar', emoji);
    setShowAvatarSelector(false);
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
      const { error } = await useAuthStore.getState().supabase.auth.updateUser({
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

  const toggleItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="min-h-screen w-full p-8 overflow-auto bg-gradient-to-br from-[#0a0a1a] via-[#1a0b2e] to-[#0d0514]">
      {/* Background glow */}
      <div
        className="fixed top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: matrixColor.hex }}
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
            className="font-primary text-4xl tracking-[0.3em] text-white relative inline-block"
            style={{ textShadow: `0 0 20px ${matrixColor.hex}80` }}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Main Profile Card */}
          <motion.div
            className="lg:col-span-2 border-2 rounded-lg p-8 backdrop-blur-md bg-gradient-to-br from-black/40 to-black/20"
            style={{ borderColor: matrixColor.hex }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowAvatarSelector(true)}
                  className="relative w-40 h-40 flex items-center justify-center cursor-pointer rounded-lg border-2 bg-black/40 text-6xl transition-all"
                  style={{ borderColor: matrixColor.hex }}
                >
                  {selectedAvatar}
                  <motion.div
                    className="absolute bottom-2 right-2 p-2 rounded-full bg-black/80 border"
                    style={{ borderColor: matrixColor.hex }}
                  >
                    <Camera size={16} style={{ color: matrixColor.hex }} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Info Section */}
              <div className="flex flex-col justify-between">
                {isEditingName ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="w-full bg-black/30 border border-[#3d2278]/80 text-white font-primary text-sm tracking-wider px-3 py-2 outline-none"
                      style={{ borderColor: matrixColor.hex }}
                    />
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={handleSaveName}
                        className="flex-1 px-3 py-2 bg-bright-magenta text-white font-primary text-xs tracking-widest rounded hover:bg-bright-magenta/80"
                      >
                        SAVE
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => {
                          setIsEditingName(false);
                          setTempName(displayName);
                        }}
                        className="flex-1 px-3 py-2 bg-black/50 border border-[#3d2278]/50 text-gray-400 font-primary text-xs tracking-widest rounded"
                      >
                        CANCEL
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h2
                        className="font-primary text-2xl tracking-[0.15em] text-white line-clamp-2 mb-2"
                        style={{ textShadow: `0 0 10px ${matrixColor.hex}60` }}
                      >
                        {displayName}
                      </h2>
                      <p className="font-secondary text-xs tracking-wider text-gray-500">
                        RANK ASCENDING
                      </p>
                    </div>

                    <div
                      className="border-b-2 mb-4"
                      style={{ borderColor: matrixColor.hex }}
                    />

                    {/* Stats */}
                    <div className="space-y-2">
                      {[
                        { label: 'Rating', value: '34.25%' },
                        { label: 'K/D', value: '3.65' },
                        { label: 'Playtime', value: '1234 h' },
                        { label: 'Victories', value: '4658+' },
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          className="flex justify-between text-xs"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                        >
                          <span className="text-gray-500 font-secondary">{stat.label}</span>
                          <span className="font-primary font-bold" style={{ color: matrixColor.hex }}>
                            {stat.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsEditingName(true)}
                  className="w-full px-4 py-3 border-2 rounded text-white font-primary text-xs tracking-widest transition-all hover:bg-white/10"
                  style={{ borderColor: matrixColor.hex, color: matrixColor.hex }}
                >
                  <Edit3 size={14} className="inline mr-2" />
                  EDIT PROFIL
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right - Customization Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Color Selector */}
            <div
              className="border-2 rounded-lg p-6 backdrop-blur-md bg-black/20"
              style={{ borderColor: matrixColor.hex }}
            >
              <h3
                className="font-primary text-sm tracking-[0.2em] text-white mb-4 uppercase"
                style={{ color: matrixColor.hex }}
              >
                [Color Matrix]
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {COLORS.map((color, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setMatrixColor({ hex: color, rgb: `rgb(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)})` })}
                    className="w-full aspect-square rounded-lg border-2 transition-all"
                    style={{
                      backgroundColor: color,
                      borderColor: matrixColor.hex === color ? 'white' : color + '50',
                      boxShadow: matrixColor.hex === color ? `0 0 15px ${color}` : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Items/Equipment */}
            <div
              className="border-2 rounded-lg p-6 backdrop-blur-md bg-black/20"
              style={{ borderColor: matrixColor.hex }}
            >
              <h3
                className="font-primary text-sm tracking-[0.2em] text-white mb-4 uppercase"
                style={{ color: matrixColor.hex }}
              >
                [Equipment]
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {ITEMS.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleItem(item.id)}
                    className={`aspect-square flex items-center justify-center rounded-lg border-2 text-2xl transition-all ${
                      selectedItems.includes(item.id)
                        ? 'bg-black/50'
                        : 'bg-black/20 opacity-50'
                    }`}
                    style={{
                      borderColor: selectedItems.includes(item.id)
                        ? matrixColor.hex
                        : '#3d2278',
                      boxShadow: selectedItems.includes(item.id)
                        ? `0 0 10px ${matrixColor.hex}60`
                        : 'none',
                    }}
                  >
                    {item.icon}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-4 py-4 bg-bright-magenta text-white font-primary text-sm tracking-[0.2em] rounded-lg hover:bg-bright-magenta/80 transition-all uppercase"
            >
              START ADVENTURE
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Avatar Selector Modal */}
      <AnimatePresence>
        {showAvatarSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAvatarSelector(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-96 p-6 rounded-lg border-2 bg-gradient-to-br from-[#1a0b2e] to-[#0d0514]"
              style={{ borderColor: matrixColor.hex }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-primary text-lg tracking-[0.2em] text-white uppercase">
                  [SELECT AVATAR]
                </h3>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setShowAvatarSelector(false)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <X size={20} style={{ color: matrixColor.hex }} />
                </motion.button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {AVATAR_OPTIONS.map((avatar) => (
                  <motion.button
                    key={avatar.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAvatarChange(avatar.emoji)}
                    className={`aspect-square flex items-center justify-center text-4xl rounded-lg border-2 transition-all ${
                      selectedAvatar === avatar.emoji
                        ? 'border-bright-magenta bg-bright-magenta/20'
                        : 'border-[#3d2278]/50 bg-black/30 hover:border-bright-magenta/60'
                    }`}
                    style={{
                      borderColor:
                        selectedAvatar === avatar.emoji
                          ? '#ff0055'
                          : matrixColor.hex + '80',
                    }}
                  >
                    {avatar.emoji}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
