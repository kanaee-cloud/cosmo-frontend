import React, { useState } from 'react';
import { Share, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LogPanel = ({ directives, activeDirective, setActiveDirective }) => {
  const [filter, setFilter] = useState('ALL');

  const filteredDirectives = directives?.filter(directive => {
    if (filter === 'ALL') return true;
    if (filter === 'PENDING') return directive.status !== 'DONE' && directive.status !== 'IN_PROGRESS';
    if (filter === 'IN_PROGRESS') return directive.status === 'IN_PROGRESS';
    if (filter === 'COMPLETED') return directive.status === 'DONE';
    return true;
  }) || [];

  return (
    <div className="xl:col-span-5 flex flex-col gap-6">
      
      {/* STATS GRID */}
      <div className="grid grid-cols-2 gap-4">
        {/* ... existing stats ... */}
        <div className="border border-[#3d2278]/50 bg-[#0a0a1a] p-4 text-center">
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

      {/* OPERATIONAL LOG LIST */}
      <div className="border border-yellow-600/50 bg-[#0a0a1a] flex flex-col relative overflow-hidden h-[450px]">
        <div className="bg-yellow-600/10 border-b border-yellow-600/30 p-3 flex justify-between items-center flex-wrap gap-2">
          <span className="font-primary text-yellow-500 text-[10px] tracking-widest">OPERATIONAL LOG</span>
          
          <div className="flex gap-1">
            {['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`font-primary text-[8px] tracking-widest px-2 py-1 transition-colors border ${
                  filter === status 
                    ? 'bg-yellow-500 text-[#0a0a1a] border-yellow-500' 
                    : 'text-yellow-500/50 border-transparent hover:text-yellow-500 hover:border-yellow-500/30'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {!filteredDirectives || filteredDirectives.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-full text-gray-600 font-secondary text-[10px] tracking-widest">
                     <div className="w-8 h-8 border border-dashed border-gray-700 rounded-full mb-2 animate-spin-slow"></div>
                     {filter === 'ALL' ? 'NO ACTIVE DIRECTIVES LOGGED.' : 'NO TRANSMISSIONS FOUND.'}
                 </div>
            ) : (
                <ul className="flex flex-col gap-2">
                    <AnimatePresence>
                    {filteredDirectives.map((directive) => (
                        <motion.li 
                            key={directive.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ x: 5, backgroundColor: 'rgba(234, 179, 8, 0.05)' }}
                            onClick={() => setActiveDirective(directive)}
                            className="w-full flex items-center justify-between p-3 border border-[#3d2278]/30 hover:border-yellow-500/50 cursor-pointer transition-all group"
                        >
                            <div className="flex flex-col gap-1 items-start">
                                <span className={`font-primary text-[10px] tracking-widest ${directive.priority === 'CRITICAL' ? 'text-red-400' : directive.priority === 'ELEVATED' ? 'text-yellow-400' : 'text-cyan-400'}`}>
                                    {directive.title}
                                </span>
                                <div className="flex gap-2 text-[8px] font-secondary text-gray-500">
                                    <span className="uppercase">{directive.category}</span>
                                    <span>•</span>
                                    <span>{new Date(directive.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {directive.status === 'DONE' ? (
                                    <span className="flex items-center gap-1 font-primary text-[9px] text-green-500 border border-green-900 bg-green-900/10 px-2 py-1">
                                        <CheckCircle size={10} /> COMPLETED
                                    </span>
                                ) : directive.status === 'IN_PROGRESS' ? (
                                    <span className="flex items-center gap-1 font-primary text-[9px] text-orange-400 border border-orange-900 bg-orange-900/10 px-2 py-1">
                                        <Clock size={10} /> ENGAGED
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 font-primary text-[9px] text-gray-400 border border-gray-800 px-2 py-1 group-hover:text-yellow-500 group-hover:border-yellow-900">
                                        PENDING
                                    </span>
                                )}
                            </div>
                        </motion.li>
                    ))}
                    </AnimatePresence>
                </ul>
            )}
        </div>
        
        <div className="absolute bottom-0 right-0 border-t border-l border-yellow-600/50 w-4 h-4" />
      </div>

    </div>
  );
};