import React, { useState, useEffect } from 'react';
import { Bell, LogOut, CheckCircle, CircleDashed, Image as ImageIcon, PlusSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboardLogic } from '../hooks/useDashboard';
import { CommandConsoleModal } from '../components/missions/CommandConsoleModal';
import { DirectiveDetailModal } from '../components/missions/DirectiveDetailModal';
import { CommsRelayModal } from '../components/social/CommsRelayModal';
import { FleetRoster } from '../components/social/FleetRoster';

const Dashboard = () => {
  const [isCommsOpen, setIsCommsOpen] = useState(false);
  const [stardate, setStardate] = useState('');

  const {
    profile, profileLoading, profileError,
    directives, directivesLoading,
    broadcasts, broadcastsLoading,
    handleEmergencyExit,
    isConsoleOpen, openConsole, closeConsole,
    selectedDirective, isDetailOpen, openDetail, closeDetail
  } = useDashboardLogic();


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
  const currentLevel = Math.floor(currentExp / 100) + 1; // Tiap 100 exp naik level
  const expProgress = currentExp % 100; // Sisa progress menuju level berikutnya

  const runningText = broadcasts?.length > 0
    ? broadcasts.map(b => b.message).join('  //  ')
    : 'NO INCOMING TRANSMISSIONS DETECTED IN THIS SECTOR...';

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] p-8 flex justify-center items-center">
        <div className="text-accent animate-pulse font-primary tracking-widest">[ RETRIEVING CAPTAIN DATA... ]</div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="p-6 m-8 border border-red-500/50 bg-red-900/20 text-red-400 font-primary text-[10px] tracking-widest text-center">
        [ERROR]: UNABLE TO RETRIEVE CAPTAIN DATA. COMMS OFFLINE.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] p-4 md:p-8 space-y-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="flex flex-col xl:flex-row items-stretch xl:items-end justify-between gap-6 w-full mb-10"
      >
        <div className="flex-1 min-w-[300px] border-b-2 border-cyan-400 pb-2 flex gap-4 items-center relative">
          <div className="w-12 h-12 border-accent border-2  flex-shrink-0 flex items-center justify-center font-primary text-[#0a0a1a] text-2xl font-bold shadow-[0_0_15px_rgba(138,109,252,0.4)]">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              profile.username.charAt(0).toUpperCase()
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center gap-1.5 mt-1">
            <div className="flex justify-between items-end">
              <span className="font-primary text-cyan-400 text-sm md:text-base tracking-[0.15em] uppercase truncate max-w-[200px]">
                {profile?.username || 'UNKNOWN CAPTAIN'}
              </span>
              <span className="font-primary text-yellow-400 text-[10px] md:text-xs tracking-widest">
                LVL {currentLevel}
              </span>
            </div>

            <div className="w-full h-2.5 bg-[#0a0a1a] border border-cyan-900/50 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-1000 ease-out"
                style={{ width: `${expProgress}%` }}
              ></div>
            </div>
          </div>
        </div>



        <div className="flex-[1.5] w-full min-w-[300px] relative h-10 bg-[#1a0b2e] flex items-center overflow-hidden border border-[#8a6dfc]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>

          <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#ff0055]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }}></div>

          <div className="w-full overflow-hidden whitespace-nowrap pl-6 flex items-center">
            <motion.p
              animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
              className="font-primary text-[#ff0055] text-[10px] md:text-xs tracking-[0.2em] uppercase inline-block pr-[100%]"
            >
              {broadcastsLoading ? 'SYNCING COMMS...' : `${runningText}  //  ${runningText}`}
            </motion.p>
          </div>
        </div>

        <div className="flex-1 min-w-[250px] border-b-2 border-[#1d4ed8] pb-2 flex flex-col items-end justify-center relative">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
            <span className="font-primary text-cyan-400 text-[10px] tracking-widest">SYNC ACTIVE</span>
          </div>
          <div className="font-primary text-[#3b82f6] text-xs md:text-sm tracking-[0.2em]">
            STARDATE: {stardate}
          </div>
        </div>

      </motion.div>
      <div className="flex justify-end items-center gap-4 mb-2">
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handleEmergencyExit}
          className="flex items-center gap-2 px-4 py-2 border border-red-900/50 bg-red-900/20 hover:bg-red-900/40 hover:border-red-500 text-red-400 transition-colors duration-300"
        >
          <LogOut size={14} />
          <span className="font-primary text-[10px] tracking-widest">EMERGENCY EXIT</span>
        </motion.button>
        <button
          onClick={() => setIsCommsOpen(true)}
          className="relative flex items-center justify-center p-2 border border-[#3d2278]/80 bg-[#0a0a1a]/50 hover:border-accent hover:bg-[#3d2278]/20 text-accent transition-all duration-300"
        >
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]"></span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* KOLOM KIRI (ACTIVE DIRECTIVES) */}
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="p-6 border border-[#3d2278]/90 bg-secondary/95 shadow-[0_0_30px_rgba(61,34,120,0.3)] min-h-[400px]">
            <div className="flex justify-between items-center mb-6 border-b border-[#3d2278]/50 pb-4">
              <div>
                <h3 className="font-primary text-light tracking-[0.25em] text-sm flex items-center gap-2">
                  <span>[ ACTIVE DIRECTIVES ]</span>
                </h3>
                <span className="text-[9px] font-secondary text-gray-500 tracking-widest mt-1 block">
                  {directives?.length || 0} MISSIONS PENDING
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}
                onClick={openConsole}
                className="px-5 py-2.5 bg-accent/20 border border-accent hover:bg-accent hover:text-white text-accent font-primary text-[10px] tracking-[0.25em] flex items-center gap-2 transition-colors duration-300"
              >
                <PlusSquare size={16} />
                <span>NEW DIRECTIVE</span>
              </motion.button>
            </div>

            {directivesLoading && (
              <div className="flex justify-center py-10">
                <span className="font-primary text-[10px] text-accent animate-pulse tracking-widest">SCANNING DATABANKS...</span>
              </div>
            )}

            {!directivesLoading && directives?.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-dashed border-[#3d2278]/50 p-8 text-center bg-[#0a0a1a]/30">
                <p className="font-secondary text-[10px] text-gray-500 tracking-widest">NO DIRECTIVES FOUND. YOU ARE CLEARED FOR LEISURE, CAPTAIN.</p>
              </motion.div>
            )}

            <div className="space-y-3">
              {directives?.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01, backgroundColor: "rgba(61,34,120,0.1)" }}
                  onClick={() => openDetail(task)}
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-[#3d2278]/40 bg-[#0a0a1a]/50 hover:border-accent transition-colors duration-300 cursor-pointer"
                >
                  <div className="flex items-start md:items-center gap-4">
                    <button className="text-gray-500 hover:text-accent transition-colors mt-1 md:mt-0">
                      {task.status === 'IN_PROGRESS' ? <CheckCircle className="text-orange-400" size={20} /> : <CircleDashed size={20} />}
                    </button>

                    <div>
                      <h4 className={`font-secondary tracking-wider text-sm ${task.status === 'IN_PROGRESS' ? 'text-orange-400' : 'text-light'}`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="font-primary text-[8px] text-accent tracking-widest bg-accent/10 px-2 py-0.5 border border-accent/20">
                          {task.category}
                        </span>
                        {task.evidence_link && (
                          <span className="font-primary text-[8px] text-cyan-400 tracking-widest flex items-center gap-1">
                            <ImageIcon size={10} /> EVIDENCE ATTACHED
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Engage clicked for:", task.id);
                    }}
                    className="opacity-100 md:opacity-0 group-hover:opacity-100 px-4 py-2 border border-orange-500/50 bg-orange-500/10 hover:bg-orange-500/30 text-orange-400 font-primary text-[9px] tracking-[0.2em] transition-colors duration-300 whitespace-nowrap flex-shrink-0"
                  >
                    ENGAGE
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <FleetRoster />
        </div>

      </div>

      <CommandConsoleModal isOpen={isConsoleOpen} onClose={closeConsole} />
      <DirectiveDetailModal isOpen={isDetailOpen} onClose={closeDetail} directive={selectedDirective} />
      <CommsRelayModal isOpen={isCommsOpen} onClose={() => setIsCommsOpen(false)} />

    </div>
  );
};

export default Dashboard;