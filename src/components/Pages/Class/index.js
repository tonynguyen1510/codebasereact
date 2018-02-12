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
import * as ClassActionRedux from '../../../redux/actions/class';
import { bindActionCreators } from 'redux';
import InputSearch from 'src/components/Form/InputSearch'
import { Router } from 'src/routes';

import { Table, Divider, Icon, Button, DatePicker, Input, Modal, Pagination } from 'antd';

import { stylesheet, classNames } from './style.less';

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			...ClassActionRedux,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		classList: state.classObject.classList,
		filter: state.classObject.filter,
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ClassPage extends PureComponent {
	static propTypes = {
		classList: PropTypes.array.isRequired,
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
						<Button shape="circle" icon="edit" onClick={() => Router.pushRoute(`/class/edit/${record.id}`)} />
						<Divider type="vertical" />
						<Button
							shape="circle"
							icon="delete"
							onClick={() => {
								Modal.confirm({
									title: 'Do you want to delete these items?',
									onOk() {
										props.action.deleteClass(record, record.id, _this.getClasses);
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
			onChange: (page) => _this.getClasses(page - 1),
		};
	}
	componentDidMount() {
		this.getClasses();
	}
	getClasses = (page) => {
		const cpage = page || 0;
		this.filter.skip = cpage * this.filter.limit;
		const curFilter = {
			skip: this.filter.skip,
			limit: this.filter.limit,
			where: {
				and: [
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
		this.props.action.getClasses(curFilter);
	};
	changeFilter = (value) => {
		this.filter.filterText = value;
		this.getClasses();
	};
	changeDateRange = (momentdata, dateString) => {
		[this.filter.startDate, this.filter.endDate] = dateString;
		this.getClasses();
	}
	filter = {
		filterText: '',
		startDate: '',
		endDate: '',
		skip: 0,
		limit: 12,
	};

	render() {
		const { classList } = this.props;
		return (
			<div className={classNames.root}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<div className={classNames.control}>
					<InputSearch onChange={(value) => this.changeFilter(value)} />
					<div>Created at: <DatePicker.RangePicker style={{ marginLeft: 10 }} onChange={(momentdata, dateString) => this.changeDateRange(momentdata, dateString)} /></div>
					<div>
						<Button type="primary" icon="file-add" onClick={() => Router.pushRoute('/class/new')}>Create class</Button>
					</div>
				</div>
				<Table
					size="small"
					columns={this.columns}
					bordered
					dataSource={classList.data}
					pagination={{
						...this.paginationConfig,
						total: classList.total,
						pageSize: classList.limit,
						current: (classList.skip / classList.limit) + 1,
					}}
				/>
			</div>
		);
	}
}
