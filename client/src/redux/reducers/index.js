import { combineReducers } from "redux";
import posts from './posts'
import postID from "./postID";

export default combineReducers({
	posts,
	postID
})