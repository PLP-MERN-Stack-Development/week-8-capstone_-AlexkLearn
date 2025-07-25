import User from '../models/User.js';
import Review from '../models/Review.js';
import Provider from '../models/Provider.js';

export const getAllUsers = async (_, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

export const getAllProviders = async (_, res) => {
  const providers = await Provider.find().populate('user', 'name');
  res.json(providers);
};

export const getAllReviews = async (_, res) => {
  const reviews = await Review.find().populate('author', 'name');
  res.json(reviews);
};

export const deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: 'Review deleted' });
};

export const deleteProvider = async (req, res) => {
  const provider = await Provider.findByIdAndDelete(req.params.id);
  if (provider) await User.findByIdAndUpdate(provider.user, { providerProfile: null });
  res.json({ message: 'Provider account deleted' });
};

export const promoteToAdmin = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { role: 'admin' });
  res.json({ message: 'User promoted to admin' });
};