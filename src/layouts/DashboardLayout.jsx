import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Skull } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboardLogic } from '../hooks/useDashboard';

export const DashboardLayout = () => {
  const location = useLocation();
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


  if (profileLoading) return <div className="min-h-screen bg-[#0a0a1a] p-8 flex justify-center items-center"><div className="text-accent animate-pulse font-primary tracking-widest">[ RETRIEVING CAPTAIN DATA... ]</div></div>;
  if (profileError) return <div className="p-6 m-8 border border-red-500/50 bg-red-900/20 text-red-400 font-primary text-[10px] tracking-widest text-center">[ERROR]: UNABLE TO RETRIEVE CAPTAIN DATA. COMMS OFFLINE.</div>;

  return (
    <div className="min-h-screen bg-[#0a0a1a] p-4 md:p-8 flex flex-col overflow-hidden">
      

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col xl:flex-row items-stretch xl:items-end justify-between gap-6 w-full mb-8 relative z-20">
        

        <div className="flex-1 min-w-[300px] border-b-2 border-cyan-400 pb-2 flex gap-4 items-center relative">
          <div className="w-12 h-12 border-accent border-2 flex-shrink-0 flex items-center justify-center font-primary text-[#0a0a1a] text-2xl font-bold bg-[#8a6dfc] shadow-[0_0_15px_rgba(138,109,252,0.4)] overflow-hidden">
            {profile?.avatar_url ? <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" /> : profile?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 flex flex-col justify-center gap-1.5 mt-1">
            <div className="flex justify-between items-end">
              <span className="font-primary text-cyan-400 text-sm md:text-base tracking-[0.15em] uppercase truncate max-w-[200px]">{profile?.username || 'UNKNOWN CAPTAIN'}</span>
              <span className="font-primary text-yellow-400 text-[10px] md:text-xs tracking-widest">LVL {currentLevel}</span>
            </div>
            <div className="w-full h-2.5 bg-[#0a0a1a] border border-cyan-900/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-1000 ease-out" style={{ width: `${expProgress}%` }}></div>
            </div>
          </div>
        </div>


        <div className="flex-[1.5] w-full min-w-[300px] relative h-10 bg-[#1a0b2e] flex items-center overflow-hidden border border-[#8a6dfc]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
          <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#ff0055]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }}></div>
          <div className="w-full overflow-hidden whitespace-nowrap pl-6 flex items-center">
            <motion.p animate={{ x: ["0%", "-100%"] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="font-primary text-[#ff0055] text-[10px] md:text-xs tracking-[0.2em] uppercase inline-block pr-[100%]">
              {broadcastsLoading ? 'SYNCING COMMS...' : `${runningText}  //  ${runningText}`}
            </motion.p>
          </div>
        </div>

        <div className="flex-1 min-w-[250px] border-b-2 border-[#1d4ed8] pb-2 flex flex-col items-end justify-center relative">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
            <span className="font-primary text-cyan-400 text-[10px] tracking-widest">SYNC ACTIVE</span>
          </div>
          <div className="font-primary text-[#3b82f6] text-xs md:text-sm tracking-[0.2em]">STARDATE: {stardate}</div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 relative z-10">
        
        <aside className="w-full lg:w-56 flex-shrink-0 flex flex-col gap-3">
          <Link to="/dashboard/home">
            <div className={`flex items-center gap-3 p-4 border transition-all duration-300 ${location.pathname === '/dashboard/home' || location.pathname === '/dashboard' ? 'border-cyan-400 bg-cyan-900/20 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'border-[#3d2278]/50 bg-[#0a0a1a]/50 text-gray-500 hover:border-cyan-400/50 hover:text-cyan-400/80'}`}>
              <LayoutDashboard size={18} />
              <span className="font-primary text-[10px] tracking-widest mt-0.5">COMMAND DECK</span>
            </div>
          </Link>
          
          <Link to="/dashboard/raid-deck">
            <div className={`flex items-center gap-3 p-4 border transition-all duration-300 ${location.pathname === '/dashboard/raid-deck' ? 'border-red-500 bg-red-900/20 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-[#3d2278]/50 bg-[#0a0a1a]/50 text-gray-500 hover:border-red-500/50 hover:text-red-500/80'}`}>
              <Skull size={18} />
              <span className="font-primary text-[10px] tracking-widest mt-0.5">RAID ARENA</span>
            </div>
          </Link>
        </aside>


        <main className="flex-1 min-w-0">
          <Outlet /> 
        </main>

      </div>
    </div>
  );
};