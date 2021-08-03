import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar, IconButton, Drawer } from '@material-ui/core';
import useStyles from './styles';
import trips from '../../images/beach-logo.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import MenuIcon from '@material-ui/icons/Menu';

import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../redux/actions/auth';

const Navbar = () => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const history = useHistory();
	// useLocation hook is used to remember the current url location? whenever the location is changed, the useEffect re-rendered
	const location = useLocation();

	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

	useEffect(() => {
		// verify if the token expired:
		const token = user?.token;
		if (token) {
			const decodedToken = decode(token);
			if (decodedToken * 1000 < new Date().getTime()) logout();
		}
		setUser(JSON.parse(localStorage.getItem('profile')));
		// eslint-disable-next-line
	}, [location]);

	const logout = () => {
		dispatch({ type: LOGOUT });
		history.push('/');
		setUser(null);
	};

	// Avoid DRY
	const AvatarAndBtn = () => (
		<>
			<Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
				{user.result.name.charAt(0)}
			</Avatar>
			<Typography className={classes.userName} variant='h6'>
				{user.result.name}
			</Typography>
			<Button variant='contained' color='secondary' onClick={logout}>
				Logout
			</Button>
		</>
	);

	// For mobile view display:
	const [mobileView, setMobileView] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const setResponsiveness = () => {
			return window.innerWidth < 900 ? setMobileView(true) : setMobileView(false);
		};
		setResponsiveness();
		return window.addEventListener('resize', setResponsiveness);
	}, []);

	const DisplayMobile = () => {
		const handleMenu = () => setMenuOpen((prev) => !prev);
		const handleDrawerClose = () => setMenuOpen(false);

		const DrawerChoices = () => {
			return user ? (
				<div className={classes.mobileDrawer}>
					<AvatarAndBtn />
				</div>
			) : (
				<Button style={{ marginTop: '50px' }} component={Link} to='/auth' variant='contained' color='primary'>
					Sign In
				</Button>
			);
		};

		return (
			<Toolbar>
				<IconButton {...{ edge: 'start', 'aria-label': 'menu', 'aria-haspopup': 'true', onClick: handleMenu }}>
					<MenuIcon />
				</IconButton>

				<Typography component={Link} to='/' className={classes.heading} variant='h4' align='center'>
					InstantTrip
				</Typography>
				<img className={classes.image} src={trips} alt='trips' />

				<Drawer {...{ anchor: 'left', open: menuOpen, onClose: handleDrawerClose }}>
					<DrawerChoices />
				</Drawer>
			</Toolbar>
		);
	};

	return (
		<AppBar className={classes.appBar} position='static' color='inherit'>
			{mobileView ? (
				<DisplayMobile />
			) : (
				<>
					<div className={classes.brandContainer}>
						<Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>
							Instant Trip
						</Typography>
						<img className={classes.image} src={trips} alt='trips' height='80' />
					</div>
					<Toolbar className={classes.toolbar}>
						{user ? (
							<div className={classes.profile}>
								<AvatarAndBtn />
							</div>
						) : (
							<Button component={Link} to='/auth' variant='contained' color='primary'>
								Sign In
							</Button>
						)}
					</Toolbar>
				</>
			)}
		</AppBar>
	);
};

export default Navbar;
