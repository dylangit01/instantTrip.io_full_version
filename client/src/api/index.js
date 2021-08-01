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

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/like`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);