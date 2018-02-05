/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 23:11:06
*------------------------------------------------------- */
import merge from 'lodash/merge';
import { put, call } from 'redux-saga/effects';

import API from 'src/constants/api';
import ENV from 'src/constants/env';

import AuthStorage from 'src/utils/AuthStorage';
import { REQUEST_ERROR } from 'src/redux/actions/type';

const { BASE_URL } = API;

const fetching = (url, options) => fetch(BASE_URL + url, options)
	.then(response => {
		return response.status === 204 || response.statusText === 'No Content' ? {} : response.json();
	})
	.then(json => {
		if (json.error) {
			throw json.error;
		} else {
			return json;
		}
	})
	.catch(err => {
		throw err;
	});

/* The example data is structured as follows:

Params: {
	uri: ,
	params: ,
	opt: ,
	loading: ,
	uploadImg: ,
}
*/


export default function* ({ uri, params = {}, opt = {}, loading = true, uploadImg = false }) {
	const defaultOptions = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	};

	if (!uri) {
		return;
	}

	const options = merge(defaultOptions, opt);

	if (uploadImg && params.files) {
		options.headers = {};
	}

	// set token
	if (AuthStorage.loggedIn) {
		options.headers.Authorization = AuthStorage.token;
	}

	let url = uri;

	if (params && Object.keys(params).length > 0) {
		if (options && options.method === 'GET') {
			url += '?' + Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
		} else if (uploadImg && params.files) {
			const formData = new FormData();
			params.files.forEach((img) => {
				formData.append('files', img, img.name);
			});

			options.body = formData;
		} else {
			options.body = JSON.stringify(params);
		}
	}

	if (loading) {
		yield put({ type: 'TOGGLE_LOADING' });
	}

	let response;
	try {
		if (ENV !== 'production') {
			console.info('====> Call /api/v1/' + url, ', options=', options);
		}

		response = yield call(fetching, url, options);

		if (loading) {
			yield put({ type: 'TOGGLE_LOADING' });
		}
	} catch (error) {
		response = { error };

		if (error.statusCode === 401 && (error.code === 'INVALID_TOKEN' || error.code === 'AUTHORIZATION_REQUIRED')) {
			// token is expired
			yield call(AuthStorage.destroy);
			yield put({ type: 'LOGOUT_SUCCESS' });

			if (loading) {
				yield put({ type: 'TOGGLE_LOADING' });
			}
		} else {
			yield put({ type: REQUEST_ERROR, payload: error.message || error });
		}
	}

	return response;
}
