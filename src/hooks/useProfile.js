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

      if (error) throw new Error(error.message);
      return data;
    },

    enabled: !!session?.user?.id, 
    staleTime: 1000 * 60 * 5, 
  });
};