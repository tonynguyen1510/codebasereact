/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-22 23:54:34
*------------------------------------------------------- */

import React, { PureComponent } from 'react';

import Head from 'next/head';
import withRoot from 'src/root';

import MainLayout from 'src/layout/Main';

import TestingActionPage from 'src/components/Pages/Testing/Action';

@withRoot
export default class TestingAction extends PureComponent {
	static async getInitialProps(ctx) {
		const { query } = ctx;
		return { testingId: query.id };
	}

	render() {
		return (
			<MainLayout>
				<Head>
					<title>IPP Admin - Testing - Action</title>
				</Head>
				<TestingActionPage
					testingId={this.props.testingId}
				/>
			</MainLayout>
		);
	}
}
