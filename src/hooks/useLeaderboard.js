import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

export const useLeaderboard = () => {
  const { session } = useAuthStore();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: ['leaderboard', userId],
    queryFn: async () => {
      // 1. Tarik Data 50 Pilot Terbaik dari Supabase
      const { data: users, error } = await supabase
        .from('users')
        .select('id, username, fuel_cells', 'avatar_url')
        .order('fuel_cells', { ascending: false })
        .limit(50);

      if (error) throw new Error(error.message);

      // 2. Format & Kalkulasi Data
      const rankedUsers = users.map((u, i) => ({
        id: u.id,
        rank: i + 1,
        pilot_id: u.username || 'UNKNOWN',
        username: u.username || 'UNKNOWN',
        avatar_url: u.avatar_url || null,
        xp: u.fuel_cells, // Untuk Podium
        total_fuel_cells: u.fuel_cells, // Untuk Tabel
        // Estimasi misi: Karena tidak ada relasi langsung, kita bagi Fuel Cells dengan rata-rata XP per misi (50)
        missions_completed: Math.floor(u.fuel_cells / 50), 
        title: i === 0 ? 'SUPREME ADMIRAL' : i === 1 ? 'VICE ADMIRAL' : i === 2 ? 'REAR ADMIRAL' : 'ELITE PILOT'
      }));

      // 3. Susun Ulang Podium (Juara 2, Juara 1, Juara 3) agar sesuai dengan UI Hero Anda
      const top3 = [
        rankedUsers[1] || null, // Kiri
        rankedUsers[0] || null, // Tengah
        rankedUsers[2] || null  // Kanan
      ];

      // 4. Data Tabel dimulai dari peringkat ke-4
      const tableData = rankedUsers.slice(3);

      // 5. Kalkulasi Target Card (Posisi Akun Anda)
      let targetCardData = { name: 'UNKNOWN', rank: '-', xpToNext: 'SYNCING...' };
      
      if (userId) {
        let myData = rankedUsers.find(u => u.id === userId);
        
        // Jika akun Anda tidak masuk Top 50, kita cari peringkat persisnya
        if (!myData) {
          const { data: myProfile } = await supabase.from('users').select('username, fuel_cells').eq('id', userId).single();
          if (myProfile) {
            // Hitung jumlah pilot yang EXP-nya lebih tinggi dari Anda
            const { count } = await supabase.from('users').select('*', { count: 'exact', head: true }).gt('fuel_cells', myProfile.fuel_cells);
            myData = {
              username: myProfile.username,
              rank: (count || 0) + 1,
              total_fuel_cells: myProfile.fuel_cells
            };
          }
        }

        // Hitung jarak (XP) ke rival tepat di atas Anda
        if (myData) {
          let xpToNext = "MAX RANK ACHIEVED";
          if (myData.rank > 1) {
            const rival = rankedUsers[myData.rank - 2]; // Rival adalah peringkat (rank Anda - 1)
            if (rival) {
              const diff = rival.total_fuel_cells - myData.total_fuel_cells;
              xpToNext = `-${diff} FC TO OVERTAKE RANK ${rival.rank}`;
            } else {
              xpToNext = "KEEP GRINDING TO ENTER TOP 50";
            }
          }

          targetCardData = {
            name: myData.username,
            rank: myData.rank,
            xpToNext
          };
        }
      }

      return { top3, tableData, targetCardData };
    },
    enabled: !!userId, 
  });
};