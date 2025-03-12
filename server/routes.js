import express from 'express';
import authController from '#root/controllers/auth.js';
import unsupportedController from '#root/controllers/unsupported.js';
import postController from '#root/controllers/post.js';
import commentController from '#root/controllers/comment.js';
import getController from '#root/controllers/get.js';
import profileController from '#root/controllers/profile.js';
import sanitize from '#root/middleware/request-sanitizer.js';
import { isAuth, getToken } from '#root/services/auth-service.js';

const router = express.Router();

router.use('/auth', authController);
router.use('/get', getToken, getController);
router.use('/post', isAuth, sanitize(), postController);
router.use('/comment', isAuth, sanitize(), commentController);
router.use('/profile', isAuth, profileController);
router.use('/', unsupportedController);

export default router;