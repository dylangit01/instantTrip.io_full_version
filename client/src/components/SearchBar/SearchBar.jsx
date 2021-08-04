import React from 'react';
import { FormControl, Input, InputAdornment } from '@material-ui/core';
import useStyles from './styles';
import SearchIcon from '@material-ui/icons/Search';

// import { useDispatch } from 'react-redux';
// import { searchPost } from '../../redux/actions/posts';

const SearchBar = ({ setSearchField, placeholder }) => {
	const classes = useStyles();
	// const dispatch = useDispatch();

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	console.log(searchValue);
	// 	dispatch(searchPost(searchValue));
	// 	setSearchValue('')
	// }

	return (
		<FormControl fullWidth className={classes.root}>
			<Input
				// value={searchValue}
				onChange={(e) => setSearchField(e.target.value)}
				placeholder={placeholder}
				startAdornment={
					<InputAdornment position='start'>
						<SearchIcon />
					</InputAdornment>
				}
			/>
		</FormControl>
	);
};

export default SearchBar;
