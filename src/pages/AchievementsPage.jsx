import React from 'react';
import * as Icons from 'lucide-react';
import { useAchievements } from '../hooks/useAchievement';


export default function AchievementsPage() {
  const { useUserAchievements } = useAchievements();
  const { data: achievements = [], isLoading } = useUserAchievements();

  const IconComponent = ({ name, className }) => {
    const Icon = Icons[name] || Icons.HelpCircle;
    return <Icon className={className} size={28} />;
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-accent animate-pulse font-primary text-xs tracking-widest">LOADING COMMENDATIONS...</div>;

  return (
    <div className="min-h-screen w-full p-4 md:p-8 text-text max-w-4xl mx-auto flex flex-col gap-8">
      
      <div className="border-b border-tertiary pb-6">
        <h1 className="font-primary text-2xl md:text-3xl tracking-[0.2em] text-accent uppercase mb-2">SERVICE RECORDS</h1>
        <p className="font-secondary text-xs text-light/50 tracking-widest">TRACK YOUR GALACTIC ACHIEVEMENTS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((ach) => (
          <div key={ach.id} className={`p-5 border transition-all flex gap-5 items-center relative overflow-hidden ${ach.isLocked ? 'border-tertiary/30 bg-primary/20 opacity-60' : 'border-accent/50 bg-secondary shadow-[0_0_15px_rgba(6,255,165,0.05)]'}`}>
            
            {/* Dekorasi Garis Kiri Jika Terbuka */}
            {!ach.isLocked && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>}

            <div className={`w-16 h-16 flex items-center justify-center border-2 flex-shrink-0 z-10 ${ach.isLocked ? 'border-accent text-accent' : 'border-accent bg-accent/20 text-accent drop-shadow-[0_0_10px_rgba(6,255,165,0.5)]'}`}>
              <IconComponent name={ ach.icon_name} />
            </div>
            
            <div className="flex-1 z-10">
              <h3 className={`font-primary tracking-widest text-sm mb-1 ${ach.isLocked ? 'text-light/50' : 'text-white'}`}>
                {ach.name}
              </h3>
              <p className="font-secondary text-[10px] md:text-xs text-light/70 mb-2 leading-relaxed">
                {ach.description}
              </p>
              
              {ach.reward_fc > 0 && (
                <div className={`font-secondary text-[9px] tracking-widest ${ach.isLocked ? 'text-yellow-500/50' : 'text-yellow-400'}`}>
                  REWARD: {ach.reward_fc} FC
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}