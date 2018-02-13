/*--------------------------------------------------------
 * Author Ngo An Ninh
 * Email ninh.uit@gmail.com
 * Phone 0978 108 807
 *
 * Created: 2018-01-10 23:20:59
 *-------------------------------------------------------*/

import Router from 'next/router';
import { SINGLE_API } from 'src/redux/actions/type';

export const getLessonContentInfo = (id, next) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'lesson_contents/' + id,
			successType: 'GET_LESSON_CONTENT_SUCCESS',
			afterSuccess: next,
		},
	};
};

export const upsertLessonContent = (data, id, next) => {
	if (!id) {
		return {
			type: SINGLE_API,
			payload: {
				uri: 'lesson_contents',
				params: data,
				opt: { method: 'POST' },
				successType: 'UPSERT_LESSON_CONTENT_SUCCESS',
				afterSuccess: next,
			},
		};
	}
	return {
		type: SINGLE_API,
		payload: {
			uri: 'lesson_contents/' + id,
			params: data,
			opt: { method: 'PUT' },
			successType: 'UPSERT_LESSON_CONTENT_SUCCESS',
			afterSuccess: next,
		},
	};
};

export const getLessonContents = (filter, next) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: `lesson_contents?filter=${JSON.stringify(filter)}`,
			successType: 'GET_LESSON_CONTENTS_SUCCESS',
			afterSuccess: next,
		},
	};
};

export const resetStateLessonContentInfo = () => {
	return {
		type: 'LESSON_CONTENT_RESET_STATE_INFO',
	};
};

export const deleteLessonContent = (data, id, next) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'lesson_contents/' + id,
			params: { ...data, isDelete: true },
			opt: { method: 'PUT' },
			successType: 'DELETE_LESSON_CONTENT_SUCCESS',
			afterSuccess: next,
		},
	};
};
