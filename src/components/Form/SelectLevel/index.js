/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-17 17:31:07
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Spin, Select } from 'antd';

export default class SelectLevel extends Component {
	static propTypes = {
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
	}

	static defaultProps = {
		onChange: f => f,
		onFocus: f => f,
	}

	state = {
		level: '',
		levelList: [],
	}

	handleLevelClick = () => {
		console.log('fetching user');
		this.setState({
			levelList: [],
		});
		fetch('http://localhost:3005/api/v1/levels')
			.then(response => response.json())
			.then((body) => {
				console.log('body', body);
				this.setState({
					levelList: body.data,
				});
				this.props.onFocus();
			});
	}

	handleChangeLevel = (level) => {
		console.log('level', level);
		this.setState({
			level,
		}, () => {
			this.props.onChange(level);
		});
	}

	render() {
		const { onChange, onFocus, ...rest } = this.props;

		return (
			<Select
				placeholder="Select level"
				notFoundContent={<Spin size="small" />}
				filterOption={false}
				{...rest}
				onFocus={this.handleLevelClick}
				onChange={this.handleChangeLevel}
			>
				{
					this.state.levelList.map((level) => {
						return <Select.Option key={level.id} value={level.name}>{level.name}</Select.Option>;
					})
				}
			</Select>
		);
	}
}
