import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost, clearCurrentId } from '../../redux/actions/posts';

const initialValue = { title: '', description: '', tags: '', selectedFile: '' };
const validateOnChange = true;

const Form = () => {
	const classes = useStyles();
	const history = useHistory();

	const [formData, setFormData] = useState(initialValue);
	const [errors, setErrors] = useState({});

	// In Form component, the initial postID value is null as it comes from Post component when click the "..."
	const dispatch = useDispatch();
	const postID = useSelector((state) => state.postID);

	// If current postID exists, then find the current post with that ID:
	const post = useSelector((state) => postID && state.posts.posts.find((post) => post._id === postID));

	// Since add user authentication, we can grab the user from the localStorage:
	const user = JSON.parse(localStorage.getItem('profile'));

	useEffect(() => {
		if (post) setFormData(post)
	}, [post])

	const validate = (fieldValues = formData) => {
		let temp = { ...errors };

		if ('title' in fieldValues) temp.title = fieldValues.title ? '' : 'Title is required';
		if ('creator' in fieldValues) temp.creator = fieldValues.creator ? '' : 'Creator is required';
		if ('description' in fieldValues) temp.description = fieldValues.description ? '' : 'Message is required';

		setErrors({ ...temp });

		if (fieldValues === formData) return Object.values(temp).every((x) => x === '');
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		if (validateOnChange) {
			validate({ [name]: value });
		}
	};

	// Dispatch the action whenever creating a new post
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validate()) {
			if (postID) {

				// Since creator becomes the userId, in order to get the user name for the backend(mongoDB model requires the name), we can add it in an object as name: user.result.name
				dispatch(updatePost(postID, { ...formData, name: user?.result?.name }));
			} else {
				// In order to redirect to newly created post details, we need to pass "history" as the second parameter
				dispatch(createPost({ ...formData, name: user?.result?.name }), history);
			}
			handleClear();
		} else alert('Please fix below errors');
	};
	
	const handleClear = () => {
		dispatch(clearCurrentId());
		setFormData(initialValue);
		setErrors({});
	};

	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper} elevation={6}>
				<Typography variant='h6' align='center' color='textSecondary'>
					Please Sign In to create your own posts and like other's posts.
				</Typography>
			</Paper>
		);
	}

	const { title, description, tags } = formData;
	return (
		<Paper className={classes.paper} elevation={6}>
			<form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
				<Typography variant='h6'>{postID ? 'Editing' : 'Creating'} a Trip</Typography>

				{/* Since having Login part, we don't need the creator in the form any more, instead, it will be the req: userId of the token in the localStorage */}

				{/* <TextField
					name='creator'
					variant='outlined'
					label='Creator'
					fullWidth
					value={creator}
					onChange={handleChange}
					{...(errors.creator && { error: true, helperText: errors.creator })}
				/> */}

				<TextField
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={title}
					onChange={handleChange}
					{...(errors.title && { error: true, helperText: errors.title })}
				/>

				<TextField
					name='description'
					variant='outlined'
					label='Message'
					multiline
					rows={4}
					fullWidth
					value={description}
					onChange={handleChange}
					{...(errors.description && { error: true, helperText: errors.description })}
				/>

				<TextField
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					placeholder='using comma to separate'
					value={tags}
					onChange={(e) => setFormData({ ...formData, tags: e.target.value.replace(' ', '').split(',') })}
				/>

				{/* For convert img to string using FileBase */}
				<div className={classes.fileInput}>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) => setFormData({ ...formData, selectedFile: base64 })}
					/>
				</div>

				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					fullWidth
				>
					{postID ? 'Update' : 'Create'}
				</Button>
			</form>

			<Button variant='contained' color='secondary' size='small' type='submit' fullWidth onClick={handleClear}>
				Clear
			</Button>
		</Paper>
	);
};

export default Form;
