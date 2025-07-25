import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ phone: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);

      login({
        token: res.data.token,
        role: res.data.user.role,
        id: res.data.user.id,
      });

      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="phone" onChange={handleChange} placeholder="Phone or Email" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="bg-lime-400 hover:bg-lime-500 text-white font-semibold py-2 px-4 rounded transition w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;