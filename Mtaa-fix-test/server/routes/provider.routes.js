import express from 'express';
import {
  createProfile,
  updateProfile,
  getAllProviders,
  getProviderById,
  getMyProviderProfile,
  updateProfileImage
} from '../controllers/provider.controller.js';

import upload from '../middleware/upload.middleware.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const router = express.Router();

// Public access
router.get('/', getAllProviders);
router.get('/:id', getProviderById);

// Provider only
router.post('/', verifyToken, requireRole('provider'), createProfile);
router.put('/', verifyToken, requireRole('provider'), updateProfile);
router.get('/me', verifyToken, requireRole('provider'), getMyProviderProfile);

router.post(
  '/upload',
  verifyToken,
  requireRole('provider'),
  upload.single('photo'),
  async (req, res) => {
    try {
      const imageUrl = req.file.path; // Cloudinary URL
      const provider = await updateProfileImage(req.user.id, imageUrl);
      res.status(200).json({ message: 'Profile image updated', photo: provider.photo });
    } catch {
      res.status(500).json({ message: 'Upload failed' });
    }
  }
);

export default router;