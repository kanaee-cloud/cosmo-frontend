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
        .select('*, mission_journals (*)')
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
      const { imageFile, ...directiveData } = newDirective;
      let finalImageUrl = null;


      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('mission_proofs')
          .upload(fileName, imageFile);

        if (uploadError) throw new Error('STORAGE UPLOAD FAILED: ' + uploadError.message);

      
        const { data: publicUrlData } = supabase.storage
          .from('mission_proofs')
          .getPublicUrl(fileName);

        finalImageUrl = publicUrlData.publicUrl;
      }


      const { data, error } = await supabase
        .from('directives')
        .insert([{ 
          ...directiveData, 
          evidence_link: finalImageUrl, 
          user_id: session.user.id 
        }])
        .select();
        
      if (error) throw new Error('DATABASE INSERT FAILED: ' + error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directives', 'active'] });
    },
  });
};