/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 23:32:12
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';
import withRoot from 'src/root';

import AuthStorage from 'src/utils/AuthStorage';

import SetPassword from 'src/components/Form/SetPassword';

@withRoot
export default class LoginFirstPage extends PureComponent {
	static propTypes = {
		url: PropTypes.object.isRequired,
	}

	static async getInitialProps(ctx) {
		// if (AuthStorage.loggedIn) {
		// 	ctx.store.dispatch(getUserAuth());
		// }
		// return { auth: ctx.store.getState().auth };
	}

	render() {
		const { url } = this.props;
		return (
			<div>
				<Head>
					<title>IPP Admin - Set Password</title>
				</Head>
				<SetPassword token={url.query && url.query.access_token} />
			</div>
		);
	}
}
