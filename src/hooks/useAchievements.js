import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';
import { toast } from './useToast';

export const useAchievements = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.session?.user?.id);

  // ==========================================
  // 1. FETCH DATA (Master + Unlock + Progress)
  // ==========================================
  const useUserAchievements = () => useQuery({
    queryKey: ['achievements', userId],
    queryFn: async () => {
      // 1. Tarik semua data dari Supabase
      const { data: allAchievements } = await supabase.from('achievements').select('*').order('name');
      const { data: unlocked } = await supabase.from('user_achievements').select('*').eq('user_id', userId);
      const { data: progressData } = await supabase.from('user_achievement_progress').select('*').eq('user_id', userId);
      const { data: userProfile } = await supabase.from('users').select('equipped_badges').eq('id', userId).single();

      const equippedIds = userProfile?.equipped_badges || [];

      // 2. Gabungkan dan kalkulasi status
      return allAchievements.map(ach => {
        const unlockData = unlocked?.find(u => u.achievement_id === ach.id);
        const isLocked = !unlockData;
        const isClaimed = unlockData?.is_claimed || false;
        const userAchievementId = unlockData?.id || null;

        // Tentukan nilai progress saat ini
        let currentProgress = 0;
        if (!isLocked) {
          currentProgress = ach.target_value; // Jika sudah unlock, pasti max
        } else {
          currentProgress = progressData?.find(p => p.achievement_id === ach.id)?.current_value || 0;
        }

        const progressPercentage = Math.min(Math.round((currentProgress / ach.target_value) * 100), 100);

        return {
          ...ach,
          isLocked,
          isClaimed,
          userAchievementId,
          isEquipped: equippedIds.includes(ach.id),
          currentProgress,
          progressPercentage
        };
      });
    },
    enabled: !!userId
  });

  // ==========================================
  // 2. EQUIP LENCANA KE PROFIL
  // ==========================================
  const equipBadges = useMutation({
    mutationFn: async (badgeIds) => {
      const { error } = await supabase.from('users').update({ equipped_badges: badgeIds }).eq('id', userId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(['achievements', userId])
  });

  // ==========================================
  // 3. KLAIM HADIAH MANUAL
  // ==========================================
  const claimReward = useMutation({
    mutationFn: async ({ userAchievementId, reward_fc }) => {
      // 1. Validasi Keamanan: Pastikan ID tidak kosong agar tidak mengupdate semua data
      if (!userAchievementId) throw new Error("ID Lencana tidak valid (Akses Ditolak).");

      // 2. Double-Check ke Database (Mencegah Spam Click / Race Condition)
      const { data: currentData, error: checkError } = await supabase
        .from('user_achievements')
        .select('is_claimed')
        .eq('id', userAchievementId)
        .single();

      if (checkError) throw new Error("Gagal memverifikasi status lencana.");
      if (currentData.is_claimed) throw new Error("Hadiah sudah diklaim sebelumnya!");

      // 3. Kunci Lencana menjadi Claimed = True
      const { error: claimError } = await supabase
        .from('user_achievements')
        .update({ is_claimed: true })
        .eq('id', userAchievementId);
        
      if (claimError) throw claimError;

      // 4. Tambahkan Fuel Cells dengan aman
      if (reward_fc > 0) {
        const { data: userData } = await supabase.from('users').select('fuel_cells').eq('id', userId).single();
        const newFuel = (userData?.fuel_cells || 0) + reward_fc;
        await supabase.from('users').update({ fuel_cells: newFuel }).eq('id', userId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['achievements', userId]);
      queryClient.invalidateQueries(['profile', userId]); 
      toast.success("REWARD CLAIMED", "Transmission successful. Fuel Cells added to your account.");
    },
    onError: (error) => {
      toast.error("CLAIM FAILED", error.message);
    }
  });
  // ==========================================
  // 4. EVENT ENGINE (Menambah Progress & Buka Kunci)
  // ==========================================
 const evaluateEvent = useMutation({
    mutationFn: async ({ eventName, payload }) => {
      const unlockedBadges = [];

      const addProgress = async (achievementName, incrementBy = 1) => {
        const { data: ach } = await supabase.from('achievements').select('*').eq('name', achievementName).single();
        if (!ach) return null;

        const { data: isUnlocked } = await supabase.from('user_achievements').select('id').eq('user_id', userId).eq('achievement_id', ach.id).maybeSingle();
        if (isUnlocked) return null;

        const { data: currentProg } = await supabase.from('user_achievement_progress').select('current_value').eq('user_id', userId).eq('achievement_id', ach.id).maybeSingle();
        const newVal = (currentProg?.current_value || 0) + incrementBy;

        await supabase.from('user_achievement_progress').upsert({ user_id: userId, achievement_id: ach.id, current_value: newVal });

        if (newVal >= ach.target_value) {
          // FITUR BARU: AUTO-CLAIM JIKA ITU ADALAH 'BADGE'
          const isAutoClaim = ach.type === 'BADGE';
          
          await supabase.from('user_achievements').insert([{ 
            user_id: userId, 
            achievement_id: ach.id,
            is_claimed: isAutoClaim // <-- Kuncinya di sini!
          }]);
          return ach;
        }
        return null;
      };

      // RULE BOOK EVENT (Lencana Dasar)
      switch (eventName) {
        case 'MISSION_COMPLETED':
          const badge1 = await addProgress('SYSTEM ONLINE', 1);
          if (badge1) unlockedBadges.push(badge1);

          if (payload?.hasEvidence) {
            const badge2 = await addProgress('FIRST TRANSMISSION', 1);
            if (badge2) unlockedBadges.push(badge2);
          }
          break;
        case 'SOCIAL_CONNECTED':
          const badge3 = await addProgress('COMMS ESTABLISHED', 1);
          if (badge3) unlockedBadges.push(badge3);
          break;
        default: break;
      }

    const newlyUnlockedQuests = unlockedBadges.filter(b => b.type === 'ACHIEVEMENT').length;
      
      if (newlyUnlockedQuests > 0) {
        // Otomatis tambah progress ke semua Badges Gelar!
        const b1 = await addProgress('ROOKIE PILOT', newlyUnlockedQuests);
        const b2 = await addProgress('VANGUARD INITIATE', newlyUnlockedQuests);
        const b3 = await addProgress('ELITE OPERATOR', newlyUnlockedQuests);
        
        if (b1) unlockedBadges.push(b1);
        if (b2) unlockedBadges.push(b2);
        if (b3) unlockedBadges.push(b3);
      }

      return unlockedBadges;
    },
    onSuccess: (unlockedBadges) => {
      queryClient.invalidateQueries(['achievements', userId]); 
      if (unlockedBadges && unlockedBadges.length > 0) {
        unlockedBadges.forEach(ach => {
          // Alert akan muncul beruntun jika ada Meta-Badge yang ikut terbuka!
          toast.success(ach.category === 'META' ? 'TITLE GRANTED' : 'ACHIEVEMENT UNLOCKED', `${ach.name} - Go to Service Records to claim your reward!`);
        });
      }
    }
  });

  return { useUserAchievements, equipBadges, claimReward, evaluateEvent };
};