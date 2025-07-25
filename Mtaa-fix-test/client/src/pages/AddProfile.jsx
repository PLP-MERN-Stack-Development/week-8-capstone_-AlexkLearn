/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUpload from '../hooks/useUpload.js';
import useAuth from '../hooks/useAuth.js';
import API from '../utils/api.js';

const AddProfile = () => {
  const { user } = useAuth();
  const { uploadImage, uploading } = useUpload();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: '',
    skill: '',
    location: '',
    description: '',
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let photoUrl = '';

      if (photoFile) {
        photoUrl = await uploadImage(photoFile);
      }

      const res = await API.post('/providers', {
        ...form,
        photo: photoUrl,
      });

      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add/Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="input" />
        <input name="skill" value={form.skill} onChange={handleChange} placeholder="Skill (e.g. Mechanic)" className="input" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location (e.g. Kibera)" className="input" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short Bio" rows="3" className="input" />

        <input type="file" accept="image/*" onChange={handlePhoto} className="input" />
        {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}

        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="btn-primary w-full" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default AddProfile;