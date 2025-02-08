import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

class CustomError extends Error {
	constructor(name: string, message: string) {
		super(message);
		this.name = name;
		this.message = message;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class BadRequestError extends CustomError {
	constructor(message: string = 'Bad Request') {
		super('BadRequestError', message);
	}
}

export class UnauthorizedError extends CustomError {
	constructor(message: string = 'Unauthorized') {
		super('UnauthorizedError', message);
	}
}

export class ForbiddenError extends CustomError {
	constructor(message: string = 'Forbidden') {
		super('ForbiddenError', message);
	}
}

export class NotFoundError extends CustomError {
	constructor(message: string = 'Not Found') {
		super('NotFoundError', message);
	}
}

export class ConflictError extends CustomError {
	constructor(message: string = 'Conflict') {
		super('ConflictError', message);
	}
}

export class InternalServerError extends CustomError {
	constructor(message: string = 'Internal Server Error') {
		super('InternalServerError', message);
	}
}

export class ServiceUnavailableError extends CustomError {
	constructor(message: string = 'Service Unavailable') {
		super('ServiceUnavailableError', message);
	}
}

export class GatewayTimeoutError extends CustomError {
	constructor(message: string = 'Gateway Timeout') {
		super('GatewayTimeoutError', message);
	}
}

export class TooManyRequestsError extends CustomError {
	constructor(message: string = 'Too Many Requests') {
		super('TooManyRequestsError', message);
	}
}

export function makeError(error: Error) {
	const defaultError = {
		name: error.name,
		message: error.message
	};

	if (error instanceof ZodError) {
		return {
			statusCode: StatusCodes.BAD_REQUEST,
			error: { ...defaultError, issues: error.issues }
		};
	}

	const errorMap: Record<string, number> = {
		BadRequestError: StatusCodes.BAD_REQUEST,
		UnauthorizedError: StatusCodes.UNAUTHORIZED,
		ForbiddenError: StatusCodes.FORBIDDEN,
		NotFoundError: StatusCodes.NOT_FOUND,
		ConflictError: StatusCodes.CONFLICT,
		InternalServerError: StatusCodes.INTERNAL_SERVER_ERROR,
		ServiceUnavailableError: StatusCodes.SERVICE_UNAVAILABLE,
		GatewayTimeoutError: StatusCodes.GATEWAY_TIMEOUT,
		TooManyRequestsError: StatusCodes.TOO_MANY_REQUESTS
	};

	const statusCode = errorMap[error.name as keyof typeof errorMap] || StatusCodes.INTERNAL_SERVER_ERROR;

	return { statusCode, error: defaultError };
}
