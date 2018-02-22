/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-19 14:14:27
*------------------------------------------------------- */

import { SINGLE_API } from 'src/redux/actions/type';

export const createTestingDetail = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'testing-details',
			params: payload,
			opt: { method: 'POST' },
			successType: 'CREATE_TESTING_DETAIL_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const updateTestingDetail = (payload, next, nextError) => {
	const { id, ...testingDetail } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'testing-details/' + id,
			params: testingDetail,
			opt: { method: 'PATCH' },
			successType: 'UPDATE_TESTING_DETAIL_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getTestingDetailData = (payload, next, nextError) => {
	const { id, filter } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'testing-details/' + id + (filter ? `?filter=${JSON.stringify(filter)}` : ''),
			beforeCallType: 'GET_TESTING_DETAIL_DATA_REQUEST',
			successType: 'GET_TESTING_DETAIL_DATA_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getTestingDetailList = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: `testing-details?filter=${JSON.stringify(payload.filter)}`,
			beforeCallType: 'GET_TESTING_DETAIL_LIST_REQUEST',
			successType: 'GET_TESTING_DETAIL_LIST_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getTestingDetailIdList = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: `testing-details?filter=${JSON.stringify(payload.filter)}`,
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const deleteTestingDetail = (payload, next) => {
	const { id, ...testingDetail } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'testing-details/' + id,
			params: { ...testingDetail, isDelete: true },
			opt: { method: 'PATCH' },
			successType: 'DELETE_TESTING_DETAIL_SUCCESS',
			afterSuccess: next,
		},
	};
};
