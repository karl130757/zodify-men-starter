import { UserSchema, domainName } from '../models/domain/user';
import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { validateRequest } from '../middlewares/validationMiddleware';
import { authenticateRequest } from '../middlewares/authenticationMiddleware';
import { rbacMiddleware } from '../middlewares/rbacMiddleware';

const router = Router();

router.get('/', authenticateRequest, rbacMiddleware(domainName), getUsers);
router.post('/', validateRequest(UserSchema), authenticateRequest, rbacMiddleware(domainName), createUser);
router.get('/:id', authenticateRequest, rbacMiddleware(domainName), getUserById);
router.patch('/:id', validateRequest(UserSchema), authenticateRequest, rbacMiddleware(domainName), updateUser);
router.delete('/:id', authenticateRequest, rbacMiddleware(domainName), deleteUser);

export default router;
