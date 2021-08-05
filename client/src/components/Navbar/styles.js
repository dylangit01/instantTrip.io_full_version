import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
	appBar: {
		borderRadius: 10,
		margin: '30px 0',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '80px',
		overflow: 'hidden',
		padding: '5px 50px',
		'@media (max-width: 1045px)': {
			justifyContent: 'space-around',
			paddingLeft: '10px',
		},
	},
	heading: {
		fontWeight: 'bold',
		textDecoration: 'none',
		color: 'rgba(222,144,255, 1)',
		'@media (max-width:1040px)': {
			height: '50px',
			fontSize: '40px',
			display: 'flex',
			alignItems: 'center',
		},
		'@media (max-width:650px)': {
			fontSize: '30px',
		},
	},
	image: {
		marginLeft: '30px',
		width: '100px',
		height: 'auto',
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: '300px',
		[theme.breakpoints.down('sm')]: {
			width: 'auto',
		},
	},
	profile: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '300px',
		'@media (max-width:1040px)': {
			// width: '80px',
		},
	},
	userName: {
		display: 'flex',
		alignItems: 'center',
	},
	brandContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
	},
	mobileDrawer: {
		marginTop: '30px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));
