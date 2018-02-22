/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-02-17 13:59:32
 *-------------------------------------------------------*/

export const initialState = {
	sessionDetailList: {
		total: 0,
		skip: 0,
		limit: 12,
		data: [],
		loading: true,
	},
	sessionDetailView: {
		loading: true,
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_SESSION_DETAIL_LIST_REQUEST':
			return { ...state, sessionDetailList: { ...initialState.sessionDetailList } };

		case 'GET_SESSION_DETAIL_LIST_SUCCESS':
			return { ...state, sessionDetailList: { ...action.payload, loading: false } };

		case 'GET_SESSION_DETAIL_DATA_REQUEST':
			return { ...state, sessionDetailView: { ...initialState.sessionDetailView } };

		case 'GET_SESSION_DETAIL_DATA_SUCCESS':
			return { ...state, sessionDetailView: { ...action.payload, loading: false } };

		case 'UPDATE_SESSION_DETAIL_SUCCESS': {
			const { id } = action.payload;
			const { sessionDetailList, sessionDetailView } = state;

			const index = sessionDetailList.data.findIndex((user) => {
				return user.id === id;
			});

			sessionDetailList.data[index] = action.payload;

			if (sessionDetailView.id) {
				return { ...state, sessionDetailView: { ...action.payload, loading: false } };
			}

			return { ...state };
		}

		default:
			return state;
	}
};

