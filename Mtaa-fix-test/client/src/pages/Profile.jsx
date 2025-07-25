import useProfile from '../hooks/useProfile.js';
import useReviews from '../hooks/useReviews.js';
import ProfileHeader from '../components/ProfileHeader.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import Loader from '../components/Loader.jsx';

const Profile = () => {
  const { profile, loading } = useProfile();
  const isProvider = profile?.role === 'provider';
  const { reviews, loading: loadingReviews } = useReviews(profile?.providerProfile?._id);

  if (loading) return <Loader />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ProfileHeader
        name={profile.name}
        role={profile.role}
        photo={profile.providerProfile?.photo}
      />

      {isProvider && (
        <>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">My Reviews</h3>
            {loadingReviews ? (
              <Loader />
            ) : (
              <div className="space-y-3">
                {reviews.length === 0 && <p>No reviews yet.</p>}
                {reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;