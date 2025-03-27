/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './apiConfig'

export const NucleusApi = {
  getNucleus: async (query?: any) => {
    const response = await api.get('/nucleus', { params: query });
    return response.data;
  },

  getNucleusById: async (id: string) => {
    const response = await api.get(`/nucleus/${id}`);
    return response.data;
  },
  
  createNucleus: async (body: any) => {
    const response = await api.post('/nucleus', body);
    return response.data;
  },
  updateNucleus: async (id: string, body: any) => {
    const response = await api.put(`/nucleus/${id}`, body);
    return response.data;
  },
  deleteNucleus: async (id: string) => {
    const response = await api.delete(`/nucleus/${id}`);
    return response.data;
  },
};