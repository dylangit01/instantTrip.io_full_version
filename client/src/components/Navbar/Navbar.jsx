import { AppBar, Typography } from '@material-ui/core';
import useStyles from './styles';
import trips from '../../images/beach-logo.png';

const Navbar = () => {
	const classes = useStyles();
	return (
		<AppBar className={classes.appBar} position='static' color='inherit'>
			<Typography className={classes.heading} variant='h2' align='center'>
				Instant Trip
			</Typography>
			<img className={classes.image} src={trips} alt='trips' height='80' />
		</AppBar>
	);
}

export default Navbar;
