/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 23:32:12
*------------------------------------------------------- */

import React, { PureComponent } from 'react';

import Head from 'next/head';
import withRoot from 'src/root';

import AuthStorage from 'src/utils/AuthStorage';

import MainLayout from 'src/layout/Main';

import ConsultorAction from 'src/components/Pages/Consultor/Action';

@withRoot
export default class ConsultorActionPage extends PureComponent {
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
					<title>IPP Admin - Consultor - New</title>
				</Head>
				<ConsultorAction />
			</MainLayout>
		);
	}
}
