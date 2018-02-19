/* --------------------------------------------------------
* Author Ngo An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-02-09 11:27:16
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';

import { Form, Select, Input, Button } from 'antd';

import { getLevelInfo, upsertLevel } from 'src/redux/actions/level';

const FormItem = Form.Item;

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getLevelInfo,
			upsertLevel,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		store: {
			levelObject: state.level.levelInfo,
		},
	};
};
@Form.create()
@connect(mapStateToProps, mapDispatchToProps)

export default class PaymentAction extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			levelObject: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getLevelInfo: PropTypes.func.isRequired,
			upsertLevel: PropTypes.func.isRequired,
		}).isRequired,
	}
	state = {
		loading: false,
	}
	componentDidMount() {
		if (Router.router.query.id) {
			this.props.action.getLevelInfo({ id: Router.router.query.id }, () => {
				this.props.form.setFieldsValue({
					name: this.props.store.levelObject.name || '',
					status: this.props.store.levelObject.status || 'active',
					desc: this.props.store.levelObject.desc || '',
				});
			});
		}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const data = { ...values, updatedAt: new Date(), id: Router.router.query.id };
				this.setState({
					loading: true,
				});
				this.props.action.upsertLevel(data, () => {
					Router.push('/level');
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
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit} style={{ margin: '100px 0' }}>
				<FormItem
					label="Content"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('content', {
						rules: [{ required: true, message: 'Please input level name!' }],
					})(
						<Input
							size="large"
							placeholder="Content"
						/>,
					)}
				</FormItem>
				<FormItem
					label="Status"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('status', {
						initialValue: 'active',
						rules: [{ required: false }],
					})(
						<Select
							size="large"
						>
							<Select.Option value="active" selected>Active</Select.Option>
							<Select.Option value="inactive">Inactive</Select.Option>
						</Select>,
					)}
				</FormItem>
				<FormItem
					label="Description"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('desc', {
						rules: [{ required: false }],
					})(
						<Input.TextArea
							size="large"
							rows={2}
							placeholder="Description"
						/>,
					)}
				</FormItem>
				<Form.Item
					style={{ marginTop: 48 }}
					wrapperCol={{ span: 8, offset: 8 }}
				>
					<Button size="large" type="primary" htmlType="submit" loading={this.state.loading}>
						Submit
					</Button>
					<Button size="large" style={{ marginLeft: 8 }} onClick={() => Router.push('/level')}>
						Cancel
					</Button>
				</Form.Item>
			</Form>
		);
	}
}
