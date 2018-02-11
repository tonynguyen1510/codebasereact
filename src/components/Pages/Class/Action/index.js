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
@connect(mapStateToProps, mapDispatchToProps)

export default class ClassAction extends Component {
	static propTypes = {
		classObject: PropTypes.object.isRequired,
		action: PropTypes.object.isRequired,
	}
	componentDidMount() {
		if (Router.router.query.id) {
			this.props.action.getClassInfo(Router.router.query.id);
		} else {
			this.props.action.resetStateClassInfo();
		}
	}
	upsertClass() {
		this.props.action.upsertClass(this.props.classObject, Router.router.query.id);
	}
	render() {
		const { classObject, action } = this.props;
		return (
			<Form layout="horizontal">
				<FormItem
					label="Class Name*"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					<Input
						onChange={(e) => action.onValueChange('name', e.target.value)}
						value={classObject.name || ''}
						size="large"
						style={{ width: 200 }}
						name="classname"
						placeholder="enter class name"
					/>
				</FormItem>
				<FormItem
					label="Description"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					<Input
						onChange={(e) => action.onValueChange('desc', e.target.value)}
						value={classObject.desc || ''}
						size="large"
						style={{ width: 200 }}
						name="description"
						placeholder="enter description"
					/>
				</FormItem>
				<FormItem
					label="Status"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					<Select
						onChange={(value) => action.onValueChange('status', value)}
						size="large"
						style={{ width: 192 }}
						defaultValue={classObject.status || 'active'}
					>
						<Select.Option value="active" selected>Active</Select.Option>
						<Select.Option value="inactive">inActive</Select.Option>
					</Select>
				</FormItem>
				<FormItem
					style={{ marginTop: 48 }}
					wrapperCol={{ span: 8, offset: 8 }}
				>
					<Button size="large" type="primary" htmlType="submit" onClick={() => this.upsertClass()}>
						OK
					</Button>
					<Button size="large" style={{ marginLeft: 8 }} onClick={() => Router.back()} >
						Cancel
					</Button>
				</FormItem>
			</Form>
		);
	}
}
