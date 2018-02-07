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

import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { stylesheet, classNames } from './style.less';

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
export default class LoginForm extends Component {
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

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		console.log('props', this.props);

		return (
			<div className={classNames.root}>
				<Form onSubmit={this.handleSubmit} className={classNames.form}>
					<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

					<Form.Item>
						{getFieldDecorator('email', {
							rules: [{ required: true, message: 'Please input your email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input your Password!' }, { min: 5 }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />,
						)}
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className={classNames.btn}>
							Log in
						</Button>
						<p className="text-center">
							<a className="login-form-forgot" href="#">Forgot password</a>
						</p>
					</Form.Item>
				</Form>
			</div>
		);
	}
}
