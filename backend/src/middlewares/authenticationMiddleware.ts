import { NextFunction, Request, Response } from 'express';
import tokenUtility from '../utils/token';
import { ForbiddenError } from '../utils/errors';
import { config } from '../constants/global';

const tokenizer = new tokenUtility(config.jwt.secret);

export const authenticateRequest = (req: Request, res: Response, next: NextFunction): void => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new ForbiddenError('Authorization token is missing or invalid');
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = tokenizer.verifyToken(token);
		(req as any).user = decoded;
		next();
	} catch (error) {
		next(error);
	}
};
