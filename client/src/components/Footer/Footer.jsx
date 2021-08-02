import React from 'react';
import { Typography } from '@material-ui/core';
// import { Link } from 'react-router-dom';
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
