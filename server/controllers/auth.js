import express from 'express';
import { register, login } from '#root/services/auth-service.js';

const authController = express.Router();

authController.post('/register', async (req, res, next) => {
    try {
        const accessToken = await register(req.body);

        res.cookie('accessToken', accessToken);
        res.status(201).json({ "status": "success" });
    }
    catch (err) {
        next(err);
    }
})

authController.post('/login', async (req, res, next) => {
    try {
        const accessToken = await login(req.body);

        res.cookie('accessToken', accessToken);
        res.status(200).json({ "status": "success" });
    }
    catch (err) {
        next(err);
    }
})

authController.get('/logout', async (req, res, next) => {
    try {
        res.clearCookie('accessToken');
        res.status(200).json({ "status": "success" });
    }
    catch (err) {
        next(err);
    }
})

export default authController;