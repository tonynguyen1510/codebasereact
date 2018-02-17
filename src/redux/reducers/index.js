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
import level, { initialState as initialLevel } from './level';
import lessonContent, { initialState as initialLessonContent } from './lesson_content';

export const initialState = {
	auth: initialAuth,
	loading: initialLoading,
	user: initialUser,
	student: initialStudent,
	level: initialLevel,
	lesson: initialLessonContent,
};

export default {
	auth,
	loading,
	user,
	student,
	level,
	lessonContent,
};
