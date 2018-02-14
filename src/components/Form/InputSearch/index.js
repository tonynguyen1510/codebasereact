/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978 108 807
*
* Created: 2018-02-12 07:22:55
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

let timeout = null;
const handleSearch = (e, search, isPressEnter) => {
	e.persist();
	clearTimeout(timeout);
	if (isPressEnter) return search(e.target.value);
	timeout = setTimeout(() => {
		search(e.target.value);
	}, 500);
};

const InputSearch = (props) => {
	const { onChange } = props;

	return (
		<div>
			<Input.Search
				placeholder="input search text"
				onChange={(e) => handleSearch(e, onChange)}
				onPressEnter={(e) => handleSearch(e, onChange, true)}
				style={{ width: 200 }}
			/>
		</div>
	);
};

InputSearch.propTypes = {
	onChange: PropTypes.func.isRequired,
};

InputSearch.defaultProps = {
	// classes: {},
};

export default InputSearch;
