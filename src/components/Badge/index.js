/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-11 09:35:28
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { stylesheet, classNames } from './style.less';

const Badge = (props) => {
	const { children, type, className, ...rest } = props;

	return (
		<div className={classNames.root + ' ' + classNames[type] + ' ' + className} {...rest}>
			<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
			{children}
		</div>
	);
};

Badge.propTypes = {
	children: PropTypes.string.isRequired,
	className: PropTypes.string,
	type: PropTypes.string,
};

Badge.defaultProps = {
	type: 'default',
	className: '',
};

export default Badge;
