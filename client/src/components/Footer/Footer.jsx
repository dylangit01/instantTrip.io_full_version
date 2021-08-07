import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './styles';

const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<Typography variant='body1' color='primary' >
				Copyright &copy; Dylan Du 2021
			</Typography>
		</footer>
	);
}

export default Footer


// In order to have the best footer styles, it also needs to create position: relative in the closest container for the footer component. (In this case, it's the App.jsx)
