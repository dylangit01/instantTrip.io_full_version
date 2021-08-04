import { FETCH_ALL, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST, SEARCH_POST } from '../actions/posts';


	// It's very difficult to find typo error in reducers: action.payload not "action.post"
const posts = (state = {post: []}, action) => {
	switch (action.type) {
		case FETCH_ALL:
			return {
				...state,
				posts: action.payload.data,
				currentPage: action.payload.currentPage,
				numberOfPages: action.payload.numberOfPages,
			};
		case SEARCH_POST:
			return {...state, posts: action.payload};
		case CREATE_POST:
			return [...state, action.payload];
		case UPDATE_POST:
		case LIKE_POST:
			// since likePost has same logic with update, so the case can be put together
			// Here the payload is the data return from server, so the id is "_id" from mongoDB
			return state.map((post) => (post._id === action.payload._id ? action.payload : post));
		case DELETE_POST:
			// here payload is the "id", because action return the payload is "id"
			return state.filter((post) => post._id !== action.payload);
		default:
			return state;
	}
};

export default posts;
