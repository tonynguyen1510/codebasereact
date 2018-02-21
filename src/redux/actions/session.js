/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-19 14:14:27
*------------------------------------------------------- */

import { SINGLE_API } from 'src/redux/actions/type';

export const createSession = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'sessions',
			params: payload,
			opt: { method: 'POST' },
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const updateSession = (payload, next, nextError) => {
	const { id, ...session } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'sessions/' + id,
			params: session,
			opt: { method: 'PATCH' },
			successType: 'UPDATE_SESSION_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getSessionData = (payload, next, nextError) => {
	const { id, filter } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'sessions/' + id + (filter ? `?filter=${JSON.stringify(filter)}` : ''),
			beforeCallType: 'GET_SESSION_DATA_REQUEST',
			successType: 'GET_SESSION_DATA_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getSessionList = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: `sessions?filter=${JSON.stringify(payload.filter)}`,
			beforeCallType: 'GET_SESSION_LIST_REQUEST',
			successType: 'GET_SESSION_LIST_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const deleteSession = (payload, next) => {
	const { id, ...Session } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'sessions/' + id,
			params: { ...session, isDelete: true },
			opt: { method: 'PATCH' },
			successType: 'DELETE_SESSION_SUCCESS',
			afterSuccess: next,
		},
	};
};
