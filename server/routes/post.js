import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/postController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//After we create the authorization for users, we will use the middleware in post routes file, so only verified user can do below actions

router.get('/', getPosts)
router.post('/', authMiddleware, createPost)
router.patch('/:id', authMiddleware, updatePost)
router.delete('/:id', authMiddleware, deletePost)
router.patch('/:id/like', authMiddleware, likePost)

export default router;