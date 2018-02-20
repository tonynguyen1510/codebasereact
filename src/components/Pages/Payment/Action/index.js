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
import { formatNumber } from 'src/utils';

import { Form, Select, Input, Button, DatePicker } from 'antd';

import Avatar from 'src/components/Avatar';
import Badge from 'src/components/Badge';

import { getPaymentData, createPayment, updatePayment } from 'src/redux/actions/payment';
import { getStudentData } from 'src/redux/actions/student';

import { stylesheet, classNames } from './style.less';

const FormItem = Form.Item;

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getPaymentData,
			createPayment,
			getStudentData,
			updatePayment,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		store: {
			paymentView: state.payment.paymentView,
			studentView: state.student.studentView,
		},
	};
};
@Form.create()
@connect(mapStateToProps, mapDispatchToProps)

export default class PaymentAction extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		studentId: PropTypes.string,
		paymentId: PropTypes.string,
		// store
		store: PropTypes.shape({
			paymentView: PropTypes.object.isRequired,
			studentView: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getPaymentData: PropTypes.func.isRequired,
			createPayment: PropTypes.func.isRequired,
			getStudentData: PropTypes.func.isRequired,
			updatePayment: PropTypes.func.isRequired,
		}).isRequired,
	}
	static defaultProps = {
		studentId: '',
		paymentId: '',
	}
	state = {
		loading: false,
	}
	componentDidMount() {
		if (this.props.studentId) {
			this.props.action.getStudentData({ id: this.props.studentId });
		}
		if (this.props.paymentId) {
			this.props.action.getPaymentData({ id: this.props.paymentId, filter: { include: 'student' } }, (payment) => {
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
				const { expiredDate, conservationDate, ...rest } = values;

				this.setState({
					loading: true,
				});

				if (this.props.paymentId) {
					const data = { ...rest, rest: rest.quantity, total: (rest.quantity * rest.unitPrice) - rest.discount, expiredDate: { start: expiredDate[0], end: expiredDate[1] } };

					if (values.status === 'conservated') {
						data.conservationDate = { start: conservationDate[0], end: conservationDate[1] };
					}

					data.updatedAt = new Date();
					data.id = this.props.paymentId;

					this.props.action.updatePayment(data, () => {
						if (values.status === 'conservated') {
							Router.push('/payment?status=conservated');
						} else {
							Router.push('/payment');
						}
					}, () => {
						this.setState({
							loading: false,
						});
					});
				} else {
					const data = { ...rest, rest: rest.quantity, total: (rest.quantity * rest.unitPrice) - rest.discount, studentId: this.props.studentId, creatorId: AuthStorage.userId, expiredDate: { start: expiredDate[0], end: expiredDate[1] } };

					this.props.action.createPayment(data, () => {
						Router.push('/payment');
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
		const { form: { getFieldDecorator }, store: { studentView, paymentView }, paymentId } = this.props;

		let userData = studentView || {};

		if (paymentId) {
			userData = paymentView.student || {};
		}

		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit} style={{ margin: '100px 0' }}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

				<FormItem
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8, offset: 8 }}
				>
					<div className={classNames.student}>
						<Avatar url={userData.avatar} size="large" className={classNames.avatar} />
						<div>
							<h3>{userData.fullName}</h3>
							<Badge className={classNames.status} type={userData.status === 'studying' ? 'success' : userData.status === 'finished' ? 'warning' : userData.status === 'old' ? 'default' : userData.status === 'suspending' ? 'error' : 'info'}>
								{userData.status}
							</Badge>
						</div>
					</div>
				</FormItem>

				<FormItem
					label="Content"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('content', {
						rules: [{ required: true, message: 'Please input content!' }],
					})(
						<Input
							size="large"
							placeholder="Content"
						/>,
					)}
				</FormItem>
				<Form.Item
					label="Expired Date"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('expiredDate', {
						rules: [{ required: true, message: 'Please input expired date!' }],
					})(
						<DatePicker.RangePicker size="large" />,
					)}
				</Form.Item>

				{
					paymentId &&
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
								<Select.Option value="conservated">Conservated</Select.Option>
							</Select>,
						)}
					</FormItem>
				}


				{
					this.props.form.getFieldValue('status') === 'conservated' &&
					<Form.Item
						label="Conservation Date"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 8 }}
					>
						{getFieldDecorator('conservationDate', {
							rules: [{ required: true, message: 'Please input Conservation Date!' }],
						})(
							<DatePicker.RangePicker size="large" />,
						)}
					</Form.Item>
				}

				<FormItem
					label="Note"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('note', {
						rules: [{ required: false }],
					})(
						<Input.TextArea
							size="large"
							rows={5}
							placeholder="Note"
						/>,
					)}
				</FormItem>

				<FormItem
					label="Quantity"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('quantity', {
						rules: [{ required: true }],
					})(
						<Input
							size="large"
							type="number"
							placeholder="Quantity"
							suffix="ss"
							className={classNames.inputNumber}
						/>,
					)}
				</FormItem>

				<FormItem
					label="Unit Price"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('unitPrice', {
						rules: [{ required: true }],
					})(
						<Input
							size="large"
							type="number"
							placeholder="Unit Price"
							suffix="vnd"
							className={classNames.inputNumber}
						/>,
					)}
				</FormItem>

				<FormItem
					label="Discount"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 8 }}
				>
					{getFieldDecorator('discount', {
						initialValue: 0,
						rules: [{ required: true }],
					})(
						<Input
							size="large"
							type="number"
							placeholder="Discount"
							suffix="vnd"
							className={classNames.inputNumber}
						/>,
					)}
				</FormItem>
				<FormItem
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 10, offset: 6 }}
				>
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<div style={{ marginRight: '30px', fontSize: '30px' }}>Total:</div>
						<div style={{ fontSize: '30px' }}>
							{
								formatNumber((this.props.form.getFieldValue('quantity') * this.props.form.getFieldValue('unitPrice')) - this.props.form.getFieldValue('discount')) || 0
							} vnd
						</div>
					</div>
				</FormItem>
				<Form.Item
					style={{ marginTop: 48 }}
					wrapperCol={{ span: 8, offset: 8 }}
				>
					<Button size="large" type="primary" htmlType="submit" loading={this.state.loading}>
						Submit
					</Button>
					<Button size="large" style={{ marginLeft: 8 }} onClick={() => Router.push('/payment')}>
						Cancel
					</Button>
				</Form.Item>
			</Form>
		);
	}
}
