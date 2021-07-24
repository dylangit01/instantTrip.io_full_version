import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
	appBar: {
		borderRadius: 15,
		margin: '30px 0',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: '80px',
		overflow: 'hidden'
	},
	heading: {
		fontWeight: 'bold',
		color: 'rgba(222,144,255, 1)',
	},
	image: {
		marginLeft: '30px',
		width: '100px',
		height: 'auto',
	},
}));
