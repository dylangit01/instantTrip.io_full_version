import { FETCH_ALL, CREATE_POST, UPDATE_POST, DELETE_POST } from '../actions/posts';

const posts = (posts = [], action) => {
	switch (action.type) {
		case FETCH_ALL:
			return action.payload;
		case CREATE_POST:
			return [...posts, action.payload];
		case UPDATE_POST:
			// It's very easy to make typo here and cannot find the bug in reducers: action.payload not "action.post"
			return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
		case DELETE_POST:
			return posts.filter((post) => post._id !== action.payload);
		default:
			return posts;
	}
};

export default posts;
