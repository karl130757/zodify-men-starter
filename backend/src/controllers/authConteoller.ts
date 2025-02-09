import { Request, Response, NextFunction } from 'express';
import { Auth } from '../models/domain/auth';
import * as userService from '../services/userService';
import { NotFoundError, BadRequestError } from '../utils/errors';
import { successResponse } from '../utils/response';
import { config } from '../constants/global';
import PasswordUtility from '../utils/password';
import TokenUtility from '../utils/token';

const passwordUtility = new PasswordUtility(config.bcrypt.rounds);
const tokenizer = new TokenUtility(config.jwt.secret);

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const auth: Auth = { ...req.body };
		const user = await userService.getUserByEmail(auth.email);

		if (!user) {
			throw new NotFoundError('Invalid email or password');
		}

		const hashedPassword: string = user.password as string;
		if (!(await passwordUtility.verifyPassword(auth.password, hashedPassword))) {
			throw new NotFoundError('Invalid password');
		}

		const token: string = tokenizer.generateToken(user);
		const refreshToken: string = tokenizer.generateToken(user, { expiresIn: '30d' });
		successResponse(req, res, { token, refreshToken }, 'User authenticated successfully');
	} catch (error) {
		next(error);
	}
};

export const regenerateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const decodedUser = (req as any).user;
		const user = await userService.getUserByEmail(decodedUser.email);
		if (!user) {
			throw new BadRequestError('Unable to regenerate the token');
		}
		const token: string = tokenizer.generateToken({ ...user });
		successResponse(req, res, { token }, 'token regenerated successfully');
	} catch (error) {
		next(error);
	}
};
