/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-23 00:01:23
*------------------------------------------------------- */

import { SINGLE_API } from 'src/redux/actions/type';

export const createTesting = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'testings',
			params: payload,
			opt: { method: 'POST' },
			successType: 'CREATE_TESTING_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const updateTesting = (payload, next, nextError) => {
	const { id, ...testing } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'testings/' + id,
			params: testing,
			opt: { method: 'PATCH' },
			successType: 'UPDATE_TESTING_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getTestingData = (payload, next, nextError) => {
	const { id, filter } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'testings/' + id + (filter ? `?filter=${JSON.stringify(filter)}` : ''),
			beforeCallType: 'GET_TESTING_DATA_REQUEST',
			successType: 'GET_TESTING_DATA_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getTestingList = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: `testings?filter=${JSON.stringify(payload.filter)}`,
			beforeCallType: 'GET_TESTING_LIST_REQUEST',
			successType: 'GET_TESTING_LIST_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const deleteTesting = (payload, next) => {
	const { id, ...testing } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'testings/' + id,
			params: { ...testing, isDelete: true },
			opt: { method: 'PATCH' },
			successType: 'DELETE_TESTING_SUCCESS',
			afterSuccess: next,
		},
	};
};
