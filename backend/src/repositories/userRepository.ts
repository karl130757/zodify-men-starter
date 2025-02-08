import { User, mapToDomain } from '../models/domain/user';
import { UserRepositoryInterface } from '../interfaces/userRepositoryInterface';
import { UserModel } from '../models/database/userModel';

export class UserRepository implements UserRepositoryInterface {
	async findAll(): Promise<User[]> {
		return (await UserModel.find().lean()).map(mapToDomain);
	}

	async findById(id: string): Promise<User | null> {
		const user = await UserModel.findById(id).exec();
		return user ? mapToDomain(user) : null;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await UserModel.findOne({ email }).exec();
		return user ? mapToDomain(user) : null;
	}

	async create(userData: Partial<User>): Promise<User> {
		const newUser = new UserModel(userData);
		const savedUser = await newUser.save();
		return mapToDomain(savedUser);
	}

	async update(id: string, userData: Partial<User>): Promise<User | null> {
		const updatedUser = await UserModel.findByIdAndUpdate(id, userData, { new: true }).exec();
		return updatedUser ? mapToDomain(updatedUser) : null;
	}

	async delete(id: string): Promise<void> {
		await UserModel.findByIdAndDelete(id).exec();
	}
}
