/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-09 17:44:33
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Router from 'next/router';

import { Popover, Icon, Divider } from 'antd';

import Link from 'next/link';

// import Right from './Right';

import Avatar from 'src/components/Avatar';
import NotiWidget from 'src/components/NotiWidget';

import { logoutRequest } from 'src/redux/actions/auth';

import { stylesheet, classNames } from './style.less';

function mapStateToProps(state) {
	return {
		store: {
			auth: state.auth,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			logoutRequest,
		}, dispatch),
	};
};

const Header = ({ store, action }) => {
	const logout = () => {
		action.logoutRequest(() => {
			Router.push('/login');
		});
	};

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
				<div className={classNames.item} onClick={logout}>
					<Icon type="logout" />
					<span>Logout</span>
				</div>
			</div>
		</div>
	);

	const title = (
		<div className={classNames.title}>
			<Avatar size="large" src={store.auth.avatar} />
			<div className={classNames.info}>
				<h4>{store.auth.fullName}</h4>
				<i>{store.auth.email}</i>
			</div>
		</div>
	);

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
						<Avatar className={classNames.avatar} src={store.auth.avatar} />
					</Popover>
				</div>
			</div>
		</header>
	);
};

Header.propTypes = {
	// classes: PropTypes.object.isRequired,
	// store
	store: PropTypes.shape({
		auth: PropTypes.object.isRequired,
	}).isRequired,
	// action
	action: PropTypes.shape({
		logoutRequest: PropTypes.func.isRequired,
	}).isRequired,
};

Header.defaultProps = {
	// classes: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
