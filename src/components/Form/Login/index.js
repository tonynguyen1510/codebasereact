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

const FormItem = Form.Item;

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

		return (
			<Form onSubmit={this.handleSubmit} className={classNames.form}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

				<FormItem>
					{getFieldDecorator('userName', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" className={classNames.btn}>
						Log in
					</Button>
					<p className="text-center">
						<a className="login-form-forgot" href="#">Forgot password</a>
					</p>
				</FormItem>
			</Form>
		);
	}
}
