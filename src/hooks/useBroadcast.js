import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabase';

export const useBroadcasts = () => {
  return useQuery({
    queryKey: ['fleet_broadcasts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fleet_broadcasts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
        
      if (error) throw new Error(error.message);
      return data;
    },
    refetchInterval: 1000 * 60 * 3, 
  });
};