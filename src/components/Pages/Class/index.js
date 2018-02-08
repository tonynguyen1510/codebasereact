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

import { Table } from 'antd';

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
	filters: [{
		text: 'Joe',
		value: 'Joe',
	}, {
		text: 'Jim',
		value: 'Jim',
	}, {
		text: 'Submenu',
		value: 'Submenu',
		children: [{
			text: 'Green',
			value: 'Green',
		}, {
			text: 'Black',
			value: 'Black',
		}],
	}],
	// specify the condition of filtering result
	// here is that finding the name started with `value`
	onFilter: (value, record) => record.name.indexOf(value) === 0,
	sorter: (a, b) => a.name.length - b.name.length,
}, {
	title: 'Created at',
	dataIndex: 'createdAt',
	defaultSortOrder: 'descend',
	sorter: (a, b) => a.age - b.age,
}, {
	title: 'Created by',
	dataIndex: 'createdBy',
	filters: [{
		text: 'London',
		value: 'London',
	}, {
		text: 'New York',
		value: 'New York',
	}],
	filterMultiple: false,
	onFilter: (value, record) => record.address.indexOf(value) === 0,
	sorter: (a, b) => a.address.length - b.address.length,
}];

const data = [{
	key: '1',
	name: 'John Brown',
	createdAt: '2018-02-08 10:40:46',
	createdBy: 'Đức Tiến',
}, {
	key: '2',
	name: 'Jim Green',
	createdAt: '2018-02-08 10:40:46',
	createdBy: 'Đức Tiến',
}, {
	key: '3',
	name: 'Joe Black',
	createdAt: '2018-02-08 10:40:46',
	createdBy: 'Đức Tiến',
}, {
	key: '4',
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
				<Table columns={columns} bordered dataSource={data} onChange={onChange} />
			</div>
		);
	}
}
