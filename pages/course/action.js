/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978 108 807
*
* Created: 2018-02-12 18:42:00
*------------------------------------------------------- */

import React, { PureComponent } from 'react';

import Head from 'next/head';
import withRoot from 'src/root';
import MainLayout from 'src/layout/Main';
import CourseAction from 'src/components/Pages/Course/Action';

@withRoot
export default class CourseActionPage extends PureComponent {
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
					<title>IPP Admin - Course - New</title>
				</Head>
				<CourseAction />
			</MainLayout>
		);
	}
}
