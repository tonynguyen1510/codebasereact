/*--------------------------------------------------------
 * Author Ngo An Ninh
 * Email ninh.uit@gmail.com
 * Phone 0978 108 807
 *
 * Created: 2018-01-10 23:20:59
 *-------------------------------------------------------*/

import Router from 'next/router';
import { SINGLE_API } from 'src/redux/actions/type';

export const getLessonInfo = (id, next) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'lessons/' + id,
			successType: 'GET_LESSON_SUCCESS',
			afterSuccess: next,
		},
	};
};

export const upsertLesson = (data, id, next) => {
	if (!id) {
		return {
			type: SINGLE_API,
			payload: {
				uri: 'lessons',
				params: data,
				opt: { method: 'POST' },
				successType: 'UPSERT_LESSON_SUCCESS',
				afterSuccess: next,
			},
		};
	}
	return {
		type: SINGLE_API,
		payload: {
			uri: 'lessons/' + id,
			params: data,
			opt: { method: 'PUT' },
			successType: 'UPSERT_LESSON_SUCCESS',
			afterSuccess: next,
		},
	};
};

export const getLessons = (filter, next) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: `lessons?filter=${JSON.stringify(filter)}`,
			successType: 'GET_LESSONS_SUCCESS',
			afterSuccess: next,
		},
	};
};

export const resetStateLessonInfo = () => {
	return {
		type: 'LESSON_RESET_STATE_INFO',
	};
};

export const deleteLesson = (data, id, next) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'lessons/' + id,
			params: { ...data, isDelete: true },
			opt: { method: 'PUT' },
			successType: 'DELETE_LESSON_SUCCESS',
			afterSuccess: next,
		},
	};
};
