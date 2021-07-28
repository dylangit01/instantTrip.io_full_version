import React, {useState} from 'react';
import { Avatar, Button, TextField, Paper, Grid, Typography, Container, InputAdornment, IconButton } from '@material-ui/core';
import { LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AUTH } from '../../redux/actions/posts';

import { GoogleLogin } from 'react-google-login';
import { FaGoogle } from 'react-icons/fa';

const Auth = () => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false)
	const [isSignUp, setIsSignUp] = useState(false);
	const history = useHistory();

	const dispatch = useDispatch();

	const handleChange = () => {

	}

	const handleShowPassword = () => setShowPassword((prevShowPassword)=> !prevShowPassword)

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const switchMode = () => {
		setIsSignUp(prev => !prev);
		setShowPassword(false)
	}

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

	// Create generic Input for TextField, so that we don't have to create each TextField property (required, fullWidth and so on) for every TextField.
	const Input = ({ half, name, handleChange, label, autoFocus, type, handleShowPassword }) => (
		<Grid item xs={12} sm={half ? 6 : 12}>
			<TextField
				name={name}
				onChange={handleChange}
				variant='outlined'
				required
				fullWidth
				label={label}
				autoFocus={autoFocus}
				type={type}
				InputProps={name === 'password' ? {
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton onClick={handleShowPassword}>
								{type ==='password' ? <Visibility/> : <VisibilityOff/>}
							</IconButton>
						</InputAdornment>
					)
				} : null}
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
				<form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
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
