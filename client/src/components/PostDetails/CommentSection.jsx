import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import useStyles from './styles';

import {commentPost} from '../../redux/actions/posts'
import { useDispatch } from 'react-redux';

const CommentSection = ({ post }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [comments, setComments] = useState([1, 2, 3, 4, 5]);
	const [comment, setComment] = useState('')

	const user = JSON.parse(localStorage.getItem('profile'))

	const handleInputComment = () => {
		const finalComment = `${user.result.name}: ${comment}`
		dispatch(commentPost(finalComment, post._id));
	}

	return (
		<div>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>
					<Typography gutterBottom variant='h6'>
						Comments
					</Typography>
					{comments.map((comm, idx) => (
						<Typography key={idx} gutterBottom variant='subtitle1'>
							Comment {idx}
						</Typography>
					))}
				</div>
				<div style={{ width: '70%' }}>
					<Typography gutterBottom variant='h6'>
						Write a Comment
					</Typography>
					<TextField
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						multiline
						rows={4}
						fullWidth
						variant='outlined'
						label='Comment'
					/>
					<Button
						style={{ marginTop: '10px' }}
						fullWidth
						disabled={!comment}
						variant='contained'
						color='primary'
						onClick={handleInputComment}
					>
						Comment!
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CommentSection;
