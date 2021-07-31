import Input from '../Input/Input';
import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AUTH } from '../../redux/actions/posts';
import { signUp, signIn } from '../../redux/actions/auth';

import { GoogleLogin } from 'react-google-login';
import { FaGoogle } from 'react-icons/fa';

const initialData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState(initialData);
	const history = useHistory();

	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignUp) {
			dispatch(signUp(formData, history))
		} else {
			dispatch(signIn(formData, history));
		}
	};

	const switchMode = () => {
		setIsSignUp((prev) => !prev);
		setShowPassword(false);
	};

	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({ type: AUTH, data: { result, token } });

			// After login, it will redirect to home page right away:
			history.push('/');
		} catch (e) {
			console.log(e);
		}
	};
	const googleFailure = (error) => {
		console.log(error);
		console.log('Google Sign In was unsuccessful, please try again');
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography component='h1' variant='h5'>
					{isSignUp ? 'Sign Up' : 'Sign In'}
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignUp && (
							<>
								<Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
								<Input name='lastName' label='Last Name' handleChange={handleChange} half />
							</>
						)}
						<Input name='email' label='Email Address' handleChange={handleChange} type='email' />
						<Input
							name='password'
							label='Password'
							handleChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
						/>
						{isSignUp && (
							<Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />
						)}
					</Grid>
					<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
						{isSignUp ? 'Sign UP' : 'Sign In'}
					</Button>

					{/* Implement Google Login */}
					<GoogleLogin
						clientId='411530278656-9lcvkcnicv08kd95lhse0q41mgk1r7kc.apps.googleusercontent.com'
						render={(renderProps) => (
							<Button
								variant='contained'
								className={classes.googleButton}
								color='primary'
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<FaGoogle />}
							>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy='single_host_origin'
					/>

					<Grid container justifyContent='flex-end'>
						<Button onClick={switchMode}>
							{isSignUp ? 'Already have an account?  Sign In' : "Don't have an account? Sign Up"}
						</Button>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
