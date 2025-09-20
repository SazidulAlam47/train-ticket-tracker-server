import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import config from './app/config';

const app: Application = express();

//middleware
app.use(
    cors({
        origin: config.client_url,
    }),
);
app.use(express.json());

const test = (req: Request, res: Response) => {
    res.send({ message: 'Train Ticket Tracker Server is Running...' });
};

// test route
app.get('/', test);
app.get('/api/v1/test', test);

// application routes
app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
