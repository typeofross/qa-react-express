import express from 'express';
import services from '../services/crud-service.js';
import { isOwner } from '../services/auth-service.js';

const postController = express.Router();

// Route to add a new post.
postController.post('/add', async (req, res, next) => {
    try {

        req.body.owner = res.locals.userId;

        const postId = await services.post.add(req.body);

        res.status(201).json({ "status": "success", "message": postId });
    }
    catch (err) {
        next(err);
    }
})

// Route for rating (like/dislike) a specific post.
postController.post('/:id/:operation', async (req, res, next) => {
    try {
        const id = req.params.id;
        const uid = res.locals.userId;
        const operation = req.params.operation;

        if (operation != 'like' && operation != 'dislike') {
            throw new Error("Invalid request.");
        }

        operation == "like" ? await services.post.rate.like(id, uid) : await services.post.rate.dislike(id, uid)

        res.status(200).json({ "status": "success" });
    }
    catch (err) {
        next(err);
    }
})

// Route for editing a specific post.
postController.patch('/:id', isOwner, async (req, res, next) => {
    try {

        const post = await services.post.update(req.body, req.params.id);

        res.status(200).json({ "status": "success", "message": post });
    }
    catch (err) {
        next(err);
    }
})

// Route for deleting a specific post.
postController.delete('/:id', isOwner, async (req, res, next) => {
    try {
        await services.post.delete(req.params.id);

        res.status(204).json({ "status": "success" });
    }
    catch (err) {
        next(err);
    }
})

export default postController;  