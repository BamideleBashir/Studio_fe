/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './apiConfig'

const ApplicationApi = {
  createApplication: async (body: any) => {
    const response = await api.post('/nucleusApp', body);
    return response.data;
  },
};

export default ApplicationApi;