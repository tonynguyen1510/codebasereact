/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-15 14:06:48
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthStorage from 'src/utils/AuthStorage';

import { toggleLoginModal } from 'src/redux/actions/modal';

function mapStateToProps(state) {
	return {
		store: {
			auth: state.auth,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			toggleLoginModal,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginRequire extends PureComponent {
	static propTypes = {
		children: PropTypes.node.isRequired,
		// store
		store: PropTypes.shape({
			auth: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			toggleLoginModal: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	componentWillMount() {
		if (!AuthStorage.loggedIn && !this.props.store.auth.id) {
			this.props.action.toggleLoginModal({ open: true, closable: true });
			// return null;
		}
	}

	componentWillUnmount() {
		this.props.action.toggleLoginModal({ open: false });
	}

	// shouldComponentUpdate(nextProps) {
	// 	// if (nextProps.store.auth.id && nextProps.store.auth.id !== this.props.store.auth.id) {
	// 	// 	return true;
	// 	// }
	// 	// return false;
	// }

	render() {
		const { children, store: { auth } } = this.props;
		if (!AuthStorage.loggedIn && !auth.id) {
			return null;
		}

		return children;
	}
}
