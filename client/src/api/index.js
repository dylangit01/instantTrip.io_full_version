import axios from 'axios';

// "posts" must match with server router for posts, and NEVER PUT "/" after endpoint
// const endpoint = 'http://localhost:5000/posts';
const endpoint = 'https://instant-trip.herokuapp.com/posts';

export const fetchPosts = () => axios.get(endpoint);

export const createPost = (newPost) => axios.post(endpoint, newPost);

export const updatePost = (id, updatedPost) => axios.patch(`${endpoint}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${endpoint}/${id}`);