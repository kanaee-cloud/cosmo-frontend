import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { toast } from './useToast';
import { useAchievements } from './useAchievements';

export const useMissionOperations = (setActiveDirective) => {
  const queryClient = useQueryClient();
  const { evaluateEvent } = useAchievements();

  const engageDirective = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('directives').update({ status: 'IN_PROGRESS' }).eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directives'] });
    }
    // Error handling can optionally be added here if needed, or handled in the component
  });

  const completeDirective = useMutation({
    mutationFn: async ({ id, xp, mission_log, evidence_link, ai_feedback, validation_score }) => {
      // 1. Mark as DONE/ARCHIVED and save log/evidence if provided
      const updateData = { status: 'DONE' };
      
      let finalLog = mission_log || "";
      if (ai_feedback) {
          finalLog += `\n\n[ AI MISSION ANALYSIS ]\nSCORE: ${validation_score}/100\nFEEDBACK: ${ai_feedback}`;
      }
      
      if (finalLog) updateData.mission_log = finalLog;
      if (evidence_link) updateData.evidence_link = evidence_link;

      const { error: directiveError } = await supabase.from('directives').update(updateData).eq('id', id);
      if (directiveError) throw new Error(directiveError.message);

      // 2. Award XP to User
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
          const { data: profile } = await supabase.from('profiles').select('fuel_cells').eq('id', user.id).single();
          const currentXP = profile?.fuel_cells || 0;
          await supabase.from('profiles').update({ fuel_cells: currentXP + xp }).eq('id', user.id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directives'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] }); 
      setActiveDirective(null); 
    }
  });

  const updateDirective = useMutation({
    mutationFn: async ({ id, title, mission_log, priority }) => {
      const { data, error } = await supabase
        .from('directives')
        .update({ title, mission_log, priority })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries({ queryKey: ['directives'] });
      // Update UI Modal seketika tanpa harus menutupnya
      setActiveDirective(updatedData);
      toast.success("SYSTEM UPDATE", "Parameter misi berhasil diubah.");
    },
    onError: (error) => toast.error("ERROR", `Gagal mengubah parameter. ${error.message}`)
  });

  // 4. MUTASI BARU: Hapus Misi (Delete)
  const deleteDirective = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('directives')
        .delete()
        .eq('id', id);
      
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directives'] });
      // Tutup modal karena datanya sudah lenyap dari radar
      setActiveDirective(null); 
    },
    onError: (error) => toast.error("ERROR", `Gagal menghancurkan direktif. ${error.message}`)
  });

  const completeMission = useMutation({
    mutationFn: async ({ taskId, evidenceUrl }) => {
      // Logika Anda untuk mengupdate status di Supabase menjadi 'DONE'
      const { data, error } = await supabase
         .from('directives')
         .update({ status: 'DONE', evidence_link: evidenceUrl })
         .eq('id', taskId)
         .select()
         .single();

      if (error) throw error;
      return data; // Wajib me-return data agar bisa dibaca oleh onSuccess
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['directives']); 

      console.log("Mendeteksi misi selesai. Menembakkan sinyal ke mesin..."); 
      evaluateEvent.mutate({
        eventName: 'MISSION_COMPLETED',
        payload: {
  
          hasEvidence: !!data.evidence_link 
        }
      });
    }
  });

  return { engageDirective, completeDirective, updateDirective, deleteDirective, completeMission };
};