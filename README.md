# InstantTrip.io
[InstantTrip.io](https://instant-trip.netlify.app/) is a simple social media app that allows users to post the places they have been and share with friends. Users can add name, tags and feedback, they also can like others posts. 

## MVP: https://instant-trip.netlify.app/

## Tech Stacks
* Front-End: React, Redux(thunk), Hooks, Material-UI;
* Back-End: NodeJS, express, MongoDB

## Client Side Command
npm start

## Client Side Dependencies
* jwt-decode: creating authentication
* react-google-login: google authentication
* axios: for making API requests
* redux: React state management tool
* react-redux: react redux version
* redux-thunk: for handling asynchronous actions using redux
* moment: for showing time and date in UI
* react-file-base64: for converting images to string
* @material-ui: for styling and icons

## Client Side Structure
* components: separate app into different isolated component with its own styles
* api: use axios to make API calls to server side
* images: for storing app images
* redux: for implementing redux function

## Import Redux
* Import {Provider} from 'react-redux', which will keep track of the store 
* Import {createStore, applyMiddleware, compose} form 'redux'
* Import thunk from 'redux-thunk' to handle async actions
* Import reducers

## Redux Setup
* store: is the global state and allows any component to access the store from anywhere inside of the app without prop-drilling
* actions: a function to create object which has type and payload and return that action;(with using thunk, it will dispatch that action)
* reducers: a function that specifies how the state will be changed in response to action type

## Use Redux
* Import {useDispatch} from 'react-redux' in component
* const dispatch = useDispatch()
* Use function to trigger an action, such as: Using 'useEffect' to initiate dispatching "getPosts" action, this action using api to fetch data and dispatch fetched data to reducer
* Use {useSelector} from 'react-redux' to access global store to get any state object, such as "const posts = useSelector(state => state.posts)"

## Server Side Dependencies
* bcryptjs: hash password
* jsonwebtoken: building security account
* body-parser: enable to send post requests result to frontend
* cors: enable cross origin requests
* express: as a framework to enable for creating routes
* mongoose: to create models for the posts
* nodemon: auto re-render the server

## Sever Side Structure
* routes: setup backend routers for different requests

* controllers: folder structure for all the detailed requests handlers (the callback functions from routes) to make the app more scalable by using mongoose models

* models: creating schema for different database models of different entities

## Database-Mongoose
Using application connection string:
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })

## Multiple classes applied in element:
className = {`${classes.xxx} ${classes.xxx}`}

