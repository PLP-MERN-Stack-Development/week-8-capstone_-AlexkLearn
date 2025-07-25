import Provider from '../models/Provider.js';
import User from '../models/User.js';

export const createProfile = async (req, res) => {
  try {
    const { skill, location, description, photo } = req.body;

    const existing = await Provider.findOne({ user: req.user.id });
    if (existing) return res.status(409).json({ message: 'Profile already exists' });

    const newProfile = await Provider.create({
      user: req.user.id,
      skill,
      location,
      description,
      photo
    });

    await User.findByIdAndUpdate(req.user.id, { providerProfile: newProfile._id });

    res.status(201).json(newProfile);
  } catch {
    res.status(500).json({ message: 'Profile creation failed' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updated = await Provider.findOneAndUpdate({ user: req.user.id }, req.body, { new: true });
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ message: 'Update failed' });
  }
};

export const getMyProviderProfile = async (req, res) => {
  try {
    const profile = await Provider.findOne({ user: req.user.id }).populate('reviews');
    res.status(200).json(profile);
  } catch {
    res.status(500).json({ message: 'Could not fetch profile' });
  }
};

export const getAllProviders = async (req, res) => {
  try {
    const { skill, location } = req.query;
    const query = {};

    if (skill) query.skill = new RegExp(skill, 'i');
    if (location) query.location = new RegExp(location, 'i');

    
    // const providers = await Provider.find(query).populate('user', 'name');
    // res.status(200).json(providers);

    // Add pagination logic in controller
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const total = await Provider.countDocuments(query);
    const providers = await Provider.find(query)
      .populate('user', 'name')
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      providers,
      totalPages: Math.ceil(total / limit)
    });


  } catch {
    res.status(500).json({ message: 'Failed to load providers' });
  }
};

export const getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id).populate('reviews');
    if (!provider) return res.status(404).json({ message: 'Provider not found' });
    res.status(200).json(provider);
  } catch {
    res.status(500).json({ message: 'Error fetching provider' });
  }
};

export const updateProfileImage = async (userId, imageUrl) => {
  return await Provider.findOneAndUpdate(
    { user: userId },
    { photo: imageUrl },
    { new: true }
  );
};