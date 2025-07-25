import express from 'express';
import {
  getMyProfile,
  updateMyProfile,
  deleteAccount
} from '../controllers/user.controller.js';

import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/me', verifyToken, getMyProfile);
router.put('/me', verifyToken, updateMyProfile);
router.delete('/me', verifyToken, deleteAccount);

export default router;