/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './apiConfig'

export const ScapeApi = {  
  create: async (body: any) => {
    const response = await api.post('/scape', body);
    return response.data;
  },
  getYourScapes: async () => {
    const response = await api.get('/scape/user/get');
    return response.data;
  }
};