import { User } from '../models/domain/user';

/**
 * Interface for user repository operations.
 * Defines the contract for interacting with user data in the repository.
 */
export interface UserRepositoryInterface {
	/**
	 * Retrieves all users from the repository.
	 *
	 * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
	 */
	findAll(): Promise<User[]>;

	/**
	 * Retrieves a user by their unique identifier.
	 *
	 * @param {string} id - The unique identifier of the user.
	 * @returns {Promise<User | null>} A promise that resolves to the User object if found, or null if not found.
	 */
	findById(id: string): Promise<User | null>;

	/**
	 * Retrieves a user by their email address.
	 *
	 * @param {string} email - The email address of the user.
	 * @returns {Promise<User | null>} A promise that resolves to the User object if found, or null if not found.
	 */
	findByEmail(email: string): Promise<User | null>;

	/**
	 * Creates a new user in the repository.
	 *
	 * @param {Partial<User>} user - The user data to be created, where the fields can be partial.
	 * @returns {Promise<User>} A promise that resolves to the created User object.
	 */
	create(user: Partial<User>): Promise<User>;

	/**
	 * Updates an existing user in the repository.
	 *
	 * @param {string} id - The unique identifier of the user to be updated.
	 * @param {Partial<User>} user - The updated user data.
	 * @returns {Promise<User | null>} A promise that resolves to the updated User object if found, or null if not found.
	 */
	update(id: string, user: Partial<User>): Promise<User | null>;

	/**
	 * Deletes a user from the repository.
	 *
	 * @param {string} id - The unique identifier of the user to be deleted.
	 * @returns {Promise<void>} A promise that resolves when the user is successfully deleted.
	 */
	delete(id: string): Promise<void>;
}
