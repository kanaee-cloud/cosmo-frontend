import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, X, Camera } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useToastStore } from '../hooks/useToast';
import { supabase } from '../services/supabase';

const AVATAR_OPTIONS = [
  { id: 1, emoji: '👨‍🚀' },
  { id: 2, emoji: '👩‍🚀' },
  { id: 3, emoji: '🧑‍💻' },
  { id: 4, emoji: '👨‍⚕️' },
  { id: 5, emoji: '👩‍⚕️' },
  { id: 6, emoji: '🕵️' },
  { id: 7, emoji: '👨‍🔬' },
  { id: 8, emoji: '👩‍🔬' },
];

const OUTFIT_COLORS = [
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

export default function Profil() {
  const navigate = useNavigate();
  const { profile, session } = useAuthStore();
  const matrixColor = useThemeStore((state) => state.matrixColor);
  const { success } = useToastStore();

  const [displayName, setDisplayName] = useState('UNKNOWN OPERATOR');
  const [tempName, setTempName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('👨‍🚀');
  const [selectedOutfitColor, setSelectedOutfitColor] = useState('#FF0055');
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [selectedItems, setSelectedItems] = useState([1, 3, 5]);
  const nameInputRef = useRef(null);

  // Load data from localStorage
  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    const savedColor = localStorage.getItem('outfitColor');
    if (savedAvatar) setSelectedAvatar(savedAvatar);
    if (savedColor) setSelectedOutfitColor(savedColor);
  }, []);

  // Sync name from profile
  useEffect(() => {
    const name = profile?.user_name || profile?.username || session?.user?.email?.split('@')[0]?.toUpperCase() || 'UNKNOWN OPERATOR';
    setDisplayName(name);
    setTempName(name);
  }, [profile, session]);

  const handleAvatarChange = async (emoji) => {
    setSelectedAvatar(emoji);
    localStorage.setItem('userAvatar', emoji);
    setShowAvatarSelector(false);

    // Simpan ke Supabase
    const userId = session?.user?.id;
    if (userId) {
      await supabase.auth.updateUser({ data: { avatar_url: emoji } });
      await supabase.from('users').update({ avatar_url: emoji }).eq('id', userId);
    }

    success('AVATAR UPDATED', 'Avatar profil berhasil diubah');
  };

  const handleOutfitColorChange = async (color) => {
    setSelectedOutfitColor(color);
    localStorage.setItem('outfitColor', color);

    // Simpan ke Supabase Auth metadata (tidak butuh kolom DB tambahan)
    await supabase.auth.updateUser({ data: { outfit_color: color } });

    success('OUTFIT UPDATED', 'Warna outfit berhasil diubah');
  };

  const handleSaveName = async () => {
    if (!tempName.trim()) return;
    const newName = tempName.trim().toUpperCase();

    if (newName === displayName) {
      setIsEditingName(false);
      return;
    }

    try {
      const userId = session?.user?.id;

      // Update di Supabase Auth metadata
      const { error } = await supabase.auth.updateUser({
        data: { user_name: newName },
      });
      if (error) throw error;

      // Update di tabel users
      if (userId) {
        await supabase.from('users').update({ username: newName }).eq('id', userId);
      }

      setDisplayName(newName);
      setTempName(newName);
      setIsEditingName(false);
      localStorage.setItem('userName', newName);
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

  // Focus input saat editing
  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingName]);

  // Load saved name from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setDisplayName(savedName);
      setTempName(savedName);
    }
  }, []);

  return (
    <div className="min-h-screen w-full p-4 md:p-6 lg:p-8 overflow-auto bg-gradient-to-br from-[#0a0a1a] via-[#1a0b2e] to-[#0d0514]">
      {/* Background glow */}
      <div
        className="fixed top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: matrixColor.hex }}
      />

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Page Title */}
        <div className="mb-6 md:mb-8">
          <motion.h1
            className="font-primary text-2xl md:text-3xl lg:text-4xl tracking-[0.3em] text-white relative inline-block"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Left - Main Profile Card */}
          <motion.div
            className="lg:col-span-2 border-2 rounded-lg p-4 md:p-6 lg:p-8 backdrop-blur-md bg-gradient-to-br from-black/40 to-black/20"
            style={{ borderColor: matrixColor.hex }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowAvatarSelector(true)}
                  className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center justify-center cursor-pointer rounded-lg border-2 bg-black/40 transition-all"
                  style={{
                    borderColor: selectedOutfitColor,
                    boxShadow: `0 0 15px ${selectedOutfitColor}60`,
                    fontSize: 'clamp(3rem, 10vw, 6rem)',
                  }}
                >
                  {selectedAvatar}
                  <motion.div
                    className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 p-1 sm:p-1.5 md:p-2 rounded-full bg-black/80 border"
                    style={{ borderColor: selectedOutfitColor }}
                  >
                    <Camera size={12} className="sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: selectedOutfitColor }} />
                  </motion.div>
                </motion.div>

                {/* Outfit Color Selector */}
                <div className="w-full">
                  <p className="text-[10px] md:text-xs text-gray-500 font-secondary tracking-wider mb-2 uppercase">
                    [Pilih Warna Outfit]
                  </p>
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                    {OUTFIT_COLORS.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleOutfitColorChange(color)}
                        className="w-full aspect-square rounded-lg border-2 transition-all"
                        style={{
                          backgroundColor: color,
                          borderColor:
                            selectedOutfitColor === color ? 'white' : color + '50',
                          boxShadow:
                            selectedOutfitColor === color
                              ? `0 0 15px ${color}`
                              : 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="flex flex-col justify-between">
                {isEditingName ? (
                  <div className="space-y-3">
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveName();
                        if (e.key === 'Escape') {
                          setIsEditingName(false);
                          setTempName(displayName);
                        }
                      }}
                      className="w-full bg-black/30 border text-white font-primary text-xs sm:text-sm tracking-wider px-2 sm:px-3 py-2 outline-none rounded"
                      style={{ borderColor: selectedOutfitColor }}
                    />
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSaveName}
                        className="flex-1 px-3 py-2 text-white font-primary text-xs tracking-widest rounded hover:opacity-80 transition-all"
                        style={{ backgroundColor: selectedOutfitColor }}
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
                        className="flex-1 px-3 py-2 bg-black/50 border border-[#3d2278]/50 text-gray-400 font-primary text-xs tracking-widest rounded hover:border-gray-400/50 transition-all"
                      >
                        CANCEL
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <h2
                        className="font-primary text-lg md:text-xl lg:text-2xl tracking-[0.15em] text-white line-clamp-2"
                        style={{ textShadow: `0 0 10px ${selectedOutfitColor}60` }}
                      >
                        {displayName}
                      </h2>
                      <p className="font-secondary text-[10px] md:text-xs tracking-wider text-gray-500">
                        RANK ASCENDING
                      </p>
                    </div>

                    <div
                      className="border-b-2"
                      style={{ borderColor: selectedOutfitColor }}
                    />

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 md:gap-3 text-[11px] md:text-xs">
                      {[
                        { label: 'Rating', value: '34.25%' },
                        { label: 'K/D', value: '3.65' },
                        { label: 'Playtime', value: '1234h' },
                        { label: 'Victories', value: '4658+' },
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          className="space-y-0.5"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                        >
                          <span className="text-gray-500 font-secondary text-[10px]">
                            {stat.label}
                          </span>
                          <div
                            className="font-primary font-bold text-xs md:text-sm"
                            style={{ color: selectedOutfitColor }}
                          >
                            {stat.value}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditingName(true)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border-2 rounded text-white font-primary text-xs tracking-widest transition-all hover:bg-white/10 mt-3 md:mt-4"
                  style={{
                    borderColor: selectedOutfitColor,
                    color: selectedOutfitColor,
                  }}
                >
                  <Edit3 size={12} className="inline mr-1 md:mr-2" />
                  EDIT PROFIL
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right - Equipment Panel */}
          <motion.div
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Equipment Selector */}
            <div
              className="border-2 rounded-lg p-4 md:p-6 backdrop-blur-md bg-black/20"
              style={{ borderColor: selectedOutfitColor }}
            >
              <h3
                className="font-primary text-xs md:text-sm tracking-[0.2em] text-white mb-3 md:mb-4 uppercase"
                style={{ color: selectedOutfitColor }}
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
                    className={`aspect-square flex items-center justify-center rounded-lg border-2 text-lg md:text-2xl transition-all`}
                    style={{
                      backgroundColor: selectedItems.includes(item.id)
                        ? 'rgba(0, 0, 0, 0.5)'
                        : 'rgba(0, 0, 0, 0.2)',
                      borderColor: selectedItems.includes(item.id)
                        ? selectedOutfitColor
                        : '#3d2278',
                      boxShadow: selectedItems.includes(item.id)
                        ? `0 0 10px ${selectedOutfitColor}60`
                        : 'none',
                      opacity: selectedItems.includes(item.id) ? 1 : 0.6,
                    }}
                  >
                    {item.icon}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Account Info */}
            <div
              className="border-2 rounded-lg p-4 md:p-6 backdrop-blur-md bg-black/20"
              style={{ borderColor: selectedOutfitColor }}
            >
              <h3
                className="font-primary text-xs md:text-sm tracking-[0.2em] text-white mb-3 md:mb-4 uppercase"
                style={{ color: selectedOutfitColor }}
              >
                [Account]
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <span className="text-gray-500 font-secondary">Email:</span>
                  <span className="text-white font-primary tracking-wider truncate">
                    {session?.user?.email || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-secondary">Status:</span>
                  <span className="font-primary" style={{ color: selectedOutfitColor }}>
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="w-full px-3 md:px-4 py-2 md:py-3 text-white font-primary text-xs md:text-sm tracking-[0.2em] rounded-lg hover:opacity-80 transition-all uppercase"
              style={{ backgroundColor: selectedOutfitColor }}
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm p-4 md:p-6 rounded-lg border-2 bg-gradient-to-br from-[#1a0b2e] to-[#0d0514]"
              style={{ borderColor: selectedOutfitColor }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-primary text-sm md:text-lg tracking-[0.2em] text-white uppercase">
                  [SELECT AVATAR]
                </h3>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setShowAvatarSelector(false)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <X size={20} style={{ color: selectedOutfitColor }} />
                </motion.button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {AVATAR_OPTIONS.map((avatar) => (
                  <motion.button
                    key={avatar.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAvatarChange(avatar.emoji)}
                    className="aspect-square flex items-center justify-center text-3xl md:text-4xl rounded-lg border-2 transition-all"
                    style={{
                      borderColor:
                        selectedAvatar === avatar.emoji
                          ? selectedOutfitColor
                          : '#3d2278',
                      backgroundColor:
                        selectedAvatar === avatar.emoji
                          ? selectedOutfitColor + '33'
                          : 'rgba(0,0,0,0.3)',
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
