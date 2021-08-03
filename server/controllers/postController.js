import PostModel from '../models/postModel.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
	// Finding post info takes time, so using asynchronous method (async/await) to deal with it
	try {
		const postMessages = await PostModel.find();
		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getPostsBySearch = async (req, res) => {
	const { searchQuery, tags } = req.query;
	try {
		// 'i' means ignore the case, so whenever the searchQuery is: Test, test, TEST -> test;
		const title = new RegExp(searchQuery, 'i');

		// Find all posts that match one of those two criteria ($or), the first one is the title, which is the same as we typed it on the frontend, and the second one is finding one of the tags in the array ($in) of tags, if that case, we want to display those posts:
		const posts = await PostModel.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
		
		res.json({data: posts})
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const post = req.body;

	// Need to convert body to mongoose data based on model first
	// const newPost = PostModel(post);

	// Since we add authentication for user, we also need to update newPost as below:
	const newPost = PostModel({ ...post, creator: req.userId, createAt: new Date().toISOString() });

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
		res.status(400).json({ msg: error.message });
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
		// "req.userId" is from authMiddleware in postRoute
		if (!req.userId) return res.json({ message: 'Unauthenticated' });

		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

		// Here we need find the post from mongooseDB with parameter id:
		const post = await PostModel.findById(id);

		// After find the post, we need to check if the user's id is already in the likes array or not
		// The "like" in postModel has been changed from number to string array(each user can only like post once, so it is an array of likes), so it pushes the "id" of each user when user likes the post, that's how we know who likes the specific post, and if the user already likes the post, when this user click the like button again, it will change to dislike, not the like
		const index = post.likes.findIndex((id) => id === String(req.userId));
		if (index === -1) {
			// since index doesn't exist, then it will like the post
			post.likes.push(String(req.userId));
		} else {
			// dislike the post
			post.likes = post.likes.filter((id) => id !== String(req.userId));
		}

		// Now the updatedLikedPost is no longer as post.likeCount + 1, but post only
		const updatedLikedPost = await PostModel.findByIdAndUpdate(id, post, { new: true });
		res.status(200).json(updatedLikedPost);
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};
