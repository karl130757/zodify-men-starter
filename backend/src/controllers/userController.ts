import { User } from '../models/domain/user';
import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users = await userService.getAllUsers();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: 'Failed to retrieve users' });
	}
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	try {
		const user = await userService.getUserById(id);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Failed to retrieve user' });
	}
};

export const getUserByToken = async (req: Request, res: Response): Promise<void> => {
	const { id } = (req as any).user;

	try {
		const user = await userService.getUserById(id);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Failed to retrieve user' });
	}
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
	const { username, email, password } = req.body;
	const userToCreate: User = { username, email, password };
	try {
		const newUser = await userService.createUser(userToCreate);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ error: 'Failed to create user' });
	}
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const { username, email, password } = req.body;
	const dataToUpdate: User = { username, email, password };
	try {
		const updatedUser = await userService.updateUser(id, dataToUpdate);
		if (updatedUser) {
			res.status(200).json(updatedUser);
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		res.status(400).json({ error: 'Failed to update user' });
	}
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	try {
		const message = await userService.deleteUser(id);
		res.status(200).json({ message });
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete user' });
	}
};
