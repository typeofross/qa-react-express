import express from 'express';
import services from '#root/services/get-service.js';

const getController = express.Router();

getController.get('/latest', async (req, res, next) => {
    try {
        const posts = await services.get.latest();

        if (posts.length == 0 || !posts) {
            throw new Error("No posts to show.")
        }

        res.status(200).json({ "status": "success", "message": posts });
    }
    catch (err) {
        next(err);
    }
})

getController.get('/post/:id', async (req, res, next) => {
    try {
        const post = await services.get.one(req.params.id).lean();

        if (!post) {
            throw new Error("ID not found.")
        }

        post.isOwner = false;

        if (post.owner._id == res.locals.userId) {
            post.isOwner = true;
        }

        post.isLiked = false;
        post.isDisliked = false;

        if (post.likes.find(x => x == res.locals.userId)) {
            post.isLiked = true;
        }

        if (post.dislikes.find(x => x == res.locals.userId)) {
            post.isDisliked = true;
        }

        post.comments.forEach(comment => {
            comment.isLiked = false;
            comment.isDisliked = false;
            comment.isOwner = false;

            if (comment.owner._id == res.locals.userId) {
                comment.isOwner = true;
            }

            if (comment.likes.find(x => x == res.locals.userId)) {
                comment.isLiked = true;
            }

            if (comment.dislikes.find(x => x == res.locals.userId)) {
                comment.isDisliked = true;
            }

        })

        res.status(200).json({ "status": "success", "message": post });
    }
    catch (err) {
        next(err);
    }
})

getController.get('/category/:name/page/:number', async (req, res, next) => {
    try {
        const postsPerPage = 10;
        const posts = await services.get.category(req.params.name, req.params.number, postsPerPage);
        const postCount = await services.get.postCount(req.params.name);

        if (!posts || posts.length == 0) {
            throw new Error("No posts to show.")
        }

        res.status(200).json({ "status": "success", "posts": postCount, "limit": postsPerPage, "message": posts });
    }
    catch (err) {
        next(err);
    }
})

getController.get('/catalog', async (req, res, next) => {
    try {
        const categories = await services.get.catalog();

        if (!categories || categories.length == 0) {
            throw new Error("No categories to show.")
        }

        res.status(200).json({ "status": "success", "message": categories });
    }
    catch (err) {
        next(err);
    }
})

getController.get('/search/:text', async (req, res, next) => {
    try {
        const posts = await services.get.search(req.params.text);

        if (!posts || posts.length == 0) {
            throw new Error("No posts to show.")
        }

        res.status(200).json({ "status": "success", "message": posts });
    }
    catch (err) {
        next(err);
    }
})

export default getController;  