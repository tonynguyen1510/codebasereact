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

import { Form, Icon, Input, Button } from 'antd';

import { forgotPassword, logoutRequest } from 'src/redux/actions/auth';

import AuthStorage from 'src/utils/AuthStorage';

import { stylesheet, classNames } from './style.less';

function mapStateToProps(/* state */) {
	return {
		// store: {
		// 	auth: state.auth,
		// },
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			forgotPassword,
			logoutRequest,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
export default class ForgotPassword extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		// store
		// store: PropTypes.shape({
		// 	auth: PropTypes.object.isRequired,
		// }).isRequired,
		// action
		action: PropTypes.shape({
			forgotPassword: PropTypes.func.isRequired,
			logoutRequest: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	state = {
		loading: false,
		sent: false,
	}

	componentDidMount() {
		if (AuthStorage.loggedIn) {
			this.props.action.logoutRequest();
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					loading: true,
				});
				this.props.action.forgotPassword(values, () => {
					this.setState({
						loading: false,
						sent: true,
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

		if (this.state.sent) {
			return (
				<div className={classNames.root}>
					<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
					<div className={classNames.form} style={{ width: 350 }}>
						<p>Please check your email for further instructions.</p>
						<Button type="primary" className={classNames.btn} onClick={() => Router.push('/login')}>
							Login
						</Button>
					</div>
				</div>
			);
		}

		return (
			<div className={classNames.root}>
				<Form onSubmit={this.handleSubmit} className={classNames.form}>
					<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
					<div className={classNames.logo}>
						<img src="/static/assets/images/logo/64x64.png" alt="ipp" />
					</div>

					<p>Enter your email address that you used to register. We'll send you an email with your username and a link to reset your password.</p>
					<Form.Item>
						{getFieldDecorator('email', {
							rules: [{ required: true, message: 'Please input your email!' }, { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email is invalid!' }],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />,
						)}
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className={classNames.btn} loading={this.state.loading}>
							Reset password
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}
