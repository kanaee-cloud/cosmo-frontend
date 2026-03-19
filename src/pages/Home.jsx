import React, { useState, useEffect } from 'react';
import { Bell, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboardLogic } from '../hooks/useDashboard';
import { useMissionOperations } from '../hooks/useMissionOperations';
import { useToastStore } from '../hooks/useToast';
import { useSocial } from '../hooks/useSocial';
import { CommandConsoleModal } from '../components/missions/CommandConsoleModal';
import { CommsRelayModal } from '../components/social/CommsRelayModal';
import { RadarPanel } from '../components/missions/RadarPanel';
import { LogPanel } from '../components/missions/LogPanel';
import { DirectiveDetailModal } from '../components/missions/DirectiveDetailModal'; // Import Modal
import { SuccessModal, FailureModal, AchievementModal } from '../components/modals';

const Home = () => {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false); 
  const [isCommsOpen, setIsCommsOpen] = useState(false);
  const [activeDirective, setActiveDirective] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failureModalOpen, setFailureModalOpen] = useState(false);
  const [achievementModalOpen, setAchievementModalOpen] = useState(false);
  const [consoleInput, setConsoleInput] = useState('');

  const { success, error } = useToastStore();

  const { 
    directives, directivesLoading, 
    isConsoleOpen: logicConsoleOpen, openConsole, closeConsole, 
    handleEmergencyExit 
  } = useDashboardLogic();

  const handleCloseConsole = () => {
    closeConsole();
    setConsoleInput('');
  };

  const { completeDirective } = useMissionOperations(setActiveDirective);
  const { useInbox } = useSocial();
  const { data: notifications } = useInbox();
  
  const hasUnread = notifications?.some(n => !n.is_read) || false;

  return (
    <div className="w-full h-full flex flex-col relative space-y-6">

      {/* HEADER ACTIONS */}
      <div className="flex justify-end items-center gap-4 relative z-20 -mt-2">
        {/* Demo Modal Buttons */}
        <div className="flex gap-2 text-[10px]">
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} 
            onClick={() => {
              setSuccessModalOpen(true);
              success('PROTOCOL SUCCESS', 'Operasi berhasil diselesaikan');
            }} 
            className="px-3 py-2 border border-[#8a6dfc]/60 bg-[#8a6dfc]/10 hover:bg-[#8a6dfc]/20 text-[#8a6dfc] transition-colors"
          >
            SUCCESS
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} 
            onClick={() => {
              setFailureModalOpen(true);
              error('CRITICAL ERROR', 'Sistem mengalami gangguan. Silahkan coba lagi.');
            }}
            className="px-3 py-2 border border-[#ff0055]/60 bg-[#ff0055]/10 hover:bg-[#ff0055]/20 text-[#ff0055] transition-colors"
          >
            FAILURE
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} 
            onClick={() => setAchievementModalOpen(true)} 
            className="px-3 py-2 border border-[#FFB703]/60 bg-[#FFB703]/10 hover:bg-[#FFB703]/20 text-[#FFB703] transition-colors"
          >
            ACHIEVE
          </motion.button>
        </div>

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
          {/* Notification Dot */}
          {hasUnread && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]"></span>
          )}
        </button>
      </div>

      {/* COMMAND CENTER HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center border-b border-[#3d2278]/50 pb-4 gap-4 mt-2">
        <div className="flex-1 w-full md:w-auto relative group">
          <input 
            type="text" 
            value={consoleInput}
            onChange={(e) => setConsoleInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && consoleInput.trim()) openConsole(); }}
            placeholder="INPUT NEW COSMIC DIRECTIVE..." 
            className="w-full bg-transparent border-none text-yellow-500 font-primary tracking-[0.25em] text-[10px] md:text-sm py-2 outline-none placeholder-yellow-500/30 focus:placeholder-yellow-500/10 transition-all"
          />
          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-yellow-500 transition-all duration-500 group-hover:w-full group-focus-within:w-full"></div>
        </div>
        <button onClick={openConsole} className="w-full md:w-auto px-8 py-3 bg-yellow-500 text-[#0a0a1a] hover:bg-yellow-400 font-primary font-bold text-[10px] tracking-[0.2em] transition-colors rounded-sm shadow-[0_0_15px_rgba(234,179,8,0.3)]">
          INITIATE
        </button>
      </div>

      {/* MAIN DASHBOARD GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1 min-h-[600px]">
        
        {/* RADAR PANEL (7 Cols) */}
        <RadarPanel 
          directives={directives} 
          directivesLoading={directivesLoading} 
          activeDirective={activeDirective} 
          setActiveDirective={setActiveDirective} 
        />

        {/* LOG PANEL (5 Cols) - Now serving as general stats/log */}
        <LogPanel 
          directives={directives} 
          activeDirective={activeDirective}
          setActiveDirective={setActiveDirective}
          completeDirective={completeDirective} 
        />

      </div>

      {/* MODALS */}
      <CommandConsoleModal isOpen={logicConsoleOpen} onClose={handleCloseConsole} initialTitle={consoleInput} />
      <CommsRelayModal isOpen={isCommsOpen} onClose={() => setIsCommsOpen(false)} />
      
      {/* DIRECTIVE DETAIL MODAL (Triggered by Radar Click) */}
      <DirectiveDetailModal 
        isOpen={!!activeDirective} 
        onClose={() => setActiveDirective(null)} 
        directive={activeDirective}
        setActiveDirective={setActiveDirective}
      />

      {/* POPUP MODALS - Demo */}
      <SuccessModal 
        isOpen={successModalOpen} 
        title="COMMUNICATION ESTABLISHED"
        message="Data berhasil diunggah ke mainframe. Sistem siap melanjutkan operasi."
        onClose={() => setSuccessModalOpen(false)} 
      />
      <FailureModal 
        isOpen={failureModalOpen}
        title="SYSTEM CRITICAL"
        message="Gagal menyambungkan ke satelit. Periksa kembali koordinat Anda."
        onClose={() => setFailureModalOpen(false)}
        onRetry={() => setFailureModalOpen(false)}
      />
      <AchievementModal 
        isOpen={achievementModalOpen}
        badgeName="Galactic Voyager"
        onClose={() => setAchievementModalOpen(false)}
      />
    </div>
  );
};

export default Home;