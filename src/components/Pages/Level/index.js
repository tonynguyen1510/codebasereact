/*--------------------------------------------------------
 * Author Ngo An Ninh
 * Email ninh.uit@gmail.com
 * Phone 0978 108 807
 *
 * Created: 2018-01-10 23:20:59
 *-------------------------------------------------------*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as LevelActionRedux from 'src/redux/actions/level';
import { bindActionCreators } from 'redux';
import InputSearch from 'src/components/Form/InputSearch';
import { Router } from 'src/routes';

import { Table, Divider, Icon, Button, DatePicker, Input, Modal, Pagination } from 'antd';

import { stylesheet, classNames } from './style.less';

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			...LevelActionRedux,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		levelList: state.level.levelList,
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class LevelPage extends PureComponent {
	static propTypes = {
		levelList: PropTypes.array.isRequired,
		action: PropTypes.func.isRequired,
	}

	static defaultProps = {}
	constructor(props) {
		super(props);
		const _this = this;
		this.columns = [{
			title: 'Name',
			dataIndex: 'name',
		}, {
			title: 'Description',
			dataIndex: 'desc',
		}, {
			title: 'Status',
			dataIndex: 'status',
		}, {
			title: 'Created at',
			dataIndex: 'createdAt',
		}, {
			title: 'Action',
			key: 'action',
			width: 150,
			render: (text, record) => {
				return (
					<span>
						<Button shape="circle" icon="edit" onClick={() => Router.pushRoute(`/level/edit/${record.id}`)} />
						<Divider type="vertical" />
						<Button
							shape="circle"
							icon="delete"
							onClick={() => {
								Modal.confirm({
									title: 'Do you want to delete these items?',
									onOk() {
										props.action.deleteLevel(record, record.id, _this.getLevels);
									},
								});
							}
							}
						/>
					</span>
				);
			},
		}];
		this.paginationConfig = {
			total: 0,
			showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
			defaultCurrent: 1,
			onChange: (page) => _this.getLevels(page - 1),
		};
	}
	componentDidMount() {
		this.getLevels();
	}
	getLevels = (page) => {
		const cpage = page || 0;
		this.filter.skip = cpage * this.filter.limit;
		const curFilter = {
			skip: this.filter.skip,
			limit: this.filter.limit,
			where: {
				and: [
					{
						isDelete: {
							neq: true,
						},
					},
					{
						or: [
							{ desc: { like: this.filter.filterText } },
							{ name: { like: this.filter.filterText } },
							{ status: { eq: this.filter.filterText } },
						],
					},
				],
			},
		};
		if (this.filter.startDate !== '' && this.filter.endDate !== '') {
			curFilter.where.and.push({ createdAt: { gte: this.filter.startDate } });
			curFilter.where.and.push({ createdAt: { lte: this.filter.endDate } });
		}
		this.props.action.getLevels(curFilter);
	};
	changeFilter = (value) => {
		this.filter.filterText = value;
		this.getLevels();
	};
	changeDateRange = (momentdata, dateString) => {
		[this.filter.startDate, this.filter.endDate] = dateString;
		this.getLevels();
	}
	filter = {
		filterText: '',
		startDate: '',
		endDate: '',
		skip: 0,
		limit: 12,
	};

	render() {
		const { levelList } = this.props;
		return (
			<div className={classNames.root}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<div className={classNames.control}>
					<InputSearch onChange={(value) => this.changeFilter(value)} />
					<div>Created at: <DatePicker.RangePicker style={{ marginLeft: 10 }} onChange={(momentdata, dateString) => this.changeDateRange(momentdata, dateString)} /></div>
					<div>
						<Button type="primary" icon="file-add" onClick={() => Router.pushRoute('/level/new')}>Create Level</Button>
					</div>
				</div>
				<Table
					size="small"
					columns={this.columns}
					bordered
					dataSource={levelList.data}
					pagination={{
						...this.paginationConfig,
						total: levelList.total,
						pageSize: levelList.limit,
						current: (levelList.skip / levelList.limit) + 1,
					}}
				/>
			</div>
		);
	}
}
