/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-08 10:26:56
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Router } from 'src/routes';

import { Table, Divider, Icon, Button, DatePicker, Input } from 'antd';

import { stylesheet, classNames } from './style.less';

function mapStateToProps(state) {
	return {
		store: {
			//modal: state.modal,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		//action: bindActionCreators({
			//toggleLoginModal,
		//}, dispatch),
	};
};

const columns = [{
	title: 'Name',
	dataIndex: 'name',
}, {
	title: 'Created at',
	dataIndex: 'createdAt',
}, {
	title: 'Created by',
	dataIndex: 'createdBy',
}, {
	title: 'Action',
	key: 'action',
	width: 150,
	render: (text, record) => {
		return (
			<span>
				<Button shape="circle" icon="eye-o" onClick={() => Router.pushRoute(`/class/${record.id}`)} />
				<Divider type="vertical" />
				<Button shape="circle" icon="edit" onClick={() => Router.pushRoute(`/class/edit/${record.id}`)} />
				<Divider type="vertical" />
				<Button shape="circle" icon="ellipsis" />
			</span>
		)
	},
}];

const data = [{
	id: '1',
	name: 'John Brown',
	createdAt: '2018-02-08 10:40:46',
	createdBy: 'Đức Tiến',
}, {
	id: '2',
	name: 'Jim Green',
	createdAt: '2018-02-08 10:40:46',
	createdBy: 'Đức Tiến',
}, {
	id: '3',
	name: 'Joe Black',
	createdAt: '2018-02-08 10:40:46',
	createdBy: 'Đức Tiến',
}, {
	id: '4',
	name: 'Jim Red',
	createdAt: '2018-02-08 10:40:46',
	createdBy: 'Đức Tiến',
}];

function onChange(pagination, filters, sorter) {
	console.log('params', pagination, filters, sorter);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class ClassPage extends PureComponent {
	static propTypes = {
		// classes: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			modal: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			toggleLoginModal: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	render() {
		const {  } = this.props;

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
				<Table size="small" columns={columns} bordered dataSource={data} onChange={onChange} />
			</div>
		);
	}
}
