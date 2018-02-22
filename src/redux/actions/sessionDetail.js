/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-19 14:14:27
*------------------------------------------------------- */

import { SINGLE_API } from 'src/redux/actions/type';

export const createSessionDetail = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'study-session-details',
			params: payload,
			opt: { method: 'POST' },
			successType: 'CREATE_SESSION_DETAIL_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const updateSessionDetail = (payload, next, nextError) => {
	const { id, ...sessionDetail } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'study-session-details/' + id,
			params: sessionDetail,
			opt: { method: 'PATCH' },
			successType: 'UPDATE_SESSION_DETAIL_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getSessionDetailData = (payload, next, nextError) => {
	const { id, filter } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'study-session-details/' + id + (filter ? `?filter=${JSON.stringify(filter)}` : ''),
			beforeCallType: 'GET_SESSION_DETAIL_DATA_REQUEST',
			successType: 'GET_SESSION_DETAIL_DATA_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getSessionDetailList = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: `study-session-details?filter=${JSON.stringify(payload.filter)}`,
			beforeCallType: 'GET_SESSION_DETAIL_LIST_REQUEST',
			successType: 'GET_SESSION_DETAIL_LIST_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getSessionDetailIdList = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: `study-session-details?filter=${JSON.stringify(payload.filter)}`,
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const deleteSessionDetail = (payload, next) => {
	const { id, ...sessionDetail } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'study-session-details/' + id,
			params: { ...sessionDetail, isDelete: true },
			opt: { method: 'PATCH' },
			successType: 'DELETE_SESSION_DETAIL_SUCCESS',
			afterSuccess: next,
		},
	};
};
