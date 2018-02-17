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

import { Button, DatePicker, Input } from 'antd';

// import Link from 'next/link';
import { Router } from 'src/routes';

import UserList from 'src/components/List/User';

import { getStudentList } from 'src/redux/actions/student';

import { stylesheet, classNames } from './style.less';

const { RangePicker } = DatePicker;
const { Search } = Input;

function mapStateToProps(state) {
	return {
		store: {
			studentList: state.student.studentList,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getStudentList,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class StudentPage extends Component {
	static propTypes = {
		// classes: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			studentList: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getStudentList: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	componentDidMount() {
		this.props.action.getStudentList({ filter: this.filter });
	}

	filter = {
		skip: 0,
		limit: 12,
		where: {},
	}

	handleChangePagination = (page) => {
		this.filter.skip = page * this.filter.limit;

		this.props.action.getStudentList({ filter: this.filter });
	}

	handleChangeDate = (value) => {
		if (value.length === 2) {
			this.filter.where.createdAt = { between: value };
		} else {
			delete this.filter.where.createdAt;
		}
		this.filter.skip = 0;

		this.props.action.getStudentList({ filter: this.filter });
	}

	handleChangeSearch = (value) => {
		if (value) {
			const regex = '/' + value + '/i';

			this.filter.where.or = [
				{ fullName: { regexp: regex } },
				{ desc: { regexp: regex } },
				{ phone: { regexp: regex } },
				{ email: { regexp: regex } },
			];
		} else {
			delete this.filter.where.or;
		}
		this.filter.skip = 0;

		this.props.action.getStudentList({ filter: this.filter });
	}

	render() {
		const { store: { studentList } } = this.props;

		return (
			<div className={classNames.root}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

				<UserList
					userList={studentList}
					onChangePagination={this.handleChangePagination}
				>
					<div>
						<Search
							placeholder="Search name, phone..."
							onSearch={this.handleChangeSearch}
							style={{ width: 200 }}
						/>
					</div>
					<div>
						Created at: <RangePicker onChange={this.handleChangeDate} style={{ marginLeft: 10 }} />
					</div>
					<Button type="primary" icon="file-add" style={{ marginRight: 10 }} onClick={() => Router.pushRoute('/student/new')}>Create Student</Button>
				</UserList>
			</div>
		);
	}
}
