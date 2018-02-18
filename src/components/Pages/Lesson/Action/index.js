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

import SelectLevel from 'src/components/Form/SelectLevel';

import { getLessonInfo, upsertLesson } from 'src/redux/actions/lesson';

const FormItem = Form.Item;

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getLessonInfo,
			upsertLesson,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		store: {
			lessonObject: state.lesson.lessonInfo,
		},
	};
};

@Form.create()
@connect(mapStateToProps, mapDispatchToProps)

export default class LessonAction extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			lessonObject: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getLessonInfo: PropTypes.func.isRequired,
			upsertLesson: PropTypes.func.isRequired,
		}).isRequired,
	}
	state = {
		loading: false,
	}
	componentDidMount() {
		if (Router.router.query.id) {
			this.props.action.getLessonInfo({ id: Router.router.query.id }, () => {
				this.props.form.setFieldsValue({
					name: this.props.store.lessonObject.name || '',
					status: this.props.store.lessonObject.status || 'active',
					desc: this.props.store.lessonObject.desc || '',
					reference: this.props.store.lessonObject.reference || '',
					homework: this.props.store.lessonObject.homework || '',
					levelName: this.props.store.lessonObject.levelName || '',
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
				this.props.action.upsertLesson(data, () => {
					Router.push('/lesson');
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
					label="Lesson Name"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: 'Please input level name!' }],
					})(
						<Input
							size="large"
							placeholder="Lesson name"
						/>,
					)}
				</FormItem>
				<FormItem
					label="Level"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('levelName', {
						rules: [{ required: false }],
					})(
						<SelectLevel
							size="large"
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
				<FormItem
					label="Reference"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('reference', {
					})(
						<Input.TextArea
							size="large"
							rows={4}
							placeholder="Reference"
						/>,
					)}
				</FormItem>
				<FormItem
					label="Homework"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('homework', {
					})(
						<Input.TextArea
							size="large"
							rows={4}
							placeholder="Homework"
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
					<Button size="large" style={{ marginLeft: 8 }} onClick={() => Router.push('/lesson')}>
						Cancel
					</Button>
				</Form.Item>
			</Form>
		);
	}
}
