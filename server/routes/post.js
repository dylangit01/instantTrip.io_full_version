import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/postController.js';

const router = express.Router();

router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/like', likePost)

export default router;