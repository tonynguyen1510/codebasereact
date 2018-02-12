/*--------------------------------------------------------
 * Author Ngo An Ninh
 * Email ninh.uit@gmail.com
 * Phone 0978 108 807
 *
 * Created: 2018-01-10 23:20:59
 *-------------------------------------------------------*/
import Router from 'next/router';

export const initialState = {
	classList: [],
	classInfo: {
		name: '',
		desc: '',
		status: 'active',
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'CLASS_VALUE_CHANGE':
			return {
				...state,
				classInfo: {
					...state.classInfo,
					[action.payload.key]: action.payload.value,
				},
			};
		case 'GET_CLASSES_SUCCESS':
			return {
				...state,
				classList: action.payload.data,
			};
		case 'GET_CLASS_SUCCESS':
			return {
				...state,
				classInfo: action.payload,
			};
		case 'CLASS_RESET_STATE_INFO':
			return {
				...state,
				classInfo: initialState.classInfo,
			};
		default:
			return state;
	}
};

