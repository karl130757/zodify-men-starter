import { Request, Response, NextFunction } from 'express';
import { Role } from '../models/domain/role';
import { ForbiddenError } from '../utils/errors';

const methodToAction: Record<string, string> = {
	GET: 'read',
	POST: 'create',
	PUT: 'update',
	PATCH: 'update',
	DELETE: 'delete'
};

export const rbacMiddleware = (domain: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const user = (req as any).user;

		if (!user || !user.role) {
			throw new ForbiddenError('Access Denied: No role assigned');
		}

		const role: Role = { ...user.role };

		const action = `${methodToAction[req.method]}:${domain}`;
		const permission = role.permissions.find((perm) => perm.domainName === domain);

		if (!permission) {
			throw new ForbiddenError(`Access Denied: No access to ${domain}`);
		}

		if (!permission.actions.includes(action)) {
			throw new ForbiddenError(`Access Denied: Cannot perform '${action}' on ${domain}`);
		}

		(req as any).allowedFields = permission.fields.map((field) => field.replace('view:', ''));

		next();
	};
};
