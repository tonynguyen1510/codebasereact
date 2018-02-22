/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-21 22:13:49
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { Table, Divider, Icon, DatePicker, notification, Modal, Tabs } from 'antd';

import { Router, Link } from 'src/routes';
import { formatNumber } from 'src/utils';

import InputSearch from 'src/components/Form/InputSearch';
import Avatar from 'src/components/Avatar';

import { getPaymentList, deletePayment, updatePayment } from 'src/redux/actions/payment';

import { stylesheet, classNames } from './style.less';

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getPaymentList,
			deletePayment,
			updatePayment,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		store: {
			paymentList: state.payment.paymentList,
		},
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PaymentPage extends PureComponent {
	static propTypes = {
		// store
		store: PropTypes.shape({
			paymentList: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getPaymentList: PropTypes.func.isRequired,
			deletePayment: PropTypes.func.isRequired,
			updatePayment: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	componentDidMount() {
		this.props.action.getPaymentList({ filter: this.filter });
	}

	columns = [{
		title: 'Student',
		key: 'student',
		dataIndex: 'student',
		width: 200,
		render: (data = {}) => {
			return (
				<Link route={'/student/' + data.id}>
					<a className={classNames.student}>
						<Avatar size="small" url={data.avatar} />
						<div>{data.fullName}</div>
					</a>
				</Link>
			);
		},
	}, {
		title: 'Created at',
		dataIndex: 'createdAt',
		key: 'createdAt',
		defaultSortOrder: 'descend',
		sorter: true,
		render: (text) => {
			return moment(text).format('DD-MM-YYYY HH:mm');
		},
	}, {
		title: Router.router && Router.router.query.status === 'conservated' ? 'Conservation Date' : 'Expired Date',
		children: [{
			title: 'Start',
			dataIndex: Router.router && Router.router.query.status === 'conservated' ? 'conservationDate.start' : 'expiredDate.start',
			key: 'start',
			render: (text) => {
				return moment(text).format('DD-MM-YYYY');
			},
		}, {
			title: 'End',
			dataIndex: Router.router && Router.router.query.status === 'conservated' ? 'conservationDate.end' : 'expiredDate.end',
			key: 'end',
			render: (text) => {
				return moment(text).format('DD-MM-YYYY');
			},
		}],
	},
	// {
	// 	title: 'Content',
	// 	dataIndex: 'content',
	// 	key: 'content',
	// 	sorter: true,
	// },
	{
		title: 'Quantity',
		dataIndex: 'quantity',
		key: 'quantity',
		sorter: true,
		render: (text) => {
			return formatNumber(text) || 0;
		},
	}, {
		title: 'Rest of session',
		dataIndex: 'rest',
		key: 'rest',
		sorter: true,
		render: (text) => {
			return formatNumber(text) || 0;
		},
	},
	// {
	// 	title: 'Unit Price',
	// 	dataIndex: 'unitPrice',
	// 	key: 'unitPrice',
	// 	sorter: true,
	// 	render: (text) => {
	// 		return text || 0 + ' vnd';
	// 	},
	// }, {
	// 	title: 'Discount',
	// 	dataIndex: 'discount',
	// 	key: 'discount',
	// 	sorter: true,
	// 	render: (text) => {
	// 		return text || 0 + ' vnd';
	// 	},
	// }, {
	// 	title: 'Total',
	// 	dataIndex: 'total',
	// 	key: 'total',
	// 	sorter: true,
	// 	render: (text) => {
	// 		return text || 0 + ' vnd';
	// 	},
	// }, {
	// 	title: 'Note',
	// 	dataIndex: 'note',
	// 	key: 'note',
	// },
	{
		title: 'Action',
		key: 'action',
		className: 'text-center',
		width: 150,
		render: (text, record) => {
			return (
				<div className={classNames.actionWrapper}>
					{/* <div className={classNames.action}>
						<Link route={'/level/' + record.id}>
							<a>
								<Icon type="eye-o" />
							</a>
						</Link>
					</div>
					<Divider type="vertical" /> */}
					<div className={classNames.action}>
						<Link route={'/payment/edit/' + record.id}>
							<a>
								<Icon type="edit" />
							</a>
						</Link>
					</div>
					<Divider type="vertical" />
					<div className={classNames.action}>
						<a
							onClick={() => {
								Modal.confirm({
									title: 'Do you want to delete these items?',
									onOk: () => {
										this.props.action.deletePayment(record, () => {
											notification.success({
												message: 'Congratulation',
												description: 'Delete level success!',
											});
											this.props.action.getPaymentList({ filter: this.filter });
										});
									},
								});
							}}
						>
							<Icon type="delete" />
						</a>
					</div>
					{/* <Divider type="vertical" />
						<div className={classNames.action}>
							<Icon type="ells" />
						</div> */}
				</div>
			);
		},
	}]

	paginationConfig = {
		total: 0,
		showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
		defaultCurrent: 1,
		onChange: (page) => {
			this.filter.skip = (page - 1) * this.filter.limit;

			this.props.action.getPaymentList({ filter: this.filter });
		},
	}

	filter = {
		skip: 0,
		limit: 12,
		include: 'student',
		where: {
			isDelete: false,
			status: Router.router && Router.router.query.status ? Router.router.query.status : 'active',
		},
	}

	handleChangeStatus = (val, record) => {
		Modal.confirm({
			title: 'Are you sure?',
			onOk: () => {
				this.props.action.updatePayment({ id: record.id, updatedAt: new Date(), status: val }, () => {
					notification.success({
						message: 'Congratulation',
						description: 'Change status success!',
					});
					this.props.action.getPaymentList({ filter: this.filter });
				});
			},
		});
	}

	handleChangeDate = (value) => {
		if (value.length === 2) {
			this.filter.where.createdAt = { between: value };
		} else {
			delete this.filter.where.createdAt;
		}
		this.filter.skip = 0;

		this.props.action.getPaymentList({ filter: this.filter });
	}

	handleChangeSearch = (value) => {
		if (value) {
			const regex = '/' + value + '/i';

			this.filter.where.or = [
				{ content: { regexp: regex } },
				{ note: { regexp: regex } },
				{ studentId: { regexp: regex } },
			];
		} else {
			delete this.filter.where.or;
		}
		this.filter.skip = 0;

		this.props.action.getPaymentList({ filter: this.filter });
	}

	handleTableChange = (pagination, filters, sorter) => {
		if (sorter.order && sorter.field) {
			this.filter.order = sorter.field + ' ' + (sorter.order === 'ascend' ? 'ASC' : 'DESC');
		} else {
			delete this.filter.order;
		}
		this.filter.skip = 0;

		this.props.action.getPaymentList({ filter: this.filter });
	}

	handleClickTab = (tab) => {
		this.filter.skip = 0;
		this.filter.where.status = tab;

		this.props.action.getPaymentList({ filter: this.filter });

		Router.pushRoute('/payment?status=' + tab);
	}

	handleExpandedRowRender = (record = {}) => {
		return (
			<div className={classNames.subTable}>
				<div className={classNames.item}>
					<div className={classNames.label}>Content:</div>
					<div className={classNames.value}>{record.content}</div>
				</div>
				<div className={classNames.item}>
					<div className={classNames.label}>Note:</div>
					<div className={classNames.value}>{record.note}</div>
				</div>
				<div className={classNames.item}>
					<div className={classNames.label}>Quantity:</div>
					<div className={classNames.value}>{formatNumber(record.quantity) || 0}</div>
				</div>
				<div className={classNames.item}>
					<div className={classNames.label}>Unit Price:</div>
					<div className={classNames.value}>{(formatNumber(record.unitPrice) || 0) + ' vnd'}</div>
				</div>
				<div className={classNames.item}>
					<div className={classNames.label}>Discount:</div>
					<div className={classNames.value}>{(formatNumber(record.discount) || 0) + ' vnd'}</div>
				</div>
				<div className={classNames.item}>
					<div className={classNames.label}>Total:</div>
					<div className={classNames.value}>{(formatNumber(record.total) || 0) + ' vnd'}</div>
				</div>
			</div>
		);
	}

	render() {
		const { store: { paymentList } } = this.props;

		return (
			<div className={classNames.root}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<div className={classNames.control}>
					<InputSearch onChange={this.handleChangeSearch} />
					<div>Created at: <DatePicker.RangePicker style={{ marginLeft: 10 }} onChange={this.handleChangeDate} /></div>
					{/* <div>
						<Button type="primary" icon="file-add" onClick={() => Router.pushRoute('/payment/new')}>Create Payment</Button>
					</div> */}
				</div>

				<Tabs onTabClick={this.handleClickTab} activeKey={Router.router && Router.router.query.status ? Router.router.query.status : 'active'}>
					<Tabs.TabPane tab="Active" key="active" />
					<Tabs.TabPane tab="Almost Expired" key="almostExpired" />
					<Tabs.TabPane tab="Expired" key="expired" />
					<Tabs.TabPane tab="Conservated" key="conservated" />
				</Tabs>

				<Table
					columns={this.columns}
					size="small"
					bordered
					loading={paymentList.loading}
					dataSource={paymentList.data}
					rowKey={(record) => record.id}
					onChange={this.handleTableChange}
					expandedRowRender={this.handleExpandedRowRender}
					pagination={{
						...this.paginationConfig,
						total: paymentList.total,
						pageSize: paymentList.limit,
						current: (paymentList.skip / paymentList.limit) + 1,
					}}
				/>
			</div>
		);
	}
}
