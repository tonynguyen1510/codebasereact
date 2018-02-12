/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-16 00:42:57
*------------------------------------------------------- */

import auth, { initialState as initialAuth } from './auth';
import loading, { initialState as initialLoading } from './loading';
import user, { initialState as initialUser } from './user';
import classObject, { initialState as initialClass } from './class';
import lesson, { initialState as initialLesson } from './lesson.js';

export const initialState = {
	auth: initialAuth,
	loading: initialLoading,
	user: initialUser,
	classObject: initialClass,
	lesson: initialLesson,
};

export default {
	auth,
	loading,
	user,
	classObject,
	lesson,
};
