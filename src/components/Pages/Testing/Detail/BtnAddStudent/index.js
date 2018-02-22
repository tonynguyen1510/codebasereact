/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-22 04:54:22
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { Modal, Button, Table } from 'antd';

import { Link } from 'src/routes';

import AuthStorage from 'src/utils/AuthStorage';

import InputSearch from 'src/components/Form/InputSearch';
import Avatar from 'src/components/Avatar';

import { getStudentList } from 'src/redux/actions/student';
import { createTestingDetail, getTestingDetailIdList } from 'src/redux/actions/testingDetail';

import { stylesheet, classNames } from './style.less';

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getStudentList,
			createTestingDetail,
			getTestingDetailIdList,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		store: {
			studentList: state.student.studentList,
		},
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class BtnAddStudent extends PureComponent {
	static propTypes = {
		testingData: PropTypes.object.isRequired,
		onAfterAdd: PropTypes.func,
		// store
		store: PropTypes.shape({
			studentList: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getStudentList: PropTypes.func.isRequired,
			createTestingDetail: PropTypes.func.isRequired,
			getTestingDetailIdList: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		onAfterAdd: f => f,
	}

	state = {
		visible: false,
		confirmLoading: false,
		selectedRowKeys: [],
		selectedRowsMap: {},
	}

	columns = [{
		title: 'Name',
		dataIndex: 'fullName',
		key: 'fullName',
		sorter: true,
		width: 200,
		className: 'text-left',
		render: (text, data = {}) => {
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
		title: 'Gender',
		dataIndex: 'gender',
		key: 'gender',
		sorter: true,
	}, {
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
		sorter: true,
	}, {
		title: 'Email 2',
		dataIndex: 'email2',
		key: 'email2',
		sorter: true,
	}, {
		title: 'Phone',
		dataIndex: 'phone',
		key: 'phone',
		sorter: true,
	}, {
		title: 'Phone 2',
		dataIndex: 'phone2',
		key: 'phone2',
		sorter: true,
	}, {
		title: 'Birth Date',
		dataIndex: 'birthDate',
		key: 'birthDate',
		render: (text) => {
			return moment(text).format('DD-MM-YYYY');
		},
	}]

	paginationConfig = {
		total: 0,
		showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
		defaultCurrent: 1,
		onChange: (page) => {
			this.filter.skip = (page - 1) * this.filter.limit;

			this.props.action.getStudentList({ filter: this.filter });
		},
	}

	filter = {
		skip: 0,
		limit: 2,
		where: {
			status: 'studying',
			levelName: this.props.testingData.levelName,
			branch: this.props.testingData.branch,
		},
	}

	rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			const { selectedRowsMap } = this.state;

			selectedRows.forEach(row => {
				selectedRowsMap[row.id] = row;
			});

			this.setState({
				selectedRowKeys,
				selectedRowsMap,
			});
		},
	}

	handleChangeSearch = (value) => {
		if (value) {
			const regex = '/' + value + '/i';

			this.filter.where.or = [
				{ fullName: { regexp: regex } },
				{ gender: { regexp: regex } },
				{ phone: { regexp: regex } },
				{ phone2: { regexp: regex } },
				{ email: { regexp: regex } },
				{ email2: { regexp: regex } },
				{ address: { regexp: regex } },
				{ desc: { regexp: regex } },
			];
		} else {
			delete this.filter.where.or;
		}
		this.filter.skip = 0;

		this.props.action.getStudentList({ filter: this.filter });
	}

	handleShowModal = () => {
		this.props.action.getTestingDetailIdList({ filter: {
			skip: 0,
			limit: 1000,
			fields: ['id', 'studentId'],
			where: {
				sessionId: this.props.testingData.id,
				isDelete: false,
			},
		} }, (listDetail) => {
			const idList = listDetail.data.map((el) => {
				return el.studentId;
			});
			this.filter = {
				skip: 0,
				limit: 2,
				where: {
					id: { nin: idList },
					status: 'studying',
					levelName: this.props.testingData.levelName,
					branch: this.props.testingData.branch,
				},
			};

			this.props.action.getStudentList({ filter: this.filter });
			this.setState({
				visible: true,
				confirmLoading: false,
			});
		});
	}
	handleOk = () => {
		const { selectedRowKeys, selectedRowsMap } = this.state;

		const data = selectedRowKeys.map((row) => {
			return {
				studentData: selectedRowsMap[row],
				studentId: row,
				testingId: this.props.testingData.id,
				creatorId: AuthStorage.userId,
			};
		});

		if (data.length > 0) {
			this.setState({
				confirmLoading: true,
			});

			this.props.action.createTestingDetail(data, () => {
				this.props.onAfterAdd();
				this.setState({
					visible: false,
				});
			}, () => {
				this.setState({
					confirmLoading: false,
				});
			});
		} else {
			this.setState({
				visible: false,
			});
		}
	}
	handleCancel = () => {
		this.setState({
			visible: false,
		});
	}

	handleTableChange = (pagination, filters, sorter) => {
		if (sorter.order && sorter.field) {
			this.filter.order = sorter.field + ' ' + (sorter.order === 'ascend' ? 'ASC' : 'DESC');
		} else {
			delete this.filter.order;
		}
		this.filter.skip = 0;

		this.props.action.getStudentList({ filter: this.filter });
	}

	render() {
		const { store: { studentList } } = this.props;

		return (
			<div>
				<Button type="primary" icon="file-add" onClick={this.handleShowModal}>Add student</Button>
				<Modal
					title="Add Student"
					visible={this.state.visible}
					confirmLoading={this.state.confirmLoading}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					okText={'Add ' + this.state.selectedRowKeys.length + ' student'}
					width="90%"
					maskClosable={false}
					destroyOnClose
				>
					<div className={classNames.root + ' hidden-check-all'}>
						<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
						<div className={classNames.control}>
							<InputSearch onChange={this.handleChangeSearch} style={{ flex: 1 }} />
						</div>
						<Table
							columns={this.columns}
							size="small"
							loading={studentList.loading}
							dataSource={studentList.data}
							rowKey={(record) => record.id}
							onChange={this.handleTableChange}
							rowSelection={this.rowSelection}
							pagination={{
								...this.paginationConfig,
								total: studentList.total,
								pageSize: studentList.limit,
								current: (studentList.skip / studentList.limit) + 1,
							}}
						/>
					</div>
				</Modal>
			</div>
		);
	}
}
