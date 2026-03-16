import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

export const useCaptainProfile = () => {
  const session = useAuthStore((state) => state.session);

  return useQuery({
    queryKey: ['captainProfile', session?.user?.id], 
    queryFn: async () => {
      if (!session?.user?.id) return null;

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single(); 

      if (error) {
        // Jika error karena query, return user metadata dari session
        console.log('Profile query error, using session metadata:', error);
        return {
          id: session.user.id,
          user_name: session.user.user_metadata?.user_name || session.user.email?.split('@')[0] || 'UNKNOWN OPERATOR',
          email: session.user.email,
          ...session.user.user_metadata
        };
      }
      
      // Merge dengan user metadata untuk fallback
      return {
        ...data,
        user_name: data?.user_name || session.user.user_metadata?.user_name || session.user.email?.split('@')[0] || 'UNKNOWN OPERATOR'
      };
    },

    enabled: !!session?.user?.id, 
    staleTime: 1000 * 60 * 5, 
  });
};