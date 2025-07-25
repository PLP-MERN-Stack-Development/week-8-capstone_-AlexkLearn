/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../utils/api.js';
import ReviewCard from '../components/ReviewCard.jsx';
import useAuth from '../hooks/useAuth.js';
import Loader from '../components/Loader.jsx';

const ProviderProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [provider, setProvider] = useState(null);
  const [myReview, setMyReview] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProvider = async () => {
    try {
      const res = await API.get(`/providers/${id}`);
      setProvider(res.data);
      const mine = res.data.reviews.find((r) => r.author._id === user?.id);
      setMyReview(mine?.content || '');
    } catch {
      alert('Failed to load provider');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/reviews', { providerId: id, content: myReview });
      fetchProvider(); // reload
    } catch (err) {
      // try update instead
      try {
        await API.put(`/reviews/${provider.reviews.find(r => r.author._id === user.id)._id}`, {
          content: myReview
        });
        fetchProvider();
      } catch {
        alert('Review failed');
      }
    }
  };

  const handleReply = async (reviewId) => {
    const reply = prompt('Enter your reply:');
    if (!reply) return;
    try {
      await API.post(`/reviews/reply/${reviewId}`, { reply });
      fetchProvider();
    } catch {
      let error = new Error('Reply failed');
      throw error;
    }
  };

  useEffect(() => {
    fetchProvider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{provider.user.name}</h2>
      <p className="text-sm text-gray-600">{provider.skill} - {provider.location}</p>
      <p className="text-gray-700 mt-2">{provider.description}</p>
      <img src={provider.photo} alt="" className="w-48 mt-4 rounded shadow" />

      {user?.role === 'user' && (
        <form onSubmit={handleSubmitReview} className="mt-6 space-y-2">
          <textarea
            className="input w-full"
            value={myReview}
            onChange={(e) => setMyReview(e.target.value)}
            placeholder="Leave a review"
            rows="3"
          />
          <button className="btn-primary">Submit Review</button>
        </form>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Reviews</h3>
        {provider.reviews.length === 0 && <p>No reviews yet.</p>}
        <div className="space-y-4">
          {provider.reviews.map((review) => (
            <div key={review._id}>
              <ReviewCard review={review} />

              {provider.role === 'provider' && (
                <div className="mt-2 space-x-2">
                  {!review.reply && (
                    <button
                      className="text-xs text-blue-600 underline"
                      onClick={() => handleReply(review._id)}
                    >
                      Reply
                    </button>
                  )}
                  <button
                    className="text-xs text-red-600 underline"
                    onClick={() =>
                      API.post(`/reviews/report/${review._id}`).then(fetchProvider)
                    }
                  >
                    Report
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
