/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-21 22:13:32
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { Table, Divider, Icon, DatePicker, notification, Modal, Tabs, Button } from 'antd';

import { Router, Link } from 'src/routes';

import InputSearch from 'src/components/Form/InputSearch';
import Avatar from 'src/components/Avatar';

import { getTestingList, deleteTesting, updateTesting } from 'src/redux/actions/testing';

import { stylesheet, classNames } from './style.less';

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getTestingList,
			deleteTesting,
			updateTesting,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		store: {
			testingList: state.testing.testingList,
		},
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class TestingPage extends PureComponent {
	static propTypes = {
		// store
		store: PropTypes.shape({
			testingList: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getTestingList: PropTypes.func.isRequired,
			deleteTesting: PropTypes.func.isRequired,
			updateTesting: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	componentDidMount() {
		this.props.action.getTestingList({ filter: this.filter });
	}

	columns = [{
		title: 'Creator',
		key: 'creator',
		dataIndex: 'creator',
		width: 200,
		render: (data = {}) => {
			return (
				<Link route={'/teacher/' + data.id}>
					<a className={classNames.student}>
						<Avatar url={data.avatar} />
						<div className={classNames.name}>
							<h4>{data.fullName}</h4>
							<span>{data.email}</span>
						</div>
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
			return moment(text).format('DD-MM-YYYY');
		},
	}, {
		title: 'Time',
		render: (text, row) => {
			return moment(row.startTime).format('HH:mm') + ' - ' + moment(row.endTime).format('HH:mm');
		},
	}, {
		title: 'Level',
		dataIndex: 'levelName',
		key: 'levelName',
	}, {
		title: 'Branch',
		dataIndex: 'branch',
		key: 'branch',
	}, {
		title: 'Note',
		dataIndex: 'note',
		key: 'note',
	}, {
		title: 'Action',
		key: 'action',
		className: 'text-center',
		width: 150,
		render: (text, record) => {
			return (
				<div className={classNames.actionWrapper}>
					<div className={classNames.action}>
						<Link route={'/testing/' + record.id}>
							<a>
								<Icon type="eye-o" />
							</a>
						</Link>
					</div>
					<Divider type="vertical" />
					<div className={classNames.action}>
						<Link route={'/testing/edit/' + record.id}>
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
										this.props.action.deleteTesting(record, () => {
											notification.success({
												message: 'Congratulation',
												description: 'Delete level success!',
											});
											this.props.action.getTestingList({ filter: this.filter });
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

			this.props.action.getTestingList({ filter: this.filter });
		},
	}

	filter = {
		skip: 0,
		limit: 12,
		include: 'creator',
		where: {
			isDelete: false,
			status: Router.router && Router.router.query.status ? Router.router.query.status : 'live',
		},
	}

	handleChangeStatus = (val, record) => {
		Modal.confirm({
			title: 'Are you sure?',
			onOk: () => {
				this.props.action.updateTesting({ id: record.id, updatedAt: new Date(), status: val }, () => {
					notification.success({
						message: 'Congratulation',
						description: 'Change status success!',
					});
					this.props.action.getTestingList({ filter: this.filter });
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

		this.props.action.getTestingList({ filter: this.filter });
	}

	handleChangeSearch = (value) => {
		if (value) {
			const regex = '/' + value + '/i';

			this.filter.where.or = [
				{ levelName: { regexp: regex } },
				{ note: { regexp: regex } },
				{ creatorId: { regexp: regex } },
			];
		} else {
			delete this.filter.where.or;
		}
		this.filter.skip = 0;

		this.props.action.getTestingList({ filter: this.filter });
	}

	handleTableChange = (pagination, filters, sorter) => {
		if (sorter.order && sorter.field) {
			this.filter.order = sorter.field + ' ' + (sorter.order === 'ascend' ? 'ASC' : 'DESC');
		} else {
			delete this.filter.order;
		}
		this.filter.skip = 0;

		this.props.action.getTestingList({ filter: this.filter });
	}

	handleClickTab = (tab) => {
		this.filter.skip = 0;
		this.filter.where.status = tab;

		this.props.action.getTestingList({ filter: this.filter });

		Router.pushRoute('/testing?status=' + tab);
	}

	render() {
		const { store: { testingList } } = this.props;

		return (
			<div className={classNames.root}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<div className={classNames.control}>
					<InputSearch onChange={this.handleChangeSearch} />
					<div>Created at: <DatePicker.RangePicker style={{ marginLeft: 10 }} onChange={this.handleChangeDate} /></div>
					<div>
						<Button type="primary" icon="file-add" onClick={() => Router.pushRoute('/testing/new')}>Create Testing</Button>
					</div>
				</div>

				<Tabs onTabClick={this.handleClickTab} activeKey={Router.router && Router.router.query.status ? Router.router.query.status : 'live'}>
					<Tabs.TabPane tab="Live" key="live" />
					<Tabs.TabPane tab="Ended" key="ended" />
				</Tabs>

				<Table
					columns={this.columns}
					size="small"
					bordered
					loading={testingList.loading}
					dataSource={testingList.data}
					rowKey={(record) => record.id}
					onChange={this.handleTableChange}
					pagination={{
						...this.paginationConfig,
						total: testingList.total,
						pageSize: testingList.limit,
						current: (testingList.skip / testingList.limit) + 1,
					}}
				/>
			</div>
		);
	}
}
