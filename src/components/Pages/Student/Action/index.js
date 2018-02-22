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

import SelectLevel from 'src/components/Form/SelectLevel';
import SelectBranch from 'src/components/Form/SelectBranch';

import { createStudent, getStudentData, updateStudent } from 'src/redux/actions/student';

function mapStateToProps(state) {
	return {
		store: {
			studentView: state.student.studentView,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			createStudent,
			getStudentData,
			updateStudent,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
export default class ConsultorAction extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		studentId: PropTypes.string,
		// store
		// store: PropTypes.shape({
		// 	studentView: PropTypes.object.isRequired,
		// }).isRequired,
		// action
		action: PropTypes.shape({
			createStudent: PropTypes.func.isRequired,
			getStudentData: PropTypes.func.isRequired,
			updateStudent: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		studentId: undefined,
	}

	state = {
		loading: false,
	}

	componentDidMount() {
		if (this.props.studentId) {
			this.props.action.getStudentData({ id: this.props.studentId }, (user) => {
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
					levelName: user.levelName,
					status: user.status,
					expectedTarget: user.expectedTarget,
					fbLink: user.facebook && user.facebook.link,
					fbName: user.facebook && user.facebook.name,
					entryTestDate: user.entryTest && moment(user.entryTest.date, 'YYYY-MM-DD'),
					entryTestResult: user.entryTest && user.entryTest.result,
					birthDate: moment(user.birthDate, 'YYYY-MM-DD'),
				});
			});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { entryTestDate, entryTestResult, fbName, fbLink, ...restUser } = values;
				const data = { ...restUser, facebook: { link: fbLink, name: fbName }, entryTest: { date: entryTestDate, result: entryTestResult }, updatedAt: new Date()};
				this.setState({
					loading: true,
				});
				if (this.props.studentId) {
					// edit user
					data.id = this.props.studentId;
					this.props.action.updateStudent(data, () => {
						Router.push('/student');
					}, () => {
						this.setState({
							loading: false,
						});
					});
				} else {
					// create user
					data.creatorId = AuthStorage.userId;

					this.props.action.createStudent(data, () => {
						Router.push('/student');
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
					label="Status"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('status', {
						initialValue: 'inquiring',
						// rules: [{ required: true, message: 'Please input your email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
					})(
						<Select size="large">
							<Select.Option value="inquiring">Course inquiring</Select.Option>
							<Select.Option value="tested">Tested and consulted</Select.Option>
							<Select.Option value="studying">Studying</Select.Option>
							<Select.Option value="finished">Course finished</Select.Option>
							<Select.Option value="suspending">Suspending</Select.Option>
							<Select.Option value="old">Old students </Select.Option>
						</Select>,
					)}
				</Form.Item>

				<Form.Item
					label="Level"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('levelName', {
						// initialValue: 'inquiring',
						// rules: [{ required: true, message: 'Please input your email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
					})(
						<SelectLevel size="large" />,
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
					label="Entry Test Date"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('entryTestDate', {
						// initialValue: moment('1990-01-01', 'YYYY-MM-DD'),
						// rules: [{ required: true, message: 'Please input your email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
					})(
						<DatePicker size="large" format="DD-MM-YYYY" />,
					)}
				</Form.Item>

				<Form.Item
					label="Entry Test Result"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('entryTestResult', {
						// rules: [{ required: true, message: 'Please input your Phone!' }],
					})(
						<Input size="large" placeholder="Entry Test Result" type="number" />,
					)}
				</Form.Item>

				<Form.Item
					label="Expected Target"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('expectedTarget', {
						// rules: [{ required: true, message: 'Please input your Phone!' }],
					})(
						<Input size="large" placeholder="Expected Target" type="number" />,
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
						<SelectBranch size="large" style={{ width: 192 }} />,
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
					<Button size="large" style={{ marginLeft: 8 }} onClick={() => Router.push('/student')}>
						Cancel
					</Button>
				</Form.Item>
			</Form>
		);
	}
}
