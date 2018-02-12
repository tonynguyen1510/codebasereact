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
import LessonListPage from 'src/components/List/Lesson/';
import LessonActionPage from 'src/components/List/Lesson/Action/';

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
		isCreatingLesson: false,
		lessonId: null,
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
			this.props.form.setFieldsValue({
				status: this.props.classObject.status || 'active',
			});
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
			<div>
				<Form layout="inline" onSubmit={this.handleSubmit}>
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
								style={{ width: 200 }}
							>
								<Select.Option value="active" selected>Active</Select.Option>
								<Select.Option value="inactive">inActive</Select.Option>
							</Select>,
						)}
					</FormItem>
					<FormItem
						wrapperCol={{ span: 8, offset: 8 }}
					>
						<Button size="large" type="primary" htmlType="submit" loading={this.state.loading}>
							Submit
						</Button>
					</FormItem>
					<FormItem
						wrapperCol={{ span: 8, offset: 8 }}
					>
						<Button size="large" onClick={() => Router.back()} >
							Cancel
						</Button>
					</FormItem>
				</Form>
				{this.state.isCreatingLesson && Router.router && Router.router.query.id &&
					<LessonActionPage
						classId={Router.router.query.id}
						lessonId={this.state.lessonId}
						onFinishCreatingLesson={() => this.setState({ isCreatingLesson: false })}
					/>
				}
				{!this.state.isCreatingLesson && Router.router && Router.router.query.id &&
					<LessonListPage
						classId={Router.router.query.id}
						onCreateLesson={(lessonId) => this.setState({ isCreatingLesson: true, lessonId })}
					/>
				}
			</div>
		);
	}
}
