import React, { useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

// Use redux
import { useDispatch } from 'react-redux';
import { getPosts } from './redux/actions/posts';

const App = () => {

	// using useDispatch hook to trigger an action
	const dispatch = useDispatch();

	// Using dispatch in useEffect to dispatch an action to get the posts data, don't forget the "()" for getPosts
	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<Container maxWidth='lg'>
			<Navbar />
			<Grow in>
				<Container>
					<Grid container justifyContent='space-between' alignItems='stretch' spacing={6}>
						<Grid item xs={12} sm={5}>
							<Form />
						</Grid>
						<Grid item xs={12} sm={7}>
							<Posts />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
};

export default App;
