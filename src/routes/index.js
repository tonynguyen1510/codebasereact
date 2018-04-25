/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-08 22:49:34
*------------------------------------------------------- */

const routes = module.exports = require('next-routes')(); // eslint-disable-line

routes.add({ pattern: '/note/new', page: 'note/actions' });
routes.add({ pattern: '/note/edit/:id', page: 'note/actions' });
