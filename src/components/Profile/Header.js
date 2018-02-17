/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-17 08:21:07
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'antd';

import { Link } from 'src/routes';

import Avatar from 'src/components/Avatar';
import BtnUserActionMore from 'src/components/Form/BtnUserActionMore';

import { stylesheet, classNames } from './style.less';

const Header = (props) => {
	const { userData, loading } = props;

	if (loading) {
		return (
			<div className={classNames.cover}>
				<div className={classNames.coverInfo}>
					<Avatar className={classNames.avatar + ' loading-block'} />
					<h2><div className="loading-block" style={{ width: 100 }} /></h2>
					<span><div className="loading-block" style={{ width: 50 }} /></span>
				</div>
			</div>
		);
	}

	return (
		<div className={classNames.cover}>
			<div className={classNames.controlBtn}>
				<Link route={'/' + (userData.role || 'student') + '/edit/' + userData.id}>
					<Button type="primary" shape="circle" icon="edit" />
				</Link>
				<BtnUserActionMore userData={userData} root={<Button type="default" shape="circle" icon="ellipsis" />} />
			</div>
			<div className={classNames.coverInfo}>
				<Avatar className={classNames.avatar} url={userData.avatar} />
				<h2>{userData.fullName}</h2>
				<span>{userData.role}</span>
			</div>
		</div>
	);
};

Header.propTypes = {
	userData: PropTypes.object.isRequired,
	loading: PropTypes.bool,
};

Header.defaultProps = {
	loading: false,
};

export default Header;
