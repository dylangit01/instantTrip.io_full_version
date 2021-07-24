import React from 'react'
import useStyles from './styles';
import moment from 'moment';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { ThumbUpAlt, Delete, MoreHoriz } from '@material-ui/icons';

import { useDispatch } from 'react-redux';
import { getCurrentId, deletePost } from '../../redux/actions/posts';

const Post = ({post}) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { _id, title, creator, description, tags, selectedFile, createAt, likeCount } = post;
	return (
		<Card className={classes.card}>
			<CardMedia className={classes.media} image={selectedFile || '../../images/boat-trip.png'} title={post.title} />
			<div className={classes.overlay}>
				<Typography variant='h6'>{creator}</Typography>
				<Typography variant='body2'>{moment(createAt).fromNow()}</Typography>
			</div>
			<div className={classes.overlay2}>
				<Button style={{ color: 'white' }} size='small' onClick={() => dispatch(getCurrentId(_id))}>
					<MoreHoriz fontSize='medium' />
				</Button>
			</div>
			<div className={classes.details}>
				<Typography variant='body2' color='textSecondary' component='h2'>
					{tags.map((tag) => `#${tag} `)}
				</Typography>
			</div>
			<Typography className={classes.title} gutterBottom variant='h5' component='h2'>
				{title}
			</Typography>
			<CardContent>
				<Typography variant='body2' color='textSecondary' component='p'>
					{description}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Button size='small' color='primary' onClick={() => {}}>
					<ThumbUpAlt fontSize='small' /> Like {likeCount}
				</Button>
				<Button size='small' color='primary' onClick={() => dispatch(deletePost(_id))}>
					<Delete fontSize='small' /> Delete
				</Button>
			</CardActions>
		</Card>
	);
}

export default Post
