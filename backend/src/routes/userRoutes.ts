import { UserSchema } from '../models/domain/user';
import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { validateRequest } from '../middlewares/validationMiddleware';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', validateRequest(UserSchema), createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
