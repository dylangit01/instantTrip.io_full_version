import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
	postShowBtn: {
		marginBottom: '20px',
	},
	searchBar: {
		marginBottom: '20px',
	},
	pagination: {
		marginBottom: '20px',
	},
	appBarSearch: {
		borderRadius: 4,
		marginBottom: '1rem',
		display: 'flex',
		padding: '16px',
	},
	gridContainer: {
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column-reverse'
		}
	}
}));