import express from 'express';
import routes from '../routes';
import { config } from '../constants/global';
import corsMiddleware from '../middlewares/corsMiddleware';
import { errorHandlerMiddleware } from '../middlewares/errorMiddleware';
import helmetConfig from '../configs/helmetConfig';

const isProduction: boolean = config.environment === 'production';
const app = express();

app.use(corsMiddleware);
app.use(helmetConfig(isProduction));

app.use(express.json());

app.use('/api', routes);
app.use(errorHandlerMiddleware);

export default app;
