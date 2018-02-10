/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * LastModified: 2018-02-10 09:52:14
 *-------------------------------------------------------*/

import AuthStorage from 'src/utils/AuthStorage';

import { SINGLE_API } from 'src/redux/actions/type';

export const createUser = (payload, next, nextError) => {
	if (!AuthStorage.loggedIn && AuthStorage.role !== 'admin') {
		return;
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
