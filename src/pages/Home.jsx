import React, { useState } from 'react';
import { Bell, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboardLogic } from '../hooks/useDashboard';
import { useMissionOperations } from '../hooks/useMissionOperations';
import { CommandConsoleModal } from '../components/missions/CommandConsoleModal';
import { CommsRelayModal } from '../components/social/CommsRelayModal';
import { RadarPanel } from '../components/missions/RadarPanel';
import { LogPanel } from '../components/missions/LogPanel';

const Home = () => {
  const [isCommsOpen, setIsCommsOpen] = useState(false);
  const [activeDirective, setActiveDirective] = useState(null);

  const { 
    directives, directivesLoading, 
    isConsoleOpen, openConsole, closeConsole, 
    handleEmergencyExit 
  } = useDashboardLogic();

  const { completeDirective } = useMissionOperations(setActiveDirective);

  return (
    <div className="w-full h-full flex flex-col relative space-y-6">


      <div className="flex justify-end items-center gap-4 relative z-20 -mt-2">
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
          className="relative flex items-center justify-center p-2 border border-light/80 bg-primary/50 hover:border-accent hover:bg-light/20 text-accent transition-all duration-300"
        >
          <Bell size={16} />

          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]"></span>
        </button>
      </div>


      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-light/50 pb-4 gap-4 mt-2">
        <div className="font-primary text-yellow-500 tracking-[0.25em] text-[10px] md:text-xs">
          INPUT NEW COSMIC DIRECTIVE...
        </div>
        <button onClick={openConsole} className="w-full md:w-auto px-8 py-3 bg-yellow-500 text-[#0a0a1a] hover:bg-yellow-400 font-primary font-bold text-[10px] tracking-[0.2em] transition-colors rounded-sm shadow-[0_0_15px_rgba(234,179,8,0.3)]">
          INITIATE
        </button>
      </div>


      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1 min-h-[600px]">
        

        <RadarPanel 
          directives={directives} 
          directivesLoading={directivesLoading} 
          activeDirective={activeDirective} 
          setActiveDirective={setActiveDirective} 
        />


        <LogPanel 
          activeDirective={activeDirective} 
          completeDirective={completeDirective} 
        />

      </div>


      <CommandConsoleModal isOpen={isConsoleOpen} onClose={closeConsole} />
      <CommsRelayModal isOpen={isCommsOpen} onClose={() => setIsCommsOpen(false)} />
    </div>
  );
};

export default Home;