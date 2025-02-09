import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface User extends Document {
	id: string;
	username: string;
	email: string;
	password: string;
	role: ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema: Schema = new Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		role: { type: Schema.Types.ObjectId, ref: 'Role', required: true }
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

export const UserModel = mongoose.model<User>('User', UserSchema);
