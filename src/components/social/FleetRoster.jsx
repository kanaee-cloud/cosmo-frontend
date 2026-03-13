// src/components/social/FleetRoster.jsx
import React from 'react';
import { Users, Swords, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSocial } from '../../hooks/useSocial';

export const FleetRoster = () => {
  const { useFriendsList } = useSocial();
  const { data: friends, isLoading, isError } = useFriendsList();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, delay: 0.3 }}
      className="p-6 border border-[#3d2278]/90 bg-secondary/95 shadow-[0_0_30px_rgba(61,34,120,0.3)] min-h-[400px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-6 border-b border-[#3d2278]/50 pb-4">
        <div>
          <h3 className="font-primary text-light tracking-[0.25em] text-sm flex items-center gap-2">
            <Users size={16} className="text-accent" /> [ FLEET ROSTER ]
          </h3>
          <span className="text-[9px] font-secondary text-gray-500 tracking-widest mt-1 block">
            {friends?.length || 0} ALLIES ONLINE
          </span>
        </div>
      </div>

      {isLoading && (
        <div className="flex-1 flex justify-center items-center">
          <span className="font-primary text-[10px] text-accent animate-pulse tracking-widest">SYNCING ALLIANCE DATA...</span>
        </div>
      )}

      {isError && (
        <div className="p-4 border border-red-500/50 bg-red-900/20 text-red-400 font-primary text-[10px] tracking-widest text-center">
          [ERROR]: ALLIANCE NETWORK UNREACHABLE.
        </div>
      )}

      {!isLoading && !isError && friends?.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-[#3d2278]/50 p-8 text-center bg-[#0a0a1a]/30">
          <Shield size={32} className="text-gray-600 mb-3" />
          <p className="font-secondary text-[10px] text-gray-500 tracking-widest">YOUR FLEET IS EMPTY.</p>
          <p className="font-primary text-[8px] text-accent tracking-widest mt-2">OPEN COMMS RELAY TO RECRUIT CAPTAINS.</p>
        </div>
      )}

      <div className="space-y-3 overflow-y-auto custom-scrollbar pr-1">
        {friends?.map((friend, index) => (
          <motion.div 
            key={friend.friendship_id}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
            className="group flex items-center justify-between p-3 border border-[#3d2278]/40 bg-[#0a0a1a]/50 hover:border-cyan-500/50 transition-colors duration-300"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-dark border border-cyan-800 overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                {friend.avatar_url ? (
                  <img src={friend.avatar_url} alt={friend.username} className="w-full h-full object-cover" />
                ) : (
                  <Users size={18} className="text-cyan-600" />
                )}
                {/* Online Indicator Dot */}
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-dark rounded-full"></div>
              </div>
              
              <div className="min-w-0">
                <p className="font-primary text-[12px] text-light tracking-widest truncate">{friend.username}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Zap size={10} className="text-cyan-400" />
                  <span className="font-secondary text-[9px] text-cyan-400">{friend.fuel_cells} EXP</span>
                </div>
              </div>
            </div>

            {/* Tombol Challenge untuk Fitur Duel Nanti */}
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-3 py-2 border border-orange-500/50 bg-orange-500/10 hover:bg-orange-500/30 text-orange-400 font-primary text-[9px] tracking-[0.2em] transition-colors duration-300 flex items-center gap-1 flex-shrink-0"
              title="Initiate Orbital Clash"
            >
              <Swords size={12} />
              <span className="hidden xl:inline">CLASH</span>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};