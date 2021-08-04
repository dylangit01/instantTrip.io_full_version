// Once a user is logged in, the user can do all kinds of actions such as create post, update post, delete post and so on..., so the backend needs to be able to react to those actions based on the userId, this id is obtained by using authentication middleware, and this "userId" will be used by other files using next():

// e.g: user wants to like a post => login => user clicks the like button => auth middleware decides to confirm or deny the user => next() => allow user to do like the post

import jwt from 'jsonwebtoken';

const secret = 'test';

const authMiddleware = async (req, res, next) => {
	try {
		console.log(req.headers.authorization);
		// if (!req.headers.authorization) {
		// 	console.log('no authorization passed to authMiddleware');
		// };
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuthToken = token.length < 500;
		// another token is the Google OAuth Token

		let decodedData;
		if (token && isCustomAuthToken) {
			decodedData = jwt.verify(token, secret);
			// here the 'test' is the secret string that has been setup in userController;

			// When user is logged in, system knows which user is logged in and done some actions, the system is going to store the user's id.
			req.userId = decodedData?.id;
		} else {
			// For Google token using decode, and we don't need the secret string
			decodedData = jwt.decode(token);
			req.userId = decodedData?.sub;
			// sub === googleId, which is a specific google id that differentiates every single google user
		}
		// Passing userId to other file to use:
		next();
	} catch (error) {
		console.log(error, 'here is the error');
	}
};

export default authMiddleware;

// We will use the middleware in post routes file, so only verified user can do those actions
