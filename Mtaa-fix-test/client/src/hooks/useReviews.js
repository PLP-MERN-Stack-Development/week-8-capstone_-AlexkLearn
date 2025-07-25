import { useEffect, useState } from 'react';
import API from '../utils/api.js';

const useReviews = (providerId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/providers/${providerId}`);
      setReviews(res.data.reviews || []);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      console.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (providerId) fetchReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerId]);

  return { reviews, loading };
};

export default useReviews;