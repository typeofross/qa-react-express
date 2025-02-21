import ValidationError from "../utils/custom-error.js";
import validations from '../utils/validations.js';
import Post from '../models/post.js';

function validatePostInput(req) {
    let errors = [];

    // Validations for the Title field.
    // Can't be empty and must be between 2 and 100 characters long

    if (req.title == "") {
        errors.push({ path: "title", error: validations.add.title.required })
    }
    else if (req.title.length < 2 || req.title.length > 100) {
        errors.push({ path: "title", error: validations.add.title.length })
    }

    // Validations for the Body field.
    // Can't be empty and must be between 2 and 1000 characters long

    if (req.body == "") {
        errors.push({ path: "body", error: validations.add.body.required })
    }
    else if (req.body.length < 2 || req.body.length > 1000) {
        errors.push({ path: "body", error: validations.add.body.length })
    }

    // Validations for the Category field.
    // Can't be empty and must be between 2 and 50 characters long

    if (req.category == "") {
        errors.push({ path: "category", error: validations.add.category.required })
    }
    else if (req.category.length < 2 || req.category.length > 50) {
        errors.push({ path: "category", error: validations.add.category.length })
    }

    if (errors.length > 0) {
        throw new ValidationError("errors", errors);
    }

    return true;
}

export default {
    post: {
        async add(req) {

            validatePostInput(req);

            const createPost = new Post(req);

            const savedPost = await createPost.save();

            return savedPost._id;
        },

        update(req, id) {

            validatePostInput(req);

            return Post.findByIdAndUpdate(
                id,
                req,
                {
                    new: true
                })
        },

        delete(id) {
            return Post.findByIdAndDelete(id);
        },

        rate: {
            async getPostDetails(id, uid) {
                const post = await Post.findById(id);

                if (!post) {
                    throw new Error("ID not found.");
                }

                const isLiked = post.likes.includes(uid);
                const isDisliked = post.dislikes.includes(uid);

                return { isLiked, isDisliked };
            },
            async like(id, uid) {

                const getPost = await this.getPostDetails(id, uid);

                if (!getPost.isLiked) {
                    await Post.findByIdAndUpdate(
                        id,
                        { $addToSet: { "likes": uid } },
                    )

                    if (getPost.isDisliked) {
                        await Post.findByIdAndUpdate(
                            id,
                            { $pull: { "dislikes": uid } },
                        )
                    }
                }
                else {
                    await Post.findByIdAndUpdate(
                        id,
                        { $pull: { "likes": uid } },
                    )
                }

            },

            async dislike(id, uid) {

                const getPost = await this.getPostDetails(id, uid);

                if (!getPost.isDisliked) {
                    await Post.findByIdAndUpdate(
                        id,
                        { $addToSet: { "dislikes": uid } },
                    )

                    if (getPost.isLiked) {
                        await Post.findByIdAndUpdate(
                            id,
                            { $pull: { "likes": uid } },
                        )
                    }
                }
                else {
                    await Post.findByIdAndUpdate(
                        id,
                        { $pull: { "dislikes": uid } },
                    )
                }
            }
        }
    },
    comment: {
        add(req) {

        },

        update(req, id) {

        },

        delete(id) {

        }
    }
}