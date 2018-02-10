/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-10 14:39:40
*------------------------------------------------------- */

import React, { PureComponent } from 'react';

import Head from 'next/head';
import withRoot from 'src/root';

import ForgotPassword from 'src/components/Form/ForgotPassword';

@withRoot
export default class ForgotPasswordPage extends PureComponent {
	static async getInitialProps(/* ctx */) {
		// if (AuthStorage.loggedIn) {
		// 	ctx.store.dispatch(getUserAuth());
		// }
		// return { auth: ctx.store.getState().auth };
	}

	render() {
		return (
			<div>
				<Head>
					<title>IPP Education - Forgot Password</title>
				</Head>
				<ForgotPassword />
			</div>
		);
	}
}
