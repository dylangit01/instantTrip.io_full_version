import React, { useEffect } from 'react';
import useStyles from './styles';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

import { getPost, getPostsBySearch } from '../../redux/actions/posts';
import { useDispatch, useSelector } from 'react-redux';

const PostDetails = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { post, posts, isLoading } = useSelector((state) => state.posts);
	const { id } = useParams();
	const history = useHistory();

	useEffect(() => {
		dispatch(getPost(id));
	}, [id, dispatch]);

	// Recommended posts feature, it will generate all the posts with same tags as the current post
	useEffect(() => {
		if (post) {
			dispatch(getPostsBySearch({ searchTerm: 'none', tags: post?.tags.join(',') }));
		}
	}, [post, dispatch])

	// Filtering out the current post with the same tags
	const recommendedPosts = posts.filter(({ _id }) => _id !== id);

	const openPost = (id) => history.push(`/posts/${id}`)

	// Below avoids the undefined error if the post is rendered before fetching
	if (!post) return null;
	if (isLoading) {
		return (
			<Paper elevation={6} className={classes.loadingPaper}>
				<CircularProgress size='7em' />
			</Paper>
		);
	}

	const { title, tags, description, name, createAt, selectedFile } = post;
	return (
		<Paper className={classes.postPaper} elevation={6}>
			<div className={classes.card}>
				<div className={classes.section}>
					<Typography variant='h6'>Created by: {name} </Typography>
					<Typography variant='h3' component='h2'>{title} </Typography>
					<Typography gutterBottom variant='h6' color='textSecondary' component='h2'>{tags}</Typography>
					<Typography gutterBottom variant='body1' component='p'>{description}</Typography>
					<Typography variant='body1' component='h2'> {moment(createAt).fromNow()} </Typography>
					<Divider style={{ margin: '20px 0' }} />
					<Typography variant='body1'> <strong> Realtime Chat - coming soon!</strong> </Typography>
					<Divider style={{ margin: '20px 0' }} />
					<Typography variant='body1'> <strong> Comments - coming soon!</strong> </Typography>
					<Divider style={{ margin: '20px 0' }} />
				</div>
				<div className={classes.imageSection}>
					<img className={classes.media} src={selectedFile || 'https://gadgetmedics.com/wp-content/uploads/2020/01/illustration-geiranger.jpg'} alt={title} />
				</div>
			</div>
			{
				recommendedPosts.length && (
					<div className={classes.section}>
						<Typography gutterBottom variant="h5">You might also like:</Typography>
          	<Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, description, likes, selectedFile, _id }) => (
              <Paper className={classes.recommendedPaper} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{description}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img className={classes.recommendedImg} src={selectedFile || 'https://gadgetmedics.com/wp-content/uploads/2020/01/illustration-geiranger.jpg'}  width="200px" alt={title} />
              </Paper>
            ))}
          </div>
					</div>
				)
			}
		</Paper>
	);
};

export default PostDetails;