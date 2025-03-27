/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './apiConfig'

export const ScapeApi = {
  create: async (body: any) => {
    const response = await api.post('/scape', body);
    return response.data; 
  },
  getYourScapes: async () => {
    const response = await api.get('/scape');
    return response.data;
  },
  getScapeById: async (id: string) => {
    const response = await api.get(`/scape/${id}`);
    return response.data; 
  }
};


