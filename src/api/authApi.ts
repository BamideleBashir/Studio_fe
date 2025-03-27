/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './apiConfig'

const AuthApi = {
  login: async (emailOrByteId: string, password: string) => {
    const response = await api.post('/auth/login', { emailOrByteId, password });
    return response.data;
  },
  register: async (body: any) => {
    const response = await api.post('/auth/signup', body);
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  me: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export default AuthApi;
