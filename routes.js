/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-08 22:49:34
*------------------------------------------------------- */

const routes = module.exports = require('next-routes')(); // eslint-disable-line

routes.add({ pattern: '/class/new', page: 'class/action' });
routes.add({ pattern: '/class/edit/:id', page: 'class/action' });
routes.add({ pattern: '/class/:id', page: 'class/id' });
