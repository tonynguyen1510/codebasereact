/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * LastModified: 2018-01-10 23:15:32
 *-------------------------------------------------------*/

import AuthStorage from 'src/utils/AuthStorage';

import { SINGLE_API } from 'src/redux/actions/type';

export function loginRequest(payload, next, nextErr) {
	return {
		type: 'LOGIN_REQUEST',
		payload,
		next,
		nextErr,
	};
}

export function logoutRequest(next) {
	return {
		type: 'LOGOUT_REQUEST',
		next,
	};
}

export const getUserAuth = (payload, next) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'users/' + AuthStorage.userId,
			successType: 'GET_USER_AUTH_SUCCESS',
			afterSuccess: next,
		},
	};
};
