/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './apiConfig'

const ObjectFunctionApi = {
  createObjectFunction: async (body: any) => {
    const response = await api.post('/objectFunction', body);
    return response.data;
  },

  getObjectFunctionById: async (id: string) => {
    const response = await api.get(`/objectFunction/${id}`);
    return response.data;
  },

  getObjectFunctionsByNucleusId: async (id: string) => {
    const response = await api.get(`/objectFunction/nucleus/${id}`);
    return response.data;
  },

  deleteObjectFunctionById: async (id: string) => {
    const response = await api.delete(`/objectFunction/${id}`);
    return response.data; 
  }
}

export default ObjectFunctionApi;