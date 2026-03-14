import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

export const useSocial = () => {
  const queryClient = useQueryClient();
  const session = useAuthStore((state) => state.session);
  const myId = session?.user?.id;


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


  const searchCaptains = async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 3) return [];
    const { data, error } = await supabase
      .from('users')
      .select('id, username, avatar_url, fuel_cells')
      .ilike('username', `%${searchTerm}%`) 
      .neq('id', myId)
      .limit(5);
    if (error) throw new Error(error.message);
    return data;
  };


  const sendFriendRequest = useMutation({
    mutationFn: async (targetUserId) => {
      const { data: friendData, error: friendError } = await supabase
        .from('friendships')
        .insert([{ requester_id: myId, addressee_id: targetUserId, status: 'PENDING' }])
        .select().single();
      if (friendError) throw new Error(friendError.message);


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


  const acceptRequest = useMutation({
    mutationFn: async ({ friendshipId, notificationId }) => {
      await supabase.from('friendships').update({ status: 'ACCEPTED' }).eq('id', friendshipId);
      await supabase.from('notifications').update({ is_read: true }).eq('id', notificationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', myId] });
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

      const formattedFriends = data.map((relation) => {
        const isRequester = relation.requester.id === myId;
        const friendData = isRequester ? relation.addressee : relation.requester;
        
        return {
          friendship_id: relation.id,
          ...friendData 
        };
      });


      return formattedFriends.sort((a, b) => b.fuel_cells - a.fuel_cells);
    },
    enabled: !!myId,
  });

  const acceptAction = useMutation({
    mutationFn: async ({ type, relatedId, notificationId }) => {
      const { data: { user } } = await supabase.auth.getUser();

      if (type === 'FRIEND_REQUEST') {
        await supabase.from('friendships').update({ status: 'ACCEPTED' }).eq('id', relatedId);
      } else if (type === 'WORKSPACE_INVITE') {
        await supabase.from('workspace_members').insert([{
          workspace_id: relatedId,
          user_id: user.id,
          role: 'MEMBER'
        }]);
      }

      await supabase.from('notifications').update({ is_read: true }).eq('id', notificationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', myId] });
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspaceRaid'] });
    }
  });

  return {
    useInbox,
    searchCaptains,
    sendFriendRequest,
    acceptRequest,
    useFriendsList,
    acceptAction
  };
};