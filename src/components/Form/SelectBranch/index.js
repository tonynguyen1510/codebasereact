/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-22 22:20:37
*------------------------------------------------------- */

import React from 'react';

import { Select } from 'antd';

const SelectBranch = (props) => {
	return (
		<Select
			placeholder="Select a branch"
			style={{ width: '100%' }}
			{...props}
		>
			<Select.Option value="HN">HN</Select.Option>
			<Select.Option value="HQV">HQV</Select.Option>
			<Select.Option value="HCMC">HCMC</Select.Option>
		</Select>
	);
};

export default SelectBranch;
