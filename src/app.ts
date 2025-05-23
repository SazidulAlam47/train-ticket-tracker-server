import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//middleware
app.use(cors());
app.use(express.json());

const test = (req: Request, res: Response) => {
    res.send({ message: 'Train Ticket Tracker Server is Running...' });
};

// test route
app.get('/', test);

// application routes
app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
