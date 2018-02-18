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

import API from 'src/constants/api';

const { BASE_URL } = API;

export default class SelectLevel extends Component {
	static propTypes = {
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		search: PropTypes.bool,
	}

	static defaultProps = {
		onChange: f => f,
		onFocus: f => f,
		search: false,
	}

	state = {
		levelList: [],
	}

	handleLevelClick = () => {
		this.setState({
			levelList: [],
		});
		fetch(BASE_URL + 'levels?filter={"skip":0,"limit":1000,"where":{"isDelete":false, "status": "active"}}')
			.then(response => response.json())
			.then((body) => {
				this.setState({
					levelList: body.data,
				});
				this.props.onFocus();
			});
	}

	handleChangeLevel = (level) => {
		this.props.onChange(level);
	}

	render() {
		const { onChange, onFocus, search, ...rest } = this.props;

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
					search && <Select.Option key="all" value="">All</Select.Option>
				}

				{
					this.state.levelList.map((level) => {
						return <Select.Option key={level.id} value={level.name}>{level.name}</Select.Option>;
					})
				}
			</Select>
		);
	}
}
