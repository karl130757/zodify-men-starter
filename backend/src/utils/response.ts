import { Request, Response } from 'express';

// Utility function to filter response data based on allowed fields
function filterResponseData<T extends Record<string, any>>(data: T | T[], allowedFields: string[]): T | T[] {
	if (Array.isArray(data)) {
		return data.map((item) => filterResponseData(item, allowedFields)) as T[];
	} else if (typeof data === 'object' && data !== null) {
		return Object.keys(data).reduce((filtered: Record<string, any>, key: string) => {
			if (allowedFields.includes(key)) {
				filtered[key] = data[key];
			}
			return filtered;
		}, {}) as T;
	}
	return data;
}

export const successResponse = (req: Request, res: Response, data: any, message = 'Request successful', statusCode = 200, metadata: any = null) => {
	// Get allowed fields from RBAC middleware
	const allowedFields = (req as any).allowedFields;

	// Filter data if allowedFields exist
	if (allowedFields && Array.isArray(allowedFields)) {
		data = filterResponseData(data, allowedFields);
	}

	return res.status(statusCode).json({
		success: true,
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
