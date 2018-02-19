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

import LevelAction from 'src/components/Pages/Level/Action';

@withRoot
export default class ClassActionPage extends PureComponent {
	static async getInitialProps({ query }) {
		return { levelId: query.id };
	}

	render() {
		return (
			<MainLayout>
				<Head>
					{
						this.props.levelId ?
							<title>IPP Admin - Level - Edit {this.props.levelId}</title> :
							<title>IPP Admin - Level - New</title>
					}
					<title>IPP Admin - Level - Action</title>
				</Head>
				<LevelAction />
			</MainLayout>
		);
	}
}
