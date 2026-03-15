// src/pages/RaidDeck.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skull, ArrowLeft, Radar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWorkspaces } from '../hooks/useWorkspaces';
import { WorkspaceArena } from '../components/missions/WorkspaceArena';
import { CreateRaidModal } from '../components/missions/CreateRaidModal';

const RaidDeck = () => {
  const navigate = useNavigate();
  const [isRaidModalOpen, setIsRaidModalOpen] = useState(false);
  
  const { useMyWorkspaces } = useWorkspaces();
  const { data: myWorkspaces, isLoading: workspacesLoading } = useMyWorkspaces();

  return (
    <div className="min-h-screen bg-primary p-4 md:p-8 relative overflow-hidden">
      {/* Background efek Red Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,85,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,85,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* HEADER NAVIGASI */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-red-900/50 pb-6">
        <div>
          <h1 className="font-primary text-red-500 text-2xl tracking-[0.3em] uppercase flex items-center gap-3">
            <Skull size={24} /> FLEET RAID DECK
          </h1>
          <p className="font-secondary text-gray-400 text-xs tracking-widest mt-1">
            CO-OP MONSTER ELIMINATION ZONE
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setIsRaidModalOpen(true)}
          className="px-6 py-3 bg-red-900/20 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-primary text-[10px] tracking-[0.25em] flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(255,0,85,0.2)]"
        >
          <Radar size={16} />
          <span>SCAN NEW TARGET (SUMMON)</span>
        </motion.button>
      </div>

      {/* RENDER SEMUA ARENA BATTLE */}
      <div className="relative z-10">
        {workspacesLoading ? (
          <div className="text-center py-20 text-red-500 animate-pulse font-primary text-xs tracking-[0.2em]">
            SCANNING SECTORS FOR LEVIATHAN SIGNATURES...
          </div>
        ) : myWorkspaces?.length === 0 ? (
          <div className="border border-dashed border-red-900/30 p-12 text-center bg-primary/50">
            <Skull size={32} className="text-red-900 mx-auto mb-4" />
            <p className="font-secondary text-xs text-gray-500 tracking-widest">NO ACTIVE BATTLEFIELDS.</p>
            <p className="font-primary text-[10px] text-red-500/50 mt-2 tracking-widest">INITIATE A SCAN TO SUMMON A BOSS.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {myWorkspaces?.map(ws => (
              <WorkspaceArena 
                key={ws.id} 
                workspaceId={ws.id} 
                workspaceName={ws.name} 
                monsterName={ws.monster_name} 
              />
            ))}
          </div>
        )}
      </div>

      <CreateRaidModal isOpen={isRaidModalOpen} onClose={() => setIsRaidModalOpen(false)} />
    </div>
  );
};

export default RaidDeck;