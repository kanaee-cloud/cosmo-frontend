import { useState, useEffect } from 'react';
import mockData from '../components/Leaderboard/mockData';
import LeaderboardHeader from '../components/Leaderboard/LeaderboardHeader';
import LeaderboardHero from '../components/Leaderboard/LeaderboardHero';
import LeaderboardFilters from '../components/Leaderboard/LeaderboardFilters';
import LeaderboardTable from '../components/Leaderboard/LeaderboardTable';
import LeaderboardStatsGrid from '../components/Leaderboard/LeaderboardStatsGrid';
import LeaderboardTargetCard from '../components/Leaderboard/LeaderboardTargetCard';
import LeaderboardSkeleton from '../components/Leaderboard/LeaderboardSkeleton';

export default function Leaderboard() {
  const matrixColor = '#ff0055'; 
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen text-text p-4 md:p-8 selection:bg-[#ff0055] selection:text-white flex justify-center w-full">
      <div className="w-full flex flex-col gap-6">
        
        {loading ? (
          <LeaderboardSkeleton />
        ) : (
          <>
            {/* PANEL ATAS: Hero (Header + Podium) */}
            <div className="relative border border-tertiary bg-transparent pb-6">
              <LeaderboardHeader matrixColor={matrixColor} />
              <LeaderboardHero top3={mockData.top3} />
              <LeaderboardFilters />
            </div>

            {/* 6. PANEL BAWAH: items-stretch membuat kedua kolom ini tingginya sama */}
            <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full min-h-[450px]">
              
              {/* Kolom Kiri: Tabel Leaderboard */}
              <div className="w-full lg:w-[60%] flex flex-col h-full">
                <LeaderboardTable data={mockData.rows} />
              </div>

              {/* Kolom Kanan: Stats Hexagon & Target Card (Target card diset flex-1 di komponennya) */}
              <div className="w-full lg:w-[40%] flex flex-col gap-6 h-full">
                <LeaderboardStatsGrid metrics={mockData.metrics} />
                <LeaderboardTargetCard target={mockData.target} />
              </div>
              
            </div>
          </>
        )}
      </div>
    </div>
  );
}