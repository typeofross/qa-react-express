import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from '#root/routes.js';
import errorHandler from '#root/middleware/error-handler.js';
import config from '#root/config.js';

const app = express();
const port = config.port;

try {
    await mongoose.connect(config.db);
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }));
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