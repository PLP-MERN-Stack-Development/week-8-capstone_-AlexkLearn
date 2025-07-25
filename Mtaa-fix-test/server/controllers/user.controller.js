import User from '../models/User.js';

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: 'Account deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete account' });
  }
};