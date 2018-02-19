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
import LessonAction from 'src/components/Pages/Lesson/Action';

@withRoot
export default class LessonActionPage extends PureComponent {
	static async getInitialProps(ctx) {
		const { query } = ctx;
		return { lessonId: query.id, levelId: query.levelId, levelName: query.levelName };
	}

	render() {
		return (
			<MainLayout>
				<Head>
					<title>IPP Admin - Lesson - New</title>
				</Head>
				<LessonAction
					lessonId={this.props.lessonId}
					levelId={this.props.levelId}
					levelName={this.props.levelName}
				/>
			</MainLayout>
		);
	}
}
