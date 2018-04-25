/*--------------------------------------------------------
 * Author Ngo An Ninh
 * Email ninh.uit@gmail.com
 * Phone 0978 108 807
 *
 * Created: 2018-01-10 23:20:59
 *-------------------------------------------------------*/

import { SINGLE_API } from 'src/redux/actions/type';
import AuthStorage from 'src/utils/AuthStorage';

export const getNoteInfo = (payload) => {
	const { id } = payload;
	return {
		type: 'GET_NOTE_SUCCESS',
		payload: id,
	};
};

export const upsertNote = (payload, next, nextError) => {
	const { id, ...note } = payload;

	if (!id) {
		note.creatorId = AuthStorage.userId;

		return {
			type: SINGLE_API,
			payload: {
				uri: 'notes',
				params: note,
				opt: { method: 'POST' },
				successType: 'UPSERT_NOTE_SUCCESS',
				afterSuccess: next,
				afterError: nextError,
			},
		};
	}
	return {
		type: SINGLE_API,
		payload: {
			uri: 'notes/' + id,
			params: note,
			opt: { method: 'PATCH' },
			successType: 'UPSERT_NOTE_SUCCESS',
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

export const getNotes = (payload, next) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: `notes?filter=${JSON.stringify(payload.filter)}`,
			successType: 'GET_NOTES_SUCCESS',
			afterSuccess: next,
		},
	};
};

export const resetStateNoteInfo = () => {
	return {
		type: 'RESET_NOTE_STATE_INFO',
	};
};

export const deleteNote = (id, next) => {
	return {
		type: SINGLE_API,
		payload: {
			uri: 'notes/' + id,
			opt: { method: 'DELETE' },
			successType: 'DELETE_NOTE_SUCCESS',
			afterSuccess: next,
		},
	};
};
