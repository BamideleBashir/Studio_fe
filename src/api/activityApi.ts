/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './apiConfig'

const ActivityApi = {
  createActivity: async (body: any) => {
    const response = await api.post('/nucleusActivity', body);
    return response.data;
  },
};

export default ActivityApi;