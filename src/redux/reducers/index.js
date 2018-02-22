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
import student, { initialState as initialStudent } from './student';
import payment, { initialState as initialPayment } from './payment';
import session, { initialState as initialSession } from './session';
import sessionDetail, { initialState as initialSessionDetail } from './sessionDetail';
import level, { initialState as initialLevel } from './level';
import lesson, { initialState as initialLesson } from './lesson';

export const initialState = {
	auth: initialAuth,
	loading: initialLoading,
	user: initialUser,
	student: initialStudent,
	payment: initialPayment,
	session: initialSession,
	sessionDetail: initialSessionDetail,
	level: initialLevel,
	lesson: initialLesson,
};

export default {
	auth,
	loading,
	user,
	student,
	payment,
	session,
	sessionDetail,
	level,
	lesson,
};
