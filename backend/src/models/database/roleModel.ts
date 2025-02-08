import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPermission {
	domainName: string;
	actions: string[];
	fields: string[];
}

interface IRole extends Document {
	id: string;
	name: string;
	permissions: IPermission[];
}

const PermissionSchema = new Schema<IPermission>({
	domainName: { type: String, required: true },
	actions: { type: [String], required: true },
	fields: { type: [String], required: true }
});

const RoleSchema = new Schema<IRole>({
	name: { type: String, required: true },
	permissions: { type: [PermissionSchema], required: true }
});

export const RoleModel: Model<IRole> = mongoose.model<IRole>('Role', RoleSchema);
