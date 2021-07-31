import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

// Create generic Input for TextField, so that we don't have to create each TextField property (required, fullWidth and so on) for every TextField.

const Input = ({ half, name, handleChange, label, autoFocus, type, handleShowPassword }) => {
	return (
		<Grid item xs={12} sm={half ? 6 : 12}>
			<TextField
				name={name}
				onChange={handleChange}
				variant='outlined'
				required
				fullWidth
				label={label}
				autoFocus={autoFocus}
				type={type}
				InputProps={
					name === 'password' ? {
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton onClick={handleShowPassword}>
											{type === 'password' ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								)} : null
				}
			/>
		</Grid>
	);
};

export default Input;
