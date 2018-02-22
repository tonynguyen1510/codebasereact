/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-02-17 13:59:32
 *-------------------------------------------------------*/

export const initialState = {
	testingDetailList: {
		total: 0,
		skip: 0,
		limit: 12,
		data: [],
		loading: true,
	},
	testingDetailView: {
		loading: true,
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_TESTING_DETAIL_LIST_REQUEST':
			return { ...state, testingDetailList: { ...initialState.testingDetailList } };

		case 'GET_TESTING_DETAIL_LIST_SUCCESS':
			return { ...state, testingDetailList: { ...action.payload, loading: false } };

		case 'GET_TESTING_DETAIL_DATA_REQUEST':
			return { ...state, testingDetailView: { ...initialState.testingDetailView } };

		case 'GET_TESTING_DETAIL_DATA_SUCCESS':
			return { ...state, testingDetailView: { ...action.payload, loading: false } };

		case 'UPDATE_TESTING_DETAIL_SUCCESS': {
			const { id } = action.payload;
			const { testingDetailList, testingDetailView } = state;

			const index = testingDetailList.data.findIndex((user) => {
				return user.id === id;
			});

			testingDetailList.data[index] = action.payload;

			if (testingDetailView.id) {
				return { ...state, testingDetailView: { ...action.payload, loading: false } };
			}

			return { ...state };
		}

		default:
			return state;
	}
};

