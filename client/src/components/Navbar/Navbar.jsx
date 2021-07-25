import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import useStyles from './styles';
import trips from '../../images/beach-logo.png';
import {Link} from 'react-router-dom'

const Navbar = () => {
	const user = {};
	const classes = useStyles();

	const logout = () => {

	}


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
}

export default Navbar;
