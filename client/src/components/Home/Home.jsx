import React, { useEffect, useState } from 'react';
import { Grow, Container, Grid, Button, Paper, AppBar, TextField } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import SearchBar from '../SearchBar/SearchBar';
import Pagination from '../Pagination/Pagination';
import useStyles from './styles';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

// Use redux
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/actions/posts';

// Create below function to know which page we are currently on, and what search term we are looking for
const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const Home = () => {
	const classes = useStyles();

	const dispatch = useDispatch();

	// My search function
	const [searchField, setSearchField] = useState('');
	const [showAddPost, setShowAddPost] = useState(false);

	// JSM search function
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState([]);

	const query = useQuery();
	const history = useHistory();

	// This is going to read the url and see if we have a page parameter in there, if we dont have that page, it much be on page 1
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');

	// Using dispatch in useEffect to dispatch an action to get the posts data, don't forget the "()" for getPosts
	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	const posts = useSelector((state) => state.posts);
	const postID = useSelector((state) => state.postID);

	// My Search function
	const searchedPosts = posts.filter((post) => {
		const combineSearch = `${post.creator} ${post.title} ${post.tags} ${post.description} ${post.name}`;
		return combineSearch.toLowerCase().includes(searchField.toLowerCase());
	});

	// JSM Search function
	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
		}
	};

	// For search tags using ChipInput
	const handleAdd = tag => setTags([...tags, tag])
	const handleDelete = tagToDelete => setTags(tags.filter(tag => tag !== tagToDelete));

	return (
		<Grow in>
			<Container maxWidth='xl'>
				<Grid
					className={classes.gridContainer}
					container
					justifyContent='space-between'
					alignItems='stretch'
					spacing={6}
				>
					<Grid item xs={12} sm={6} md={4}>
						<AppBar className={classes.appBarSearch} position='static' color='inherit'>
							<TextField
								name='search'
								variant='outlined'
								label='Search Post'
								fullWidth
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								onKeyPress={handleKeyPress}
							/>

							{/* Todo: install material-ui-chip-input */}
							<ChipInput
								style={{ marginTop: '10px' }}
								variant='outlined'
								label='Search Tags'
								value={tags}
								onAdd={handleAdd}
								onDelete={handleDelete}
							/>

						</AppBar>

						<Paper className={classes.searchBar} elevation={6}>
							<SearchBar setSearchField={setSearchField} />
						</Paper>
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
						{(showAddPost || postID) && <Form />}
					</Grid>
					<Grid item xs={12} sm={6} md={8}>
						<Paper className={classes.pagination} elevation={6}>
							<Pagination />
						</Paper>
						<Posts searchedPosts={searchedPosts} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
