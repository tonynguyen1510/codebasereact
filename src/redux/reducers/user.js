/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-02-10 23:45:35
 *-------------------------------------------------------*/

export const initialState = {
	userList: {
		total: 0,
		skip: 0,
		limit: 12,
		data: [],
		loading: true,
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_USER_LIST_REQUEST':
			return { ...state, userList: { ...initialState.userList } };

		case 'GET_USER_LIST_SUCCESS':
			return { ...state, userList: { ...action.payload, loading: false } };

		default:
			return state;
	}
};

