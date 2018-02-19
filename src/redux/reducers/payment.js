/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-02-17 13:59:32
 *-------------------------------------------------------*/

export const initialState = {
	paymentList: {
		total: 0,
		skip: 0,
		limit: 12,
		data: [],
		loading: true,
	},
	paymentView: {
		loading: true,
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_PAYMENT_LIST_REQUEST':
			return { ...state, paymentView: { ...initialState.paymentList } };

		case 'GET_PAYMENT_LIST_SUCCESS':
			return { ...state, paymentList: { ...action.payload, loading: false } };

		case 'GET_PAYMENT_DATA_REQUEST':
			return { ...state, paymentView: { ...initialState.paymentView } };

		case 'GET_PAYMENT_DATA_SUCCESS':
			return { ...state, paymentView: { ...action.payload, loading: false } };

		case 'UPDATE_PAYMENT_SUCCESS': {
			const { id } = action.payload;
			const { paymentList, paymentView } = state;

			const index = paymentList.data.findIndex((user) => {
				return user.id === id;
			});

			paymentList.data[index] = action.payload;

			if (paymentView.id) {
				return { ...state, paymentView: { ...action.payload, loading: false } };
			}

			return { ...state };
		}

		default:
			return state;
	}
};

