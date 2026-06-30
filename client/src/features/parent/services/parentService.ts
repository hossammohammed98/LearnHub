import { apiClient } from '@/services/apiClient';
import { AddChildPayload, ParentApiResponse, ParentOverview } from '../types';

export const parentService = {
  getOverview: async (): Promise<ParentApiResponse<ParentOverview>> => {
    const response = await apiClient.get<ParentApiResponse<ParentOverview>>('/parent/me');
    return response.data;
  },

  addChild: async (payload: AddChildPayload): Promise<ParentApiResponse<{ studentId: string; user: { id: string } }>> => {
    const response = await apiClient.post<ParentApiResponse<{ studentId: string; user: { id: string } }>>('/parent/children', payload);
    return response.data;
  },
};
