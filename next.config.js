/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-05 15:02:16
*------------------------------------------------------- */

/* eslint-disable */
const fs = require('fs');
const trash = require('trash');

module.exports = {
	webpack: (config) => {
		config.plugins = config.plugins.filter(
			(plugin) => (plugin.constructor.name !== 'UglifyJsPlugin'),
		);

		config.module.rules.push(
			{
				test: /\.less$/,
				use: [{
					loader: 'emit-file-loader',
					options: {
						name: 'dist/[path][name].[ext]',
					},
				}, {
					loader: 'babel-loader',
				}, {
					loader: 'raw-loader',
				}, {
					loader: 'less-loader',
				}],
				include: /theme/,
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: 'emit-file-loader',
						options: {
							name: 'dist/[path][name].[ext]',
						},
					},
					{
						loader: 'skeleton-loader',
						options: {
							procedure: function (content) {
								const fileName = `${this._module.userRequest}.json`;
								const classNames = fs.readFileSync(fileName, 'utf8');

								trash(fileName);

								return ['module.exports = {',
									`classNames: ${classNames},`,
									`stylesheet: \`${content}\``,
									'}',
								].join('');
							},
						},
					},
					'postcss-loader',
					'less-loader',
				],
				exclude: /theme/,
			},
		);

		return config;
	},
};
