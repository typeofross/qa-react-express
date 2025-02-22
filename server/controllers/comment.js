import express from 'express';
import services from '../services/crud-service.js';
import { isOwner } from '../services/auth-service.js';

const commentController = express.Router();

// Route to add a new comment to a post.
commentController.post('/add', async (req, res, next) => {
    try {
        req.body.owner = res.locals.userId;

        const post = await services.comment.add(req.body);

        res.status(201).json({ "status": "success", "message": post });
    }
    catch (err) {
        next(err);
    }
})

// Route for rating (like/dislike) a specific comment.
commentController.post('/:id/:operation', async (req, res, next) => {
    try {
        const id = req.params.id;
        const uid = res.locals.userId;
        const operation = req.params.operation;

        if (operation != 'like' && operation != 'dislike') {
            throw new Error("Invalid request.");
        }

        operation == "like" ? await services.rate.like(id, uid, "comment") : await services.rate.dislike(id, uid, "comment")

        res.status(200).json({ "status": "success" });
    }
    catch (err) {
        next(err);
    }
})

// Route for editing a specific comment.
commentController.patch('/:id', isOwner, async (req, res, next) => {
    try {

        const post = await services.comment.update(req.body, req.params.id);

        res.status(200).json({ "status": "success", "message": post });
    }
    catch (err) {
        next(err);
    }
})

// Route for deleting a specific comment.
commentController.delete('/:id', isOwner, async (req, res, next) => {
    try {
        await services.comment.delete(req.params.id);

        res.status(204).json({ "status": "success" });
    }
    catch (err) {
        next(err);
    }
})

export default commentController;  