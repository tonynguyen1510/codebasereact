/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-18 10:27:35
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Table, Divider, Icon, notification, Modal, Select } from 'antd';

import { Link } from 'src/routes';

import InputSearch from 'src/components/Form/InputSearch';
import Avatar from 'src/components/Avatar';

import { getTestingDetailList, deleteTestingDetail, updateTestingDetail } from 'src/redux/actions/testingDetail';

import BtnAddStudent from '../BtnAddStudent';
import BtnAddComment from '../BtnAddComment';

import { stylesheet, classNames } from './style.less';

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getTestingDetailList,
			deleteTestingDetail,
			updateTestingDetail,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		store: {
			testingDetailList: state.sessionDetail.testingDetailList,
		},
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class StudentList extends PureComponent {
	static propTypes = {
		testingData: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			testingDetailList: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getTestingDetailList: PropTypes.func.isRequired,
			deleteTestingDetail: PropTypes.func.isRequired,
			updateTestingDetail: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	componentDidMount() {
		this.props.action.getTestingDetailList({ filter: this.filter });
	}

	columns = [{
		title: 'Student',
		dataIndex: 'studentData.fullName',
		key: 'studentData.fullName',
		sorter: true,
		width: 200,
		className: 'text-left',
		render: (text, data = {}) => {
			return (
				<Link route={'/student/' + data.studentData.id}>
					<a className={classNames.student}>
						<Avatar size="small" url={data.studentData.avatar} />
						<div>{data.studentData.fullName}</div>
					</a>
				</Link>
			);
		},
	}, {
		title: 'Email',
		dataIndex: 'studentData',
		key: 'email',
		className: 'text-left',
		render: (data = {}) => {
			return (
				<div>
					<div>{data.email || '-'}</div>
					<div>{data.email2 || '-'}</div>
				</div>
			);
		},
	}, {
		title: 'Phone',
		dataIndex: 'studentData',
		key: 'phone',
		className: 'text-left',
		render: (data = {}) => {
			return (
				<div>
					<div>{data.phone || '-'}</div>
					<div>{data.phone2 || '-'}</div>
				</div>
			);
		},
	}, {
		title: 'Comment',
		dataIndex: 'comment',
		key: 'comment',
		width: 200,
		className: 'text-left',
	}, {
		title: 'Result',
		dataIndex: 'result',
		key: 'result',
		className: 'text-right',
	}, {
		title: 'Action',
		key: 'action',
		className: 'text-center',
		width: 150,
		render: (text, record) => {
			return (
				<div className={classNames.actionWrapper}>
					<div className={classNames.action}>
						<BtnAddComment testingDetailData={record} onAfterAdd={this.handleAfterAdd} />
					</div>
					<Divider type="vertical" />
					<div className={classNames.action}>
						<a
							onClick={() => {
								Modal.confirm({
									title: 'Do you want to delete these items?',
									onOk: () => {
										this.props.action.deleteTestingDetail(record, () => {
											notification.success({
												message: 'Congratulation',
												description: 'Delete level success!',
											});
											this.props.action.getTestingDetailList({ filter: this.filter });
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

			this.props.action.getTestingDetailList({ filter: this.filter });
		},
	}

	filter = {
		skip: 0,
		limit: 12,
		where: {
			isDelete: false,
			sessionId: this.props.testingData.id,
		},
	}

	handleChangeSearch = (value) => {
		if (value) {
			const regex = '/' + value + '/i';

			this.filter.where.or = [
				{ comment: { regexp: regex } },
				{ 'studentData.fullName': { regexp: regex } },
				{ 'studentData.email': { regexp: regex } },
				{ 'studentData.email2': { regexp: regex } },
				{ 'studentData.phone': { regexp: regex } },
				{ 'studentData.phone2': { regexp: regex } },
				{ 'studentData.id': { regexp: regex } },
			];
		} else {
			delete this.filter.where.or;
		}
		this.filter.skip = 0;

		this.props.action.getTestingDetailList({ filter: this.filter });
	}

	handleAfterAdd = () => {
		this.filter.skip = 0;

		this.props.action.getTestingDetailList({ filter: this.filter });
	}

	handleChangeStatus = (val, record) => {
		Modal.confirm({
			title: 'Are you sure?',
			onOk: () => {
				this.props.action.updateTestingDetail({ id: record.id, updatedAt: new Date(), homework: val }, () => {
					notification.success({
						message: 'Congratulation',
						description: 'Change homework status success!',
					});
					this.props.action.getTestingDetailList({ filter: this.filter });
				});
			},
		});
	}

	handleTableChange = (pagination, filters, sorter) => {
		if (filters.homework && filters.homework.length > 0) {
			this.filter.where.homework = { inq: filters.homework };
		} else {
			delete this.filter.where.homework;
		}

		if (sorter.order && sorter.field) {
			this.filter.order = sorter.field + ' ' + (sorter.order === 'ascend' ? 'ASC' : 'DESC');
		} else {
			delete this.filter.order;
		}
		this.filter.skip = 0;

		this.props.action.getTestingDetailList({ filter: this.filter });
	}

	render() {
		const { store: { testingDetailList }, testingData } = this.props;

		return (
			<div className={classNames.root}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<h3>Student List:</h3>
				<div className={classNames.control}>
					<InputSearch onChange={this.handleChangeSearch} style={{ flex: 1, marginRight: 15 }} />
					<div>
						<BtnAddStudent testingData={testingData} onAfterAdd={this.handleAfterAdd} />
					</div>
				</div>
				<Table
					columns={this.columns}
					size="small"
					loading={testingDetailList.loading}
					dataSource={testingDetailList.data}
					rowKey={(record) => record.id}
					onChange={this.handleTableChange}
					pagination={{
						...this.paginationConfig,
						total: testingDetailList.total,
						pageSize: testingDetailList.limit,
						current: (testingDetailList.skip / testingDetailList.limit) + 1,
					}}
				/>
			</div>
		);
	}
}
