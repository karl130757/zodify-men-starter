import { z } from 'zod';

const domainName = 'role';

const RoleSchema = z.object({
	id: z.string().uuid({ message: 'Invalid UUID format for ID.' }),
	name: z.string().min(1, { message: 'Role name is required.' }),
	permissions: z
		.array(
			z.object({
				domainName: z.string().min(1, { message: 'Domain name is required.' }),
				actions: z.array(z.string().min(1, { message: 'Action cannot be empty.' })).min(1, { message: 'At least one action is required.' }),
				fields: z.array(z.string().min(1, { message: 'Field cannot be empty.' })).min(1, { message: 'At least one field is required.' })
			})
		)
		.min(1, { message: 'At least one permission entry is required.' })
});
type Role = z.infer<typeof RoleSchema>;

const mapToDomain = (role: any): z.infer<typeof RoleSchema> => ({
	id: role._id.toString(),
	name: role.name,
	permissions: role.permissions
});

export { domainName, RoleSchema, Role, mapToDomain };
