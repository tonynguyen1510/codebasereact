/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * LastModified: 2017-07-29 20:40:38
 *-------------------------------------------------------*/
import { SINGLE_API } from 'src/redux/actions/type';

export const loginRequest = (payload, next) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'users/login?include=user',
			params: payload,
			opt: { method: 'POST' },
			loading: false,
			successType: 'LOGIN_SUCCESS',
			afterSuccess: next,
		},
	};
};
