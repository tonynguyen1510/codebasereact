/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-09 11:27:16
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import Router from 'next/router';

import { Input, Form, Select, DatePicker, Button } from 'antd';

import { createUser } from 'src/redux/actions/user';

function mapStateToProps(/* state */) {
	return {
		// store: {
		// 	//modal: state.modal,
		// },
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			createUser,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
export default class ConsultorAction extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		// store
		// store: PropTypes.shape({
		// 	modal: PropTypes.object.isRequired,
		// }).isRequired,
		// action
		action: PropTypes.shape({
			createUser: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	state = {
		loading: false,
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const data = { ...values, phone: [values.phone], createdAt: new Date(), updatedAt: new Date(), role: 'consultor' };
				this.setState({
					loading: true,
				});
				this.props.action.createUser(data, (user) => {
					Router.push('/consultor');
				}, () => {
					this.setState({
						loading: false,
					});
				});
			}
		});
	}

	render() {
		const { form: { getFieldDecorator } } = this.props;

		console.log('this.props.', this.props);

		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit} style={{ margin: '100px 0' }}>
				<Form.Item
					label="Full Name"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('fullName', {
						rules: [{ required: true, message: 'Please input your Full name!' }],
					})(
						<Input size="large" placeholder="Full name" />,
					)}
				</Form.Item>

				<Form.Item
					label="Email"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('email', {
						rules: [{ required: true, message: 'Please input your email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
					})(
						<Input size="large" placeholder="Email" />,
					)}
				</Form.Item>

				<Form.Item
					label="Phone"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('phone', {
						rules: [{ required: true, message: 'Please input your Phone!' }],
					})(
						<Input size="large" placeholder="Phone" />,
					)}
				</Form.Item>

				<Form.Item
					label="Gender"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('gender', {
						initialValue: 'male',
						// rules: [{ required: true, message: 'Please input your email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
					})(
						<Select size="large" style={{ width: 192 }}>
							<Select.Option value="male">Male</Select.Option>
							<Select.Option value="female">Female</Select.Option>
						</Select>,
					)}
				</Form.Item>

				<Form.Item
					label="Birth Date"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('birthDate', {
						initialValue: moment('1990-01-01', 'YYYY-MM-DD'),
						// rules: [{ required: true, message: 'Please input your email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
					})(
						<DatePicker size="large" format="DD-MM-YYYY" />,
					)}
				</Form.Item>

				<Form.Item
					style={{ marginTop: 48 }}
					wrapperCol={{ span: 8, offset: 8 }}
				>
					<Button size="large" type="primary" htmlType="submit" loading={this.state.loading}>
						Submit
					</Button>
					<Button size="large" style={{ marginLeft: 8 }} onClick={() => Router.back()}>
						Cancel
					</Button>
				</Form.Item>
			</Form>
		);
	}
}
