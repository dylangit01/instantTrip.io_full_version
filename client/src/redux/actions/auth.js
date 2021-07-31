import * as api from '../../api';

export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';

export const signIn = (formData, history) => async (dispatch) => {
	try {
		// log in the user...

		history.push('/')
	} catch (error) {
		console.log(error);
	}
}

export const signUp = () => async (dispatch) => {
	try {
		// sign up the user...

		history.push('/');
	} catch (error) {
		console.log(error);
	}
}