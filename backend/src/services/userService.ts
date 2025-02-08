import { User } from '../models/domain/user';
import { UserRepository } from '../repositories/userRepository';
import { UserRepositoryInterface } from '../interfaces/userRepositoryInterface';

const userRepository: UserRepositoryInterface = new UserRepository();

export const getAllUsers = async (): Promise<User[]> => {
	return await userRepository.findAll();
};

export const getUserById = async (id: string): Promise<User | null> => {
	return await userRepository.findById(id);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
	return await userRepository.findByEmail(email);
};

export const createUser = async (newUserData: User): Promise<User> => {
	return await userRepository.create(newUserData);
};

export const updateUser = async (id: string, updatePayload: User): Promise<User | null> => {
	return await userRepository.update(id, { ...updatePayload });
};

export const deleteUser = async (id: string): Promise<string> => {
	const user = await userRepository.findById(id);

	if (!user) {
		throw new Error('User not found');
	}

	await userRepository.delete(id);
	return `User with ID ${id} successfully deleted`;
};
