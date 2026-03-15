import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LogPanel = ({ activeDirective, completeDirective }) => {
  return (
    <div className="xl:col-span-5 flex flex-col gap-6">
      
      {/* STATS GRID */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-light/50 bg-primary p-4 text-center">
          <div className="font-secondary text-gray-500 text-[8px] tracking-[0.2em] mb-1">FLEET READINESS</div>
          <div className="font-primary text-cyan-400 text-sm md:text-base tracking-widest">92%</div>
        </div>
        <div className="border border-light/50 bg-primary p-4 text-center">
          <div className="font-secondary text-gray-500 text-[8px] tracking-[0.2em] mb-1">COMBAT PROFICIENCY</div>
          <div className="font-primary text-cyan-400 text-sm md:text-base tracking-widest">S-RANK</div>
        </div>
        <div className="border border-light/50 bg-primary p-4 text-center">
          <div className="font-secondary text-gray-500 text-[8px] tracking-[0.2em] mb-1">TACTICAL EXPERIENCE</div>
          <div className="font-primary text-green-400 text-sm md:text-base tracking-widest">MAX</div>
        </div>
        <div className="border border-light/50 bg-primary p-4 text-center">
          <div className="font-secondary text-gray-500 text-[8px] tracking-[0.2em] mb-1">ENERGY RADIUS</div>
          <div className="font-primary text-cyan-400 text-sm md:text-base tracking-widest">420.5 LY</div>
        </div>
        <div className="border border-light/50 bg-primary p-4 text-center">
          <div className="font-secondary text-gray-500 text-[8px] tracking-[0.2em] mb-1">QUANTUM SYNC</div>
          <div className="font-primary text-cyan-400 text-sm md:text-base tracking-widest">ACTIVE</div>
        </div>
        <div className="border border-light/50 bg-primary p-4 text-center">
          <div className="font-secondary text-gray-500 text-[8px] tracking-[0.2em] mb-1">FLEET MORALE</div>
          <div className="font-primary text-green-400 text-sm md:text-base tracking-widest">EUPHORIC</div>
        </div>
      </div>

      {/* OPERATIONAL LOG */}
      <div className="flex-1 border border-yellow-600/50 bg-primary flex flex-col relative overflow-hidden min-h-[300px]">
        <div className="bg-yellow-600/10 border-b border-yellow-600/30 p-3">
          <span className="font-primary text-yellow-500 text-[10px] tracking-widest">OPERATIONAL LOG</span>
        </div>

        <div className="flex-1 p-6 flex flex-col justify-center items-center text-center">
          <AnimatePresence mode="wait">
            {activeDirective ? (
              <motion.div key="active" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full h-full flex flex-col items-center justify-between">
                
                <div className="mt-4 md:mt-8 w-full">
                  <h2 className="font-primary text-yellow-500 text-base md:text-xl tracking-[0.1em] mb-4 uppercase leading-relaxed break-words">
                    [ TARGET LOCKED: <br/> <span className="text-yellow-400">{activeDirective.title}</span> ]
                  </h2>
                  <div className="flex gap-2 justify-center mb-6">
                    <span className={`px-2 py-1 font-primary text-[8px] tracking-widest border ${activeDirective.priority === 'CRITICAL' ? 'border-red-500 text-red-500' : activeDirective.priority === 'ELEVATED' ? 'border-yellow-500 text-yellow-500' : 'border-cyan-500 text-cyan-500'}`}>
                      {activeDirective.priority || 'ELEVATED'}
                    </span>
                    <span className="px-2 py-1 font-primary text-[8px] tracking-widest border border-light text-gray-400">
                      {activeDirective.category}
                    </span>
                  </div>
                  <p className="font-secondary text-gray-400 text-[10px] md:text-xs tracking-wider max-w-[90%] mx-auto leading-relaxed">
                    {activeDirective.mission_log || "No detailed operational logs attached to this specific directive."}
                  </p>
                </div>

                <div className="w-full mt-8 mb-4">
                  <button 
                    onClick={() => completeDirective.mutate(activeDirective.id)}
                    disabled={completeDirective.isPending}
                    className="w-[90%] mx-auto py-4 border border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500 hover:text-[#0a0a1a] text-yellow-500 font-primary text-[10px] md:text-xs tracking-[0.2em] transition-colors flex flex-col items-center gap-2 disabled:opacity-50"
                  >
                    {completeDirective.isPending ? 'TRANSMITTING...' : (activeDirective.category === 'WORK' || activeDirective.category === 'LEARNING' ? 'COMPLETE & TRANSMIT JOURNAL' : 'COMPLETE DIRECTIVE')}
                    <span className="font-secondary text-[8px] tracking-widest opacity-70">
                      (+{activeDirective.exp_reward || 50} XP & DATA CREDITS)
                    </span>
                  </button>
                </div>

              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-gray-600 font-secondary text-[10px] md:text-xs tracking-widest mt-10">
                <div className="w-16 h-16 border border-dashed border-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center relative">
                  <div className="w-2 h-2 bg-gray-700 rounded-full absolute"></div>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-full h-full border-t border-gray-500 rounded-full"></motion.div>
                </div>
                SELECT TARGET ON RADAR TO ANALYZE LOG
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="absolute bottom-0 right-0 border-t border-l border-yellow-600/50 w-4 h-4" />
      </div>

    </div>
  );
};