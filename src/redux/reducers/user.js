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
	userView: {
		loading: true,
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_USER_LIST_REQUEST':
			return { ...state, userView: { ...initialState.userList } };

		case 'GET_USER_LIST_SUCCESS':
			return { ...state, userList: { ...action.payload, loading: false } };

		case 'GET_USER_DATA_REQUEST':
			return { ...state, userView: { ...initialState.userView } };

		case 'GET_USER_DATA_SUCCESS':
			return { ...state, userView: { ...action.payload, loading: false } };

		case 'UPDATE_USER_SUCCESS': {
			const { id } = action.payload;
			const { userList, userView } = state;

			const index = userList.data.findIndex((user) => {
				return user.id === id;
			});

			userList.data[index] = action.payload;

			if (userView.id) {
				return { ...state, userView: { ...action.payload, loading: false } };
			}

			return { ...state };
		}

		default:
			return state;
	}
};

