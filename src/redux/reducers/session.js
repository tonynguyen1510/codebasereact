/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-02-17 13:59:32
 *-------------------------------------------------------*/

export const initialState = {
	sessionList: {
		total: 0,
		skip: 0,
		limit: 12,
		data: [],
		loading: true,
	},
	sessionView: {
		loading: true,
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_SESSION_LIST_REQUEST':
			return { ...state, sessionList: { ...initialState.sessionList } };

		case 'GET_SESSION_LIST_SUCCESS':
			return { ...state, sessionList: { ...action.payload, loading: false } };

		case 'GET_SESSION_DATA_REQUEST':
			return { ...state, sessionView: { ...initialState.sessionView } };

		case 'GET_SESSION_DATA_SUCCESS':
			return { ...state, sessionView: { ...action.payload, loading: false } };

		case 'UPDATE_SESSION_SUCCESS': {
			const { id } = action.payload;
			const { sessionList, sessionView } = state;

			const index = sessionList.data.findIndex((user) => {
				return user.id === id;
			});

			sessionList.data[index] = action.payload;

			if (sessionView.id) {
				return { ...state, sessionView: { ...action.payload, loading: false } };
			}

			return { ...state };
		}

		default:
			return state;
	}
};

