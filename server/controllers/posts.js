import PostModel from '../models/postModel.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
	// Finding post info takes time, so using asynchronous method (async/await) to deal with it
	try {
		const postMessages = await PostModel.find();
		res.status(200).json(postMessages);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const createPost = async (req, res) => {
	const post = req.body;
	// Need to convert body to mongoose data based on model first
	const newPost = PostModel(post);

	try {
		// First step was to save the new post into mongoose
		await newPost.save();
		// Second step is to send the newPost to frontend
		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	const id = req.params.id;
	const post = req.body;
	try {
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
		const updatedPost = await PostModel.findByIdAndUpdate(id, { ...post, id }, { new: true });
		res.status(200).json(updatedPost);
	} catch (error) {
		res.status(400).json({msg: error.message})
	}
};

export const deletePost = async (req, res) => {
	const id = req.params.id;
	try {
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
		await PostModel.findByIdAndRemove(id);
		res.json({ message: 'Post deleted successfully from server' });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};

export const likePost = async (req, res) => {
	const id = req.params.id;
	try {
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
		// Here we need find the post from mongooseDB with this id:
		const post = await PostModel.findById(id);
		const updatedLikedPost = await PostModel.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
		res.status(200).json(updatedLikedPost)
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
}
