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

import { getSessionDetailList, deleteSessionDetail, updateSessionDetail } from 'src/redux/actions/sessionDetail';

import BtnAddStudent from '../BtnAddStudent';
import BtnAddComment from '../BtnAddComment';

import { stylesheet, classNames } from './style.less';

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getSessionDetailList,
			deleteSessionDetail,
			updateSessionDetail,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		store: {
			sessionDetailList: state.sessionDetail.sessionDetailList,
		},
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class StudentList extends PureComponent {
	static propTypes = {
		sessionData: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			sessionDetailList: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getSessionDetailList: PropTypes.func.isRequired,
			deleteSessionDetail: PropTypes.func.isRequired,
			updateSessionDetail: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	componentDidMount() {
		this.props.action.getSessionDetailList({ filter: this.filter });
	}

	columns = [{
		title: 'Student',
		dataIndex: 'studentData',
		key: 'studentData',
		sorter: true,
		width: 200,
		className: 'text-left',
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
		title: 'Home Work',
		dataIndex: 'homework',
		key: 'homework',
		className: 'text-left',
		width: 150,
		sorter: true,
		render: (text, record) => {
			return (
				<Select value={text || 'done'} style={{ width: 130 }} onChange={(val) => this.handleChangeStatus(val, record)}>
					<Select.Option value="done">Done</Select.Option>
					<Select.Option value="incomplete">Incomplete</Select.Option>
					<Select.Option value="notDone">Not Done</Select.Option>
				</Select>
			);
		},
		filters: [
			{ text: 'Done', value: 'done' },
			{ text: 'Incomplete', value: 'incomplete' },
			{ text: 'Not Done', value: 'notDone' },
		],
	}, {
		title: 'Comment',
		dataIndex: 'comment',
		key: 'comment',
		width: 200,
		className: 'text-left',
	}, {
		title: 'Action',
		key: 'action',
		className: 'text-center',
		width: 150,
		render: (text, record) => {
			return (
				<div className={classNames.actionWrapper}>
					<div className={classNames.action}>
						<BtnAddComment sessionDetailData={record} onAfterAdd={this.handleAfterAdd} />
					</div>
					<Divider type="vertical" />
					<div className={classNames.action}>
						<a
							onClick={() => {
								Modal.confirm({
									title: 'Do you want to delete these items?',
									onOk: () => {
										this.props.action.deleteSessionDetail(record, () => {
											notification.success({
												message: 'Congratulation',
												description: 'Delete level success!',
											});
											this.props.action.getSessionDetailList({ filter: this.filter });
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

			this.props.action.getSessionDetailList({ filter: this.filter });
		},
	}

	filter = {
		skip: 0,
		limit: 12,
		where: {
			isDelete: false,
			sessionId: this.props.sessionData.id,
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

		this.props.action.getSessionDetailList({ filter: this.filter });
	}

	handleAfterAdd = () => {
		this.filter.skip = 0;

		this.props.action.getSessionDetailList({ filter: this.filter });
	}

	handleChangeStatus = (val, record) => {
		Modal.confirm({
			title: 'Are you sure?',
			onOk: () => {
				this.props.action.updateSessionDetail({ id: record.id, updatedAt: new Date(), homework: val }, () => {
					notification.success({
						message: 'Congratulation',
						description: 'Change homework status success!',
					});
					this.props.action.getSessionDetailList({ filter: this.filter });
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

		this.props.action.getSessionDetailList({ filter: this.filter });
	}

	render() {
		const { store: { sessionDetailList }, sessionData } = this.props;

		return (
			<div className={classNames.root}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<h3>Student List:</h3>
				<div className={classNames.control}>
					<InputSearch onChange={this.handleChangeSearch} style={{ flex: 1, marginRight: 15 }} />
					<div>
						<BtnAddStudent sessionData={sessionData} onAfterAdd={this.handleAfterAdd} />
					</div>
				</div>
				<Table
					columns={this.columns}
					size="small"
					loading={sessionDetailList.loading}
					dataSource={sessionDetailList.data}
					rowKey={(record) => record.id}
					onChange={this.handleTableChange}
					pagination={{
						...this.paginationConfig,
						total: sessionDetailList.total,
						pageSize: sessionDetailList.limit,
						current: (sessionDetailList.skip / sessionDetailList.limit) + 1,
					}}
				/>
			</div>
		);
	}
}
