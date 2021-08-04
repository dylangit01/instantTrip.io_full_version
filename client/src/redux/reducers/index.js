import { combineReducers } from 'redux';
import posts from './posts';
import allPosts from './allPosts';
import postID from './postID';
import auth from './auth'

export default combineReducers({ posts, allPosts, postID, auth });
