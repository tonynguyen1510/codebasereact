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

import StudySessionActionPage from 'src/components/Pages/StudySession/Action';

@withRoot
export default class StudySessionAction extends PureComponent {
	static async getInitialProps(ctx) {
		const { query } = ctx;
		return { sessionId: query.id };
	}

	render() {
		return (
			<MainLayout>
				<Head>
					<title>IPP Admin - Study Session - Action</title>
				</Head>
				<StudySessionActionPage
					sessionId={this.props.sessionId}
				/>
			</MainLayout>
		);
	}
}
