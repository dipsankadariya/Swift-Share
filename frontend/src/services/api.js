export const uploadFile = async (data, onUploadProgress) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 30000,
      onUploadProgress
    });
    return response.data;
  } catch (error) {
    console.error('Upload error:', error.message);
    throw error;
  }
};
