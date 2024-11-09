import axios from 'axios';

const API_URL = 'https://swift-share-backend-dipsankadariyas-projects.vercel.app';

export const uploadFile = async (data) => {
  try {
    let response = await axios.post(`${API_URL}/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error while calling the API ', error.message);
    throw error;
  }
}