import { combineReducers } from 'redux';
import posts from './posts';
import postID from './postID';
import auth from './auth'

export default combineReducers({ posts, postID, auth });
