import express from 'express';
import {
  getAllUsers,
  getAllProviders,
  getAllReviews,
  deleteReview,
  deleteProvider,
  promoteToAdmin
} from '../controllers/admin.controller.js';

import { verifyToken } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const router = express.Router();

// All routes are admin-only
router.use(verifyToken, requireRole('admin'));

router.get('/users', getAllUsers);
router.get('/providers', getAllProviders);
router.get('/reviews', getAllReviews);

router.delete('/review/:id', deleteReview);
router.delete('/provider/:id', deleteProvider);
router.put('/promote/:id', promoteToAdmin);

export default router;