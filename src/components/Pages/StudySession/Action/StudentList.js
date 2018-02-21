/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-21 09:48:12
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Transfer } from 'antd';

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
export default class StudentList extends Component {
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

	state = {
		mockData: [],
		targetKeys: [],
	}
	componentDidMount() {
		this.getMock();
	}
	getMock = () => {
		const targetKeys = [];
		const mockData = [];
		for (let i = 0; i < 20; i++) {
			const data = {
				key: i.toString(),
				title: `content${i + 1}`,
				description: `description of content${i + 1}`,
				chosen: Math.random() * 2 > 1,
			};
			mockData.push(data);
		}
		this.setState({ mockData, targetKeys });
	}
	filterOption = (inputValue, option) => {
		return option.description.indexOf(inputValue) > -1;
	}
	handleChange = (targetKeys) => {
		this.setState({ targetKeys });
	}

	render() {
		const {  } = this.props;

		console.log('targetKeys', this.state.targetKeys);

		return (
			<div className={classNames.studentList}>
				<h3 style={{ marginBottom: 30 }}>Students:</h3>
				<Transfer
					dataSource={this.state.mockData}
					showSearch
					filterOption={this.filterOption}
					targetKeys={this.state.targetKeys}
					onChange={this.handleChange}
					render={item => item.title}
				/>
			</div>
		);
	}
}
