import { FETCH_ALL, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST, SEARCH_POST, START_LOADING, END_LOADING } from '../actions/posts';

	// It's very difficult to find typo error in reducers: action.payload not "action.post"
const posts = (state = {isLoading:true, posts: [] }, action) => {
	switch (action.type) {
		case START_LOADING:
			return { ...state, isLoading: true }
		case END_LOADING:
			return {...state, isLoading: false}
		case FETCH_ALL:
			return {
				...state,
				posts: action.payload.data,
				allPosts: action.payload.allPosts,
				currentPage: action.payload.currentPage,
				numberOfPages: action.payload.numberOfPages,
			};
		case SEARCH_POST:
			return {...state, posts: action.payload};
		case CREATE_POST:
			// Before was [...posts, action.payload], since it changes to object, so as below
			return { ...state, posts: [...state.posts, action.payload] };
		case UPDATE_POST:
		case LIKE_POST:
			// since likePost has same logic with update, so the case can be put together
			// Here the payload is the data return from server, so the id is "_id" from mongoDB
			return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
		case DELETE_POST:
			// here payload is the "id", because action return the payload is "id"
			return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};
		default:
			return state;
	}
};

export default posts;
