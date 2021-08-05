// Import all methods as api from api folder
import * as api from '../../api';

// For CURD posts
export const FETCH_ALL = 'FETCH_ALL';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const LIKE_POST = 'LIKE_POST';
export const FETCH_SINGLE_POST = 'FETCH_SINGLE_POST';

// For search posts
export const SEARCH_POST = 'SEARCH_POST';

// For post ID
export const GET_ID = 'GET_ID';
export const CLEAR_ID = 'CLEAR_ID';
 
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

// export const getPosts = () => async(dispatch) => {
// 	try {
// 		const { data } = await api.fetchPosts();
// 		dispatch({type: FETCH_ALL, payload: data})
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// For Loading process, as long as the START_LOADING is dispatched, the Posts.jsx will show the loading circular process until the END_LOADING is dispatched.

export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPosts(page);
		dispatch({ type: FETCH_ALL, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPost(id);
		dispatch({ type: FETCH_SINGLE_POST, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};


export const createPost = (newPost, history) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.createPost(newPost);

		// In order to redirect to newly created post details, we need to pass "history" as the second parameter and use it right after the data is fetched from the backend:
		history.push(`/posts/${data._id}`);

		dispatch({ type: CREATE_POST, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, updatedPost);
		dispatch({ type: UPDATE_POST, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.deletePost(id);
		console.log(data.message);
		dispatch({ type: DELETE_POST, payload: id });
	} catch (error) {
		console.log(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(id);
		dispatch({ type: LIKE_POST, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		console.log('wowoworiririr');
		const { data } = await api.searchPosts(searchQuery);
		console.log(data);
		dispatch({ type: SEARCH_POST, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getCurrentId = (id) => async (dispatch) => {
	try {
		dispatch({ type: GET_ID, payload: id });
	} catch (error) {
		console.log(error.message);
	}
};

export const clearCurrentId = () => async (dispatch) => {
	try {
		dispatch({ type: CLEAR_ID });
	} catch (error) {
		console.log(error.message);
	}
};
