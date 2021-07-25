import React from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import useStyles from './styles';

const Auth = () => {
	const classes = useStyles();

	const isSignup = false;

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography component='h1' variant='h5'>
					{isSignup ? 'Sign Up' : 'Sign In'}
				</Typography>
				<form className={classes.form} onSubmit={e => handleSubmit(e)}>

				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
