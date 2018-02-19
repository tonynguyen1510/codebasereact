/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-08 22:49:34
*------------------------------------------------------- */

const routes = module.exports = require('next-routes')(); // eslint-disable-line

routes.add({ pattern: '/level/new', page: 'level/action' });
routes.add({ pattern: '/level/edit/:id', page: 'level/action' });
routes.add({ pattern: '/level/:id', page: 'level/detail' });
routes.add({ pattern: '/level/:levelId/add-lesson', page: 'lesson/action' });

routes.add({ pattern: '/lesson/new', page: 'lesson/action' });
routes.add({ pattern: '/lesson/edit/:id', page: 'lesson/action' });
routes.add({ pattern: '/lesson/:id', page: 'lesson/detail' });

routes.add({ pattern: '/consultor/new', page: 'consultor/action' });
routes.add({ pattern: '/consultor/edit/:id', page: 'consultor/action' });
routes.add({ pattern: '/consultor/:id', page: 'consultor/detail' });

routes.add({ pattern: '/student/new', page: 'student/action' });
routes.add({ pattern: '/student/edit/:id', page: 'student/action' });
routes.add({ pattern: '/student/:id', page: 'student/detail' });

routes.add({ pattern: '/teacher/new', page: 'teacher/action' });
routes.add({ pattern: '/teacher/edit/:id', page: 'teacher/action' });
routes.add({ pattern: '/teacher/:id', page: 'teacher/detail' });

