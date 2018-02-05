/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-11 15:15:46
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

const styleSheet = {
	root: {
		width: '100%',
		marginRight: 'auto',
		marginLeft: 'auto',
	},
};

const Wrapper = (props) => {
	const { classes, children, className, ...rest } = props;
	return (
		<div style={styleSheet.root}>
			{children}
		</div>
	);
};

Wrapper.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Wrapper.defaultProps = {
	className: '',
};

export default Wrapper;
