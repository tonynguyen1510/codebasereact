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

import TeacherAction from 'src/components/Pages/Teacher/Action';

// import ErrorPage from 'next/error';

// import { getUserData } from 'src/redux/actions/user';

@withRoot
export default class TeacherActionPage extends PureComponent {
	static async getInitialProps(ctx) {
		const { query } = ctx;
		return { teacherId: query.id };
	}

	render() {
		// if (this.props.errorCode) {
		// 	return <ErrorPage statusCode={this.props.errorCode} />;
		// }
		return (
			<MainLayout>
				<Head>
					{
						this.props.teacherId ?
							<title>IPP Admin - Teacher - Edit {this.props.teacherId}</title> :
							<title>IPP Admin - Teacher - New</title>
					}
				</Head>
				<TeacherAction TeacherId={this.props.teacherId} />
			</MainLayout>
		);
	}
}
