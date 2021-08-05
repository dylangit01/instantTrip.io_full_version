import express from 'express';
import { getPosts, getPost, createPost, updatePost, deletePost, likePost, getPostsBySearch, } from '../controllers/postController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//After we create the authorization for users, we will use the middleware in post routes file, so only verified user can do below actions

router.get('/', getPosts);
router.post('/', authMiddleware, createPost);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.patch('/:id/like', authMiddleware, likePost);

// /search router has to be placed before getPost router, because "/:id" includes "/search", so if /:id at top, the search function will be no result as not searchQuery is the id
router.get('/search', getPostsBySearch);

router.get('/:id', getPost);

export default router;
