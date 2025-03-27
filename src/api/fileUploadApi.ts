/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './apiConfig'

const FileUploadApiApi = {
  upload: async (file: any) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export default FileUploadApiApi;