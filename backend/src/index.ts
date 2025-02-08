import app from './configs/app';
import { config } from './constants/global';
import { mongoDbConnect } from './configs/database';

app.listen(config.port, () => {
	mongoDbConnect(config.mongo.uri, config.mongo.database);
	console.log(`Server is running on http://localhost:${config.port}`);
});
