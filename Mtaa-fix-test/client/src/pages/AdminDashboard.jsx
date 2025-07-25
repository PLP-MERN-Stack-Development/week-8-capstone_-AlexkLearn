/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import API from '../utils/api.js';
import Loader from '../components/Loader.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import { isAdmin } from '../utils/role.js';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!isAdmin()) return <p>Access denied</p>;

  const fetchAll = async () => {
    try {
      const [u, p, r] = await Promise.all([
        API.get('/admin/users'),
        API.get('/admin/providers'),
        API.get('/admin/reviews'),
      ]);
      setUsers(u.data);
      setProviders(p.data);
      setReviews(r.data);
    } catch {
      alert('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold">Users</h2>
        <ul className="list-disc ml-6 text-sm">
          {users.map(u => <li key={u._id}>{u.name} - {u.role}</li>)}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold">Providers</h2>
        <ul className="list-disc ml-6 text-sm">
          {providers.map(p => <li key={p._id}>{p.user.name} - {p.skill} ({p.location})</li>)}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Reviews</h2>
        <ul className="list-disc ml-6 text-sm">
          {reviews.map(r => (
            <li key={r._id}>
              {r.author?.name}: {r.content}
              <button
                onClick={() => API.delete(`/admin/review/${r._id}`).then(fetchAll)}
                className="ml-2 text-red-600 text-xs underline"
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default () => (
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminDashboard />
  </ProtectedRoute>
);