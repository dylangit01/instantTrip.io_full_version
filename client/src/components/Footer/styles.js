import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
	footer: {
		textAlign: 'center',
		color: '#666',
		position: 'absolute',
		bottom: '-90px',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '100%',
		background: 'rgba(255, 255, 255, 0.5)',
		height: '5vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});