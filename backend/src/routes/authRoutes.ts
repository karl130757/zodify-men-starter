import { Router } from 'express';
import { AuthSchema } from '../models/domain/auth';
import { validateRequest } from '../middlewares/validationMiddleware';
import { login } from '../controllers/authConteoller';

const router = Router();

router.post('/login', validateRequest(AuthSchema), login);

export default router;
