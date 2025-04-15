/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './apiConfig'

const ActivityApi = {
  createActivity: async (body: any) => {
    const response = await api.post('/activity', body);
    return response.data;
  },

  getAllActivity: async () => {
    const response = await api.get('/activity');
    return response.data;
  },

  deleteActivity: async (id: string) => {
    const response = await api.delete(`/activity/${id}`);
    return response.data;
  }
};

export default ActivityApi;