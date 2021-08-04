// Import all methods as api from api folder
import * as api from '../../api';

// For CURD posts
export const FETCH_ALL = 'FETCH_ALL';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const LIKE_POST = 'LIKE_POST';

// For search posts
export const SEARCH_POST = 'SEARCH_POST'

// For post ID
export const GET_ID = 'GET_ID';
export const CLEAR_ID = 'CLEAR_ID';

// Create an action to fetch the data
export const getPosts = () => async(dispatch) => {
	try {
		const { data } = await api.fetchPosts();
		// const action = { type: FETCH_ALL, payload: [] };
		// dispatch(action);
		dispatch({type: FETCH_ALL, payload: data})
	} catch (error) {
		console.log(error);
	}
}

export const createPost = (newPost) => async(dispatch) => {
	try {
		const { data } = await api.createPost(newPost);
		dispatch({ type: CREATE_POST, payload: data });
	} catch (error) {
		console.log(error);
	}
}

export const updatePost = (id, updatedPost) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, updatedPost);
		dispatch({type: UPDATE_POST, payload: data})
	} catch (error) {
		console.log(error);
	}
}

export const deletePost = id => async (dispatch) => {
	try {
		const {data} = await api.deletePost(id);
		console.log(data.message);
		dispatch({type: DELETE_POST, payload: id})
	} catch (error) {
		console.log(error);
	}
}

export const likePost = id => async (dispatch) => {
	try {
		const { data } = await api.likePost(id);
		dispatch({type: LIKE_POST, payload: data})
	} catch (error) {
		console.log(error);
	}
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try {
		const { data } = await api.searchPosts(searchQuery);
		dispatch({type: SEARCH_POST, payload: data})
	} catch (error) {
		console.log(error);
	}
};

export const getCurrentId = (id) => async (dispatch) => {
	try {
		dispatch({type: GET_ID, payload: id})
	} catch (error) {
		console.log(error.message);
	}
}

export const clearCurrentId = () => async (dispatch) => {
	try {
		dispatch({type: CLEAR_ID})
	} catch (error) {
		console.log(error.message);
	}
}