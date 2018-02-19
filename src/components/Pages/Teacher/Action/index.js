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

import AuthStorage from 'src/utils/AuthStorage';

import { Input, Form, Select, DatePicker, Button } from 'antd';

import { createUser, getUserData, updateUser } from 'src/redux/actions/user';

function mapStateToProps(state) {
	return {
		store: {
			userView: state.user.userView,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			createUser,
			getUserData,
			updateUser,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
export default class ConsultorAction extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		consultorId: PropTypes.string,
		// store
		// store: PropTypes.shape({
		// 	userView: PropTypes.object.isRequired,
		// }).isRequired,
		// action
		action: PropTypes.shape({
			createUser: PropTypes.func.isRequired,
			getUserData: PropTypes.func.isRequired,
			updateUser: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		consultorId: undefined,
	}

	state = {
		loading: false,
	}

	componentDidMount() {
		if (this.props.consultorId) {
			this.props.action.getUserData({ id: this.props.consultorId }, (user) => {
				this.props.form.setFieldsValue({
					fullName: user.fullName,
					email: user.email,
					email2: user.email2,
					phone: user.phone,
					phone2: user.phone2,
					gender: user.gender,
					branch: user.branch,
					address: user.address,
					desc: user.desc,
					fbLink: user.facebook && user.facebook.link,
					fbName: user.facebook && user.facebook.name,
					birthDate: moment(user.birthDate, 'YYYY-MM-DD'),
				});
			});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { fbName, fbLink, ...restUser } = values;
				const data = { ...restUser, facebook: { link: fbLink, name: fbName }, updatedAt: new Date(), role: 'teacher' };
				this.setState({
					loading: true,
				});
				if (this.props.consultorId) {
					// edit user
					data.id = this.props.consultorId;
					this.props.action.updateUser(data, () => {
						Router.push('/teacher');
					}, () => {
						this.setState({
							loading: false,
						});
					});
				} else {
					// create user
					data.creatorId = AuthStorage.userId;
					this.props.action.createUser(data, () => {
						Router.push('/teacher');
					}, () => {
						this.setState({
							loading: false,
						});
					});
				}
			}
		});
	}

	render() {
		const { form: { getFieldDecorator } } = this.props;

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
					label="Email 2"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('email2', {
						rules: [{ pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
					})(
						<Input size="large" placeholder="Email 2" />,
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
					label=""
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8, offset: 8 }}
				>
					{getFieldDecorator('phone2', {
						// rules: [{ required: true, message: 'Please input your Phone!' }],
					})(
						<Input size="large" placeholder="Phone 2" />,
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
					label="Address"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('address', {
						// rules: [{ required: true, message: 'Please input your email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
					})(
						<Input.TextArea placeholder="Address" size="large" />,
					)}
				</Form.Item>

				<Form.Item
					label="Branch"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('branch', {
						initialValue: 'HN',
					})(
						<Select size="large" style={{ width: 192 }}>
							<Select.Option value="HN">Hà Nội</Select.Option>
							<Select.Option value="HCM">HCM</Select.Option>
						</Select>,
					)}
				</Form.Item>

				<Form.Item
					label="Description"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('desc', {
						// rules: [{ required: true, message: 'Please input your email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
					})(
						<Input.TextArea placeholder="Description" size="large" />,
					)}
				</Form.Item>
				<Form.Item
					label="Facebook Name"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('fbName', {
						// rules: [{ required: true, message: 'Please input your email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
					})(
						<Input placeholder="Facebook Name" size="large" />,
					)}
				</Form.Item>
				<Form.Item
					label="Facebook Link"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('fbLink', {
						// rules: [{ required: true, message: 'Please input your email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
					})(
						<Input placeholder="Facebook Link" size="large" />,
					)}
				</Form.Item>

				<Form.Item
					style={{ marginTop: 48 }}
					wrapperCol={{ span: 8, offset: 8 }}
				>
					<Button size="large" type="primary" htmlType="submit" loading={this.state.loading}>
						Submit
					</Button>
					<Button size="large" style={{ marginLeft: 8 }} onClick={() => Router.push('/teacher')}>
						Cancel
					</Button>
				</Form.Item>
			</Form>
		);
	}
}
