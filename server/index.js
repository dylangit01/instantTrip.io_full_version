import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import postsRouter from './routes/posts.js'

const app = express();
app.use(cors())
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json({limit: '30mb', extended: true}));
app.use(express.urlencoded({limit: '30mb', extended: true}));
/* 
1. express.json() is a build-in method in express to recognize the incoming Requests when the Content-Type: application/json header is present and transfers the text-based JSON input into object under req.body.
2. express.urlencoded() is a build-in method in express to recognize the incoming URL-encoded requests, where the value can be a string or array (when extended is false), or any type (when extended is true).
3. Body-parser must be placed before routes, so that body-parser can be applied, otherwise data cannot be written into database
*/

// Using express to access public folder, and get the file with: localhost:port/images/filename
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.send('App API is running successfully')
})

// Setup for posts routes
app.use('/posts', postsRouter)

// app.listen(PORT, () => {
// 	console.log(`App listening on port ${PORT}!`);
// });

// Connect data with real database by using mongoDB
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
	.catch(err => console.log(err.message));

mongoose.set('useFindAndModify', false)