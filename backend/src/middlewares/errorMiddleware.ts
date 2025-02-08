import { Request, Response, NextFunction } from 'express';
import { makeError } from '../utils/errors';

export function errorHandlerMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
	const { statusCode, error } = makeError(err);
	res.status(statusCode).json({ error });
}
