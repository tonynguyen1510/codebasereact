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
import * as LevelActionRedux from 'src/redux/actions/level';
import Router from 'next/router';
import { bindActionCreators } from 'redux';
import { Form, Select, Input, DatePicker, Switch, Slider, Button, Row } from 'antd';
import LessonContentListPage from 'src/components/List/LessonContent/';
import LessonContentActionPage from 'src/components/List/LessonContent/Action/';

const FormItem = Form.Item;

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			...LevelActionRedux,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		levelObject: state.level.levelInfo,
	};
};
@Form.create()
@connect(mapStateToProps, mapDispatchToProps)

export default class LevelAction extends Component {
	static propTypes = {
		levelObject: PropTypes.object.isRequired,
		action: PropTypes.object.isRequired,
		form: PropTypes.object.isRequired,
	}
	state = {
		loading: false,
		isCreatingLessonContent: false,
		lessonContentId: null,
	}
	componentDidMount() {
		if (Router.router.query.id) {
			this.props.action.getLevelInfo(Router.router.query.id, () => {
				this.props.form.setFieldsValue({
					name: this.props.levelObject.name || '',
					status: this.props.levelObject.status || 'active',
					desc: this.props.levelObject.desc || '',
				});
			});
		} else {
			this.props.action.resetStateLevelInfo();
			this.props.form.setFieldsValue({
				status: this.props.levelObject.status || 'active',
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
				this.props.action.upsertLevel(data, Router.router.query.id, () => {
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
				{!this.state.isCreatingLessonContent &&
					<Form layout="inline" onSubmit={this.handleSubmit}>
						<Row>
							<FormItem
								label="Level"
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 8 }}
							>
								{getFieldDecorator('name', {
									rules: [{ required: true, message: 'Please input level name!' }],
								})(
									<Input
										size="large"
										style={{ width: 200 }}
										placeholder="enter level name"
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
								label="Description"
								labelCol={{ span: 5 }}
								wrapperCol={{ span: 16 }}
							>
								{getFieldDecorator('desc', {
									rules: [{ required: false }],
								})(
									<Input.TextArea
										size="large"
										style={{ width: 600 }}
										rows={2}
										placeholder="enter description"
									/>,
								)}
							</FormItem>
							<div style={{ float: 'right', marginRight: '50px' }}>
								<FormItem
									wrapperCol={{ span: 8, offset: 14 }}
								>
									<Button size="large" type="primary" htmlType="submit" loading={this.state.loading}>
										Submit
									</Button>
								</FormItem>
								<FormItem
									wrapperCol={{ span: 8, offset: 14 }}
								>
									<Button size="large" onClick={() => Router.push('/level')} >
										Cancel
									</Button>
								</FormItem>
							</div>
						</Row>
					</Form>
				}
				{this.state.isCreatingLessonContent && Router.router && Router.router.query.id &&
					<LessonContentActionPage
						levelId={Router.router.query.id}
						lessonContentId={this.state.lessonContentId}
						onFinishCreatingLessonContent={() => this.setState({ isCreatingLessonContent: false })}
					/>
				}
				{!this.state.isCreatingLessonContent && Router.router && Router.router.query.id &&
					<LessonContentListPage
						levelId={Router.router.query.id}
						onCreateLessonContent={(lessonContentId) => this.setState({ isCreatingLessonContent: true, lessonContentId })}
					/>
				}
			</div>
		);
	}
}
