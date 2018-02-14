/*--------------------------------------------------------
 * Author Ngo An Ninh
 * Email ninh.uit@gmail.com
 * Phone 0978 108 807
 *
 * Created: 2018-01-10 23:20:59
 *-------------------------------------------------------*/

import Router from 'next/router';
import { SINGLE_API } from 'src/redux/actions/type';

export const getLevelInfo = (id, next) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'levels/' + id,
			successType: 'GET_LEVEL_SUCCESS',
			afterSuccess: next,
		},
	};
};

export const upsertLevel = (data, id, next) => {
	if (!id) {
		return {
			type: SINGLE_API,
			payload: {
				uri: 'levels',
				params: data,
				opt: { method: 'POST' },
				successType: 'UPSERT_LEVEL_SUCCESS',
				afterSuccess: next,
			},
		};
	}
	return {
		type: SINGLE_API,
		payload: {
			uri: 'levels/' + id,
			params: data,
			opt: { method: 'PUT' },
			successType: 'UPSERT_LEVEL_SUCCESS',
			afterSuccess: next,
		},
	};
};

export const getLevels = (filter, next) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: `levels?filter=${JSON.stringify(filter)}`,
			successType: 'GET_LEVELS_SUCCESS',
			afterSuccess: next,
		},
	};
};

export const resetStateLevelInfo = () => {
	return {
		type: 'LEVEL_RESET_STATE_INFO',
	};
};

export const deleteLevel = (data, id, next) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'levels/' + id,
			params: { ...data, isDelete: true },
			opt: { method: 'PUT' },
			successType: 'DELETE_LEVEL_SUCCESS',
			afterSuccess: next,
		},
	};
};
