import { supabase } from './supabase';

const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'http://localhost:3000/api';

export const api = {
  // Helper to get auth header
  getHeaders: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token || ''}`
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
      throw new Error(errorData.message || 'Failed to generate quiz');
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
        throw new Error(errorData.message || 'Failed to validate mission');
    }

    return response.json();
  }
};
