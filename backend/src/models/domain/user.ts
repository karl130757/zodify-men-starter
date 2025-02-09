import { z } from 'zod';

const domainName = 'user';

const UserSchema = z.object({
	id: z.string().optional(),
	email: z.string().email('Invalid email format').optional(),
	username: z.string().min(2, 'Name must be at least 2 characters').optional(),
	password: z.string().min(6, 'Password must be at least 6 characters').optional(),
	role: z.string().optional(),
	createdAt: z
		.date()
		.default(() => new Date())
		.optional(),
	updatedAt: z
		.date()
		.default(() => new Date())
		.optional()
});

type User = z.infer<typeof UserSchema>;

const mapToDomain = (user: any): z.infer<typeof UserSchema> => ({
	id: user._id.toString(),
	username: user.username,
	email: user.email,
	password: user.password,
	role: user.role,
	createdAt: user.createdAt || new Date(),
	updatedAt: user.updatedAt || new Date()
});

export { domainName, UserSchema, User, mapToDomain };
