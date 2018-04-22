/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-06 01:31:14
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';

import Link from 'next/link';
import { withRouter } from 'next/router';

const SideBar = (props) => {
	return (
		<Menu
			// onClick={handleClick}
			style={{ width: 200, padding: '10px 0' }}
			defaultSelectedKeys={['/' + props.router.pathname.split('/')[1]]}
			mode="inline"
		>
			<Menu.Item key="/">
				<Link href="/">
					<a>
						<Icon type="home" />
						<span>Dashboard</span>
					</a>
				</Link>
			</Menu.Item>
		</Menu>
	);
};

SideBar.propTypes = {
	router: PropTypes.object.isRequired,
};

SideBar.defaultProps = {
	// classes: {},
};

export default withRouter(SideBar);
