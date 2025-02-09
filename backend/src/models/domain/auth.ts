import { z } from 'zod';

const domainName = 'auth';

const AuthSchema = z.object({
	email: z.string().email('Invalid email format'),
	password: z.string().min(6, 'Password must be at least 6 characters')
});

type Auth = z.infer<typeof AuthSchema>;

const mapToDomain = (user: any): z.infer<typeof AuthSchema> => ({
	email: user.email,
	password: user.password
});

export { domainName, AuthSchema, Auth, mapToDomain };
