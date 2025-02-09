import mongoose from 'mongoose';
import { RoleModel } from './models/database/roleModel';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Role-Based Access Control (RBAC) Configuration
 *
 * This configuration defines role-based permissions within the system.
 * Each role contains specific permissions for accessing and modifying data.
 *
 * Structure:
 * - Each role has a `name` and a set of `permissions`.
 * - `permissions` define the domain (resource) a role can interact with,
 *   the allowed actions, and the fields the role can view.
 *
 * Roles:
 * 1. Admin:
 *    - Has full access to the `user` domain.
 *    - Allowed Actions: Create, Read, Update, Delete, Search.
 *    - Can view all user-related fields, including sensitive information (e.g., password).
 *
 * 2. User:
 *    - Limited access to the `user` domain.
 *    - Allowed Actions: Read, Update, Search.
 *    - Can view user details except for sensitive information like passwords.
 *
 * Example Usage:
 * - The system can use this configuration to enforce access control.
 * - When a user performs an action, their role's permissions should be checked against this setup.
 */

const roleSetup = [
	{
		name: 'Admin',
		permissions: [
			{
				domainName: 'user',
				actions: ['create:user', 'read:user', 'update:user', 'delete:user'],
				fields: ['view:id', 'view:username', 'view:email', 'view:password', 'view:role', 'view:createdAt', 'view:updatedAt']
			}
		]
	},
	{
		name: 'User',
		permissions: [
			{
				domainName: 'user',
				actions: ['read:user'],
				fields: ['view:id', 'view:username', 'view:email', 'view:createdAt', 'view:updatedAt']
			}
		]
	}
];

const mongoUri = process.env.MONGODB_URI as string;
const mongoDatabaseName = process.env.MONGODB_DBNAME as string;

const buildRoles = async () => {
	try {
		console.log('🔄 Connecting to MongoDB...');
		await mongoose.connect(mongoUri, {
			dbName: mongoDatabaseName
		});
		console.log('✅ Successfully connected to MongoDB');

		// Update existing roles or create if not exists
		console.log('🔄 Updating/Inserting roles...');
		for (const role of roleSetup) {
			await RoleModel.findOneAndUpdate(
				{ name: role.name }, // Search for an existing role by name
				{ $set: { permissions: role.permissions } }, // Update permissions
				{ upsert: true, new: true } // Create if not exists & return new doc
			);
		}
		console.log('✅ Role update/creation completed successfully');
	} catch (error) {
		console.error('❌ Error updating database:', error);
	} finally {
		console.log('🔌 Closing database connection...');
		await mongoose.connection.close();
		console.log('✅ Database connection closed');
	}
};
// Execute the script
buildRoles();
