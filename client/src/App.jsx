import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import useStyles from './AppStyles'

const App = () => {
	const classes = useStyles();
	return (
		<BrowserRouter>
			<div className={classes.mainContainer}>
				<Container maxWidth='lg'>
					<Navbar />
					<Switch>
						<Route path='/' exact component={Home} />
						<Route path='/auth' exact component={Auth} />
					</Switch>
				</Container>
				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default App;
