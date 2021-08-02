import React from 'react';
import useStyles from './styles';
import moment from 'moment';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { ThumbUpAlt, Delete, MoreHoriz, ThumbUpAltOutlined } from '@material-ui/icons';

import { useDispatch } from 'react-redux';
import { getCurrentId, deletePost, likePost } from '../../redux/actions/posts';

const Post = ({ post }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const user = JSON.parse(localStorage.getItem('profile'));

	const Likes = () => {
		const likesLength = post.likes.length;
		if (likesLength > 0) {
			return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
				<>
					<ThumbUpAlt fontSize='small' /> &nbsp; {likesLength >= 2 ? `${likesLength} likes` : `${likesLength} like`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize='small' /> &nbsp; {likesLength} {likesLength === 1 ? 'Like' : 'Likes'}
				</>
			);
		}
		return (
			<>
				<ThumbUpAltOutlined fontSize='small' />
				&nbsp;Like
			</>
		);
	};

	const { _id, title, name, description, tags, selectedFile } = post;
	return (
		<Card className={classes.card}>
			<CardMedia
				className={classes.media}
				image={
					selectedFile ||
					'https://media.istockphoto.com/photos/driving-offroad-in-western-australia-at-sunset-picture-id1127501364?k=6&m=1127501364&s=612x612&w=0&h=hsoSs6Y0HYt_mZ_01j_Bsb8W4LF6qcmGmL5MU1CITqw='
				}
				title={title}
			/>
			<div className={classes.overlay}>
				<Typography variant='h6'>{name}</Typography>
				<Typography variant='body2'>{moment(post.createAt).fromNow()}</Typography>
			</div>

			{/* creator is the req.userId passed from the backend when new post has been created */}
			{(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
				<div className={classes.overlay2}>
					<Button style={{ color: 'white' }} size='small' onClick={() => dispatch(getCurrentId(_id))}>
						<MoreHoriz fontSize='medium' />
					</Button>
				</div>
			)}

			<div className={classes.details}>
				<Typography variant='body2' color='textSecondary' component='h2'>
					{tags.map((tag) => `#${tag} `)}
				</Typography>
			</div>
			<Typography className={classes.title} gutterBottom variant='h5' component='h2'>
				{title}
			</Typography>
			<CardContent>
				<Typography className={classes.descWidth} variant='body2' color='textSecondary' component='p'>
					{description}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(_id))}>
					<Likes />
				</Button>

				{(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
					<Button size='small' color='primary' onClick={() => dispatch(deletePost(_id))}>
						<Delete fontSize='small' /> &nbsp; Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
