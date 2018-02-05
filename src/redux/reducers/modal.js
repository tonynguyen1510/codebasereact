/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-15 09:29:49
*------------------------------------------------------- */

export const initialState = {
	login: {
		open: false,
		closable: false,
	},
	signUp: {
		open: false,
		closable: false,
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'TOGGLE_LOGIN_MODAL':
			return {
				...state,
				login: {
					open: !!action.payload.open,
					closable: !!action.payload.closable,
				},
			};

		case 'TOGGLE_SIGNUP_MODAL':
			return {
				...state,
				signUp: {
					open: !!action.payload.open,
					closable: !!action.payload.closable,
				},
			};

		default:
			return state;
	}
}
