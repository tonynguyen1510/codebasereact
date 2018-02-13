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
import * as LessonContentActionRedux from 'src/redux/actions/lesson_content';
import { bindActionCreators } from 'redux';
import { Form, Select, Input, DatePicker, Switch, Slider, Button } from 'antd';

const FormItem = Form.Item;

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			...LessonContentActionRedux,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		lessonContentObject: state.lessonContent.lessonContentInfo,
	};
};
@Form.create()
@connect(mapStateToProps, mapDispatchToProps)

export default class LessonContentAction extends Component {
	static propTypes = {
		lessonContentObject: PropTypes.object.isRequired,
		action: PropTypes.object.isRequired,
		form: PropTypes.object.isRequired,
		lessonContentId: PropTypes.string,
		onFinishCreatingLessonContent: PropTypes.func.isRequired,
		levelId: PropTypes.string.isRequired,
	}
	state = {
		loading: false,
	}
	componentDidMount() {
		if (this.props.lessonContentId) {
			this.props.action.getLessonContentInfo(this.props.lessonContentId, () => {
				this.props.form.setFieldsValue({
					name: this.props.lessonContentObject.name || '',
					status: this.props.lessonContentObject.status || 'active',
					type: this.props.lessonContentObject.type || '',
					desc: this.props.lessonContentObject.desc || '',
				});
			});
		} else {
			this.props.action.resetStateLessonContentInfo();
			this.props.form.setFieldsValue({
				status: this.props.lessonContentObject.status || 'active',
			});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const data = { ...values, updatedAt: new Date(), levelId: this.props.levelId };
				this.setState({
					loading: true,
				});
				this.props.action.upsertLessonContent(data, this.props.lessonContentId, () => {
					this.props.onFinishCreatingLessonContent();
				}, () => {
					this.setState({
						loading: false,
					});
				});
			}
		});
	}
	render() {
		const { form: { getFieldDecorator }, onFinishCreatingLessonContent } = this.props;
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit}>
				<FormItem
					label="Lesson Content Name"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: 'Please input lesson content name!' }],
					})(
						<Input
							size="large"
							style={{ width: 200 }}
							placeholder="enter lesson content name"
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
					<Button size="large" style={{ marginLeft: 8 }} onClick={() => onFinishCreatingLessonContent()} >
						Cancel
					</Button>
				</FormItem>
			</Form>
		);
	}
}
