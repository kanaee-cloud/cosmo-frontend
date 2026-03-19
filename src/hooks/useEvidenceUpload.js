import { useMutation } from '@tanstack/react-query';
import { supabase } from '../services/supabase';

export const useEvidenceUpload = () => {
  return useMutation({
    mutationFn: async ({ file, directory = 'proofs' }) => {
      // 1. Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(7)}_${Date.now()}.${fileExt}`;
      const filePath = `${directory}/${fileName}`;

      // 2. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('mission_proofs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('mission_proofs')
        .getPublicUrl(filePath);

      return publicUrl;
    }
  });
};
