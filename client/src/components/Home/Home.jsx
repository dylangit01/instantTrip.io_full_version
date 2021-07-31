import React, { useEffect, useState } from 'react';
import { Grow, Container, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import SearchBar from '../SearchBar/SearchBar';

// Use redux
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/actions/posts';

const Home = () => {
	// using useDispatch hook to trigger an action
	const dispatch = useDispatch();

	const [searchField, setSearchField] = useState('');

	// Using dispatch in useEffect to dispatch an action to get the posts data, don't forget the "()" for getPosts
	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	const posts = useSelector((state) => state.posts);

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
						<Form />
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
