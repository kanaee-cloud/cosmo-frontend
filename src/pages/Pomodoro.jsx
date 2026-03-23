import React from 'react';
import { Zap } from 'lucide-react';
import { useChronoCore } from '../hooks/useChronoCore';
import TimerModal from '../components/modals/TimerModal';
import PreFlightCheckModal from '../components/Pomodoro/PreFlightCheckModal';
import TimerHUD from '../components/Pomodoro/TimerHUD';
import DirectiveFocus from '../components/Pomodoro/DirectiveFocus';
import ActionPanel from '../components/Pomodoro/ActionPanel';

export default function Pomodoro() {
  const core = useChronoCore();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[80vh] p-4 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 blur-[120px] rounded-full pointer-events-none transition-colors duration-1000 ${
        core.currentPhase === 'break' ? 'bg-light/10' : (core.isRunning ? 'bg-accent/20' : 'bg-accent/5')
      }`}></div>

      {/* Pop-up Reward Notification */}
      {core.rewardMessage && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-green-500/20 border border-green-500 text-green-400 px-6 py-3 font-press text-[10px] md:text-xs uppercase tracking-widest z-50 shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center gap-3 transition-all duration-500 animate-bounce">
          <Zap size={16} />
          {core.rewardMessage}
        </div>
      )}

      {/* Modals */}
      <PreFlightCheckModal 
        isOpen={core.isConfirmModalOpen} 
        onAbort={() => core.setIsConfirmModalOpen(false)} 
        onConfirm={core.confirmEngage} 
      />
      <TimerModal 
        isOpen={core.isModalOpen} 
        onClose={() => core.setIsModalOpen(false)} 
        onApplyTime={core.handleApplyNewTime}
        currentDuration={core.focusDuration}
      />

      {/* Sub-Components */}
      <TimerHUD core={core} />
      <DirectiveFocus core={core} />
      <ActionPanel core={core} />

    </div>
  );
}