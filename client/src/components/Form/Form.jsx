import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

// Use redux
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost, clearCurrentId } from '../../redux/actions/posts';

const Form = () => {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		creator: '',
		tags: '',
		selectedFile: '',
	});

	// In Form component, the initial postID value is null as it comes from Post component when click the "..."
	const dispatch = useDispatch();
	const postID = useSelector((state) => state.postID);

	// If current postID exists, then find the current post with that ID:
	const post = useSelector((state) => postID && state.posts.find((post) => post._id === postID));

	useEffect(() => {
		if(post) setFormData(post)
	}, [post])

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Dispatch the action whenever creating a new post
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (postID) {
			dispatch(updatePost(postID, formData));
		} else {
			dispatch(createPost(formData));
		}
		handleClear();
	};
	
	const handleClear = () => {
		dispatch(clearCurrentId())
		setFormData({
			title: '',
			description: '',
			creator: '',
			tags: '',
			selectedFile: '',
		});
	};

	const { title, description, creator, tags } = formData;
	return (
		<Paper className={classes.paper}>
			<form
				autoComplete='off'
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={(e) => handleSubmit(e)}
			>
				<Typography variant='h6'>{postID ? 'Editing' : 'Creating'} a Trip</Typography>

				<TextField
					name='creator'
					variant='outlined'
					label='Creator'
					fullWidth
					value={creator}
					onChange={(e) => handleChange(e)}
				/>

				<TextField
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={title}
					onChange={(e) => handleChange(e)}
				/>

				<TextField
					name='description'
					variant='outlined'
					label='Description'
					multiline
					rows={4}
					fullWidth
					value={description}
					onChange={(e) => handleChange(e)}
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

				<Button variant='contained' color='secondary' size='small' type='submit' fullWidth onClick={handleClear}>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
