import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
	title: String,
	description: String,
	creator: String,
	tags: [String],
	selectedFile: String,
	likes: {
		type: Number,
		default: 0
	},
	createAt: {
		type: Date,
		default: new Date()
	}
});

// Convert schema to model:
const PostModel = mongoose.model('PostModel', postSchema);

export default PostModel