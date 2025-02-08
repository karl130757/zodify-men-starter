import express from 'express';
import routes from '../routes';
import securityMiddleware from '../middlewares/securityMiddleware';
import { errorHandlerMiddleware } from '../middlewares/errorMiddleware';

const app = express();

app.use(securityMiddleware);

app.use(express.json());

app.use('/api', routes);
app.use(errorHandlerMiddleware);

export default app;
