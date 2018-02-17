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

import { createStudent, getStudentData, updateStudent } from 'src/redux/actions/student';

import Profile from 'src/components/Profile';

function mapStateToProps(state) {
	return {
		store: {
			studentView: state.student.studentView,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			createStudent,
			getStudentData,
			updateStudent,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class StudentDetail extends Component {
	static propTypes = {
		studentId: PropTypes.string,
		// store
		store: PropTypes.shape({
			studentView: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			createStudent: PropTypes.func.isRequired,
			getStudentData: PropTypes.func.isRequired,
			updateStudent: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		studentId: undefined,
	}

	state = {
		loading: true,
	}

	componentDidMount() {
		if (this.props.studentId) {
			this.props.action.getStudentData({ id: this.props.studentId }, () => {
				this.setState({
					loading: false,
				});
			});
		}
	}

	render() {
		const { store: { studentView } } = this.props;

		return (
			<Profile userData={studentView} loading={this.state.loading} />
		);
	}
}
