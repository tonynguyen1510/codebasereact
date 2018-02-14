/*--------------------------------------------------------
 * Author Ngo An Ninh
 * Email ninh.uit@gmail.com
 * Phone 0978 108 807
 *
 * Created: 2018-01-10 23:20:59
 *-------------------------------------------------------*/
import Router from 'next/router';

export const initialState = {
	lessonContentList: {
		data: [],
		total: 0,
		skip: 0,
		limit: 12,
		loading: true,
	},
	lessonContentInfo: {
		name: '',
		desc: '',
		type: '',
		classId: '',
		status: 'active',
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_LESSON_CONTENTS_SUCCESS':
			return {
				...state,
				lessonContentList: { ...action.payload, loading: false },
			};
		case 'GET_LESSON_CONTENT_SUCCESS':
			return {
				...state,
				lessonContentInfo: action.payload,
			};
		case 'LESSON_RESET_STATE_INFO':
			return {
				...state,
				lessonContentInfo: initialState.lessonContentInfo,
			};
		case 'UPSERT_LESSON_CONTENT_SUCCESS':
			return {
				...state,
				lessonContentInfo: action.payload,
			};
		default:
			return state;
	}
};

