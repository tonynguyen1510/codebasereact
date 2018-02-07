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

import { Breadcrumb, Icon } from 'antd';
import Link from 'next/link';

import UserList from 'src/components/List/User';

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

@connect(mapStateToProps, mapDispatchToProps)
export default class StudentPage extends Component {
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
				<Breadcrumb style={{ margin: '5px 0 15px 5px' }}>
					<Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
					<Link href="/student">
						<a>Student</a>
					</Link>
				</Breadcrumb>

				<UserList />
			</div>
		);
	}
}
