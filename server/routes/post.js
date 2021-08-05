import express from 'express';
import { getPost, getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch, } from '../controllers/postController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//After we create the authorization for users, we will use the middleware in post routes file, so only verified user can do below actions

router.get('/', getPosts);
router.get('/:id', getPost)
router.get('/search', getPostsBySearch);

router.post('/', authMiddleware, createPost);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.patch('/:id/like', authMiddleware, likePost);


export default router;
