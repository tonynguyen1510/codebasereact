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

import { Router } from 'src/routes';

import { Table, Divider, Icon, Button, DatePicker, Input, Modal } from 'antd';

import { stylesheet, classNames } from './style.less';

const mapDispatchToProps = {
	...ClassActionRedux
}
const mapStateToProps = (state) => {
	return {
		classList: state.classObject.classList
	}
}

function onChange(pagination, filters, sorter) {
	console.log('params', pagination, filters, sorter);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ClassPage extends PureComponent {
	static propTypes = {
		getClasses: PropTypes.func,
		classList: PropTypes.array,
		deleteClass: PropTypes.func
	}

	static defaultProps = {}
	constructor(props) {
		super(props)
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
										props.deleteClass(record, record.id)
										props.getClasses()
									}
								})
								}
							}
						/>
					</span>
				)
			},
		}]
	}
	componentDidMount() {
		this.props.getClasses()
	}

	render() {
		const { classList } = this.props;

		return (
			<div className={classNames.root}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<div className={classNames.control}>
					<div>
						<Input.Search
							placeholder="input search text"
							onSearch={value => console.log(value)}
							style={{ width: 200 }}
						/>
					</div>
					<div>Created at: <DatePicker.RangePicker style={{ marginLeft: 10 }} /></div>
					<div>
						<Button type="primary" icon="file-add" onClick={() => Router.pushRoute('/class/new')}>Create class</Button>
					</div>
				</div>
				<Table size="small" columns={this.columns} bordered dataSource={classList} onChange={onChange} />
			</div>
		);
	}
}
