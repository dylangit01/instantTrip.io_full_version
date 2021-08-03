import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Footer from './components/Footer/Footer';
import PostDetails from './components/PostDetails/PostDetails';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import useStyles from './AppStyles'

const App = () => {
	const classes = useStyles();
	const user = JSON.parse(localStorage.getItem('profile'))
	
	return (
		<BrowserRouter>
			<div className={classes.mainContainer}>
				<Container maxWidth='xl'>
					<Navbar />
					<Switch>
						<Route path='/' exact component={() => <Redirect to='/posts' />} />
						<Route path='/posts' exact component={Home} />
						<Route path='/posts/search' exact component={Home} />
						<Route path='/posts/:id' component={PostDetails} />

						{/* If user logged in already, then path "/auth" will be redirected to "/posts" */}
						<Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to='/posts' />)} />

					</Switch>
				</Container>
				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default App;
