/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-06 09:18:29
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import { stylesheet, classNames } from './style.less';

const Footer = (/* props */) => {
	return (
		<footer className={classNames.root}>
			<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

			<Row className={classNames.top}>
				<Col sm={4} style={{ textAlign: 'center' }}>
					<img src="/static/assets/images/logo/logo-contrast.png" alt="IPP"/>
				</Col>
				<Col sm={20}>
					<h3>IPP EDUCATION</h3>
					<p>
						<strong>IPP Hà Nội:</strong> IPP LVL Head Office: Tầng 3, Tháp T1, Tòa nhà Times Tower - 35 Lê Văn Lương <br/>
						IPP HQV: Phòng 11-10 tầng 11, Tòa nhà CT2-A Khu đô thị Nam Cường - Cuối ngõ 234 Đường Hoàng Quốc Việt - 0978 45 99 68
					</p>
					<p>
						<strong>IPP HCMC:</strong> 46/25 Nguyễn Cửu Vân, Phường 17, Quận Bình Thạnh - 0935 203 995
					</p>
				</Col>
			</Row>
			<Row className={classNames.bottom}>
				2017 © IPP Education - All Rights Reserved.
			</Row>
		</footer>
	);
};

Footer.propTypes = {
	// classes: PropTypes.object.isRequired,
};

Footer.defaultProps = {
	// classes: {},
};

export default Footer;
