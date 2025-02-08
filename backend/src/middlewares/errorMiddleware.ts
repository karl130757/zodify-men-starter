import { Request, Response, NextFunction } from 'express';
import { makeError } from '../utils/errors';
import { errorResponse } from '../utils/response';

export function errorHandlerMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
	const { statusCode, error } = makeError(err);
	errorResponse(res, error, statusCode);
}
