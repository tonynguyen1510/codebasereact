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

import PaymentActionPage from 'src/components/Pages/Payment/Action';

@withRoot
export default class PaymentAction extends PureComponent {
	static async getInitialProps(ctx) {
		const { query } = ctx;
		return { paymentId: query.id, studentId: query.studentId };
	}

	render() {
		return (
			<MainLayout>
				<Head>
					<title>IPP Admin - Payment - Action</title>
				</Head>
				<PaymentActionPage
					paymentId={this.props.paymentId}
					studentId={this.props.studentId}
				/>
			</MainLayout>
		);
	}
}
