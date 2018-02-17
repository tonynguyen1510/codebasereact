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

import ConsultorAction from 'src/components/Pages/Consultor/Action';

// import ErrorPage from 'next/error';

// import { getUserData } from 'src/redux/actions/user';

@withRoot
export default class ConsultorActionPage extends PureComponent {
	static async getInitialProps(ctx) {
		const { query } = ctx;
		// console.log('-------');
		// if (AuthStorage.loggedIn && query.id) {
		// 	console.log('--------');
		// 	try {
		// 		await store.dispatch(getUserData({ id: query.id }));
		// 		console.log('data', store.getState());
		// 	} catch (error) {
		// 		console.log('error', error);

		// 		return { errorCode: 404 };
		// 	}

		// } else {
		// 	return { errorCode: 404 };
		// }
		return { consultorId: query.id };
	}

	render() {
		// if (this.props.errorCode) {
		// 	return <ErrorPage statusCode={this.props.errorCode} />;
		// }
		return (
			<MainLayout>
				<Head>
					{
						this.props.consultorId ?
							<title>IPP Admin - Consultor - Edit {this.props.consultorId}</title> :
							<title>IPP Admin - Consultor - New</title>
					}
				</Head>
				<ConsultorAction consultorId={this.props.consultorId} />
			</MainLayout>
		);
	}
}
