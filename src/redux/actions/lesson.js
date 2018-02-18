/*--------------------------------------------------------
 * Author Ngo An Ninh
 * Email ninh.uit@gmail.com
 * Phone 0978 108 807
 *
 * Created: 2018-01-10 23:20:59
 *-------------------------------------------------------*/

import { SINGLE_API } from 'src/redux/actions/type';

export const getLessonInfo = (payload, next) => {
	const { id, filter } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'lessons/' + id + (filter ? `?filter=${JSON.stringify(filter)}` : ''),
			beforeCallType: 'LESSON_RESET_STATE_INFO',
			successType: 'GET_LESSON_SUCCESS',
			afterSuccess: next,
		},
	};
};

export const upsertLesson = (payload, next) => {
	const { id, ...lesson } = payload;

	if (!id) {
		return {
			type: SINGLE_API,
			payload: {
				uri: 'lessons',
				params: lesson,
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
			params: lesson,
			opt: { method: 'PATCH' },
			successType: 'UPSERT_LESSON_SUCCESS',
			afterSuccess: next,
		},
	};
};

export const getLessons = (payload, next) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: `lessons?filter=${JSON.stringify(payload.filter)}`,
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

export const deleteLesson = (payload, next) => {
	const { id, ...lesson } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'lessons/' + id,
			params: { ...lesson, isDelete: true },
			opt: { method: 'PATCH' },
			successType: 'DELETE_LESSON_SUCCESS',
			afterSuccess: next,
		},
	};
};
