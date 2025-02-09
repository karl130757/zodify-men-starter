import dotenv from 'dotenv';

dotenv.config();

const getEnv = (key: string, fallback?: string): string => {
	const value = process.env[key];
	if (value === undefined) {
		if (fallback !== undefined) {
			return fallback;
		}
		throw new Error(`Missing environment variable: ${key}`);
	}
	return value;
};

export const config = {
	port: parseInt(getEnv('PORT', '3000'), 10),
	environment: getEnv('NODE_ENV', 'development'),
	allowedOrigins: getEnv('ALLOWED_ORIGINS', 'http://localhost:3000'),
	jwt: {
		secret: getEnv('JWT_SECRET')
	},
	bcrypt: {
		rounds: getEnv('BCRYPT_HASHROUND')
	},
	mongo: {
		uri: getEnv('MONGODB_URI'),
		database: getEnv('MONGODB_DBNAME')
	}
};
