import mongoose from 'mongoose';

export const mongoDbConnect = async (mongoUri: string, mongoDatabaseName: string) => {
	try {
		await mongoose.connect(mongoUri, {
			dbName: mongoDatabaseName
		});
		console.log('MongoDB connected');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		process.exit(1);
	}
};
