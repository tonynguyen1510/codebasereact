/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-06 15:52:03
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Router from 'next/router';
import { Form, Icon, Input, Button, notification } from 'antd';

import { changePassword, logoutRequest } from 'src/redux/actions/auth';

import { stylesheet, classNames } from './style.less';

function mapStateToProps(state) {
	return {
		store: {
			auth: state.auth,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			changePassword,
			logoutRequest,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
export default class ChangePass extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		// store
		// store: PropTypes.shape({
		// 	auth: PropTypes.object.isRequired,
		// }).isRequired,
		// action
		action: PropTypes.shape({
			changePassword: PropTypes.func.isRequired,
			logoutRequest: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	state = {
		loading: false,
		confirmDirty: false,
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					loading: true,
				});
				this.props.action.changePassword(values, () => {
					notification.success({
						message: 'Congratulation',
						description: 'Your password has been changed successfully! Thank you.',
					});
					this.props.action.logoutRequest(() => {
						Router.push('/login');
					});
				}, () => {
					this.setState({
						loading: false,
					});
				});
			}
		});
	}

	checkPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('newPassword')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	}

	checkConfirm = (rule, value, callback) => {
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(['passwordConfirm'], { force: true });
		}
		callback();
	}

	handleConfirmBlur = (e) => {
		const { value } = e.target;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	render() {
		const { form: { getFieldDecorator } } = this.props;

		return (
			<div className={classNames.root}>
				<Form onSubmit={this.handleSubmit} className={classNames.form}>
					<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
					<Form.Item>
						{getFieldDecorator('oldPassword', {
							rules: [{ required: true, message: 'Please input your old password!' }, { min: 5 }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Old Password" />,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('newPassword', {
							rules: [{ required: true, message: 'Please input your new password!' }, { min: 5 }, { validator: this.checkConfirm }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="New Password" />,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('passwordConfirm', {
							rules: [{ required: true, message: 'Please input your Password confirm!' }, { min: 5 }, { validator: this.checkPassword }],
						})(
							<Input onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password confirm" />,
						)}
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className={classNames.btn} loading={this.state.loading}>
							Change Password
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}
