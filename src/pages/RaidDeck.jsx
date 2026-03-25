import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skull, ArrowLeft, Radar, Target, AlertTriangle, Hexagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkspaces } from '../hooks/useWorkspaces';
import { WorkspaceArena } from '../components/missions/WorkspaceArena';
import { CreateRaidModal } from '../components/missions/CreateRaidModal';

const RaidDeck = () => {
  const navigate = useNavigate();
  const [isRaidModalOpen, setIsRaidModalOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  
  const { useMyWorkspaces } = useWorkspaces();
  const { data: myWorkspaces, isLoading: workspacesLoading } = useMyWorkspaces();

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden bg-[#05050A]">
      
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Grid Radar */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      {/* Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-red-900/10 blur-[150px] pointer-events-none rounded-full" />
      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAADCAYAAABS3WWCAAAADUlEQVQIW2NkYGD4zwABXQEBQ5n67wAAAABJRU5ErkJggg==')] opacity-10 pointer-events-none"></div>

      {/* --- HEADER COMMAND BRIDGE --- */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-red-500/20 pb-6">
        <div className="flex items-center gap-5">
          <motion.button
            onClick={() => navigate('/dashboard/home')}
            className="group relative flex items-center justify-center w-12 h-12 border border-red-500/30 bg-red-950/40 hover:bg-red-900/60 text-red-500 transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-red-500/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            <ArrowLeft size={20} className="relative z-10" />
          </motion.button>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={14} className="text-red-500 animate-pulse" />
              <span className="font-secondary text-red-500/70 text-[10px] tracking-[0.3em] uppercase">Tactical Layer Active</span>
            </div>
            <h1 className="font-primary text-white text-2xl md:text-3xl tracking-[0.2em] uppercase flex items-center gap-3 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              FLEET RAID DECK
            </h1>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => setIsRaidModalOpen(true)}
          className="relative px-6 py-3 bg-red-950/50 border border-red-500/50 text-red-400 hover:text-white font-primary text-[10px] tracking-[0.25em] flex items-center gap-3 overflow-hidden group"
        >
          {/* Button Hover Effect */}
          <div className="absolute inset-0 bg-red-500 w-0 group-hover:w-full transition-all duration-500 ease-out opacity-20" />
          <Radar size={16} className="group-hover:animate-spin" />
          <span className="relative z-10">SUMMON NEW THREAT</span>
        </motion.button>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          
          {selectedWorkspace ? (
            // ARENA MODE
            <motion.div 
              key="arena"
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, type: 'spring' }}
            >
              <WorkspaceArena 
                workspaceId={selectedWorkspace.id} 
                workspaceName={selectedWorkspace.name} 
                monsterName={selectedWorkspace.monster_name} 
                onBack={() => setSelectedWorkspace(null)}
              />
            </motion.div>
          ) : (
            // GRID MODE
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="w-full"
            >
              {workspacesLoading ? (
                <div className="flex flex-col items-center justify-center py-32 text-red-500">
                  <Radar size={48} className="animate-spin mb-6 opacity-50" />
                  <div className="font-primary text-xs tracking-[0.3em] animate-pulse">SCANNING SECTORS...</div>
                </div>
              ) : myWorkspaces?.length === 0 ? (
                <div className="border border-red-500/20 bg-red-950/10 backdrop-blur-sm p-16 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-50" />
                  <Hexagon size={48} className="text-red-900/50 mx-auto mb-6" />
                  <p className="font-primary text-sm text-red-400 tracking-[0.2em] mb-2">NO ACTIVE BATTLEFIELDS</p>
                  <p className="font-secondary text-[10px] text-gray-500 tracking-widest uppercase">The galaxy is quiet... for now. Initiate a scan to summon a boss.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myWorkspaces?.map((ws, i) => (
                    <motion.div
                      key={ws.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedWorkspace(ws)}
                      className="group relative cursor-pointer border border-red-900/40 bg-[#0a0505]/80 backdrop-blur-md transition-all duration-300 hover:border-red-500/80 hover:bg-red-950/40 hover:shadow-[0_0_30px_rgb(220,38,38,0.15)]"
                    >
                      {/* Decorative Target Corners */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500/30 group-hover:border-red-400 transition-colors" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-500/30 group-hover:border-red-400 transition-colors" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-500/30 group-hover:border-red-400 transition-colors" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500/30 group-hover:border-red-400 transition-colors" />

                      {/* Content */}
                      <div className="p-6 relative z-10">
                        <div className="flex items-start justify-between mb-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-500/5 border border-red-500/20 flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/20 transition-colors" />
                              <Skull className="text-red-500 relative z-10" size={24} />
                            </div>
                            <div>
                              <p className="font-secondary text-[8px] text-red-500/60 tracking-widest uppercase mb-1 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE THREAT
                              </p>
                              <h3 className="font-primary text-white text-sm tracking-[0.2em]">{ws.name}</h3>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-black/40 border border-white/5 p-3 flex justify-between items-center">
                          <div>
                            <p className="font-primary text-[8px] text-gray-500 tracking-[0.2em] mb-1">SIGNATURE ID:</p>
                            <p className="font-secondary text-xs text-red-400 uppercase tracking-widest flex items-center gap-2">
                              <Target size={12} /> {ws.monster_name || 'UNKNOWN ANOMALY'}
                            </p>
                          </div>
                          <div className="font-primary text-[9px] tracking-widest text-red-500/50 group-hover:text-red-400 transition-colors flex items-center gap-1">
                            ENGAGE <ArrowLeft size={10} className="rotate-180" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CreateRaidModal isOpen={isRaidModalOpen} onClose={() => setIsRaidModalOpen(false)} />
    </div>
  );
};

export default RaidDeck;