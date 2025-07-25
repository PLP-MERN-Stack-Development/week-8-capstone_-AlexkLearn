/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import API from '../utils/api.js';

const useProviders = (filters = {}, page = 1) => {
  const [providers, setProviders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProviders = async () => {
    try {
      const res = await API.get('/providers', {
        params: { ...filters, page }
      });
      setProviders(res.data.providers);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('Failed to load providers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [filters, page]);

  return { providers, totalPages, loading };
};

export default useProviders;