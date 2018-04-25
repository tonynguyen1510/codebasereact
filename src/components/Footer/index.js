/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-06 09:18:29
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import { stylesheet, classNames } from './style.less';

const Footer = (/* props */) => {
	return (
		<footer className={classNames.root}>
			<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
			<Row className={classNames.bottom}>
				2018 © Note App Personal - All Rights Reserved.
			</Row>
		</footer>
	);
};

Footer.propTypes = {
	// classes: PropTypes.object.isRequired,
};

Footer.defaultProps = {
	// classes: {},
};

export default Footer;
