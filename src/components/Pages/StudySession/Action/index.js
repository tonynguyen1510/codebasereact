/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-19 22:53:51
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { Router } from 'src/routes';

import AuthStorage from 'src/utils/AuthStorage';

import { Form, Input, Button, TimePicker } from 'antd';

import SelectLevel from 'src/components/Form/SelectLevel';
import SelectLesson from 'src/components/Form/SelectLesson';
import SelectBranch from 'src/components/Form/SelectBranch';

import { getSessionData, createSession, updateSession } from 'src/redux/actions/session';
import { getStudentData } from 'src/redux/actions/student';

import { stylesheet, classNames } from './style.less';

const FormItem = Form.Item;

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getSessionData,
			createSession,
			getStudentData,
			updateSession,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		store: {
			sessionView: state.session.sessionView,
		},
	};
};
@Form.create()
@connect(mapStateToProps, mapDispatchToProps)

export default class StudySessionAction extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		sessionId: PropTypes.string,
		// store
		// store: PropTypes.shape({
		// 	sessionView: PropTypes.object.isRequired,
		// }).isRequired,
		// action
		action: PropTypes.shape({
			getSessionData: PropTypes.func.isRequired,
			createSession: PropTypes.func.isRequired,
			getStudentData: PropTypes.func.isRequired,
			updateSession: PropTypes.func.isRequired,
		}).isRequired,
	}
	static defaultProps = {
		sessionId: '',
	}
	state = {
		loading: false,
	}
	componentDidMount() {
		if (this.props.sessionId) {
			this.props.action.getSessionData({ id: this.props.sessionId }, (session) => {
				console.log('session', session);
				this.props.form.setFieldsValue({
					createdAt: moment(session.createdAt, 'YYYY-MM-DD'),
					name: session.name,
					branch: session.branch,
					levelName: session.levelName,
					note: session.note || '',
					startTime: moment(session.startTime, 'HH:mm'),
					endTime: moment(session.endTime, 'HH:mm'),
				});
				if (this.props.form.getFieldValue('levelName')) {
					this.props.form.setFieldsValue({
						lesson: {
							data: session.lessonData,
							key: session.lessonData.id,
							label: session.lessonData.name,
						},
					});
				}
			});
		}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('values', values);
				const { createdAt, lesson, ...rest } = values;

				this.setState({
					loading: true,
				});

				if (this.props.sessionId) {
					const data = {
						...rest,
						lessonData: lesson.data,
						lessonId: lesson.key,
					};

					data.updatedAt = new Date();
					data.id = this.props.sessionId;

					this.props.action.updateSession(data, (session) => {
						Router.pushRoute('/study-session/' + session.id);
					}, () => {
						this.setState({
							loading: false,
						});
					});
				} else {
					const data = {
						...rest,
						lessonData: lesson.data,
						lessonId: lesson.key,
						creatorId: AuthStorage.userId,
					};

					this.props.action.createSession(data, (session) => {
						Router.pushRoute('/study-session/' + session.id);
					}, () => {
						this.setState({
							loading: false,
						});
					});
				}
			}
		});
	}
	render() {
		const { form: { getFieldDecorator } } = this.props;

		return (
			<Form onSubmit={this.handleSubmit}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<FormItem
					label="Created At"
					className={classNames.formItem}
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('createdAt', {
						initialValue: moment(new Date()).format('DD-MM-YYYY'),
					})(
						<Input
							disabled
							placeholder="Created At"
						/>,
					)}
				</FormItem>
				<FormItem
					label="Name"
					className={classNames.formItem}
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: 'Please input name!' }],
					})(
						<Input
							placeholder="Name"
						/>,
					)}
				</FormItem>
				<FormItem
					label="Note"
					className={classNames.formItem}
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('note', {
						rules: [{ required: false }],
					})(
						<Input.TextArea
							rows={8}
							placeholder="Note"
						/>,
					)}
				</FormItem>

				<Form.Item
					label="Time"
					className={classNames.formItem}
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('startTime', {
						// initialValue: moment(new Date(), 'HH:mm'),
						rules: [{ required: true, message: 'Please input time!' }],
					})(
						<TimePicker format="HH:mm" minuteStep={5} />,
					)}
				</Form.Item>
				<Form.Item
					label="To"
					className={classNames.formItem}
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('endTime', {
						// initialValue: moment(new Date(), 'HH:mm'),
						rules: [{ required: true, message: 'Please input time!' }],
					})(
						<TimePicker format="HH:mm" minuteStep={5} />,
					)}
				</Form.Item>
				<Form.Item
					label="Branch"
					className={classNames.formItem}
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('branch', {
						initialValue: 'HN',
					})(
						<SelectBranch />,
					)}
				</Form.Item>
				<FormItem
					label="Level"
					className={classNames.formItem}
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('levelName', {
						rules: [{ required: true, message: 'Please input level!' }],
					})(
						<SelectLevel />,
					)}
				</FormItem>

				{
					this.props.form.getFieldValue('levelName') &&
					<FormItem
						label="Lesson"
						className={classNames.formItem}
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 8 }}
					>
						{getFieldDecorator('lesson', {
							rules: [{ required: true, message: 'Please input lesson!' }],
						})(
							<SelectLesson
								levelName={this.props.form.getFieldValue('levelName')}
							/>,
						)}
					</FormItem>
				}

				<Form.Item
					className={classNames.formItem + ' text-right'}
					wrapperCol={{ span: 8, offset: 8 }}
				>
					<Button type="primary" htmlType="submit" loading={this.state.loading}>
						Submit
					</Button>
					<Button style={{ marginLeft: 8 }} onClick={() => Router.pushRoute('/study-session')}>
						Cancel
					</Button>
				</Form.Item>
			</Form>
		);
	}
}
