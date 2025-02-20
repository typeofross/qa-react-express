import ValidationError from "../utils/custom-error.js";
import validations from '../utils/validations.js';
import Post from '../models/post.js';

function validateInput(req) {
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

    if (errors.length > 0) {
        throw new ValidationError("errors", errors);
    }

    return true;
}

export default {
    post: {
        async add(req) {

            validateInput(req);

            const createPost = new Post(req);

            const savedPost = await createPost.save();

            return savedPost._id;
        },

        update(req, id) {

            validateInput(req);

            return Post.findByIdAndUpdate(
                id,
                req,
                {
                    new: true
                })
        },

        delete(id) {
            return Post.findByIdAndDelete(id);
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