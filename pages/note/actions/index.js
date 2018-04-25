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

import NoteAction from 'src/components/Pages/Index/Actions';

@withRoot
export default class ClassActionPage extends PureComponent {
	static async getInitialProps({ query }) {
		return { noteId: query.id };
	}

	render() {
		return (
			<MainLayout>
				<NoteAction noteId={this.props.noteId} />
			</MainLayout>
		);
	}
}
