import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDashboardLogic } from '../hooks/useDashboard';
// matrixColor tidak lagi dibutuhkan karena kita menggunakan CSS Variables globaL

import Sidebar from '../components/Sidebar';
import UserAvatar from '../components/common/UserAvatar';

export const DashboardLayout = () => {
  const [stardate, setStardate] = useState('');
  const { profile, profileLoading, profileError, broadcasts, broadcastsLoading } = useDashboardLogic();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const day = Math.floor(diff / oneDay).toString().padStart(3, '0');
      const time = now.toLocaleTimeString('en-GB', { hour12: false });
      setStardate(`${now.getFullYear()}.${day}.${time}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentExp = profile?.fuel_cells || 0;
  const currentLevel = Math.floor(currentExp / 100) + 1;
  const expProgress = currentExp % 100;

  const runningText = broadcasts?.length > 0
    ? broadcasts.map(b => b.message).join('  //  ')
    : 'NO INCOMING TRANSMISSIONS DETECTED IN THIS SECTOR...';


  if (profileLoading) return <div className="min-h-screen bg-primary p-8 flex justify-center items-center"><div className="text-accent animate-pulse font-primary tracking-widest">[ RETRIEVING CAPTAIN DATA... ]</div></div>;
  if (profileError) return <div className="p-6 m-8 border border-red-500/50 bg-red-900/20 text-red-400 font-primary text-[10px] tracking-widest text-center">[ERROR]: UNABLE TO RETRIEVE CAPTAIN DATA. COMMS OFFLINE.</div>;

  return (
    <div 
      // Background gradient diubah menggunakan semantic class Tailwind
      className="min-h-screen w-full p-4 md:p-8 flex flex-col overflow-hidden transition-all duration-500 bg-primary bg-gradient-to-br from-primary via-secondary/80 to-primary text-text"
    >
      {/* Background glow effect - Sekarang warna memancar otomatis ikut tema */}
      <div 
        className="fixed top-0 left-0 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none transition-colors duration-500 bg-accent"
      />
      
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col xl:flex-row items-stretch xl:items-end justify-between gap-6 w-full mb-8 relative z-20">
        
        {/* Header Name & Level - Border mengikuti aksen tema */}
        <div className="flex-1 min-w-[300px] border-b-2 border-accent pb-2 flex gap-4 items-center relative transition-colors duration-500">
          
          {/* Avatar Container */}
          <div 
            className="w-12 h-12 border-2 flex-shrink-0 flex items-center justify-center font-primary text-2xl font-bold bg-secondary overflow-hidden border-accent text-accent transition-colors duration-500"
            style={{ boxShadow: `0 0 15px rgb(var(--color-accent) / 0.4)` }}
          >
            {profile?.avatar_url ? <UserAvatar avatarId={profile.avatar_url} size={28} /> : (profile?.user_name || profile?.username)?.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-1.5 mt-1">
            <div className="flex justify-between items-end">
              <span className="font-primary text-sm md:text-base tracking-[0.15em] uppercase truncate max-w-[200px] text-accent transition-colors duration-500">
                {profile?.user_name || profile?.username || 'UNKNOWN CAPTAIN'}
              </span>
              <span className="font-primary text-yellow-400 text-[10px] md:text-xs tracking-widest">LVL {currentLevel}</span>
            </div>
            {/* Experience Bar */}
            <div className="w-full h-2.5 bg-tertiary border border-accent/50 relative overflow-hidden transition-colors duration-500">
              <div 
                className="absolute top-0 left-0 h-full transition-all duration-1000 ease-out bg-accent" 
                style={{ 
                  width: `${expProgress}%`,
                  boxShadow: `0 0 10px rgb(var(--color-accent))`
                }} 
              />
            </div>
          </div>
        </div>


        <div className="flex-[1.5] w-full min-w-[300px] relative h-10 bg-secondary flex items-center overflow-hidden border border-tertiary transition-colors duration-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
          <div className="absolute bottom-0 left-0 w-4 h-4 bg-accent transition-colors duration-500" style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }}></div>
          <div className="w-full overflow-hidden whitespace-nowrap pl-6 flex items-center">
            <motion.p animate={{ x: ["0%", "-100%"] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="font-primary text-accent text-[10px] md:text-xs tracking-[0.2em] uppercase inline-block pr-[100%]">
              {broadcastsLoading ? 'SYNCING COMMS...' : `${runningText}  //  ${runningText}`}
            </motion.p>
          </div>
        </div>

        <div className="flex-1 min-w-[250px] border-b-2 border-accent/80 pb-2 flex flex-col items-end justify-center relative transition-colors duration-500">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2 h-2 rounded-full animate-pulse bg-accent transition-colors duration-500" style={{ boxShadow: `0 0 8px rgb(var(--color-accent))` }}></div>
            <span className="font-primary text-[10px] tracking-widest text-accent transition-colors duration-500">SYNC ACTIVE</span>
          </div>
          <div className="font-primary text-xs md:text-sm tracking-[0.2em] text-accent/80 transition-colors duration-500">STARDATE: {stardate}</div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 relative z-10">
        
        <Sidebar />

        <main className="flex-1 min-w-0">
          <Outlet /> 
        </main>

      </div>
    </div>
  );
};