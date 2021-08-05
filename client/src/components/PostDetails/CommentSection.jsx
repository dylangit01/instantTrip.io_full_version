import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

const CommentSection = ({ post }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [comments, setComments] = useState([1, 2, 3, 4]);
	const [comment, setComment] = useState('')

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
						row={4}
						fullWidth
						variant='outlined'
						label='Comment'
					/>
				</div>
			</div>
		</div>
	);
};

export default CommentSection;
