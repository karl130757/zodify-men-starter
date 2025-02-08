import { z } from 'zod';

const domainName = 'role';

const RoleSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	permissions: z.array(
		z.object({
			domainName: z.string(),
			actions: z.array(z.string()),
			fields: z.array(z.string())
		})
	)
});

type Role = z.infer<typeof RoleSchema>;

const mapToDomain = (role: any): z.infer<typeof RoleSchema> => ({
	id: role._id.toString(),
	name: role.name,
	permissions: role.permissions
});

export { domainName, RoleSchema, Role, mapToDomain };

// Chore: Implement Seed and permission builder script.
// const ROLE = {
// 	id: 'roleuuid',
// 	name: 'rolename',
// 	permissions: [
// 		{
// 			domainName: 'user',
// 			actions: ['create:user', 'read:user', 'update:user', 'delete:user', 'search:user'],
// 			fields: ['view:id', 'view:email', 'view:password', 'view:roleId', 'view:createdAt', 'view:updatedAt']
// 		}
// 	]
// };
