/*--------------------------------------------------------
 * Author Ngo An Ninh
 * Email ninh.uit@gmail.com
 * Phone 0978 108 807
 *
 * Created: 2018-01-10 23:20:59
 *-------------------------------------------------------*/
export const initialState = {
	lessonList: {
		data: [],
		total: 0,
		skip: 0,
		limit: 12,
		loading: true,
	},
	lessonInfo: {
		name: '',
		desc: '',
		type: '',
		classId: '',
		status: 'active',
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_LESSONS_SUCCESS':
			return {
				...state,
				lessonList: { ...action.payload, loading: false },
			};
		case 'GET_LESSON_SUCCESS':
			return {
				...state,
				lessonInfo: action.payload,
			};
		case 'LESSON_RESET_STATE_INFO':
			return {
				...state,
				lessonInfo: initialState.lessonInfo,
			};
		case 'UPSERT_LESSON_SUCCESS':
			return {
				...state,
				lessonInfo: action.payload,
			};
		default:
			return state;
	}
};

