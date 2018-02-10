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

import { loginFirst, logoutRequest } from 'src/redux/actions/auth';

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
			loginFirst,
			logoutRequest,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
export default class SetPassword extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		token: PropTypes.string.isRequired,
		// store
		// store: PropTypes.shape({
		// 	auth: PropTypes.object.isRequired,
		// }).isRequired,
		// action
		action: PropTypes.shape({
			loginFirst: PropTypes.func.isRequired,
			logoutRequest: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	state = {
		loading: false,
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
				this.props.action.loginFirst({ token: this.props.token, password: values.password }, () => {
					Router.push('/login');
				}, () => {
					this.setState({
						loading: false,
					});
				});
			}
		});
	}
	render() {
		const { form: { getFieldDecorator }, token } = this.props;
		if (!token) {
			return <div>Token is invalid</div>;
		}

		return (
			<div className={classNames.root}>
				<Form onSubmit={this.handleSubmit} className={classNames.form}>
					<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
					<div className={classNames.logo}>
						<img src="/static/assets/images/logo/64x64.png" alt="ipp" />
					</div>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input your password!' }, { min: 5 }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password-confirm', {
							rules: [{ required: true, message: 'Please input your Password confirm!' }, { min: 5 }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password confirm" />,
						)}
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className={classNames.btn} loading={this.state.loading}>
							Commit
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}
