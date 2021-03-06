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
import Link from 'next/link';

import { Form, Icon, Input, Button } from 'antd';

import { loginRequest } from 'src/redux/actions/auth';

import AuthStorage from 'src/utils/AuthStorage';

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
			loginRequest,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
export default class LoginForm extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			auth: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			loginRequest: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	state = {
		loading: false,
	}

	componentDidMount() {
		if (AuthStorage.loggedIn) {
			Router.push('/');
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					loading: true,
				});
				this.props.action.loginRequest(values, () => {
					if (AuthStorage.loggedIn && this.props.store.auth.id) {
						Router.push('/');
					}
					this.setState({
						loading: false,
					});
				}, () => {
					this.setState({
						loading: false,
					});
				});
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<div className={classNames.root}>
				<Form onSubmit={this.handleSubmit} className={classNames.form}>
					<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
					<div className={classNames.logo}>
						<img src="/static/assets/images/logo/64x64.png" alt="ipp" />
					</div>

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
						<Button type="primary" htmlType="submit" className={classNames.btn} loading={this.state.loading}>
							Log in
						</Button>
						<p className="text-center">
							<Link href="/forgot-password">
								<a className="login-form-forgot">Forgot password</a>
							</Link>
						</p>
					</Form.Item>
				</Form>
			</div>
		);
	}
}
