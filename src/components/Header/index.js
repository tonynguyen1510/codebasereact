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

import Link from 'next/link';

// import Right from './Right';

import Avatar from 'src/components/Avatar';

import { stylesheet, classNames } from './style.less';

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
					<Avatar />
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
