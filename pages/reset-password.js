/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-10 15:08:14
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';
import withRoot from 'src/root';

import SetPassword from 'src/components/Form/SetPassword';

@withRoot
export default class ResetPasswordPage extends PureComponent {
	static propTypes = {
		url: PropTypes.object.isRequired,
	}

	static async getInitialProps(/* ctx */) {
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
					<title>IPP Admin - reset Password</title>
				</Head>
				<SetPassword token={url.query && url.query.access_token} />
			</div>
		);
	}
}
