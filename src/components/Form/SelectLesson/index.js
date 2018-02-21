import React from 'react';
import PropTypes from 'prop-types';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

import API from 'src/constants/api';

const { BASE_URL } = API;

export default class UserRemoteSelect extends React.Component {
	static propTypes = {
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		levelName: PropTypes.string.isRequired,
	}

	static defaultProps = {
		onChange: f => f,
		onFocus: f => f,
	}

	constructor(props) {
		super(props);
		this.lastFetchId = 0;
		this.handleGetOptions = debounce(this.handleGetOptions, 100);
	}
	state = {
		data: [],
		value: [],
		fetching: false,
	}
	handleGetOptions = (value) => {
		this.lastFetchId += 1;
		const fetchId = this.lastFetchId;
		this.setState({ data: [], fetching: true });

		const filter = {
			skip: 0,
			limit: 1000,
			where: {
				isDelete: false,
				status: 'active',
				levelName: this.props.levelName,
			},
		};

		if (value) {
			const regex = '/' + value + '/i';
			filter.where.or = [
				{ name: { regexp: regex } },
				{ id: { regexp: regex } },
				{ desc: { regexp: regex } },
			];
		}

		fetch(BASE_URL + `lessons?filter=${JSON.stringify(filter)}`)
			.then(response => response.json())
			.then((body) => {
				if (body.error) { // for fetch callback order
					return;
				}
				if (fetchId !== this.lastFetchId) { // for fetch callback order
					return;
				}
				this.setState({ data: body.data, fetching: false });
			});
	}
	handleChange = (value) => {

		this.setState({
			value: value[value.length - 1],
			// data: [],
			fetching: false,
		}, () => {
			const index = this.state.data.findIndex(el => {
				return el.id === this.state.value.key;
			});

			this.props.onChange({ ...this.state.value, data: this.state.data[index] });
		});
	}

	handleSelect = () => {
		this.select.blur();
	}
	render() {
		const { fetching, data, value } = this.state;
		const { onChange, onFocus, ...rest } = this.props;

		return (
			<Select
				ref={(select) => this.select = select} // eslint-disable-line
				mode="multiple"
				labelInValue
				showArrow
				value={value}
				placeholder="Select users"
				notFoundContent={fetching ? <Spin size="small" /> : 'Not Found'}
				filterOption={false}
				style={{ width: '100%' }}
				{...rest}
				onSearch={this.handleGetOptions}
				onFocus={this.handleGetOptions}
				onChange={this.handleChange}
				onSelect={this.handleSelect}
				className="select-lesson"
			>
				{data.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
			</Select>
		);
	}
}
