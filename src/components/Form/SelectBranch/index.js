/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-23 00:28:33
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

import { Select } from 'antd';

export default class SelectBranch extends PureComponent {
	static propTypes = {
		// classes: PropTypes.object.isRequired,
	}

	static defaultProps = {}

	render() {
		return (
			<Select
				placeholder="Select a branch"
				style={{ width: '100%' }}
				{...this.props}
			>
				<Select.Option value="HN">HN</Select.Option>
				<Select.Option value="HQV">HQV</Select.Option>
				<Select.Option value="HCMC">HCMC</Select.Option>
			</Select>
		);
	}
}

