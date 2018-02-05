/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-05 15:02:57
*------------------------------------------------------- */
const ENV = process.env.NODE_ENV;

/* eslint-disable */
module.exports = {
	plugins: [
		require('postcss-cssnext')(),
		require('postcss-modules')({
			generateScopedName: '[local]-[hash:base64:5]',
		}),
		ENV === 'production' ? require('cssnano')({ autoprefixer: false }) : null,
	],
}
