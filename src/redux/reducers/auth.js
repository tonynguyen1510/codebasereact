/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-01-10 23:20:59
 *-------------------------------------------------------*/
import AuthStorage from 'src/utils/AuthStorage';
import Router from 'next/router';

export const initialState = {

};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return action.payload;
		case 'LOGIN_FAILED':
			return { error: action.payload.message || action.payload };
		case 'LOGOUT_SUCCESS':
			AuthStorage.destroy();
			Router.push('/login');
			return {};
		case 'GET_USER_AUTH_SUCCESS':
			return action.payload;
		default:
			return state;
	}
};

