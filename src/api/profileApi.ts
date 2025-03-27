/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './apiConfig'

export const ProfileApi = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  updateProfile: async (body: any) => {
    const response = await api.put('/profile', body);
    return response.data;
  },

  uploadProfileImage: async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.put('/profile/picture', formData);
    return response.data;
  }
};