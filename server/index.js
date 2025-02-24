import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes.js';
import errorHandler from './middleware/error-handler.js';
import config from './config.js';

const app = express();
const port = config.port;

try {
    await mongoose.connect(config.db);

    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    app.use(routes);
}
catch (err) {
    app.use((req, res, next) => next(err))
}
finally {
    app.use(errorHandler);
    app.listen(port, console.log(`Server listening on port ${port}`))
}