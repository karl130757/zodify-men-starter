import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
		} catch (error) {
			next(error);
		}
	};
};
