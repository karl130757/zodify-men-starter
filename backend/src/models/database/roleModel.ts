import mongoose, { Schema, Document } from 'mongoose';

interface IPermission {
	domainName: string;
	actions: string[];
	fields: string[];
}

export interface IRole extends Document {
	id: string;
	name: string;
	permissions: IPermission[];
	createdAt: Date;
	updatedAt: Date;
}

const PermissionSchema = new Schema<IPermission>({
	domainName: { type: String, required: true },
	actions: { type: [String], required: true },
	fields: { type: [String], required: true }
});

const RoleSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		permissions: { type: [PermissionSchema], required: true }
	},
	{
		toJSON: {
			virtuals: true,
			transform: function (doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
				return ret;
			}
		},
		timestamps: true
	}
);

export const RoleModel = mongoose.model<IRole>('Role', RoleSchema);
