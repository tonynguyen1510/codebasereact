/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-19 14:14:27
*------------------------------------------------------- */

import { SINGLE_API } from 'src/redux/actions/type';

export const createPayment = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'payments',
			params: payload,
			opt: { method: 'POST' },
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const updatePayment = (payload, next, nextError) => {
	const { id, ...payment } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'payments/' + id,
			params: payment,
			opt: { method: 'PATCH' },
			successType: 'UPDATE_PAYMENT_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getPaymentData = (payload, next, nextError) => {
	const { id, filter } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'payments/' + id + (filter ? `?filter=${JSON.stringify(filter)}` : ''),
			beforeCallType: 'GET_PAYMENT_DATA_REQUEST',
			successType: 'GET_PAYMENT_DATA_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getPaymentList = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: `payments?filter=${JSON.stringify(payload.filter)}`,
			beforeCallType: 'GET_PAYMENT_LIST_REQUEST',
			successType: 'GET_PAYMENT_LIST_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const deletePayment = (payload, next) => {
	const { id, ...payment } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'levels/' + id,
			params: { ...payment, isDelete: true },
			opt: { method: 'PATCH' },
			successType: 'DELETE_PAYMENT_SUCCESS',
			afterSuccess: next,
		},
	};
};
