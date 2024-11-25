import api from './apiConfig'

export const DigitizerApi = {
  getDigitizer: async () => {
    const response = await api.get('/digitizer');
    return response.data;
  },
  // api/v1/digitizer/search/name?searchTerm=sample
  searchDigitizer: async (searchTerm: string) => {
    const response = await api.get(`/digitizer/search/name?searchTerm=${searchTerm}`);
    return response.data;
  },
  
  createDigitizer: async (body: any) => {
    const response = await api.post('/digitizer', body);
    return response.data;
  },
  
  updateDigitizer: async (id: string, body: any) => {
    const response = await api.put(`/digitizer/${id}`, body);
    return response.data;
  },
  deleteDigitizer: async (id: string) => {
    const response = await api.delete(`/digitizer/${id}`);
    return response.data;
  },

  getDigitizerById: async (id: string) => {
    const response = await api.get(`/digitizer/${id}`);
    return response.data;
  }
};