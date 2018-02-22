/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * LastModified: 2018-02-17 12:01:16
 *-------------------------------------------------------*/

import { SINGLE_API } from 'src/redux/actions/type';

export const createStudent = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'students',
			params: payload,
			opt: { method: 'POST' },
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const updateStudent = (payload, next, nextError) => {
	const { id, ...student } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'students/' + id,
			params: student,
			opt: { method: 'PATCH' },
			successType: 'UPDATE_STUDENT_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getStudentData = (payload, next, nextError) => {
	const { id } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'students/' + id,
			beforeCallType: 'GET_STUDENT_DATA_REQUEST',
			successType: 'GET_STUDENT_DATA_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getStudentList = (payload, next, nextError) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: `students?filter=${JSON.stringify(payload.filter)}`,
			beforeCallType: 'GET_STUDENT_LIST_REQUEST',
			successType: 'GET_STUDENT_LIST_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

