import { GET_ID, CLEAR_ID } from '../actions/posts';

const postID = (id = null, action) => {
	switch (action.type) {
		case GET_ID:
			return action.payload;
		case CLEAR_ID:
			return id = null;
		default:
			return id;
	}
};

export default postID;
