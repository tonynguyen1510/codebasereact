/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-09 11:27:16
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Form, Select, InputNumber, DatePicker, Switch, Slider, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

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
export default class ClassAction extends Component {
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

	render() {
		const {  } = this.props;

		return (
			<Form layout="horizontal">
				<FormItem
					label="Input Number"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					<InputNumber size="large" min={1} max={10} style={{ width: 100 }} defaultValue={3} name="inputNumber" />
					<a href="#">Link</a>
				</FormItem>

				<FormItem
					label="Switch"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					<Switch defaultChecked name="switch" />
				</FormItem>

				<FormItem
					label="Slider"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					<Slider defaultValue={70} />
				</FormItem>

				<FormItem
					label="Select"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					<Select size="large" defaultValue="lucy" style={{ width: 192 }} name="select">
						<Option value="jack">jack</Option>
						<Option value="lucy">lucy</Option>
						<Option value="disabled" disabled>disabled</Option>
						<Option value="yiminghe">yiminghe</Option>
					</Select>
				</FormItem>

				<FormItem
					label="DatePicker"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					<DatePicker name="startDate" />
				</FormItem>
				<FormItem
					style={{ marginTop: 48 }}
					wrapperCol={{ span: 8, offset: 8 }}
				>
					<Button size="large" type="primary" htmlType="submit">
						OK
					</Button>
					<Button size="large" style={{ marginLeft: 8 }}>
						Cancel
					</Button>
				</FormItem>
			</Form>
		);
	}
}
