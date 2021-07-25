import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
	appBar: {
		borderRadius: 15,
		margin: '30px 0',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: '80px',
		overflow: 'hidden',
		padding: '5px 50px',
		'@media (max-width: 900px)': {
			paddingLeft: '10px',
		},
	},
	heading: {
		fontWeight: 'bold',
		color: 'rgba(222,144,255, 1)',
		'@media (max-width:600px)': {
			height: '50px',
			fontSize: '40px',
			display: 'flex',
			alignItems: 'center',
		},
		textDecoration: 'none',
	},
	image: {
		marginLeft: '30px',
		width: '100px',
		height: 'auto',
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: '400px',
	},
	profile: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '400px',
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
}));
