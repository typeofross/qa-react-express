import express from 'express';
import services from '../services/get-service.js';
import { update, deleteUser } from '../services/auth-service.js';

const profileController = express.Router();

profileController.get('/activity/:type', async (req, res, next) => {
    try {
        let result;

        if (req.params.type == "posts") {
            result = await services.profile.posts(res.locals.userId);
        }
        else if (req.params.type == "comments") {
            result = await services.profile.comments(res.locals.userId);
        }
        else if (req.params.type == "rated") {
            result = await services.profile.rated(res.locals.userId);
        }
        else {
            throw new Error('Invalid request.')
        }

        if (result.length == 0 || !result) {
            throw new Error("No records to show.")
        }
        res.status(200).json({ "status": "success", "message": result });
    }
    catch (err) {
        next(err);
    }
})

profileController.patch('/update', async (req, res, next) => {
    try {
        req.body.userId = res.locals.userId;

        await update(req.body);

        res.status(201).json({ "status": "success" });
    }
    catch (err) {
        next(err);
    }
})

profileController.delete('/delete', async (req, res, next) => {
    try {
        await deleteUser(res.locals.userId);

        res.clearCookie('accessToken');
        res.status(204).json({ "status": "success" });
    }
    catch (err) {
        next(err);
    }
})

export default profileController;  