/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 23:21:17
*------------------------------------------------------- */

export const initialState = {
	feedsFB: {
		data: [],
	},
};

export default (state = initialState, action) => {
	// console.log('state action', state, action);
	switch (action.type) {
		case 'CLEAR_CACHE_FEEDS_FB': {
			return { ...state, feedsFB: { data: [] } };
		}
		case 'GET_FEEDS_FB_SUCCESS':
			return { ...state, feedsFB: { data: [...state.feedsFB.data, ...action.payload.data], paging: action.payload.paging } };

		default:
			return state;
	}
}
