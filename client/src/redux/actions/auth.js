import * as api from '../../api';

export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';

export const signIn = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.signIn(formData);
		dispatch({ type: AUTH, payload: data });
		history.push('/');
	} catch (error) {
		console.log(error);
	}
};

export const signUp = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.signUp(formData);
		dispatch({ type: AUTH, payload: data });
		history.push('/');
	} catch (error) {
		console.log(error);
	}
};
