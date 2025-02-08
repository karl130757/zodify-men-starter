import { Response } from 'express';

export const successResponse = (res: Response, data: any, message = 'Request successful', statusCode = 200, metadata: any = null) => {
	return res.status(statusCode).json({
		status: 'success',
		message,
		data,
		metadata: metadata || undefined, // Optional metadata (e.g., pagination info)
		timestamp: new Date().toISOString() // Add timestamp for consistency
	});
};

export const errorResponse = (res: Response, error: any, statusCode = 500) => {
	return res.status(statusCode).json({
		success: false,
		message: error.message || 'An unexpected error occurred',
		details: error.details || null,
		timestamp: new Date().toISOString()
	});
};
