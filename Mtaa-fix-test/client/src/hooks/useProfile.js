import { useEffect, useState } from 'react';
import API from '../utils/api.js';

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/users/me');
      setProfile(res.data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      console.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading };
};

export default useProfile;