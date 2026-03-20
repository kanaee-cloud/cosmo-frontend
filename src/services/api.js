import { supabase } from './supabase';
import { toast } from '../hooks/useToast';

const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'http://localhost:3000/api';

export const api = {
  // Helper to get auth header
  getHeaders: async () => {
    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;
    
    if (!token) {
        console.warn("[API] No active session found. Request will likely fail.");
    } else {
        console.log(`[API] Attaching auth token: ${token.substring(0, 10)}...`);
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token || ''}`
    };
  },

  // Generate Quiz (Learning/Work)
  generateQuiz: async (missionLog, difficulty = 'medium') => {
    const headers = await api.getHeaders();
    const response = await fetch(`${WORKER_URL}/quiz`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ mission_log: missionLog, difficulty })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Failed to generate quiz';
      toast.error('Quiz Generation Error', errorMessage);
      throw new Error(errorMessage);
    }
    
    return response.json();
  },

  // Validate Mission (General/Physical)
  validateMission: async (title, description, imageUrl, directiveId) => {
    const headers = await api.getHeaders();
    const response = await fetch(`${WORKER_URL}/validate`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ title, description, imageUrl, directive_id: directiveId })
    });

    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Failed to validate mission';
        toast.error('Mission Validation Error', errorMessage);
        throw new Error(errorMessage);
    }

    return response.json();
  }
};
