import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	postShowBtn: {
		marginBottom: '10px',
	},
	searchBar: {
		// marginBottom: '20px',
	},
	searchBtn: {
		marginBottom: '10px',
	},
	pagination: {
		marginBottom: '20px',
	},
	appBarSearch: {
		borderRadius: 4,
		margin: '.7rem 0 1rem',
		display: 'flex',
		padding: '16px',
	},
	gridContainer: {
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
		},
	},
}));