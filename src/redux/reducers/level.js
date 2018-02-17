/*--------------------------------------------------------
 * Author Ngo An Ninh
 * Email ninh.uit@gmail.com
 * Phone 0978 108 807
 *
 * Created: 2018-01-10 23:20:59
 *-------------------------------------------------------*/

export const initialState = {
	levelList: {
		data: [],
		total: 0,
		skip: 0,
		limit: 12,
		loading: true,
	},
	levelInfo: {
		name: '',
		desc: '',
		status: 'active',
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_LEVELS_SUCCESS':
			return {
				...state,
				levelList: { ...action.payload, loading: false },
			};
		case 'GET_LEVEL_SUCCESS':
			return {
				...state,
				levelInfo: action.payload,
			};
		case 'LEVEL_RESET_STATE_INFO':
			return {
				...state,
				levelInfo: initialState.levelInfo,
			};
		case 'UPSERT_LEVEL_SUCCESS':
			return {
				...state,
				levelInfo: action.payload,
			};
		default:
			return state;
	}
};

