/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-02-17 13:59:32
 *-------------------------------------------------------*/

export const initialState = {
	studentList: {
		total: 0,
		skip: 0,
		limit: 12,
		data: [],
		loading: true,
	},
	studentView: {
		loading: true,
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_STUDENT_LIST_REQUEST':
			return { ...state, studentView: { ...initialState.studentList } };

		case 'GET_STUDENT_LIST_SUCCESS':
			return { ...state, studentList: { ...action.payload, loading: false } };

		case 'GET_STUDENT_DATA_REQUEST':
			return { ...state, studentView: { ...initialState.studentView } };

		case 'GET_STUDENT_DATA_SUCCESS':
			return { ...state, studentView: { ...action.payload, loading: false } };

		case 'UPDATE_STUDENT_SUCCESS': {
			const { id } = action.payload;
			const { studentList } = state;

			const index = studentList.data.findIndex((user) => {
				return user.id === id;
			});

			studentList.data[index] = action.payload;

			return { ...state };
		}

		default:
			return state;
	}
};

