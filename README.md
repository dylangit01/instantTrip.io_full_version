# InstantTrip
[InstantTrip](https://instanttrip-complete-version.netlify.app/) is a Full Stack MERN social media app that allows users to post the places they have been (or anything) and share with friends. App has completed authentication, title & tags search, dynamic live search, client-side routing and pagination features. Authorized users can create, update and delete posts. However, non-registered users can browse and search posts. 

## MVP: https://instanttrip-complete-version.netlify.app/

## Tech Stacks
* Front-End: React, Redux(thunk), React Hooks, Material-UI;
* Back-End: NodeJS, express, MongoDB

## Getting Started
* Prerequisites
	* Node 12.x
	* Npm 7.x
* Install node modules
```
yarn
```
* Starting front-end servers
```
yarn start
```

## Client Side Dependencies
* axios: for making API requests
* redux: React state management tool
* react-redux: react redux version
* redux-thunk: for handling asynchronous actions using redux
* moment: for showing time and date in UI
* react-file-base64: for converting images to string
* @material-ui: for styling and icons
* @material-ui/lab: for page pagination
* @material-ui-chip-input
* jwt-decode: creating authentication
* react-google-login: create google account authentication
* react-router-dom: adding new screens and flows to the app

## Client Side Structure
* components: separate app into different isolated component with its own styles
* api: use axios to make API calls to server side
* images: for storing app images
* redux: for implementing redux function

## Server Side Dependencies
* bcryptjs: hash password
* jsonwebtoken: building security account
* body-parser: parsing the incoming request bodies in a middleware before handling it
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


