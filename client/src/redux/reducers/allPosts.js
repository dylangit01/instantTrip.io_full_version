import { FETCH_ALL } from '../actions/posts';

const allPosts = (allPosts = [], action) => {
	switch (action.type) {
		case FETCH_ALL:
			return action.payload.allPosts
		default:
			return allPosts;
	}
};

export default allPosts;
