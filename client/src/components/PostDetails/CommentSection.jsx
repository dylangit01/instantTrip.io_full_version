import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import useStyles from './styles';

import { commentPost } from '../../redux/actions/posts';
import { useDispatch, useSelector } from 'react-redux';

const CommentSection = ({ post }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [comments, setComments] = useState(post?.comments);
	const [comment, setComment] = useState('');
	const commentsRef = useRef()

	const user = JSON.parse(localStorage.getItem('profile'));

	const handleInputComment = async () => {
		const finalComment = `${user?.result?.name}: ${comment}`;
		const newComments = await dispatch(commentPost(finalComment, post._id));
		setComments(newComments);
		setComment('');

		// For auto-scroll down feature
		commentsRef.current.scrollIntoView({ behavior: 'smooth'})
	};

	return (
		<div>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>
					<Typography gutterBottom variant='h6'>
						Comments
					</Typography>
					{comments?.map((comm, idx) => (
						<Typography key={idx} gutterBottom variant='subtitle1'>
							{comm}
						</Typography>
					))}

					{/* for auto scroll down feature */}
					<div ref={commentsRef} />

				</div>
				{user?.result?.name && (
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
				)}
			</div>
		</div>
	);
};

export default CommentSection;
