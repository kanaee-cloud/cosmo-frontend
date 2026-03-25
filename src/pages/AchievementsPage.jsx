import React from 'react';
import * as Icons from 'lucide-react';
import { useAchievements } from '../hooks/useAchievements';

export default function AchievementsPage() {
  const { useUserAchievements, claimReward } = useAchievements();
  const { data: allData = [], isLoading } = useUserAchievements();


  const achievementsOnly = allData.filter(item => item.type === 'ACHIEVEMENT');

  // Helper untuk merender icon Lucide dinamis
  const IconComponent = ({ name, className }) => {
    const Icon = Icons[name] || Icons.HelpCircle;
    return <Icon className={className} size={28} />;
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-accent animate-pulse font-primary text-xs tracking-widest">LOADING COMMENDATIONS...</div>;
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-8 text-text max-w-4xl mx-auto flex flex-col gap-8">
      
      <div className="border-b border-tertiary pb-6">
        <h1 className="font-primary text-2xl md:text-3xl tracking-[0.2em] text-accent uppercase mb-2">SERVICE RECORDS</h1>
        <p className="font-secondary text-xs text-light/50 tracking-widest uppercase">Track and Claim Your Galactic Commendations</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {achievementsOnly.map((ach) => (
          <div key={ach.id} className={`p-5 border transition-all flex gap-5 items-center relative overflow-hidden ${ach.isLocked ? 'border-tertiary/30 bg-primary/20 opacity-60' : 'border-accent/50 bg-secondary shadow-[0_0_15px_rgba(6,255,165,0.05)]'}`}>
            
            {/* Dekorasi Garis Kiri Jika Terbuka */}
            {!ach.isLocked && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>}

            {/* Kotak Icon */}
            <div className={`w-16 h-16 flex items-center justify-center border-2 flex-shrink-0 z-10 ${ach.isLocked ? 'border-tertiary text-tertiary' : 'border-accent bg-accent/20 text-accent drop-shadow-[0_0_10px_rgba(6,255,165,0.5)]'}`}>
              <IconComponent name={ach.isLocked ? 'Lock' : ach.icon_name} />
            </div>
            
            {/* Konten Text */}
            <div className="flex-1 z-10">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-primary tracking-widest text-sm uppercase ${ach.isLocked ? 'text-light/50' : 'text-white'}`}>
                  {ach.name}
                </h3>
                
                {/* LABEL REWARD */}
                {ach.reward_fc > 0 && (
                  <div className={`font-primary text-[8px] tracking-widest px-2 py-0.5 border ${
                    ach.isLocked ? 'text-yellow-500/50 border-yellow-500/30' 
                    : ach.isClaimed ? 'text-green-400 border-green-400 bg-green-400/10' 
                    : 'text-white border-yellow-400 bg-yellow-400'
                  }`}>
                    {ach.isClaimed ? 'CLAIMED' : `+${ach.reward_fc} FC`}
                  </div>
                )}
              </div>
              
              <p className="font-primary text-[10px] md:text-xs text-light/70 mb-4 leading-relaxed">
                {ach.description}
              </p>
              
              {/* TOMBOL CLAIM ATAU PROGRESS BAR */}
              {!ach.isLocked && !ach.isClaimed ? (
                <button 
                  onClick={() => claimReward.mutate({ userAchievementId: ach.userAchievementId, reward_fc: ach.reward_fc })}
                  // Kunci SEMUA tombol jika ada 1 proses klaim yang sedang berjalan
                  disabled={claimReward.isPending}
                  className="w-full py-2 bg-yellow-400 text-[#0a0a1a] font-primary tracking-[0.2em] text-[10px] uppercase hover:bg-yellow-300 transition-colors shadow-[0_0_15px_rgba(250,204,21,0.4)] animate-pulse disabled:opacity-50 disabled:animate-none disabled:cursor-not-allowed"
                >
                  {/* Cek apakah tombol INI yang sedang diproses */}
                  {claimReward.isPending && claimReward.variables?.userAchievementId === ach.userAchievementId 
                    ? 'PROCESSING...' 
                    : 'CLAIM REWARD'
                  }
                </button>
              ) : (
                <div className="w-full">
                  <div className="flex justify-between font-primary text-[8px] tracking-widest mb-1 text-light/60">
                     <span>{ach.isLocked ? 'IN PROGRESS' : 'COMPLETED'}</span>
                     <span>{ach.currentProgress} / {ach.target_value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-primary border border-tertiary/50 relative overflow-hidden">
                     <div 
                       className={`absolute top-0 left-0 h-full transition-all duration-1000 ${ach.isLocked ? 'bg-cyan-500/50' : 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]'}`} 
                       style={{ width: `${ach.progressPercentage}%` }}
                     ></div>
                  </div>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}