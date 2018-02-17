/*--------------------------------------------------------
 * Author Ngo An Ninh
 * Email ninh.uit@gmail.com
 * Phone 0978 108 807
 *
 * Created: 2018-01-10 23:20:59
 *-------------------------------------------------------*/

import { SINGLE_API } from 'src/redux/actions/type';

export const getLevelInfo = (payload, next, nextError) => {
	const { id, filter } = payload;
	return {
		type: SINGLE_API,
		payload: {
			uri: 'levels/' + id + (filter ? `?filter=${JSON.stringify(payload.filter)}` : ''),
			beforeCallType: 'LEVEL_RESET_STATE_INFO',
			successType: 'GET_LEVEL_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const upsertLevel = (payload, next) => {
	const { id, ...level } = payload;

	if (!id) {
		return {
			type: SINGLE_API,
			payload: {
				uri: 'levels',
				params: level,
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
			params: level,
			opt: { method: 'PATCH' },
			successType: 'UPSERT_LEVEL_SUCCESS',
			afterSuccess: next,
		},
	};
};

export const getLevels = (payload, next) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: `levels?filter=${JSON.stringify(payload.filter)}`,
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

export const deleteLevel = (payload, next) => {
	const { id, ...level } = payload;

	return {
		type: SINGLE_API,
		payload: {
			uri: 'levels/' + id,
			params: { ...level, isDelete: true },
			opt: { method: 'PATCH' },
			successType: 'DELETE_LEVEL_SUCCESS',
			afterSuccess: next,
		},
	};
};
