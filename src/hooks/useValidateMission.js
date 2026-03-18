import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';

export const useValidateMission = () => {
  return useMutation({
    mutationFn: async ({ title, description, imageUrl, directiveId }) => {
      return await api.validateMission(title, description, imageUrl, directiveId);
    }
  });
};
