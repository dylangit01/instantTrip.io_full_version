import axios from 'axios';

// "posts" must match with server router for posts, and NEVER PUT "/" after endpoint
// const endpoint = 'http://localhost:5000/posts';
// const endpoint = 'https://instant-trip-full-verison.herokuapp.com/posts';

// export const fetchPosts = () => axios.get(endpoint);
// export const createPost = (newPost) => axios.post(endpoint, newPost);
// export const updatePost = (id, updatedPost) => axios.patch(`${endpoint}/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${endpoint}/${id}`);
// export const likePost = (id) => axios.patch(`${endpoint}/${id}/like`);

// In order to use some advanced axios feature, modify above codes to below:
const API = axios.create({ baseURL: 'http://localhost:5000' });

// After user is logged in, the first thing is to pass the "req.header.authorization" to the backend authMiddleware to get the token, without this step, the middleware cannot verify the user, so the user cannot do related actions. And this toke is a "Bearer" token, is it starts with it.

API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
	}
	return req;
});

// export const fetchPosts = () => API.get('/posts');
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/like`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

// Send search queries to the backend and fetch searched results, notice "searchQuery" is an object comes from Home.jsx, so the property name must be matched, in this case it's searchTerm
export const searchPosts = (searchQuery) =>
	API.get(`/posts/search?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${searchQuery.tags}`);
