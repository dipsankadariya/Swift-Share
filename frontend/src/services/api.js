import axios from 'axios';

const API_URL = 'https://swift-share-218z.onrender.com/';

export const uploadFile = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload error:', error.message);
    throw error;
  }
}
