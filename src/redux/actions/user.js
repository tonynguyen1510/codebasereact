/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * LastModified: 2018-02-10 09:52:14
 *-------------------------------------------------------*/

import AuthStorage from 'src/utils/AuthStorage';

import { SINGLE_API, REQUEST_ERROR } from 'src/redux/actions/type';

export const createUser = (payload, next, nextError) => {
	if (!AuthStorage.loggedIn || AuthStorage.role !== 'admin') {
		if (typeof nextError === 'function') {
			nextError();
		}
		return {
			type: REQUEST_ERROR,
			payload: 'Permission denied!',
		};
	}
	return {
		type: SINGLE_API,
		payload: {
			uri: 'users',
			params: payload,
			opt: { method: 'POST' },
			// successType: 'GET_USER_AUTH_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const updateUser = (payload, next, nextError) => {
	if (!AuthStorage.loggedIn || AuthStorage.role !== 'admin') {
		if (typeof nextError === 'function') {
			nextError();
		}
		return {
			type: REQUEST_ERROR,
			payload: 'Permission denied!',
		};
	}
	const { id, ...user } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'users/' + id,
			params: user,
			opt: { method: 'PATCH' },
			successType: 'UPDATE_USER_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const resendInvitation = (payload, next, nextError) => {
	if (!AuthStorage.loggedIn || AuthStorage.role !== 'admin') {
		if (typeof nextError === 'function') {
			nextError();
		}
		return {
			type: REQUEST_ERROR,
			payload: 'Permission denied!',
		};
	}

	if (!payload || !payload.email) {
		return {
			type: REQUEST_ERROR,
			payload: 'Email is required!',
		};
	}

	const { email } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'users/resend-invitation',
			params: { email },
			opt: { method: 'POST' },
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getUserList = (payload, next, nextError) => {
	if (!AuthStorage.loggedIn || AuthStorage.role !== 'admin') {
		if (typeof nextError === 'function') {
			nextError();
		}
		return {
			type: REQUEST_ERROR,
			payload: 'Permission denied!',
		};
	}

	return {
		type: SINGLE_API,
		payload: {
			uri: `users?filter=${JSON.stringify(payload.filter)}`,
			beforeCallType: 'GET_USER_LIST_REQUEST',
			successType: 'GET_USER_LIST_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

