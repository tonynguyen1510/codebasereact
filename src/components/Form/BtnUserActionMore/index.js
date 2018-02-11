/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-11 10:23:26
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Menu, Dropdown, Icon } from 'antd';

const menu = (
	<Menu>
		<Menu.Item key="0">
			Deactivate Account
		</Menu.Item>
		<Menu.Item key="1">
			Resend Invitation
		</Menu.Item>
	</Menu>
);

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

const BtnUserActionMore = (props) => {
	const {  } = props;

	return (
		<Dropdown overlay={menu} trigger={['click']}>
			<a className="ant-dropdown-link" href="#">
				<Icon type="ellipsis" />
			</a>
		</Dropdown>
	);
};

BtnUserActionMore.propTypes = {
	// classes: PropTypes.object.isRequired,
	// store
	store: PropTypes.shape({
		modal: PropTypes.object.isRequired,
	}).isRequired,
	// action
	action: PropTypes.shape({
		toggleLoginModal: PropTypes.func.isRequired,
	}).isRequired,
};

BtnUserActionMore.defaultProps = {
	// classes: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(BtnUserActionMore);
