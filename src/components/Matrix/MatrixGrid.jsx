import React from 'react';
import { Calendar, Users, Trash2, Crosshair, Code, Target, FileText, Terminal } from 'lucide-react';

const getCategoryIcon = (category) => {
  const IconMap = { 'LEARNING': Code, 'WORK': Target, 'GENERAL': FileText, 'MISSION': Crosshair, 'SOCIAL': Users };
  const IconComponent = IconMap[category?.toUpperCase()] || Terminal;
  return <IconComponent size={14} className="opacity-80" />;
};

const renderTaskRow = (task, colorClass, bgClass) => (
  <div key={task.id} className="flex flex-col gap-2 group hover:scale-[1.01] transition-transform">
    <div className="flex items-center gap-3">
      <span className={colorClass}>{getCategoryIcon(task.category)}</span>
      <span className="font-secondary text-[9px] md:text-[10px] text-white uppercase tracking-wider truncate">
        {task.title}
      </span>
    </div>
    <div className={`w-full h-[3px] ${bgClass}/30 relative overflow-hidden`}>
      <div className={`absolute top-0 left-0 h-full ${bgClass} opacity-50`} style={{ width: `${Math.random() * 50 + 20}%` }}></div>
    </div>
  </div>
);

export default function MatrixGrid({ q1Tasks, q2Tasks, q3Tasks, q4Tasks, isLoading }) {
  return (
    <div className="flex-1 relative z-10 mb-6 w-full max-w-screen-2xl mx-auto flex flex-col">
      {/* Header Row (Urgent / Not Urgent) */}
      <div className="hidden md:flex flex-row w-full pl-[60px] gap-4 mb-4">
        <div className="flex-1 flex justify-center items-end pb-2">
          <div className="px-8 py-2 border border-red-500/40 bg-red-950/80 font-primary text-[10px] tracking-[0.5em] text-red-400 whitespace-nowrap shadow-[0_0_20px_rgba(239,68,68,0.15)] rounded-sm">URGENT</div>
        </div>
        <div className="flex-1 flex justify-center items-end pb-2">
          <div className="px-8 py-2 border border-purple-500/40 bg-purple-950/80 font-primary text-[10px] tracking-[0.5em] text-purple-400 whitespace-nowrap shadow-[0_0_20px_rgba(168,85,247,0.15)] rounded-sm">NOT URGENT</div>
        </div>
      </div>

      <div className="flex-1 flex flex-row gap-4">
        {/* Sidebar Column (Important / Not Important) */}
        <div className="hidden md:flex flex-col w-[44px] gap-4">
          <div className="flex-1 flex justify-center items-center relative pr-2">
            <div className="absolute -rotate-90 px-8 py-2 border border-red-500/40 bg-red-950/80 font-primary text-[10px] tracking-[0.5em] text-red-400 whitespace-nowrap shadow-[0_0_20px_rgba(239,68,68,0.15)] rounded-sm">IMPORTANT</div>
          </div>
          <div className="flex-1 flex justify-center items-center relative pr-2">
            <div className="absolute -rotate-90 px-8 py-2 border border-tertiary/50 bg-secondary/90 font-primary text-[10px] tracking-[0.5em] text-light/70 whitespace-nowrap shadow-[0_0_20px_rgba(6,255,165,0.1)] rounded-sm">NOT IMPORTANT</div>
          </div>
        </div>

        {/* 2x2 Quadrant Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
          
          {/* Q1 */}
          <div className="relative flex flex-col p-6 border border-tertiary/20 border-t-[3px] border-t-red-500 bg-red-950/10 overflow-y-auto">
            <div className="flex justify-between items-center mb-6 relative z-10 sticky top-0 bg-primary/80 backdrop-blur-sm pb-2">
              <span className="font-primary text-[11px] md:text-xs tracking-widest uppercase text-red-400">[ LAKUKAN SEKARANG ]</span>
              <span className="font-primary text-[14px] text-red-400 font-bold">!</span>
            </div>
            <div className="flex flex-col gap-5 relative z-10">
              {isLoading ? <span className="font-press text-[8px] text-red-500/50 animate-pulse">SCANNING...</span>
              : q1Tasks.length > 0 ? q1Tasks.map(task => renderTaskRow(task, 'text-red-400', 'bg-red-500'))
              : <span className="font-press text-[8px] text-red-500/30">NO CRITICAL THREATS.</span>}
            </div>
          </div>

          {/* Q2 */}
          <div className="relative flex flex-col p-6 border border-tertiary/20 border-t-[3px] border-t-purple-500 bg-purple-950/10 overflow-y-auto">
            <div className="flex justify-between items-center mb-6 relative z-10 sticky top-0 bg-primary/80 backdrop-blur-sm pb-2">
              <span className="font-primary text-[11px] md:text-xs tracking-widest uppercase text-purple-400">[ RENCANAKAN ]</span>
              <Calendar className="text-purple-400" size={16} />
            </div>
            <div className="flex flex-col gap-5 relative z-10">
              {isLoading ? <span className="font-press text-[8px] text-purple-500/50 animate-pulse">SCANNING...</span>
              : q2Tasks.length > 0 ? q2Tasks.map(task => renderTaskRow(task, 'text-purple-400', 'bg-purple-500'))
              : <span className="font-press text-[8px] text-purple-500/30">NO ELEVATED TASKS.</span>}
            </div>
          </div>

          {/* Q3 */}
          <div className="relative flex flex-col p-6 border border-tertiary/20 border-t-[3px] border-t-tertiary bg-secondary/20 overflow-y-auto">
            <div className="flex justify-between items-center mb-6 relative z-10 sticky top-0 bg-primary/80 backdrop-blur-sm pb-2">
              <span className="font-primary text-[11px] md:text-xs tracking-widest uppercase text-light/70">[ OPER / DELEGASIKAN ]</span>
              <Users className="text-light/70" size={16} />
            </div>
            <div className="flex flex-col gap-5 relative z-10">
               {isLoading ? <span className="font-press text-[8px] text-light/30 animate-pulse">SCANNING...</span>
              : q3Tasks.length > 0 ? q3Tasks.map(task => renderTaskRow(task, 'text-light/50', 'bg-tertiary'))
              : <span className="font-press text-[8px] text-light/20">NO STANDARD TASKS.</span>}
            </div>
          </div>

          {/* Q4 */}
          <div className="relative flex flex-col p-6 border border-tertiary/10 border-t-[3px] border-t-tertiary/20 bg-primary/30 opacity-70 overflow-y-auto">
            <div className="flex justify-between items-center mb-6 relative z-10 sticky top-0 bg-primary/80 backdrop-blur-sm pb-2">
              <span className="font-primary text-[11px] md:text-xs tracking-widest uppercase text-light/40">[ HAPUS / ABAIKAN ]</span>
              <Trash2 className="text-light/40" size={16} />
            </div>
            <div className="flex flex-col gap-5 relative z-10">
               {isLoading ? <span className="font-press text-[8px] text-light/20 animate-pulse">SCANNING...</span>
              : q4Tasks.length > 0 ? q4Tasks.map(task => renderTaskRow(task, 'text-light/30', 'bg-light'))
              : <span className="font-press text-[8px] text-light/20">NO LOW PRIORITY TASKS.</span>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}