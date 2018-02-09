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

import { Icon, Input, Form, Select, InputNumber, DatePicker, Switch, Slider, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

function mapStateToProps(state) {
	return {
		store: {
			//modal: state.modal,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		//action: bindActionCreators({
			//toggleLoginModal,
		//}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
export default class ConsultorAction extends Component {
	static propTypes = {
		// classes: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			modal: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			toggleLoginModal: PropTypes.func.isRequired,
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
				console.log('values', values);
			}
		});
	}

	render() {
		const { form: { getFieldDecorator } } = this.props;

		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit} style={{ margin: '100px 0' }}>
				<FormItem
					label="Full Name"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('fullName', {
						rules: [{ required: true, message: 'Please input your Full name!' }],
					})(
						<Input size="large" placeholder="Full name" />,
					)}
				</FormItem>

				<FormItem
					label="Email"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('email', {
						rules: [{ required: true, message: 'Please input your email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
					})(
						<Input size="large" placeholder="Email" />,
					)}
				</FormItem>

				<FormItem
					label="Phone"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('phone', {
						rules: [{ required: true, message: 'Please input your Phone!' }],
					})(
						<Input size="large" placeholder="Phone" />,
					)}
				</FormItem>

				<FormItem
					label="Gender"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('gender', {
						initialValue: 'male',
						// rules: [{ required: true, message: 'Please input your email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
					})(
						<Select size="large" style={{ width: 192 }}>
							<Option value="male">Male</Option>
							<Option value="female">Female</Option>
						</Select>,
					)}
				</FormItem>

				<FormItem
					label="Birth Date"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('birthDate', {
						// initialValue: moment('01/01/1990').format(),
						// rules: [{ required: true, message: 'Please input your email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
					})(
						<DatePicker size="large" format="DD-MM-YYYY" />,
					)}
				</FormItem>

				<FormItem
					style={{ marginTop: 48 }}
					wrapperCol={{ span: 8, offset: 8 }}
				>
					<Button size="large" type="primary" htmlType="submit" loading={this.state.loading}>
						OK
					</Button>
					<Button size="large" style={{ marginLeft: 8 }} onClick={() => Router.back()}>
						Cancel
					</Button>
				</FormItem>
			</Form>
		);
	}
}
