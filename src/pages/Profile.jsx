import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Check, X, Zap, Shield, Cpu, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../services/supabase';
import { useQueryClient } from '@tanstack/react-query';

const THEME_COLORS = [
  { name: 'Magenta', hex: '#FF006E', rgb: 'rgb(255, 0, 110)' },
  { name: 'Purple', hex: '#8338EC', rgb: 'rgb(131, 56, 236)' },
  { name: 'Blue', hex: '#3A86FF', rgb: 'rgb(58, 134, 255)' },
  { name: 'Cyan', hex: '#06FFA5', rgb: 'rgb(6, 255, 165)' },
  { name: 'Orange', hex: '#FFB703', rgb: 'rgb(255, 183, 3)' },
  { name: 'Red', hex: '#FB5607', rgb: 'rgb(251, 86, 7)' },
];

export default function Profile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { profile, session, setProfile } = useAuthStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [displayName, setDisplayName] = useState(
    profile?.user_name || session?.user?.user_metadata?.user_name || 'UNKNOWN OPERATOR'
  );
  const [tempName, setTempName] = useState(displayName);
  const [selectedColor, setSelectedColor] = useState(THEME_COLORS[0]);
  const [isSaving, setIsSaving] = useState(false);

  // Sync displayName dengan profile dari authStore atau session metadata
  useEffect(() => {
    const name = profile?.user_name || session?.user?.user_metadata?.user_name;
    if (name) {
      setDisplayName(name);
      setTempName(name);
    }
  }, [profile?.user_name, session?.user?.user_metadata?.user_name]);

  const handleEditName = () => {
    setTempName(displayName);
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    if (!tempName.trim()) return;
    
    const newName = tempName.trim().toUpperCase();
    if (newName === displayName) {
      setIsEditingName(false);
      return;
    }

    setIsSaving(true);
    try {
      console.log('Saving name to Supabase Auth metadata...', { userId: session?.user?.id, newName });
      
      // Update user metadata di Supabase Auth
      const { error: updateError } = await supabase.auth.updateUser({
        data: { user_name: newName }
      });
      
      if (updateError) {
        console.error('Supabase auth error:', updateError);
        throw updateError;
      }
      
      console.log('Supabase auth update success');
      
      // Update di local state
      setDisplayName(newName);
      setProfile({ 
        ...profile, 
        user_name: newName,
        user_metadata: { user_name: newName }
      });
      setIsEditingName(false);
      
      // Invalidate query untuk refresh data di dashboard
      await queryClient.invalidateQueries({ queryKey: ['captainProfile', session?.user?.id] });
      console.log('Query invalidated and dashboard will refresh');
    } catch (err) {
      console.error('Error saving name:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setTempName(displayName);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const userEmail = session?.user?.email || 'UNKNOWN@COSMO.NET';
  const userId = session?.user?.id?.substring(0, 8).toUpperCase() || 'XXXX-XXXX';

  return (
    <div 
      className="min-h-screen w-full p-6 md:p-8 overflow-auto transition-all duration-500"
      style={{
        background: `linear-gradient(135deg, rgba(10, 10, 26, 1) 0%, rgba(26, 10, 46, 0.9) 50%, rgba(15, 15, 30, 1) 100%)`
      }}
    >
      {/* Background glow effect */}
      <div 
        className="fixed top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500"
        style={{
          backgroundColor: selectedColor.hex,
          filter: `blur(120px)`,
        }}
      />

      {/* Main Container */}
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Page Title */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-primary text-4xl md:text-5xl font-black tracking-[0.2em] uppercase mb-2" style={{ color: selectedColor.hex }}>
            PROFILE
          </h1>
          <p className="text-xs md:text-sm text-gray-400 tracking-widest">[ CAPTAIN STATUS OVERVIEW ]</p>
        </motion.div>

        {/* Header dengan Nama Dinamis */}
        <motion.div 
          className="relative w-full mb-8 border-b-2 pb-4 transition-all duration-500"
          style={{
            borderColor: selectedColor.hex,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              onClick={() => navigate('/dashboard/home')}
              className="flex items-center gap-2 px-4 py-2 border-2 border-[#06FFA5]/60 bg-[#06FFA5]/10 hover:bg-[#06FFA5]/20 text-[#06FFA5] transition-all duration-300 rounded-sm"
              whileHover={{ 
                borderColor: '#06FFA5',
                boxShadow: '0 0 15px rgba(6, 255, 165, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={16} />
              <span className="font-mono text-[10px] tracking-widest">BACK</span>
            </motion.button>
          </div>

          {/* Avatar Mini + Username Display */}
          <div className="flex items-center gap-4">
            {/* Mini Avatar */}
            <motion.div
              className="w-16 h-16 rounded-lg border-2 flex items-center justify-center flex-shrink-0"
              style={{
                borderColor: selectedColor.hex,
                background: `linear-gradient(135deg, ${selectedColor.hex}30 0%, ${selectedColor.hex}10 100%)`,
                boxShadow: `0 0 15px ${selectedColor.hex}40, inset 0 0 15px ${selectedColor.hex}20`,
              }}
              whileHover={{ 
                boxShadow: `0 0 25px ${selectedColor.hex}70, inset 0 0 15px ${selectedColor.hex}40`
              }}
            >
              <div className="text-3xl font-black" style={{ color: selectedColor.hex }}>
                {displayName.charAt(0).toUpperCase()}
              </div>
            </motion.div>

            {/* Username + Level */}
            <div className="flex-1 min-w-0">
              <motion.h1 
                className="font-primary text-2xl md:text-3xl tracking-[0.2em] uppercase truncate mb-1"
                style={{ 
                  color: selectedColor.hex,
                  textShadow: `0 0 10px ${selectedColor.hex}60`,
                }}
              >
                {displayName}
              </motion.h1>
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm tracking-widest text-gray-400">LVL</span>
                <span 
                  className="font-primary text-base md:text-lg font-bold"
                  style={{ color: selectedColor.hex }}
                >
                  1
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              className="border-2 p-6 relative overflow-hidden transition-all duration-500"
              style={{
                borderColor: `${selectedColor.hex}99`,
                background: `linear-gradient(135deg, ${selectedColor.hex}15 0%, transparent 100%)`,
              }}
              whileHover={{ 
                borderColor: selectedColor.hex,
                boxShadow: `0 0 30px ${selectedColor.hex}60`,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Glow effect */}
              <div 
                className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300" 
                style={{
                  background: `linear-gradient(135deg, ${selectedColor.hex}20 0%, transparent 100%)`,
                }}
              />

              {/* Avatar Section */}
              <div className="relative z-10 mb-6 flex justify-center">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-32 h-32 rounded-lg border-2 overflow-hidden relative flex items-center justify-center"
                    style={{
                      borderColor: selectedColor.hex,
                      background: `linear-gradient(135deg, ${selectedColor.hex}30 0%, ${selectedColor.hex}10 100%)`,
                      boxShadow: `0 0 25px ${selectedColor.hex}40, inset 0 0 25px ${selectedColor.hex}20`,
                    }}
                    whileHover={{ 
                      boxShadow: `0 0 40px ${selectedColor.hex}80, inset 0 0 25px ${selectedColor.hex}40, 0 0 60px ${selectedColor.hex}60`
                    }}
                  >
                    <div className="text-5xl font-black" style={{ color: selectedColor.hex }}>
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  </motion.div>

                  {/* Icon decoration */}
                  <motion.div 
                    className="absolute -bottom-2 -right-2 p-2 rounded-lg border-2"
                    style={{
                      borderColor: selectedColor.hex,
                      backgroundColor: selectedColor.hex + '20',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <Cpu size={16} style={{ color: selectedColor.hex }} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Name Edit Section */}
              <div className="relative z-10 mb-6 text-center">
                {!isEditingName ? (
                  <motion.div
                    className="group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h2 className="font-primary text-lg md:text-xl text-white tracking-wider mb-2 uppercase break-words">
                      {displayName}
                    </h2>
                    <motion.button
                      onClick={handleEditName}
                      className="flex items-center justify-center gap-2 w-full py-2 border-2 transition-all duration-300"
                      style={{
                        borderColor: selectedColor.hex,
                        backgroundColor: selectedColor.hex + '10',
                        color: selectedColor.hex,
                      }}
                      whileHover={{ 
                        backgroundColor: selectedColor.hex + '30',
                        boxShadow: `0 0 15px ${selectedColor.hex}60`
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit2 size={14} />
                      <span className="font-mono text-[10px] tracking-widest">EDIT NAME</span>
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value.toUpperCase())}
                      maxLength={20}
                      className="w-full px-3 py-2 border-2 bg-[#0a0a1a] font-mono text-sm focus:outline-none transition-all"
                      style={{
                        borderColor: selectedColor.hex,
                        color: selectedColor.hex,
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = `0 0 10px ${selectedColor.hex}60, inset 0 0 5px ${selectedColor.hex}30`;
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="ENTER NAME"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <motion.button
                        onClick={handleSaveName}
                        disabled={isSaving}
                        className="flex-1 flex items-center justify-center gap-2 py-2 border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          borderColor: '#06FFA5',
                          backgroundColor: isSaving ? '#06FFA530' : '#06FFA580',
                          color: '#06FFA5',
                        }}
                        whileHover={!isSaving ? { backgroundColor: '#06FFA5C0' } : {}}
                        whileTap={!isSaving ? { scale: 0.95 } : {}}
                      >
                        <Check size={14} />
                        <span className="font-mono text-[10px]">{isSaving ? 'SAVING...' : 'CONFIRM'}</span>
                      </motion.button>
                      <motion.button
                        onClick={handleCancelEdit}
                        className="flex-1 flex items-center justify-center gap-2 py-2 border-2 transition-all"
                        style={{
                          borderColor: '#FF006E',
                          backgroundColor: '#FF006E80',
                          color: '#FF006E',
                        }}
                        whileHover={{ backgroundColor: '#FF006EC0' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X size={14} />
                        <span className="font-mono text-[10px]">CANCEL</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* User Info */}
              <div className="relative z-10 space-y-3 text-[10px] md:text-xs border-t pt-4" style={{ borderColor: selectedColor.hex + '40' }}>
                <div>
                  <p className="font-mono tracking-wider mb-1" style={{ color: selectedColor.hex }}>EMAIL</p>
                  <p className="text-gray-400 font-mono break-all text-[9px]">{userEmail}</p>
                </div>
                <div>
                  <p className="font-mono tracking-wider mb-1" style={{ color: selectedColor.hex }}>OP_ID</p>
                  <p className="text-gray-400 font-mono text-[9px]">{userId}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats & Colors */}
          <div className="lg:col-span-2 space-y-6">
            {/* Color Palette */}
            <motion.div
              className="border-2 p-6 transition-all duration-500"
              style={{
                borderColor: `${selectedColor.hex}99`,
                background: `linear-gradient(135deg, ${selectedColor.hex}15 0%, transparent 100%)`,
              }}
              whileHover={{ borderColor: selectedColor.hex }}
            >
              <div className="mb-4">
                <p className="font-primary text-[10px] tracking-[0.3em] mb-3" style={{ color: selectedColor.hex }}>
                  [ COLOR MATRIX ]
                </p>
              </div>

              <div className="grid grid-cols-6 gap-3">
                {THEME_COLORS.map((color, idx) => (
                  <motion.div
                    key={idx}
                    className="relative aspect-square border-2 cursor-pointer transition-all duration-300 rounded-sm overflow-hidden group"
                    style={{
                      backgroundColor: color.hex,
                      borderColor: selectedColor.name === color.name ? color.hex : 'rgba(255,255,255,0.2)',
                      boxShadow: selectedColor.name === color.name 
                        ? `0 0 20px ${color.hex}80, inset 0 0 10px ${color.hex}40`
                        : `0 0 10px ${color.hex}40`,
                    }}
                    onClick={() => handleColorChange(color)}
                    whileHover={{
                      scale: 1.15,
                      boxShadow: `0 0 30px ${color.hex}80, inset 0 0 10px ${color.hex}60`,
                    }}
                  >
                    {selectedColor.name === color.name && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}
                      >
                        <Check size={20} color="white" strokeWidth={3} />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Panel */}
            <motion.div
              className="border-2 p-6 transition-all duration-500"
              style={{
                borderColor: `${selectedColor.hex}99`,
                background: `linear-gradient(135deg, ${selectedColor.hex}15 0%, transparent 100%)`,
              }}
              whileHover={{ borderColor: selectedColor.hex }}
            >
              <div className="mb-4">
                <p className="font-primary text-[10px] tracking-[0.3em] mb-3" style={{ color: selectedColor.hex }}>
                  [ OPERATOR STATUS ]
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div 
                  className="border-2 p-3 transition-all duration-300"
                  style={{
                    borderColor: selectedColor.hex + '60',
                    background: selectedColor.hex + '10',
                  }}
                  whileHover={{ 
                    borderColor: selectedColor.hex,
                    boxShadow: `0 0 15px ${selectedColor.hex}40`,
                    transform: 'translateY(-4px)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={12} style={{ color: selectedColor.hex }} />
                    <p className="font-mono text-[10px] tracking-wider" style={{ color: selectedColor.hex }}>LEVEL</p>
                  </div>
                  <p className="text-white font-black text-lg">Ω</p>
                </motion.div>

                <motion.div 
                  className="border-2 p-3 transition-all duration-300"
                  style={{
                    borderColor: selectedColor.hex + '60',
                    background: selectedColor.hex + '10',
                  }}
                  whileHover={{ 
                    borderColor: selectedColor.hex,
                    boxShadow: `0 0 15px ${selectedColor.hex}40`,
                    transform: 'translateY(-4px)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={12} style={{ color: selectedColor.hex }} />
                    <p className="font-mono text-[10px] tracking-wider" style={{ color: selectedColor.hex }}>STATUS</p>
                  </div>
                  <p className="text-white font-black text-sm">ACTIVE</p>
                </motion.div>

                <motion.div 
                  className="border-2 p-3 transition-all duration-300"
                  style={{
                    borderColor: selectedColor.hex + '60',
                    background: selectedColor.hex + '10',
                  }}
                  whileHover={{ 
                    borderColor: selectedColor.hex,
                    boxShadow: `0 0 15px ${selectedColor.hex}40`,
                    transform: 'translateY(-4px)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu size={12} style={{ color: selectedColor.hex }} />
                    <p className="font-mono text-[10px] tracking-wider" style={{ color: selectedColor.hex }}>SYNC</p>
                  </div>
                  <p className="text-white font-black text-sm">100%</p>
                </motion.div>

                <motion.div 
                  className="border-2 p-3 transition-all duration-300"
                  style={{
                    borderColor: selectedColor.hex + '60',
                    background: selectedColor.hex + '10',
                  }}
                  whileHover={{ 
                    borderColor: selectedColor.hex,
                    boxShadow: `0 0 15px ${selectedColor.hex}40`,
                    transform: 'translateY(-4px)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Heart size={12} style={{ color: selectedColor.hex }} />
                    <p className="font-mono text-[10px] tracking-wider" style={{ color: selectedColor.hex }}>CORE</p>
                  </div>
                  <p className="text-white font-black text-sm">OK</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Access Log */}
            <motion.div
              className="border-2 p-6 transition-all duration-500"
              style={{
                borderColor: `${selectedColor.hex}99`,
                background: `linear-gradient(135deg, ${selectedColor.hex}15 0%, transparent 100%)`,
              }}
              whileHover={{ borderColor: selectedColor.hex }}
            >
              <div className="mb-4">
                <p className="font-primary text-[10px] tracking-[0.3em] mb-3" style={{ color: selectedColor.hex }}>
                  [ ACCESS LOG ]
                </p>
              </div>

              <div className="space-y-2 text-[9px] font-mono text-gray-400">
                <p><span style={{ color: selectedColor.hex }}>{'>'}</span> PROFILE ACCESSED :: {new Date().toLocaleString()}</p>
                <p><span style={{ color: selectedColor.hex }}>{'>'}</span> SESSION INITIATED :: {new Date(Date.now() - 3600000).toLocaleString()}</p>
                <p><span style={{ color: selectedColor.hex }}>{'>'}</span> LAST UPDATE :: {new Date(Date.now() - 86400000).toLocaleString()}</p>
                <p><span style={{ color: selectedColor.hex }}>{'>'}</span> STATUS: <span style={{ color: '#06FFA5' }}>ALL SYSTEMS OPERATIONAL</span></p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
