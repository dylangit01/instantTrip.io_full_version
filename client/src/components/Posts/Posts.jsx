import React from 'react';
import Post from '../Post/Post'
import useStyles from './styles';
import { Grid, CircularProgress, } from '@material-ui/core'

import { useSelector } from 'react-redux';

const Posts = ({ searchedPosts }) => {
	const classes = useStyles();

	// Using useSelector hook to get the posts from global state
	const posts = useSelector((state) => state.posts);

	return !posts.length ? (
		<div className={classes.circularProcess}>
			<CircularProgress />
		</div>
	) : (
		<>
			{searchedPosts.length ? (
				<Grid className={classes.container} container alignItems='stretch' spacing={3}>
					{[...searchedPosts].reverse().map((post) => (
						<Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
							{/* Here _id follows MongoDB id format */}
							<Post post={post} />
						</Grid>
					))}
				</Grid>
			) : (
				<h1 className={classes.noResult}>No results found</h1>
			)}
		</>
	);
};

export default Posts
