/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-20 22:18:10
*------------------------------------------------------- */

import React, { PureComponent } from 'react';

import Head from 'next/head';
import withRoot from 'src/root';
import MainLayout from 'src/layout/Main';

import TestingPage from 'src/components/Pages/Testing';

@withRoot
export default class Test extends PureComponent {
	static async getInitialProps(ctx) {
		// if (AuthStorage.loggedIn) {
		// 	ctx.store.dispatch(getUserAuth());
		// }
		// return { auth: ctx.store.getState().auth };
	}

	render() {
		return (
			<MainLayout>
				<Head>
					<title>IPP Admin - Testing</title>
				</Head>
				<TestingPage />
			</MainLayout>
		);
	}
}
