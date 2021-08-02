import React, { useEffect, useState } from 'react';
import { Grow, Container, Grid, Button } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import SearchBar from '../SearchBar/SearchBar';
import useStyles from './styles';

// Use redux
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/actions/posts';

const Home = () => {
	const classes = useStyles();

	// using useDispatch hook to trigger an action
	const dispatch = useDispatch();

	const [searchField, setSearchField] = useState('');

	const [showAddPost, setShowAddPost] = useState(false);

	// Using dispatch in useEffect to dispatch an action to get the posts data, don't forget the "()" for getPosts
	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	const posts = useSelector((state) => state.posts);
	const postID = useSelector((state) => state.postID);

	// Search function
	const searchedPosts = posts.filter((post) => {
		const combineSearch = `${post.creator} ${post.title} ${post.tags} ${post.description}`;
		return combineSearch.toLowerCase().includes(searchField.toLowerCase());
	});

	return (
		<Grow in>
			<Container>
				<Grid container justifyContent='space-between' alignItems='stretch' spacing={6}>
					<Grid item xs={12} sm={5}>
						<SearchBar setSearchField={setSearchField} />

						<Button
							className={classes.postShowBtn}
							variant={showAddPost ? 'outlined' : 'contained'}
							color={showAddPost ? 'secondary' : 'primary'}
							size='large'
							fullWidth
							onClick={() => setShowAddPost(!showAddPost)}
						>
							{showAddPost ? 'Close' : <>{postID ? 'Updating' : 'Adding'} a Post</>} 
						</Button>
						{(showAddPost || postID)  && <Form />}
					</Grid>
					<Grid item xs={12} sm={7}>
						<Posts searchedPosts={searchedPosts} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
