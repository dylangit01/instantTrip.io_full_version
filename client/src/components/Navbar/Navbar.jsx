import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import useStyles from './styles';
import trips from '../../images/beach-logo.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../redux/actions/auth';

const Navbar = () => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const history = useHistory();
	// useLocation hook is used to remember the current url location? whenever the location is changed, the useEffect re-rendered
	const location = useLocation();

	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	// console.log(user);

	useEffect(() => {
		// verify if the token expired:
		const token = user?.token;
		if (token) {
			const decodedToken = decode(token);
			if (decodedToken * 1000 < new Date().getTime()) logout();
		}
		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location]);

	const logout = () => {
		dispatch({ type: LOGOUT });
		history.push('/');
		setUser(null);
	};

	return (
		<AppBar className={classes.appBar} position='static' color='inherit'>
			<div className={classes.brandContainer}>
				<Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>
					Instant Trip
				</Typography>
				<img className={classes.image} src={trips} alt='trips' height='80' />
				<Toolbar className={classes.toolbar}>
					{user ? (
						<div className={classes.profile}>
							<Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
								{user.result.name.charAt(0)}
							</Avatar>
							<Typography className={classes.userName} variant='h6'>
								{user.result.name}
							</Typography>
							<Button variant='contained' color='secondary' onClick={logout}>
								Logout
							</Button>
						</div>
					) : (
						<Button component={Link} to='/auth' variant='contained' color='primary'>
							Sign In
						</Button>
					)}
				</Toolbar>
			</div>
		</AppBar>
	);
};

export default Navbar;
