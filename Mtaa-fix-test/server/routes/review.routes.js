import express from 'express';
import {
  leaveReview,
  updateReview,
  replyToReview,
  reportReview
} from '../controllers/review.controller.js';

import { verifyToken } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const router = express.Router();

// Regular users: leave or update reviews
router.post('/', verifyToken, requireRole('user'), leaveReview);
router.put('/:id', verifyToken, requireRole('user'), updateReview);

// Providers: reply to reviews
router.post('/reply/:id', verifyToken, requireRole('provider'), replyToReview);

// Providers or users: report reviews
router.post('/report/:id', verifyToken, requireRole('provider', 'user'), reportReview);

export default router;