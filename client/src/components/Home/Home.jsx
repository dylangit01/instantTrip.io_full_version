import React, { useEffect, useState } from 'react';
import { Grow, Container, Grid, Button, Paper, AppBar, TextField } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import SearchBar from '../SearchBar/SearchBar';
import useStyles from './styles';

import { useDispatch, useSelector } from 'react-redux';
import { getPostsBySearch } from '../../redux/actions/posts';

// For pagination & server-side search feature
import Pagination from '../Pagination/Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

// Create below function to know which page we are currently on, and what search term we are looking for
const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const Home = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [showAddPost, setShowAddPost] = useState(false);

	// My search function
	const [searchField, setSearchField] = useState('');
	const [searchedPosts, setSearchedPosts] = useState([]);

	// JSM search function
	const [searchTerm, setSearchTerm] = useState('');
	const [tags, setTags] = useState([]);

	const query = useQuery();
	const history = useHistory();

	// This is going to read the url and see if we have a page parameter in there, if we don't have that page, it much be on page 1
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');

	// useEffect(() => {
	// 	dispatch(getPosts());
	// }, [dispatch]);

	// After adding other new data such as numberOfPages and so on, the posts becomes the property of the state, so we need to destruct it
	const { posts } = useSelector((state) => state.posts);
	const postID = useSelector((state) => state.postID);

	// My Search function cannot compatible with pagination
	// const {allPosts} = useSelector((state) => state.posts);
	useEffect(() => {
		if (posts) {
			setSearchedPosts(
				posts.filter((post) => {
					const combineSearch = `${post.creator}${post.title}${post.tags}${post.description}${post.name}`;
					return combineSearch.toLowerCase().includes(searchField.toLowerCase());
				})
			);
		}
	}, [posts, searchField]);

	// JSM Search function
	const searchPost = () => {
		if (searchTerm.trim() !== '' || tags.length > 0) {
			// dispatch -> search action with "searchTerm" & "tags array string"
			dispatch(getPostsBySearch({ searchTerm, tags: tags.join(',') }));

			// After input searchTerm, using history push method to push website to a specific URL:
			history.push(`/posts/search?searchQuery=${searchTerm || 'none'}&tags=${tags.join(',')}`);
		} else {
			// if empty input, then back to main page and do nothing
			history.push('/');
		}
		clearSearchInput();
	};

	// JSM Search input
	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			searchPost();
		}
	};

	const clearSearchInput = () => {
		setSearchTerm('');
		setTags([]);
	};

	// For search tags using ChipInput
	const handleAdd = (tag) => setTags([...tags, tag]);
	const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

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
					<Grid item xs={12} sm={5} md={3}>
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

						<AppBar className={classes.appBarSearch} position='static' color='inherit'>
							<TextField
								name='search'
								variant='outlined'
								label='Search Post'
								fullWidth
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								onKeyDown={handleKeyPress}
							/>

							<ChipInput
								style={{ margin: '10px 0' }}
								variant='outlined'
								label='Search Tags (press enter)'
								value={tags}
								onAdd={handleAdd}
								onDelete={handleDelete}
							/>
							<Button onClick={searchPost} className={classes.searchBtn} variant='contained' color='primary'>
								Search
							</Button>
							<Button
								variant='outlined'
								color='secondary'
								size='small'
								type='submit'
								fullWidth
								onClick={() => history.push('/')}
							>
								Back
							</Button>
						</AppBar>

						<Paper elevation={6}>
							<SearchBar setSearchField={setSearchField} placeholder='Dynamic live search' />
						</Paper>
					</Grid>

					<Grid item xs={12} sm={7} md={9}>
						{!searchQuery && (
							<Paper className={classes.pagination} elevation={6}>
								<Pagination page={page} />
							</Paper>
						)}
						<Posts searchedPosts={searchedPosts} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
