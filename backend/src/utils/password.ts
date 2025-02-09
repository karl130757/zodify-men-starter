import bcrypt from 'bcrypt';

/**
 * Utility class for password hashing and verification.
 */
class PasswordUtility {
	private saltRounds: number;

	constructor(saltRounds: string = '10') {
		const parsedRounds = parseInt(saltRounds, 10);
		if (isNaN(parsedRounds) || parsedRounds <= 0) {
			throw new Error('Salt rounds must be a positive number.');
		}
		this.saltRounds = parsedRounds;
	}

	/**
	 * Hashes a password using bcrypt.
	 * @param {string} password - The plain text password to hash.
	 * @returns {Promise<string>} - The hashed password.
	 */
	async hashPassword(password: string): Promise<string> {
		if (!password) {
			throw new Error('Password cannot be empty.');
		}
		return bcrypt.hash(password, this.saltRounds);
	}

	/**
	 * Compares a plain text password with a hashed password.
	 * @param {string} password - The plain text password.
	 * @param {string} hashedPassword - The hashed password.
	 * @returns {Promise<boolean>} - True if passwords match, false otherwise.
	 */
	async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
		if (!password || !hashedPassword) {
			throw new Error('Password and hashed password are required.');
		}
		return bcrypt.compare(password, hashedPassword);
	}
}

export default PasswordUtility;
