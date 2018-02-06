/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-09 17:44:33
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
// import Color from 'color';

import { Popover, Icon, Divider, Button, Badge } from 'antd';

import Link from 'next/link';

// import Right from './Right';

import Avatar from 'src/components/Avatar';
import NotiWidget from 'src/components/NotiWidget';

import { stylesheet, classNames } from './style.less';

const content = (
	<div className={classNames.content}>
		<div className={classNames.itemWrapper}>
			<div className={classNames.item}>
				<Icon type="user" />
				<span>Profile</span>
			</div>
			<div className={classNames.item}>
				<Icon type="setting" />
				<span>Setting</span>
			</div>
		</div>
		<Divider className={classNames.divider} />
		<div className={classNames.itemWrapper}>
			<div className={classNames.item}>
				<Icon type="logout" />
				<span>Logout</span>
			</div>
		</div>
	</div>
);

const title = (
	<div className={classNames.title}>
		<Avatar size="large" />
		<div className={classNames.info}>
			<h4>Đức Tiến</h4>
			<i>ductienas@gmail.com</i>
		</div>
	</div>
);

const Header = (props) => {
	return (
		<header className={classNames.root}>
			<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

			<div className={classNames.wrapper}>
				<Link href="/">
					<a className={classNames.left}>
						<img className={classNames.logoImg} src="/static/assets/images/logo/64x64.png" alt="ipp-ielts" />
						<span className={classNames.logoText}>Admin</span>
					</a>
				</Link>
				<div className={classNames.right}>
					<NotiWidget />
					<Popover content={content} title={title} trigger="click" placement="bottomRight">
						<Avatar className={classNames.avatar} />
					</Popover>
				</div>
			</div>
		</header>
	);
};

Header.propTypes = {
	// classes: PropTypes.object.isRequired,
};

Header.defaultProps = {
};

export default Header;
