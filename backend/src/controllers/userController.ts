import { User } from '../models/domain/user';
import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { NotFoundError, BadRequestError } from '../utils/errors';
import { successResponse } from '../utils/response';
import { config } from '../constants/global';
import PasswordUtility from '../utils/password';

const passwordUtility = new PasswordUtility(config.bcrypt.rounds);

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const users = await userService.getAllUsers();
		successResponse(req, res, users, 'Users retrieved successfully', 200, { total: users.length });
	} catch (error) {
		next(error);
	}
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id } = req.params;
		if (!id) throw new BadRequestError('User ID is required');

		const user = await userService.getUserById(id);
		if (!user) throw new NotFoundError('User not found');

		successResponse(req, res, user, 'User retrieved successfully');
	} catch (error) {
		next(error);
	}
};

export const getUserByToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id } = (req as any).user;
		if (!id) throw new BadRequestError('User ID is missing from token');

		const user = await userService.getUserById(id);
		if (!user) throw new NotFoundError('User not found');

		successResponse(req, res, user, 'User retrieved successfully');
	} catch (error) {
		next(error);
	}
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { username, email, password, role } = req.body;
		if (!username || !email || !password || !role) throw new BadRequestError('All fields are required');

		const hashedPassword = await passwordUtility.hashPassword(password);
		const userToCreate: User = { username, email, password: hashedPassword, role };
		const newUser = await userService.createUser(userToCreate);

		successResponse(req, res, newUser, 'User created successfully', 201);
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id } = req.params;
		const { username, email, password } = req.body;
		if (!id) throw new BadRequestError('User ID is required');

		const dataToUpdate: User = { username, email, password };
		const updatedUser = await userService.updateUser(id, dataToUpdate);
		if (!updatedUser) throw new NotFoundError('User not found');

		successResponse(req, res, updatedUser, 'User updated successfully');
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id } = req.params;
		if (!id) throw new BadRequestError('User ID is required');

		const message = await userService.deleteUser(id);
		successResponse(req, res, { message }, 'User deleted successfully');
	} catch (error) {
		next(error);
	}
};
