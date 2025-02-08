import express from 'express';
import cors from 'cors';
import routes from '../routes';
import { errorHandlerMiddleware } from '../middlewares/errorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errorHandlerMiddleware);

export default app;
