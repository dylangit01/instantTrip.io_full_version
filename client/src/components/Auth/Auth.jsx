import React from 'react';
import { Avatar, Button, TextField, Paper, Grid, Typography, Container, InputAdornment, IconButton } from '@material-ui/core';
import { LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import useStyles from './styles';

const Auth = () => {
	const classes = useStyles();

	const isSignUp = false;

	const handleChange = () => {

	}

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	// Create generic Input for TextField, so that we don't have to create each TextField property (required, fullWidth and so on) for every TextField.
	const Input = ({ half, name, handleChange, label, autoFocus, type, handleShowPassword }) => (
		<Grid item xs={12} sm={half ? 6: 12}>
			<TextField
				name={name}
				onChange={handleChange}
				variant='outlined'
				required
				fullWidth
				label={label}
				autoFocus={autoFocus}
				type={type}
				InputProps={name === 'password' && {
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton onClick={handleShowPassword}>
								{type==='password' ? <Visibility/> : <VisibilityOff/>}
							</IconButton>
						</InputAdornment>	
					)
				}}
			
			/>
		</Grid>
	)


	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography component='h1' variant='h5'>
					{isSignUp ? 'Sign Up' : 'Sign In'}
				</Typography>
				<form className={classes.form} onSubmit={e => handleSubmit(e)}>
					{
						isSignUp && (
							<>
								<Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
								<Input name='lastName' label='Last Name' handleChange={handleChange} half/>
							</>	
						)
					}
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
