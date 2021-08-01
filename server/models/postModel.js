import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
	title: String,
	description: String,
	name: String, // postSchema needs name property, because in Post component, Post should have name on the card, but this name is no longer coming from form input, but from auth token.
	creator: String,
	tags: [String],
	selectedFile: String,
	likes: {
		type: [String],
		default: [],
	},
	createAt: {
		type: Date,
		default: new Date(),
	},
});

// Convert schema to model:
const PostModel = mongoose.model('PostModel', postSchema);

export default PostModel