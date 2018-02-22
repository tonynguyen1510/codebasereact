/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-02-23 00:04:54
 *-------------------------------------------------------*/

export const initialState = {
	testingList: {
		total: 0,
		skip: 0,
		limit: 12,
		data: [],
		loading: true,
	},
	testingView: {
		loading: true,
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_TESTING_LIST_REQUEST':
			return { ...state, testingList: { ...initialState.testingList } };

		case 'GET_TESTING_LIST_SUCCESS':
			return { ...state, testingList: { ...action.payload, loading: false } };

		case 'GET_TESTING_DATA_REQUEST':
			return { ...state, testingView: { ...initialState.testingView } };

		case 'GET_TESTING_DATA_SUCCESS':
			return { ...state, testingView: { ...action.payload, loading: false } };

		case 'UPDATE_TESTING_SUCCESS': {
			const { id } = action.payload;
			const { testingList, testingView } = state;

			const index = testingList.data.findIndex((user) => {
				return user.id === id;
			});

			testingList.data[index] = action.payload;

			if (testingView.id) {
				return { ...state, testingView: { ...action.payload, loading: false } };
			}

			return { ...state };
		}

		default:
			return state;
	}
};

