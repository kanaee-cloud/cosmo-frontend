import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';

export const useGenerateQuiz = () => {
  return useMutation({
    mutationFn: async ({ missionLog, difficulty }) => {
      return await api.generateQuiz(missionLog, difficulty);
    }
  });
};
