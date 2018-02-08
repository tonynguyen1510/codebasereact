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

// import ClassPage from 'src/components/Pages/Class';

@withRoot
export default class StudentDetail extends PureComponent {
	static async getInitialProps({ query, res }) {
		// if (AuthStorage.loggedIn) {
		// 	ctx.store.dispatch(getUserAuth());
		// }
		return { id: query.id };
	}

	render() {
		return (
			<MainLayout>
				<Head>
					<title>IPP Education - Student - {this.props.id}</title>
				</Head>
				Student id = {this.props.id}
			</MainLayout>
		);
	}
}
