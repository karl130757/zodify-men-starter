import express from 'express';
import routes from '../routes';
import corsMiddleware from '../middlewares/corsMiddleware';
import { errorHandlerMiddleware } from '../middlewares/errorMiddleware';

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use('/api', routes);
app.use(errorHandlerMiddleware);

export default app;
