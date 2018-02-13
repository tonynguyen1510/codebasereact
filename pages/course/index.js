/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978 108 807
*
* Created: \
*------------------------------------------------------- */

import React, { PureComponent } from 'react';

import Head from 'next/head';
import withRoot from 'src/root';
import MainLayout from 'src/layout/Main';
import CoursePage from 'src/components/Pages/Course/';

@withRoot
export default class Course extends PureComponent {
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
					<title>IPP Admin - Course</title>
				</Head>
				<CoursePage />
			</MainLayout>
		);
	}
}
