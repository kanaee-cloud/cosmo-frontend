import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

export const useActiveDirectives = () => {
  const session = useAuthStore((state) => state.session);

  return useQuery({
    queryKey: ['directives', 'active'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('directives')
        .select('*')
        .eq('user_id', session.user.id)
        .neq('status', 'ARCHIVED')
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!session?.user, 
  });
};


export const useAddDirective = () => {
  const queryClient = useQueryClient();
  const session = useAuthStore((state) => state.session);

  return useMutation({
    mutationFn: async (newDirective) => {
      const { data, error } = await supabase
        .from('directives')
        .insert([{ ...newDirective, user_id: session.user.id }])
        .select();
        
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directives', 'active'] });
    },
  });
};