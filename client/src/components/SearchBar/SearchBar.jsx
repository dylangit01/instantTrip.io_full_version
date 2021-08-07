import React from 'react';
import { FormControl, Input, InputAdornment } from '@material-ui/core';
import useStyles from './styles';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = ({ setSearchField, placeholder }) => {
	const classes = useStyles();

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
