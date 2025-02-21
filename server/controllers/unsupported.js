import express from 'express';

const unsupportedController = express.Router();

unsupportedController.use((req, res, next) => {
    try {
        throw new Error("Page not found.");
    }
    catch (err) {
        next(err);
    }
})

export default unsupportedController;