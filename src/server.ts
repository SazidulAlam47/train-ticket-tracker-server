/* eslint-disable no-console */
import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

const port = Number(config.port);

let server: Server;

async function main() {
    try {
        await mongoose.connect(config.database_url as string);

        server = app.listen(port, () => {
            console.log(
                'Train Ticket Tracker Server is listening on port',
                port,
            );
        });
    } catch (error) {
        console.log(error);
    }
}

main();

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info('Server closed!');
        });
    }
    process.exit(1);
};

process.on('uncaughtException', (error) => {
    console.log(error);
    exitHandler();
});

process.on('unhandledRejection', (error) => {
    console.log(error);
    exitHandler();
});
