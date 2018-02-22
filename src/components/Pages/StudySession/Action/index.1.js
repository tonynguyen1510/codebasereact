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

import Router from 'next/router';

import AuthStorage from 'src/utils/AuthStorage';

import { Form, Input, Button, Row, Col, TimePicker } from 'antd';

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
		studentId: PropTypes.string,
		paymentId: PropTypes.string,
		// store
		store: PropTypes.shape({
			sessionView: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getSessionData: PropTypes.func.isRequired,
			createSession: PropTypes.func.isRequired,
			getStudentData: PropTypes.func.isRequired,
			updateSession: PropTypes.func.isRequired,
		}).isRequired,
	}
	static defaultProps = {
		studentId: '',
		paymentId: '',
	}
	state = {
		loading: false,
		created: false,
	}
	componentDidMount() {
		if (this.props.studentId) {
			this.props.action.getStudentData({ id: this.props.studentId });
		}
		if (this.props.paymentId) {
			this.props.action.getSessionData({ id: this.props.paymentId, filter: { include: 'student' } }, (payment) => {
				this.props.form.setFieldsValue({
					content: payment.content || '',
					status: payment.status || 'active',
					note: payment.note || '',
					expiredDate: [moment(payment.expiredDate.start, 'YYYY-MM-DD'), moment(payment.expiredDate.end, 'YYYY-MM-DD')],
					quantity: payment.quantity || 0,
					unitPrice: payment.unitPrice || 0,
					discount: payment.discount || 0,
				});

				if (payment.status === 'conservated') {
					this.props.form.setFieldsValue({
						conservationDate: [moment(payment.conservationDate.start, 'YYYY-MM-DD'), moment(payment.conservationDate.end, 'YYYY-MM-DD')],
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

				if (this.props.paymentId) {
					// const data = { ...rest, rest: rest.quantity, total: (rest.quantity * rest.unitPrice) - rest.discount, expiredDate: { start: expiredDate[0], end: expiredDate[1] } };

					// if (values.status === 'conservated') {
					// 	data.conservationDate = { start: conservationDate[0], end: conservationDate[1] };
					// }

					// data.updatedAt = new Date();
					// data.id = this.props.paymentId;

					// this.props.action.updateSession(data, () => {
					// 	if (values.status === 'conservated') {
					// 		Router.push('/payment?status=conservated');
					// 	} else {
					// 		Router.push('/payment');
					// 	}
					// }, () => {
					// 	this.setState({
					// 		loading: false,
					// 	});
					// });
				} else {
					const data = {
						...rest,
						lessonData: lesson.data,
						lessionId: lesson.key,
						creatorId: AuthStorage.userId,
					};

					this.props.action.createSession(data, () => {
						// Router.push('/payment');
						this.setState({
							loading: false,
							created: true,
						});
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
		const { form: { getFieldDecorator }, store: { sessionView }, paymentId } = this.props;

		return (
			<div>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<Form onSubmit={this.handleSubmit} className={classNames.session}>
					<h3 style={{ marginBottom: 30 }}>Information:</h3>
					<Row gutter={48}>
						<Col span={12}>
							<FormItem
								label="Created At"
								className={classNames.formItem}
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 18 }}
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
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 18 }}
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
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 18 }}
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
						</Col>

						<Col span={12}>
							<Form.Item
								label="Time"
								className={classNames.formItem}
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 18 }}
							>
								{getFieldDecorator('startTime', {
									initialValue: moment(new Date(), 'HH:mm'),
									rules: [{ required: true, message: 'Please input time!' }],
								})(
									<TimePicker format="HH:mm" />,
								)}
							</Form.Item>
							<Form.Item
								label="To"
								className={classNames.formItem}
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 18 }}
							>
								{getFieldDecorator('endTime', {
									initialValue: moment(new Date(), 'HH:mm'),
									rules: [{ required: true, message: 'Please input time!' }],
								})(
									<TimePicker format="HH:mm" />,
								)}
							</Form.Item>
							<Form.Item
								label="Branch"
								className={classNames.formItem}
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 18 }}
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
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 18 }}
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
									labelCol={{ span: 6 }}
									wrapperCol={{ span: 18 }}
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
								wrapperCol={{ span: 18, offset: 6 }}
							>
								<Button type="primary" htmlType="submit" loading={this.state.loading}>
									Submit
								</Button>
								<Button style={{ marginLeft: 8 }} onClick={() => Router.push('/payment')}>
									Cancel
								</Button>
							</Form.Item>

						</Col>
					</Row>

				</Form>

				{
					this.state.created &&
					<StudentList sessionData={sessionView} />
				}
			</div>
		);
	}
}
