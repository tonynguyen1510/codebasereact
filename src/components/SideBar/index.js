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
			<Menu.Item key="/consultor">
				<Link href="/consultor">
					<a>
						<Icon type="solution" />
						<span>Consultor</span>
					</a>
				</Link>
			</Menu.Item>
			<Menu.Item key="/teacher">
				<Link href="/teacher">
					<a>
						<Icon type="contacts" />
						<span>Teacher</span>
					</a>
				</Link>
			</Menu.Item>
			<Menu.Item key="/student">
				<Link href="/student">
					<a>
						<Icon type="team" />
						<span>Student</span>
					</a>
				</Link>
			</Menu.Item>
			<Menu.Item key="/lesson">
				<Link href="/lesson">
					<a>
						<Icon type="calculator" />
						<span>Lesson</span>
					</a>
				</Link>
			</Menu.Item>
			<Menu.Item key="/class">
				<Link href="/class">
					<a>
						<Icon type="profile" />
						<span>Class</span>
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
