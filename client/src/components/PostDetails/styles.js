import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	postPaper: {
		padding: '20px',
		borderRadius: '10px',
	},
	media: {
		borderRadius: '15px',
		objectFit: 'cover',
		width: '38vw',
		maxHeight: '600px',
	},
	card: {
		display: 'flex',
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			flexWrap: 'wrap',
			flexDirection: 'column',
		},
	},
	section: {
		borderRadius: '20px',
		margin: '10px',
		flex: 1,
	},
	imageSection: {
		marginLeft: '20px',
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
		},
	},
	recommendedPosts: {
		display: 'flex',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
	recommendedPaper: {
		padding: '10px',
		borderRadius: '10px',
		margin: '20px',
		cursor: 'pointer',
	},
	recommendedImg: {
		borderRadius: 5,
	},
	loadingPaper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '20px',
		borderRadius: 10,
		height: '39vh',
	},
	commentsOuterContainer: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	commentsInnerContainer: {
		height: '200px',
		overflowY: 'auto',
		marginRight: '30px',
	},
}));
