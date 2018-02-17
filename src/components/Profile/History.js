/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-17 09:41:28
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { stylesheet, classNames } from './style.less';

const History = (props) => {
	const { } = props;

	return (
		<div className={classNames.history}>
			<h3>Activity log:</h3>
		</div>
	);
};

History.propTypes = {
	// classes: PropTypes.object.isRequired,
};

History.defaultProps = {
	// classes: {},
};

export default History;
