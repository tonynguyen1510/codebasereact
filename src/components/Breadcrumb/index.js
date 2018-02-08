/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-08 23:31:57
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import { withRouter } from 'next/router';

import { Breadcrumb, Icon } from 'antd';

const BreadcrumbCpn = (props) => {
	const { router } = props;
	const arrPath = router.asPath.split('/');

	return (
		<Breadcrumb style={{ margin: '5px 0 15px 5px' }}>
			{
				arrPath.map((el, i) => {
					if (i === 0) {
						return (
							<Breadcrumb.Item key="0">
								<Link href="/" >
									<a>
										<Icon type="home" />
									</a>
								</Link>
							</Breadcrumb.Item>
						);
					}

					if (i === arrPath.length - 1 || el === 'edit') {
						return (
							<Breadcrumb.Item key={i}>
								<span>{el.split('?')[0]}</span>
							</Breadcrumb.Item>
						);
					}

					return (
						<Breadcrumb.Item key={i}>
							<Link href={'/' + el} >
								<a>{el}</a>
							</Link>
						</Breadcrumb.Item>
					);
				})
			}
		</Breadcrumb>
	);
};

BreadcrumbCpn.propTypes = {
	router: PropTypes.object.isRequired,
};

BreadcrumbCpn.defaultProps = {
};

export default withRouter(BreadcrumbCpn);
