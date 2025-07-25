import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ReviewPage = () => {
  const { providerId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rating: 5,
    comment: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/reviews/${providerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage('Review submitted!');
      setTimeout(() => navigate(`/providers/${providerId}`), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <label className="block">
          Rating (1-5):
          <input
            type="number"
            name="rating"
            value={form.rating}
            min={1}
            max={5}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </label>
        <label className="block">
          Comment:
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            rows={4}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </label>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewPage;