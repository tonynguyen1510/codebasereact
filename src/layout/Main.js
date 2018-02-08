/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-11 10:06:38
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import SideBar from 'src/components/SideBar';
import Breadcrumb from 'src/components/Breadcrumb';

const MainLayout = (props) => {
	const { children, className } = props;

	return (
		<div style={{ display: 'flex', flexFlow: 'column', minHeight: '100vh' }}>
			<Header />
			<div style={{ display: 'flex', flex: 1 }}>
				<SideBar />
				<main style={{ flex: 1, padding: 15 }} className={className}>
					<Breadcrumb />
					{children}
				</main>
			</div>
			<Footer />
		</div>
	);
};

MainLayout.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

MainLayout.defaultProps = {
	className: '',
};

export default MainLayout;
