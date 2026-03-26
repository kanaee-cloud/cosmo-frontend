import React from 'react';
import { useLeaderboard } from '../hooks/useLeaderboard'; 
import LeaderboardHeader from '../components/Leaderboard/LeaderboardHeader';
import LeaderboardHero from '../components/Leaderboard/LeaderboardHero';
import LeaderboardFilters from '../components/Leaderboard/LeaderboardFilters';
import LeaderboardTable from '../components/Leaderboard/LeaderboardTable';
import LeaderboardStatsGrid from '../components/Leaderboard/LeaderboardStatsGrid';
import LeaderboardTargetCard from '../components/Leaderboard/LeaderboardTargetCard';
import LeaderboardSkeleton from '../components/Leaderboard/LeaderboardSkeleton';

export default function Leaderboard() {
  const matrixColor = '#ff0055'; 
  
  const { data, isLoading, error } = useLeaderboard();

  if (error) {
    return (
      <div className="min-h-screen text-red-500 p-8 flex justify-center items-center font-primary tracking-widest text-xs md:text-sm uppercase text-center">
        [ ERROR DETECTED: {error.message} ]
      </div>
    );
  }

  const top3 = data?.top3 || [null, null, null];
  const rows = data?.tableData || [];
  const target = data?.targetCardData || { name: 'UNKNOWN', rank: '-', xpToNext: 'SYNCING...' };

  const totalActivePilots = rows.length + top3.filter(Boolean).length;
  const highestXP = top3[1]?.xp || 0; 
  
  const metrics = [
    { label: 'ACTIVE PILOTS', value: totalActivePilots },
    { label: 'TOP FUEL CELLS', value: highestXP },
    { label: 'SECTOR STATUS', value: 'SECURE' }
  ];

  return (
    <div className="min-h-screen text-text p-2 sm:p-4 md:p-8 selection:bg-[#ff0055] selection:text-white flex justify-center w-full overflow-hidden">
      <div className="w-full flex flex-col gap-6 max-w-7xl mx-auto">
        
        {isLoading ? (
          <LeaderboardSkeleton />
        ) : (
          <>
            {/* PANEL ATAS: Hero (Header + Podium) */}
            <div className="relative border border-tertiary bg-transparent pb-6 md:pb-10">
              <LeaderboardHeader matrixColor={matrixColor} />
              <LeaderboardHero top3={top3} />
              <LeaderboardFilters />
            </div>

            {/* PANEL BAWAH: items-stretch membuat kedua kolom ini tingginya sama */}
            <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full min-h-[450px]">
              
              {/* Kolom Kiri: Tabel Leaderboard */}
              <div className="w-full lg:w-[60%] flex flex-col h-full overflow-hidden">
                <LeaderboardTable data={rows} />
              </div>

              {/* Kolom Kanan: Stats Hexagon & Target Card */}
              <div className="w-full lg:w-[40%] flex flex-col gap-6 h-full">
                <LeaderboardStatsGrid metrics={metrics} />
                <LeaderboardTargetCard target={target} />
              </div>
              
            </div>
          </>
        )}
      </div>
    </div>
  );
}