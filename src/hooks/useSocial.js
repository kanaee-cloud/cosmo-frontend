// src/hooks/useSocial.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

export const useSocial = () => {
  const queryClient = useQueryClient();
  const session = useAuthStore((state) => state.session);
  const myId = session?.user?.id;

  // 1. QUERY: Ambil semua Notifikasi (Inbox)
  const useInbox = () => useQuery({
    queryKey: ['notifications', myId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select(`*, sender:users!sender_id(username, avatar_url)`)
        .eq('user_id', myId)
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!myId,
  });

  // 2. MUTATION: Cari Kapten berdasarkan Username
  const searchCaptains = async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 3) return [];
    const { data, error } = await supabase
      .from('users')
      .select('id, username, avatar_url, fuel_cells')
      .ilike('username', `%${searchTerm}%`) // Pencarian mirip (Case-Insensitive)
      .neq('id', myId) // Jangan tampilkan diri sendiri
      .limit(5);
    if (error) throw new Error(error.message);
    return data;
  };

  // 3. MUTATION: Kirim Permintaan Pertemanan
  const sendFriendRequest = useMutation({
    mutationFn: async (targetUserId) => {
      // a. Buat data pertemanan (PENDING)
      const { data: friendData, error: friendError } = await supabase
        .from('friendships')
        .insert([{ requester_id: myId, addressee_id: targetUserId, status: 'PENDING' }])
        .select().single();
      if (friendError) throw new Error(friendError.message);

      // b. Kirim Notifikasi ke Target
      const { error: notifError } = await supabase
        .from('notifications')
        .insert([{
          user_id: targetUserId,
          sender_id: myId,
          type: 'FRIEND_REQUEST',
          message: 'wants to join your fleet.',
          related_id: friendData.id
        }]);
      if (notifError) throw new Error(notifError.message);
    }
  });

  // 4. MUTATION: Terima Permintaan Pertemanan
  const acceptRequest = useMutation({
    mutationFn: async ({ friendshipId, notificationId }) => {
      // a. Update status pertemanan jadi ACCEPTED
      await supabase.from('friendships').update({ status: 'ACCEPTED' }).eq('id', friendshipId);
      // b. Tandai notifikasi sebagai terbaca
      await supabase.from('notifications').update({ is_read: true }).eq('id', notificationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', myId] });
      // Nanti bisa invalidate query 'friends_list' juga
    }
  });

  const useFriendsList = () => useQuery({
    queryKey: ['friends', myId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('friendships')
        .select(`
          id,
          requester:users!requester_id(id, username, avatar_url, fuel_cells),
          addressee:users!addressee_id(id, username, avatar_url, fuel_cells)
        `)
        .eq('status', 'ACCEPTED')
        .or(`requester_id.eq.${myId},addressee_id.eq.${myId}`);

      if (error) throw new Error(error.message);

      // Logika Pintar: Ekstrak data "Teman" terlepas dari siapa yang mengundang
      const formattedFriends = data.map((relation) => {
        const isRequester = relation.requester.id === myId;
        const friendData = isRequester ? relation.addressee : relation.requester;
        
        return {
          friendship_id: relation.id,
          ...friendData // Menggabungkan id, username, avatar, exp milik teman
        };
      });

      // Urutkan berdasarkan EXP tertinggi (Leaderboard mini)
      return formattedFriends.sort((a, b) => b.fuel_cells - a.fuel_cells);
    },
    enabled: !!myId,
  });

  return {
    useInbox,
    searchCaptains,
    sendFriendRequest,
    acceptRequest,
    useFriendsList
  };
};