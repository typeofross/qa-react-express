import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import User from '#root/models/user.js';
import Comment from '#root/models/comment.js';
import Post from "#root/models/post.js";
import ValidationError from "#root/utils/custom-error.js";
import validations from '#root/utils/validations.js';
import config from '#root/config.js';
import mongoose from 'mongoose';

async function login(req) {

    // Validate login input request.

    validateLoginInput(req);

    const error = 'Incorrect username/password.';

    const getUser = await User.findOne({ "email": req.email });

    if (!getUser) {
        throw new Error(error)
    }

    const validatePasswords = await bcrypt.compare(req.password, getUser.password);

    if (!validatePasswords) {
        throw new Error(error)
    }

    return jwt.sign({ data: getUser._id }, config.jwtSecret, { expiresIn: '1h' });

}

function validateLoginInput(req) {
    let errors = [];

    if (req.email == "") {
        errors.push({ path: "email", error: validations.login.email.required })
    }

    if (req.password == "") {
        errors.push({ path: "password", error: validations.login.password.required })
    }

    if (errors.length > 0) {
        throw new ValidationError("errors", errors);
    }

    return true;
}

async function register(req) {

    // Validate input from request.

    validateRegisterInput(req);

    // Check if user exists and if not, create it.

    req.password = await bcrypt.hash(req.password, 5);

    const createUser = new User(req);

    const checkEmailExist = await User.countDocuments({ "email": req.email });

    if (checkEmailExist) {
        throw new Error("User already exists.")
    }

    const savedUser = await createUser.save();

    // If successful, generate a token and return it.

    return jwt.sign({ data: savedUser._id }, config.jwtSecret, { expiresIn: '1h' });

}

function validateRegisterInput(req) {

    let errors = [];

    // Validations for the Username field.
    // Can't be empty and must be between 2 and 50 characters long

    if (req.username == "") {
        errors.push({ path: "username", error: validations.register.username.required })
    }
    else if (req.username.length < 2 || req.username.length > 50) {
        errors.push({ path: "username", error: validations.register.username.length })
    }

    // Validations for the Email field.
    // Must be a valid email address.

    if (req.email == "") {
        errors.push({ path: "email", error: validations.register.email.required })
    }
    else if (!validations.register.email.pattern.test(req.email)) {
        errors.push({ path: "email", error: validations.register.email.message })
    }

    // Validations for the Password field.
    // Must contain at least 1 lowercase, 1 uppercase, 1 number, 1 symbol, and must be between 8 and 20 characters long.

    if (req.password == "") {
        errors.push({ path: "password", error: validations.register.password.required })
    }
    else if (req.repassword == "") {
        errors.push({ path: "password", error: validations.register.password.required })
    }
    else if (req.password != req.repassword) {
        errors.push({ path: "repassword", error: validations.register.password.match })
    }
    else if (!validations.register.password.pattern.test(req.password)) {
        errors.push({ path: "password", error: validations.register.password.message })
    }

    if (errors.length > 0) {
        throw new ValidationError("errors", errors);
    }

    return true;
}

async function update(req) {
    let errors = [];

    if (req.password == "") {
        errors.push({ path: "password", error: validations.register.password.required })
    }
    else if (req.repassword == "") {
        errors.push({ path: "password", error: validations.register.password.required })
    }
    else if (req.password != req.repassword) {
        errors.push({ path: "repassword", error: validations.register.password.match })
    }
    else if (!validations.register.password.pattern.test(req.password)) {
        errors.push({ path: "password", error: validations.register.password.message })
    }

    if (req.currentpassword == "") {
        errors.push({ path: "currentpassword", error: validations.register.password.required })
    }

    if (errors.length > 0) {
        throw new ValidationError("errors", errors);
    }

    const getUser = await User.findById(req.userId)

    const validatePasswords = await bcrypt.compare(req.currentpassword, getUser.password);

    if (!validatePasswords) {
        errors.push({ path: "currentpassword", error: "Incorrect password." })
    }

    if (errors.length > 0) {
        throw new ValidationError("errors", errors);
    }

    req.password = await bcrypt.hash(req.password, 5);

    return User.findByIdAndUpdate(
        req.userId,
        { password: req.password }
    )
}

async function deleteUser(id) {
    // Get all postIds from Posts collection.
    const postIds = await Post.find({ owner: id }).select('_id')
    // Delete all comments that were added to these posts.
    for (let item of postIds) {
        await Comment.deleteMany({ postId: item._id })
    }
    // Delete all posts from the user.
    await Post.deleteMany({ owner: id })
    // Delete all comments from the user.
    await Comment.deleteMany({ owner: id })
    // Delete all rates from the user.
    await Post.updateMany(
        {
            $or: [
                { likes: { $in: [id] } },
                { dislikes: { $in: [id] } }
            ]
        },
        {
            $pull: {
                likes: id,
                dislikes: id
            }
        }
    );
    await Comment.updateMany(
        {
            $or: [
                { likes: { $in: [id] } },
                { dislikes: { $in: [id] } }
            ]
        },
        {
            $pull: {
                likes: id,
                dislikes: id
            }
        }
    );
    // Delete the user.
    await User.findByIdAndDelete(id);

    return true;
}

export function getToken(req, res, next) {
    try {
        if (req.cookies['access_token']) {
            const userId = jwt.verify(req.cookies['access_token'], config.jwtSecret);
            res.locals['userId'] = userId.data;
        }
        else {
            res.locals['userId'] = false;
        }
    }
    catch (err) {
        console.error(err);
        res.locals['userId'] = false;
    }
    finally {
        next();
    }

}

export function isAuth(req, res, next) {
    if (!req.cookies['access_token']) {
        throw new Error('Unauthorized.');
    }

    const userId = jwt.verify(req.cookies['access_token'], config.jwtSecret);

    res.locals['userId'] = userId.data;

    next();
}

export async function isOwner(req, res, next) {
    try {
        const model = req.baseUrl == '/comment' || req.baseUrl == '/post' ? mongoose.model(req.baseUrl.replace('/', '')) : undefined;

        if (!model) {
            throw new Error('Invalid request.')
        }

        const userId = res.locals.userId;

        const record = await model.findById(req.params.id);

        if (!record) {
            throw new Error('ID not found.');
        }

        if (record.owner != userId) {
            throw new Error('Unauthorized.');
        }

        next();

    }
    catch (err) {
        next(err);
    }
}

export {
    register,
    login,
    update,
    deleteUser
};