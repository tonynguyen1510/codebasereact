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
import * as ClassActionRedux from 'src/redux/actions/class';
import Router from 'next/router';
import { bindActionCreators } from 'redux';
import { Form, Select, Input, DatePicker, Switch, Slider, Button } from 'antd';

const FormItem = Form.Item;

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			...ClassActionRedux,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		classObject: state.classObject.classInfo,
	};
};
@Form.create()
@connect(mapStateToProps, mapDispatchToProps)

export default class ClassAction extends Component {
	static propTypes = {
		classObject: PropTypes.object.isRequired,
		action: PropTypes.object.isRequired,
		form: PropTypes.object.isRequired,
	}
	state = {
		loading: false,
	}
	componentDidMount() {
		if (Router.router.query.id) {
			this.props.action.getClassInfo(Router.router.query.id, () => {
				this.props.form.setFieldsValue({
					name: this.props.classObject.name || '',
					status: this.props.classObject.status || 'active',
					desc: this.props.classObject.desc || '',
				});
			});
		} else {
			this.props.action.resetStateClassInfo();
		}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const data = { ...values, updatedAt: new Date() };
				this.setState({
					loading: true,
				});
				this.props.action.upsertClass(data, Router.router.query.id, () => {
					Router.push('/class');
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
			<Form layout="horizontal" onSubmit={this.handleSubmit}>
				<FormItem
					label="Class Name"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: 'Please input class name!' }],
					})(
						<Input
							size="large"
							style={{ width: 200 }}
							placeholder="enter class name"
						/>,
					)}
				</FormItem>
				<FormItem
					label="Description"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>	{getFieldDecorator('desc', {
						rules: [{ required: false }],
					})(
						<Input
							size="large"
							style={{ width: 200 }}
							placeholder="enter description"
						/>,
					)}
				</FormItem>
				<FormItem
					label="Status"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('status', {
						rules: [{ required: false }],
					})(
						<Select
							size="large"
							style={{ width: 192 }}
						>
							<Select.Option value="active" selected>Active</Select.Option>
							<Select.Option value="inactive">inActive</Select.Option>
						</Select>,
					)}
				</FormItem>
				<FormItem
					style={{ marginTop: 48 }}
					wrapperCol={{ span: 8, offset: 8 }}
				>
					<Button size="large" type="primary" htmlType="submit" loading={this.state.loading}>
						Submit
					</Button>
					<Button size="large" style={{ marginLeft: 8 }} onClick={() => Router.back()} >
						Cancel
					</Button>
				</FormItem>
			</Form>
		);
	}
}
