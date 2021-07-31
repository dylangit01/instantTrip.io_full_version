import express from 'express';
import {signIn, signUp} from '../controllers/userController.js'

const router = express.Router();

// Here using "post" request as we have to send some data from the FE form to the server and based on the information to sign in or sign up the user
router.post('/signin', signIn);
router.post('/signup', signUp);

export default router;