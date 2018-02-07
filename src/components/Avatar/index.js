/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-06 01:01:55
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Avatar } from 'antd';

const AvatarCpn = (props) => {
	const { src, ...rest } = props;

	return src ? <Avatar src={src} {...rest} /> : <Avatar icon="user" {...rest} />;
};

AvatarCpn.propTypes = {
	src: PropTypes.string,
};

AvatarCpn.defaultProps = {
	src: '',
};

export default AvatarCpn;
