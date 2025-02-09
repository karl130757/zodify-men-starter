import { UserSchema, domainName } from '../models/domain/user';
import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { validateRequest } from '../middlewares/validationMiddleware';
import { authenticateRequest } from '../middlewares/authenticationMiddleware';
import { rbacMiddleware } from '../middlewares/rbacMiddleware';

const router = Router();

router.get('/', getUsers);
router.post('/', validateRequest(UserSchema), rbacMiddleware(domainName), createUser);
router.get('/:id', authenticateRequest, getUserById);
router.patch('/:id', authenticateRequest, updateUser);
router.delete('/:id', authenticateRequest, deleteUser);

export default router;
