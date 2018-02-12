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
import * as LessonActionRedux from 'src/redux/actions/lesson';
import { bindActionCreators } from 'redux';
import { Form, Select, Input, DatePicker, Switch, Slider, Button } from 'antd';

const FormItem = Form.Item;

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			...LessonActionRedux,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		lessonObject: state.lesson.lessonInfo,
	};
};
@Form.create()
@connect(mapStateToProps, mapDispatchToProps)

export default class LessonAction extends Component {
	static propTypes = {
		lessonObject: PropTypes.object.isRequired,
		action: PropTypes.object.isRequired,
		form: PropTypes.object.isRequired,
		lessonId: PropTypes.string,
		onFinishCreatingLesson: PropTypes.func.isRequired,
		classId: PropTypes.string.isRequired,
	}
	state = {
		loading: false,
	}
	componentDidMount() {
		if (this.props.lessonId) {
			this.props.action.getLessonInfo(this.props.lessonId, () => {
				console.log('setFieldsValue ====', this.props)
				this.props.form.setFieldsValue({
					name: this.props.lessonObject.name || '',
					status: this.props.lessonObject.status || 'active',
					type: this.props.lessonObject.type || '',
					desc: this.props.lessonObject.desc || '',
				});
			});
		} else {
			this.props.action.resetStateLessonInfo();
			this.props.form.setFieldsValue({
				status: this.props.lessonObject.status || 'active',
			});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const data = { ...values, updatedAt: new Date(), classId: this.props.classId };
				this.setState({
					loading: true,
				});
				this.props.action.upsertLesson(data, this.props.lessonId, () => {
					this.props.onFinishCreatingLesson();
				}, () => {
					this.setState({
						loading: false,
					});
				});
			}
		});
	}
	render() {
		const { form: { getFieldDecorator }, onFinishCreatingLesson } = this.props;
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit}>
				<FormItem
					label="Lesson Name"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: 'Please input lesson name!' }],
					})(
						<Input
							size="large"
							style={{ width: 200 }}
							placeholder="enter lesson name"
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
					label="Type"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>	{getFieldDecorator('type', {
						rules: [{ required: false }],
					})(
						<Input
							size="large"
							style={{ width: 200 }}
							placeholder="enter type"
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
							style={{ width: 200 }}
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
					<Button size="large" style={{ marginLeft: 8 }} onClick={() => onFinishCreatingLesson()} >
						Cancel
					</Button>
				</FormItem>
			</Form>
		);
	}
}
