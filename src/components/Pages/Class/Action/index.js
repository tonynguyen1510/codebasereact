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
import * as ClassActionRedux from '../../../../redux/actions/class';
import Router from 'next/router'
import { Form, Select, Input, DatePicker, Switch, Slider, Button } from 'antd';

const FormItem = Form.Item;

const mapDispatchToProps = {
	...ClassActionRedux
}
const mapStateToProps = (state) => {
	return {
		classObject: state.classObject.classInfo
	}
}
@connect(mapStateToProps, mapDispatchToProps)

export default class ClassAction extends Component {
	static propTypes = {
		classObject: PropTypes.object,
		getClassInfo: PropTypes.func,
		upsertClass: PropTypes.func,
		onValueChange: PropTypes.func,
		resetStateClassInfo: PropTypes.func,
		getClasses: PropTypes.func
	}
	componentDidMount() {
		if (Router.router.query.id) {
			this.props.getClassInfo(Router.router.query.id)
		} else {
			this.props.resetStateClassInfo()
		}
	}
	upsertClass() {
		this.props.upsertClass(this.props.classObject, Router.router.query.id)
	}
	render() {
		const { classObject, onValueChange } = this.props;
		return (
			<Form layout="horizontal">
				<FormItem
					label="Class Name*"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					<Input
						onChange={(e) => onValueChange('name', e.target.value)}
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
						onChange={(e) => onValueChange('desc', e.target.value)}
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
						onChange={(value) => onValueChange('status', value)}
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
