// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Bell, BatteryCharging, Zap, Shield, User, LogOut, CheckCircle, CircleDashed, Image as ImageIcon, PlusSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboardLogic } from '../hooks/useDashboard';
import { CommandConsoleModal } from '../components/missions/CommandConsoleModal';
import { DirectiveDetailModal } from '../components/missions/DirectiveDetailModal';
import { CommsRelayModal } from '../components/social/CommsRelayModal';
import { FleetRoster } from '../components/social/FleetRoster';


const Dashboard = () => {
  const [isCommsOpen, setIsCommsOpen] = useState(false);
  const {
    profile, profileLoading, profileError,
    directives, directivesLoading,
    handleEmergencyExit,
    isConsoleOpen, openConsole, closeConsole,
    selectedDirective, isDetailOpen, openDetail, closeDetail
  } = useDashboardLogic();



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
    <div className="min-h-screen bg-[#0a0a1a] p-4 md:p-8 space-y-8">
      <div className="flex justify-end items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handleEmergencyExit}
          className="flex items-center gap-2 px-4 py-3 border border-red-900/50 bg-red-900/20 hover:bg-red-900/40 hover:border-red-500 text-red-400 transition-colors duration-300"
        >
          <LogOut size={16} />
          <span className="font-primary text-[10px] tracking-widest">EMERGENCY EXIT</span>
        </motion.button>
        <button
          onClick={() => setIsCommsOpen(true)}
          className="relative flex items-center justify-center p-3 border border-[#3d2278]/80 bg-[#0a0a1a]/50 hover:border-accent hover:bg-[#3d2278]/20 text-accent transition-all duration-300"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="flex-1 w-full p-6 border border-[#3d2278]/90 bg-secondary/95 shadow-[0_0_30px_rgba(61,34,120,0.3)]">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-accent bg-dark flex items-center justify-center overflow-hidden">
                {profile?.avatar_url ? <img src={profile.avatar_url} className="w-full h-full object-cover" /> : <User className="text-accent" size={32} />}
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-[#1a1a2e] rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1">
              <h2 className="font-primary text-light tracking-[0.2em] text-lg uppercase mb-1">{profile?.username || 'UNKNOWN CAPTAIN'}</h2>
              <p className="font-secondary text-gray-400 text-[10px] tracking-wider mb-3">RANK: ORBITAL EXPLORER</p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-[#0a0a1a]/50 px-3 py-1.5 border border-[#3d2278]/50">
                  <BatteryCharging size={14} className="text-cyan-400" />
                  <span className="font-primary text-[10px] text-cyan-400 tracking-widest">{profile?.fuel_cells || 0} XP</span>
                </div>
                <div className="flex items-center gap-2 bg-[#0a0a1a]/50 px-3 py-1.5 border border-[#3d2278]/50">
                  <Zap size={14} className="text-accent" />
                  <span className="font-primary text-[10px] text-accent tracking-widest">STREAK: {profile?.warp_streak || 0}</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end gap-1 opacity-50">
              <Shield size={24} className="text-[#3d2278]" />
              <span className="font-secondary text-[8px] text-[#3d2278] tracking-widest">ID: {profile?.id?.slice(0, 8)}</span>
            </div>
          </div>
        </div>

      </motion.div>



      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="p-6 border border-[#3d2278]/90 bg-secondary/95 shadow-[0_0_30px_rgba(61,34,120,0.3)] min-h-[300px]">
        <h3 className="font-primary text-light tracking-[0.25em] text-sm mb-6 flex justify-between items-center">
          <div>
            <h3 className="font-primary text-light tracking-[0.25em] text-sm flex items-center gap-2">
              <span>[ ACTIVE DIRECTIVES ]</span>
            </h3>
            <span className="text-[9px] font-secondary text-gray-500 tracking-widest mt-1 block">
              {directives?.length || 0} MISSIONS PENDING
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={openConsole}
            className="px-5 py-2.5 bg-accent/20 border border-accent hover:bg-accent hover:text-white text-accent font-primary text-[10px] tracking-[0.25em] flex items-center gap-2 transition-colors duration-300"
          >
            <PlusSquare size={16} />
            <span>NEW DIRECTIVE</span>
          </motion.button>
        </h3>

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
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01, backgroundColor: "rgba(61,34,120,0.1)" }}
              onClick={() => openDetail(task)}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-[#3d2278]/40 bg-[#0a0a1a]/50 hover:border-accent transition-colors duration-300"
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
      <div className="lg:col-span-1">
        <FleetRoster />
      </div>

      <CommandConsoleModal
        isOpen={isConsoleOpen}
        onClose={closeConsole}
      />

      <DirectiveDetailModal
        isOpen={isDetailOpen}
        onClose={closeDetail}
        directive={selectedDirective}
      />

      <CommsRelayModal isOpen={isCommsOpen} onClose={() => setIsCommsOpen(false)} />

    </div>
  );
};

export default Dashboard;