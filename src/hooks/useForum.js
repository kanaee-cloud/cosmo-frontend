import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

export const useForum = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.session?.user?.id);

  // 1. Ambil Semua Post beserta data pembuatnya dan jumlah balasan
  const usePosts = (category = 'ALL') => useQuery({
    queryKey: ['forumPosts', category],
    queryFn: async () => {
      let query = supabase
        .from('forum_posts')
        .select(`
          *,
          author:user_id (username, avatar_url),
          replies:forum_replies (count)
        `)
        .order('created_at', { ascending: false });

      if (category !== 'ALL') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  // 2. Ambil Balasan untuk satu Post spesifik
  const useReplies = (postId) => useQuery({
    queryKey: ['forumReplies', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_replies')
        .select(`*, author:user_id (username, avatar_url)`)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!postId
  });

  // 3. Buat Post Baru
  const createPost = useMutation({
    mutationFn: async ({ title, content, category }) => {
      const { error } = await supabase.from('forum_posts').insert([{
        user_id: userId, title, content, category
      }]);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(['forumPosts'])
  });

  // 4. Buat Balasan Baru
  const createReply = useMutation({
    mutationFn: async ({ postId, content }) => {
      const { error } = await supabase.from('forum_replies').insert([{
        post_id: postId, user_id: userId, content
      }]);
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['forumReplies', variables.postId]);
      queryClient.invalidateQueries(['forumPosts']);
    }
  });

  return { usePosts, useReplies, createPost, createReply };
};