/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 23:16:13
*------------------------------------------------------- */

import { take, call, put, cancel, fork } from 'redux-saga/effects';

import fetchApi from 'src/utils/FetchApi';
import AuthStorage from 'src/utils/AuthStorage';

import { REQUEST_ERROR } from 'src/redux/actions/type';

function* authorize(payload, next, nextErr) {
	const response = yield call(fetchApi, {
		uri: 'users/login?include=user',
		params: payload,
		opt: { method: 'POST' },
		loading: false,
	});
	if (response && !response.error) {
		const data = {
			token: response.id,
			userId: response.userId,
			role: response.user.role,
		};

		AuthStorage.value = data;

		yield put({
			type: 'LOGIN_SUCCESS',
			payload: response.user,
		});
		if (typeof next === 'function') {
			next();
		}
	} else {
		yield put({
			type: 'LOGIN_FAILED',
			payload: response.error,
		});
		if (typeof nextErr === 'function') {
			nextErr();
		}
	}
}

function* loginFlow() {
	const INFINITE = true;

	while (INFINITE) {
		const { payload, next, nextErr } = yield take('LOGIN_REQUEST');
		const authorizeTask = yield fork(authorize, payload, next, nextErr);
		const action = yield take(['LOGOUT_REQUEST', 'LOGIN_FAILED', REQUEST_ERROR]);

		if (action.type === 'LOGOUT_REQUEST') {
			yield cancel(authorizeTask);
		}
	}
}

function* logoutFlow() {
	const INFINITE = true;

	while (INFINITE) {
		const { next } = yield take('LOGOUT_REQUEST');

		const response = yield call(fetchApi, {
			uri: 'users/logout',
			opt: { method: 'POST' },
		});

		if (response && !response.error) {
			AuthStorage.destroy(next);

			yield put({ type: 'LOGOUT_SUCCESS' });
		}
	}
}

export default function* authFlow() {
	yield fork(loginFlow);
	yield fork(logoutFlow);
}
