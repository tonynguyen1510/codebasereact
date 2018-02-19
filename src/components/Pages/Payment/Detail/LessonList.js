/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-19 01:28:41
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { Table, Divider, Icon, Button, DatePicker, notification, Modal, Select } from 'antd';

import { Router, Link } from 'src/routes';

import InputSearch from 'src/components/Form/InputSearch';
import SelectLevel from 'src/components/Form/SelectLevel';

import { getLessons, deleteLesson, upsertLesson } from 'src/redux/actions/lesson';

import { stylesheet, classNames } from './style.less';

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getLessons,
			deleteLesson,
			upsertLesson,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		store: {
			lessonList: state.lesson.lessonList,
		},
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class LessonList extends PureComponent {
	static propTypes = {
		levelData: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			lessonList: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getLessons: PropTypes.func.isRequired,
			deleteLesson: PropTypes.func.isRequired,
			upsertLesson: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	componentDidMount() {
		this.props.action.getLessons({ filter: this.filter });
	}

	columns = [{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		sorter: true,
	}, {
		title: 'Description',
		dataIndex: 'desc',
		key: 'desc',
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
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		className: 'text-center',
		width: 130,
		sorter: true,
		render: (text, record) => {
			return (
				<Select value={text} style={{ width: 100 }} onChange={(val) => this.handleChangeStatus(val, record)}>
					<Select.Option value="active">Active</Select.Option>
					<Select.Option value="inactive">Inactive</Select.Option>
				</Select>
			);
		},
		filters: [
			{ text: 'Active', value: 'active' },
			{ text: 'Inactive', value: 'inactive' },
		],
	}, {
		title: 'Action',
		key: 'action',
		className: 'text-center',
		width: 150,
		render: (text, record) => {
			return (
				<div className={classNames.actionWrapper}>
					<div className={classNames.action}>
						<Link route={'/lesson/edit/' + record.id}>
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
										this.props.action.deleteLesson(record, () => {
											notification.success({
												message: 'Congratulation',
												description: 'Delete level success!',
											});
											this.props.action.getLessons({ filter: this.filter });
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

			this.props.action.getLessons({ filter: this.filter });
		},
	}

	filter = {
		skip: 0,
		limit: 12,
		where: {
			isDelete: false,
			levelName: this.props.levelData.name,
		},
	}

	handleChangeStatus = (val, record) => {
		Modal.confirm({
			title: 'Are you sure?',
			onOk: () => {
				this.props.action.upsertLesson({ id: record.id, updatedAt: new Date(), status: val }, () => {
					notification.success({
						message: 'Congratulation',
						description: 'Change status success!',
					});
					this.props.action.getLessons({ filter: this.filter });
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

		this.props.action.getLessons({ filter: this.filter });
	}

	handleChangeSearch = (value) => {
		if (value) {
			const regex = '/' + value + '/i';

			this.filter.where.or = [
				{ name: { regexp: regex } },
				{ desc: { regexp: regex } },
			];
		} else {
			delete this.filter.where.or;
		}
		this.filter.skip = 0;

		this.props.action.getLessons({ filter: this.filter });
	}

	handleChangeLevel = (value) => {
		if (value) {
			this.filter.where.levelName = value;
		} else {
			delete this.filter.where.levelName;
		}
		this.filter.skip = 0;

		this.props.action.getLessons({ filter: this.filter });
	}

	handleTableChange = (pagination, filters, sorter) => {
		if (filters.status && filters.status.length > 0) {
			this.filter.where.status = { inq: filters.status };
		} else {
			delete this.filter.where.status;
		}

		if (sorter.order && sorter.field) {
			this.filter.order = sorter.field + ' ' + (sorter.order === 'ascend' ? 'ASC' : 'DESC');
		} else {
			delete this.filter.order;
		}
		this.filter.skip = 0;

		this.props.action.getLessons({ filter: this.filter });
	}

	render() {
		const { store: { lessonList }, levelData } = this.props;

		return (
			<div className={classNames.tableWrapper}>
				<h3>List Lessons</h3>
				<div className={classNames.control}>
					<InputSearch onChange={this.handleChangeSearch} />
					<div>Created at: <DatePicker.RangePicker style={{ marginLeft: 10 }} onChange={this.handleChangeDate} /></div>
					<div>
						<Button type="primary" icon="file-add" onClick={() => Router.pushRoute('/level/' + levelData.id + '/add-lesson?levelName=' + levelData.name)}>Add Lesson</Button>
					</div>
				</div>
				<Table
					columns={this.columns}
					size="small"
					loading={lessonList.loading}
					dataSource={lessonList.data}
					rowKey={(record) => record.id}
					onChange={this.handleTableChange}
					pagination={{
						...this.paginationConfig,
						total: lessonList.total,
						pageSize: lessonList.limit,
						current: (lessonList.skip / lessonList.limit) + 1,
					}}
				/>
			</div>
		);
	}
}
