import { useState } from 'react';
import API from '../utils/api.js';

const useUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file) => {
    if (!file) return null;
    setUploading(true);

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const res = await API.post('/providers/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data.photo;
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      console.error('Upload failed');
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
};

export default useUpload;