/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-07 11:22:51
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, DatePicker, Input, Pagination, Select } from 'antd';

import Link from 'next/link';
import { Router } from 'src/routes';

import UserList from 'src/components/List/User';

import { stylesheet, classNames } from './style.less';

const { RangePicker } = DatePicker;
const { Search } = Input;

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

@connect(mapStateToProps, mapDispatchToProps)
export default class ConsultorPage extends Component {
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
		const { } = this.props;

		return (
			<div className={classNames.root}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

				<UserList>
					<div>
						<Search
							placeholder="input search text"
							onSearch={value => console.log(value)}
							style={{ width: 200 }}
						/>
					</div>
					<div>Created at: <RangePicker style={{ marginLeft: 10 }} /></div>
					<div>
						Gender:
						<Select defaultValue="all" style={{ marginLeft: 10 }}>
							<Select.Option value="all">All</Select.Option>
							<Select.Option value="male">Male</Select.Option>
							<Select.Option value="female">Female</Select.Option>
						</Select>
					</div>
					<Button type="primary" icon="file-add" style={{ marginRight: 10 }} onClick={() => Router.pushRoute('/consultor/new')}>Create class</Button>
				</UserList>
			</div>
		);
	}
}
