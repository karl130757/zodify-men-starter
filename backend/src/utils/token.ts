import jwt, { Secret, SignOptions, JwtPayload, VerifyOptions } from 'jsonwebtoken';

/**
 * Utility class for JWT operations.
 */
class TokenUtility {
	private secretKey: Secret;

	constructor(secretKey: Secret) {
		if (!secretKey || typeof secretKey !== 'string') {
			throw new Error('JWT_SECRET must be defined and a valid string.');
		}
		this.secretKey = secretKey;
	}

	/**
	 * Generates a JWT token using the provided payload and options.
	 * @param {object} payload - The data to include in the token.
	 * @param {SignOptions} [options={ expiresIn: '1h' }] - JWT signing options.
	 * @returns {string} - The signed JWT token.
	 */
	generateToken(payload: object, options: SignOptions = { expiresIn: '1h' }): string {
		return jwt.sign(payload, this.secretKey, options);
	}

	/**
	 * Verifies a JWT token and returns the decoded payload if valid.
	 * @param {string} token - The JWT token to verify.
	 * @param {VerifyOptions} [options={}] - JWT verification options.
	 * @returns {JwtPayload} - The decoded payload.
	 * @throws {Error} - If the token is invalid or expired.
	 */
	verifyToken(token: string, options: VerifyOptions = {}): JwtPayload {
		try {
			const decoded = jwt.verify(token, this.secretKey, options);
			if (typeof decoded === 'string') {
				throw new Error('Invalid token format');
			}
			return decoded as JwtPayload;
		} catch (error) {
			throw new Error(`Token verification failed: ${(error as Error).message}`);
		}
	}
}

export default TokenUtility;
