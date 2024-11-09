import axios from 'axios';

const API_URL = 'https://swift-share-backend-dipsankadariyas-projects.vercel.app';

export const uploadFile = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Upload error:', error.message);
    throw error;
  }
}