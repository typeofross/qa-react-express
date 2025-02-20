import express from 'express';
import { register, login } from '../services/auth-service.js';

const authController = express.Router();

authController.post('/register', async (req, res, next) => {
    try {
        const accessToken = await register(req.body);

        res.status(201).json({ "status": "success", "message": accessToken });
    }
    catch (err) {
        next(err);
    }
})

authController.post('/login', async (req, res, next) => {
    try {
        const accessToken = await login(req.body);

        res.status(200).json({ "status": "success", "message": accessToken });
    }
    catch (err) {
        next(err);
    }
})

export default authController;