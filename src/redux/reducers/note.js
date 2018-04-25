/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-04-25 11:57:23
*------------------------------------------------------- */

export const initialState = {
	noteList: {
		data: [],
		total: 0,
		skip: 0,
		limit: 12,
		loading: true,
	},
	noteInfo: {
		loading: true,
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_NOTES_REQUEST':
			return {
				...state,
				noteList: initialState.noteList,
			};
		case 'GET_NOTES_SUCCESS':
			return {
				...state,
				noteInfo: action.payload.data[0],
				noteList: { ...action.payload, loading: false },
			};
		case 'GET_NOTE_SUCCESS':
			return {
				...state,
				noteInfo: state.noteList.data.find((e) => {
					return e.id === action.payload;
				}),
			};
		case 'RESET_NOTE_STATE_INFO':
			return {
				...state,
				noteInfo: initialState.noteInfo,
			};
		case 'UPSERT_NOTE_SUCCESS':
			return {
				...state,
				noteInfo: { ...action.payload, loading: false },
			};
		default:
			return state;
	}
};
