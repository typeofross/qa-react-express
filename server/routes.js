import express from 'express';
import authController from './controllers/auth.js';
import unsupportedController from './controllers/unsupported.js';
import postController from './controllers/post.js';
import getController from './controllers/get.js';
import sanitize from './middleware/request-sanitizer.js';
import { isAuth } from './services/auth-service.js';

const router = express.Router();

router.use('/auth', authController);
router.use('/get', getController);
router.use('/post', isAuth, sanitize(), postController);
router.use('/', unsupportedController);

export default router;