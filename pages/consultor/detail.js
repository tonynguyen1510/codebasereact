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

// import AuthStorage from 'src/utils/AuthStorage';

import MainLayout from 'src/layout/Main';

import Detail from 'src/components/Pages/Consultor/Detail';

@withRoot
export default class ConsultorDetailPage extends PureComponent {
	static async getInitialProps({ query, res }) {
		// if (AuthStorage.loggedIn) {
		// 	ctx.store.dispatch(getUserAuth());
		// }
		return { consultorId: query.id };
	}

	render() {
		return (
			<MainLayout>
				<Head>
					<title>IPP Admin - Consultor - {this.props.consultorId}</title>
				</Head>
				<Detail consultorId={this.props.consultorId} />
			</MainLayout>
		);
	}
}
