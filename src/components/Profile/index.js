/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-17 08:20:03
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { stylesheet, classNames } from './style.less';

import Header from './Header';
import Information from './Information';
import History from './History';

const Profile = (props) => {
	const { userData, loading } = props;

	return (
		<div className={classNames.root}>
			<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
			<Header userData={userData} loading={loading} />
			<div className={classNames.body}>
				<Information userData={userData} loading={loading} />
				<History userData={userData} loading={loading} />
			</div>
		</div>
	);
};

Profile.propTypes = {
	userData: PropTypes.object.isRequired,
	loading: PropTypes.bool,
};

Profile.defaultProps = {
	loading: false,
};

export default Profile;
