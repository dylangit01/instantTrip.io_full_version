import React, { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import trips from './images/beach-logo.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './AppStyles';

// Use redux
import { useDispatch } from 'react-redux';
import { getPosts } from './redux/actions/posts';

const App = () => {
	const classes = useStyles();

	// using useDispatch hook to trigger an action
	const dispatch = useDispatch();

	// Using dispatch in useEffect to dispatch an action to get the posts data, dont forget the "()" for getPosts
	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<Container maxWidth='lg'>
			<AppBar className={classes.appBar} position='static' color='inherit'>
				<Typography className={classes.heading} variant='h2' align='center'>
					Instant Trip
				</Typography>
				<img className={classes.image} src={trips} alt='trips' height='80' />
			</AppBar>
			<Grow in>
				<Container>
					<Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
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
