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
import MainLayout from 'src/layout/Main';
import LessonPage from 'src/components/Pages/Lesson/';

@withRoot
export default class Lesson extends PureComponent {
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
					<title>IPP Admin - Lesson</title>
				</Head>
				<LessonPage />
			</MainLayout>
		);
	}
}
