import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import ImageUpload from '../components/ImageUpload.jsx';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', phone: '', email: '', password: '', role: 'user'
  });
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', {
        ...form,
        photo: photoUrl,
      });

      login({
        token: res.data.token,
        role: res.data.user.role,
        id: res.data.user.id,
      });

      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} placeholder="Name" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input name="phone" onChange={handleChange} placeholder="Phone" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input name="email" onChange={handleChange} placeholder="Email (optional)" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input name="password" onChange={handleChange} type="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <select name="role" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="user">User</option>
          <option value="provider">Service Provider</option>
        </select>

        <ImageUpload onUpload={(url) => setPhotoUrl(url)} />

        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;