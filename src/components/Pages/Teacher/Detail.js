/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-09 11:27:16
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import Router from 'next/router';

import { createUser, getUserData, updateUser } from 'src/redux/actions/user';

import Profile from 'src/components/Profile';

function mapStateToProps(state) {
	return {
		store: {
			userView: state.user.userView,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			createUser,
			getUserData,
			updateUser,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class TeacherDetail extends Component {
	static propTypes = {
		teacherId: PropTypes.string,
		// store
		store: PropTypes.shape({
			userView: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			createUser: PropTypes.func.isRequired,
			getUserData: PropTypes.func.isRequired,
			updateUser: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		teacherId: undefined,
	}

	state = {
		loading: true,
	}

	componentDidMount() {
		if (this.props.teacherId) {
			this.props.action.getUserData({ id: this.props.teacherId }, () => {
				this.setState({
					loading: false,
				});
			});
		}
	}

	render() {
		const { store: { userView } } = this.props;

		return (
			<Profile userData={userView} loading={this.state.loading} />
		);
	}
}
