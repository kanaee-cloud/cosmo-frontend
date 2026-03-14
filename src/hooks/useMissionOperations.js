import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';

export const useMissionOperations = (setActiveDirective) => {
  const queryClient = useQueryClient();

  const completeDirective = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('directives').update({ status: 'DONE' }).eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directives'] });
      setActiveDirective(null); 
    }
  });

  return { completeDirective };
};