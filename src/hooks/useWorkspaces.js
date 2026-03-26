// src/hooks/useWorkspaces.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';
import { toast } from './useToast';

export const useWorkspaces = () => {
  const queryClient = useQueryClient();
  const session = useAuthStore((state) => state.session);
  const myId = session?.user?.id;

  // 1. Ambil semua Workspace (Room) yang diikuti Kapten
  const useMyWorkspaces = () => useQuery({
    queryKey: ['workspaces', myId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workspace_members')
        .select(`
          workspace_id,
          workspaces (id, name, monster_name, status, created_at)
        `)
        .eq('user_id', myId);
      if (error) throw new Error(error.message);
      return data.map(d => d.workspaces); 
    },
    enabled: !!myId,
  });

  // 2. Ambil Data Detail Arena (Daftar Teman & Daftar Tugas Bos)
  const useWorkspaceRaid = (workspaceId) => useQuery({
    queryKey: ['workspaceRaid', workspaceId],
    queryFn: async () => {
      // Ambil Member
      const { data: members, error: memError } = await supabase
        .from('workspace_members')
        .select(`user_id, users(username, avatar_url)`)
        .eq('workspace_id', workspaceId);
      
      // Ambil Tugas (Directives) di arena ini
      const { data: directives, error: dirError } = await supabase
        .from('directives')
        .select('*')
        .eq('workspace_id', workspaceId);

      if (memError || dirError) throw new Error("RAID DATA CORRUPTED");

      // --- PERBAIKAN: KALKULASI HP BOS DINAMIS SESUAI DAMAGE ---
      // 1. Max HP = Total semua exp_reward dari seluruh tugas di ruangan ini
      const maxHp = directives.reduce((total, task) => total + (task.exp_reward || 0), 0);
      
      // 2. Damage Dealt = Total exp_reward dari tugas yang berstatus 'COMPLETED'
      const damageDealt = directives
        .filter(d => d.status === 'COMPLETED')
        .reduce((total, task) => total + (task.exp_reward || 0), 0);
        
      // 3. Sisa HP = Max HP dikurangi Damage Dealt
      const currentHp = Math.max(0, maxHp - damageDealt);

      return {
        members: members.map(m => m.users),
        directives,
        boss: {
          // Jika belum ada tugas, berikan ilusi HP 0 agar terkesan "Dormant/Tidur"
          maxHp: maxHp === 0 ? 0 : maxHp,
          currentHp: maxHp === 0 ? 0 : currentHp,
          damageDealt,
          // Bos HANYA mati jika Max HP > 0 (ada tugas) DAN semua tugas selesai (Current HP = 0)
          isDefeated: maxHp > 0 && currentHp <= 0 
        }
      };
    },
    enabled: !!workspaceId,
    refetchInterval: 5000 // Auto-refresh tiap 5 detik
  });

  const createWorkspace = useMutation({
    mutationFn: async ({ name, monsterName }) => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("Gagal memverifikasi identitas Kapten.");

      const payload = {
        name: name,
        monster_name: monsterName,
        created_by: user.id
      };

      const { data: room, error: roomError } = await supabase
        .from('workspaces')
        .insert([payload])
        .select()
        .single();
      
      if (roomError) throw new Error("Raid gagal dibuat: " + roomError.message);

      const { error: memberError } = await supabase
        .from('workspace_members')
        .insert([{ workspace_id: room.id, user_id: user.id, role: 'LEADER' }]);

      if (memberError) throw new Error("Gagal memasuki arena: " + memberError.message);

      return room;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workspaces'] })
  });

  const recruitAlly = useMutation({
    mutationFn: async ({ workspaceId, workspaceName, friendId }) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('notifications')
        .insert([{
          user_id: friendId,
          sender_id: user.id,
          type: 'WORKSPACE_INVITE',
          message: `INVITED YOU TO JOIN RAID: [${workspaceName}]`,
          related_id: workspaceId
        }]);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => toast.success("TRANSMISSION SENT", "ALLY'S INBOX HAS RECEIVED THE INVITE!")
  });

  const addRaidObjective = useMutation({
    mutationFn: async ({ workspaceId, title }) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      // GENERATOR RANDOM DAMAGE (Antara 50 sampai 300)
      const randomDamage = Math.floor(Math.random() * (300 - 50 + 1)) + 50; 

      const { error } = await supabase.from('directives').insert([{
        title: title,
        mission_log: 'CO-OP RAID MISSION',
        category: 'WORK',
        workspace_id: workspaceId,
        user_id: user.id,
        exp_reward: randomDamage 
      }]);
      if (error) throw new Error(error.message);
    },
    // PERBAIKAN: Refresh data arena agar HP Bos langsung bertambah
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workspaceRaid'] })
  });

  const dealDamage = useMutation({
    mutationFn: async (directiveId) => {
      const { data, error } = await supabase
        .from('directives')
        .update({ status: 'COMPLETED' })
        .eq('id', directiveId)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      // PERBAIKAN: Refresh data arena agar HP Bos langsung berkurang di UI
      queryClient.invalidateQueries({ queryKey: ['directives'] });
      queryClient.invalidateQueries({ queryKey: ['workspaceRaid'] });
    }
  });

  return { useMyWorkspaces, useWorkspaceRaid, createWorkspace, dealDamage, recruitAlly, addRaidObjective };
};