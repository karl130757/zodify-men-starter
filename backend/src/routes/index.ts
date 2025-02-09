import { Router } from 'express';
import authRoutes from '../routes/authRoutes';
import userRoutes from '../routes/userRoutes';

const router = Router();
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
