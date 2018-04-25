/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-11 10:06:38
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

// import Header from 'src/components/Header';
// import Footer from 'src/components/Footer';
import SideBar from 'src/components/SideBar';
// import Breadcrumb from 'src/components/Breadcrumb';

const MainLayout = (props) => {
	const { children, className } = props;

	return (
		<div style={{ display: 'flex', flexFlow: 'column', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif', color: '#333' }}>
			<Row>
				<SideBar />
				<Col className={className} span={20}>
					{children}
				</Col>
			</Row>
			{/* <Footer /> */}
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
