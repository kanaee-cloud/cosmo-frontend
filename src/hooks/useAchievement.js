import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

export const useAchievements = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.session?.user?.id);

  const useUserAchievements = () => useQuery({
    queryKey: ['achievements', userId],
    queryFn: async () => {
      const { data: allAchievements } = await supabase.from('achievements').select('*').order('name');
      const { data: unlocked } = await supabase.from('user_achievements').select('achievement_id').eq('user_id', userId);
      const { data: userProfile } = await supabase.from('users').select('equipped_badges').eq('id', userId).single();

      const unlockedIds = unlocked?.map(u => u.achievement_id) || [];
      const equippedIds = userProfile?.equipped_badges || [];

      return allAchievements.map(ach => ({
        ...ach,
        isLocked: !unlockedIds.includes(ach.id),
        isEquipped: equippedIds.includes(ach.id)
      }));
    },
    enabled: !!userId
  });

  const equipBadges = useMutation({
    mutationFn: async (badgeIds) => {
      const { error } = await supabase.from('users').update({ equipped_badges: badgeIds }).eq('id', userId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(['achievements', userId])
  });

  // ==============================================================
  // ACHIEVEMENT ENGINE (THE BEST PRACTICE)
  // Semua aturan (Rules) berkumpul di sini. Mudah ditambah kapan saja.
  // ==============================================================
  const evaluateEvent = useMutation({
    mutationFn: async ({ eventName, payload }) => {
      const unlockedBadges = [];

      // Fungsi Internal (Pekerja): Untuk meng-unlock lencana jika belum terbuka
      const tryUnlock = async (achievementName) => {
        const { data: ach } = await supabase.from('achievements').select('*').eq('name', achievementName).single();
        if (!ach) return null;

        const { data: existing } = await supabase.from('user_achievements').select('id').eq('user_id', userId).eq('achievement_id', ach.id).maybeSingle();
        if (existing) return null; // Sudah punya

        // Unlock!
        await supabase.from('user_achievements').insert([{ user_id: userId, achievement_id: ach.id }]);
        
        // Berikan Reward
        if (ach.reward_fc > 0) {
          const { data: userData } = await supabase.from('users').select('fuel_cells').eq('id', userId).single();
          await supabase.from('users').update({ fuel_cells: (userData?.fuel_cells || 0) + ach.reward_fc }).eq('id', userId);
        }
        return ach;
      };

      // --------------------------------------------------------
      // RULE BOOK (KAMUS ATURAN): Tambahkan lencana baru di sini
      // --------------------------------------------------------
      switch (eventName) {
        case 'MISSION_COMPLETED':
          // Aturan 1: Misi Apapun
          const badge1 = await tryUnlock('SYSTEM ONLINE');
          if (badge1) unlockedBadges.push(badge1);

          // Aturan 2: Misi dengan Bukti Gambar
          if (payload?.hasEvidence) {
            const badge2 = await tryUnlock('FIRST TRANSMISSION');
            if (badge2) unlockedBadges.push(badge2);
          }
          // Nanti jika ada lencana "Kerjakan 100 Misi", tambahkan logikanya di sini!
          break;

        case 'SOCIAL_CONNECTED':
          // Aturan 3: Tambah Teman
          const badge3 = await tryUnlock('COMMS ESTABLISHED');
          if (badge3) unlockedBadges.push(badge3);
          break;

        case 'POMODORO_FINISHED':
          // Nanti Anda bisa tambahkan aturan untuk Pomodoro di sini
          break;
          
        default:
          break;
      }

      return unlockedBadges;
    },
    onSuccess: (unlockedBadges) => {
      if (unlockedBadges && unlockedBadges.length > 0) {
        queryClient.invalidateQueries(['achievements', userId]);
        queryClient.invalidateQueries(['profile', userId]); 
        
        // Tampilkan notifikasi untuk semua lencana yang baru saja terbuka
        unlockedBadges.forEach(ach => {
          alert(`[ ACHIEVEMENT UNLOCKED ]\n\n${ach.name}\n${ach.reward_fc > 0 ? `Reward: +${ach.reward_fc} FC` : ''}`);
        });
      }
    }
  });

  return { useUserAchievements, equipBadges, evaluateEvent };
};