import express from 'express';
import authController from './controllers/auth.js';
import unsupportedController from './controllers/unsupported.js';
import postController from './controllers/post.js';
import commentController from './controllers/comment.js';
import getController from './controllers/get.js';
import profileController from './controllers/profile.js';
import sanitize from './middleware/request-sanitizer.js';
import { isAuth, getToken } from './services/auth-service.js';

const router = express.Router();

router.use('/auth', authController);
router.use('/get', getToken, getController);
router.use('/post', isAuth, sanitize(), postController);
router.use('/comment', isAuth, sanitize(), commentController);
router.use('/profile', isAuth, profileController);
router.use('/', unsupportedController);

export default router;