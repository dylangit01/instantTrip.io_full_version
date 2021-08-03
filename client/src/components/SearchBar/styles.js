import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		'& .MuiInputBase-root': {
			fontSize: '1.2rem',
			// marginBottom: '20px',
			padding: '5px 10px',
			background: '#fff',
			borderRadius: '4px',
		},
		// '& .MuiInput-underline:before': {
		// 	width: '98%',
		// 	display: 'flex',
		// 	justifyContent: 'center',
		// 	textAlign: 'center'
		// }
	},
}));
