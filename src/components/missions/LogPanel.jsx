import React, { useState } from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfileSettings } from '../../hooks/useProfileSettings';

export const LogPanel = ({ directives, activeDirective, setActiveDirective }) => {
  const [filter, setFilter] = useState('ALL');
  
  // 1. Tarik Data Nyata Kapten
  const { level, currentExp } = useProfileSettings();

  // 2. Filter Direktif
  const filteredDirectives = directives?.filter(directive => {
    if (filter === 'ALL') return true;
    if (filter === 'PENDING') return directive.status !== 'DONE' && directive.status !== 'IN_PROGRESS' && directive.status !== 'COMPLETED';
    if (filter === 'IN_PROGRESS') return directive.status === 'IN_PROGRESS';
    if (filter === 'COMPLETED') return directive.status === 'DONE' || directive.status === 'COMPLETED';
    return true;
  }) || [];

  // 3. Kalkulasi Metrik Dinamis
  const totalDirectives = directives?.length || 0;
  const completedDirectives = directives?.filter(d => d.status === 'DONE' || d.status === 'COMPLETED').length || 0;
  
  // Readiness = Persentase misi yang diselesaikan (Max 100%)
  const readiness = totalDirectives === 0 ? 100 : Math.round((completedDirectives / totalDirectives) * 100);
  
  // Proficiency = Tergantung Level Kapten
  const proficiency = level >= 20 ? 'S-RANK' : level >= 10 ? 'A-RANK' : level >= 5 ? 'B-RANK' : 'C-RANK';
  
  // Radius = Meluas berdasarkan Level
  const energyRadius = level ? (level * 42.5).toFixed(1) : '0.0';

  // Morale = Tergantung Readiness (Persentase penyelesaian misi)
  const morale = readiness >= 80 ? 'EUPHORIC' : readiness >= 50 ? 'STEADY' : 'CRITICAL';
  const moraleColor = readiness >= 80 ? 'text-green-400' : readiness >= 50 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="xl:col-span-5 flex flex-col gap-6">
      
      {/* STATS GRID (DINAMIS) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-tertiary bg-secondary p-4 text-center transition-colors duration-500">
          <div className="font-secondary text-light/70 text-[8px] tracking-[0.2em] mb-1">FLEET READINESS</div>
          <div className="font-primary text-accent text-sm md:text-base tracking-widest">{readiness}%</div>
        </div>
        <div className="border border-tertiary bg-secondary p-4 text-center transition-colors duration-500">
          <div className="font-secondary text-light/70 text-[8px] tracking-[0.2em] mb-1">COMBAT PROFICIENCY</div>
          <div className="font-primary text-accent text-sm md:text-base tracking-widest">{proficiency}</div>
        </div>
        <div className="border border-tertiary bg-secondary p-4 text-center transition-colors duration-500">
          <div className="font-secondary text-light/70 text-[8px] tracking-[0.2em] mb-1">TACTICAL EXPERIENCE</div>
          <div className="font-primary text-green-400 text-sm md:text-base tracking-widest">{currentExp} FC</div>
        </div>
        <div className="border border-tertiary bg-secondary p-4 text-center transition-colors duration-500">
          <div className="font-secondary text-light/70 text-[8px] tracking-[0.2em] mb-1">ENERGY RADIUS</div>
          <div className="font-primary text-accent text-sm md:text-base tracking-widest">{energyRadius} LY</div>
        </div>
        <div className="border border-tertiary bg-secondary p-4 text-center transition-colors duration-500">
          <div className="font-secondary text-light/70 text-[8px] tracking-[0.2em] mb-1">QUANTUM SYNC</div>
          <div className="font-primary text-accent text-sm md:text-base tracking-widest">STABLE</div>
        </div>
        <div className="border border-tertiary bg-secondary p-4 text-center transition-colors duration-500">
          <div className="font-secondary text-light/70 text-[8px] tracking-[0.2em] mb-1">FLEET MORALE</div>
          <div className={`font-primary text-sm md:text-base tracking-widest ${moraleColor}`}>{morale}</div>
        </div>
      </div>

      {/* OPERATIONAL LOG LIST */}
      <div className="border border-accent/50 bg-secondary flex flex-col relative overflow-hidden h-[450px] transition-colors duration-500 shadow-[0_0_15px_rgb(var(--color-accent)_/_0.1)]">
        
        {/* Header List */}
        <div className="bg-accent/10 border-b border-accent/30 p-3 flex justify-between items-center flex-wrap gap-2 transition-colors duration-500">
          <span className="font-primary text-accent text-[10px] tracking-widest">OPERATIONAL LOG</span>
          
          <div className="flex gap-1">
            {['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`font-primary text-[8px] tracking-widest px-2 py-1 transition-colors border ${
                  filter === status 
                    ? 'bg-accent text-primary border-accent shadow-[0_0_8px_rgb(var(--color-accent)_/_0.5)]' 
                    : 'text-accent/50 border-transparent hover:text-accent hover:border-accent/30'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {!filteredDirectives || filteredDirectives.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-full text-light/50 font-secondary text-[10px] tracking-widest">
                     <div className="w-8 h-8 border border-dashed border-tertiary rounded-full mb-2 animate-spin-slow"></div>
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
                            whileHover={{ x: 5 }}
                            onClick={() => setActiveDirective(directive)}
                            className="w-full flex items-center justify-between p-3 border border-tertiary hover:border-accent/50 hover:bg-accent/5 cursor-pointer transition-all group"
                        >
                            <div className="flex flex-col gap-1 items-start">
                                {/* Title warna warni sesuai priority */}
                                <span className={`font-primary text-[10px] tracking-widest ${directive.priority === 'CRITICAL' ? 'text-red-400' : directive.priority === 'ELEVATED' ? 'text-yellow-400' : 'text-accent'}`}>
                                    {directive.title}
                                </span>
                                <div className="flex gap-2 text-[8px] font-secondary text-light/50">
                                    <span className="uppercase">{directive.category}</span>
                                    <span>•</span>
                                    <span>{new Date(directive.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {directive.status === 'DONE' || directive.status === 'COMPLETED' ? (
                                    <span className="flex items-center gap-1 font-primary text-[9px] text-green-500 border border-green-900 bg-green-900/10 px-2 py-1">
                                        <CheckCircle size={10} /> COMPLETED
                                    </span>
                                ) : directive.status === 'IN_PROGRESS' ? (
                                    <span className="flex items-center gap-1 font-primary text-[9px] text-orange-400 border border-orange-900 bg-orange-900/10 px-2 py-1">
                                        <Clock size={10} /> ENGAGED
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 font-primary text-[9px] text-light/50 border border-tertiary px-2 py-1 group-hover:text-accent group-hover:border-accent transition-colors">
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
        
        {/* Dekorasi Pojok Bawah */}
        <div className="absolute bottom-0 right-0 border-t border-l border-accent/50 w-4 h-4" />
      </div>

    </div>
  );
};