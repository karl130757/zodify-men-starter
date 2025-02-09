import { Router } from 'express';
import { AuthSchema } from '../models/domain/auth';
import { validateRequest } from '../middlewares/validationMiddleware';
import { authenticateRequest } from '../middlewares/authenticationMiddleware';
import { login, regenerateToken } from '../controllers/authConteoller';

const router = Router();

router.post('/login', validateRequest(AuthSchema), login);
router.post('/regenerate-token', authenticateRequest, regenerateToken);

export default router;
