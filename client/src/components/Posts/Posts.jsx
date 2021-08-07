import React from 'react';
import Post from '../Post/Post';
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';

import { useSelector } from 'react-redux';

const Posts = ({ searchedPosts }) => {
	const classes = useStyles();

	const { posts, isLoading } = useSelector((state) => state.posts);

	// If no posts in the database, and after dispatch({ type: END_LOADING }), meaning the isLoading is false, therefore showing no post found:
	if (!posts.length && !isLoading) return <h1 className={classes.noResult}>No posts found</h1>;

	// As long as isLoading is true, the posts component will show the loading circularProgress:
	return isLoading ? (
		<div className={classes.circularProcess}>
			<CircularProgress />
		</div>
	) : (
		<>
			{searchedPosts.length > 0 ? (
				<Grid className={classes.container} container alignItems='stretch' spacing={3}>
					{[...searchedPosts].map((post) => (
						<Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
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

export default Posts;
