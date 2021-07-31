import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	mainContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	smMargin: {
		margin: theme.spacing(1),
	},
	actionDiv: {
		textAlign: 'center',
	},
	circularProcess: {
		paddingTop: '200px',
		height: '400px',
		display: 'flex',
		justifyContent: 'center',
	},
	noResult: {
		height: '50vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		// fontSize: '2rem',
		color: '#666',
	},
}));
