/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-13 23:17:38
*------------------------------------------------------- */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import { Icon } from 'antd';

const CloseButton = ({ closeToast }) => (
	<Icon type="close" onClick={closeToast} style={{ fontSize: 20 }} />
);

CloseButton.propTypes = {
	closeToast: PropTypes.func,
};

CloseButton.defaultProps = {
	closeToast: f => f,
};

const ToastWrapper = (props) => {
	return (
		<Fragment>
			<ToastContainer
				autoClose={10000}
				closeOnClick={false}
				style={{ top: 60 }}
				closeButton={<CloseButton />}
				newestOnTop
				progressClassName="progress"
				bodyClassName="body"
				toastClassName="toast"
			/>
			<style>{`
				.progress {
					height: 3px;
				}
				.body {
					padding: 10px;
					margin: 0;
				}
				.toast {
					min-height: 38px;
					padding: 12px;
				}
			`}
			</style>
		</Fragment>
	);
};

ToastWrapper.propTypes = {
	// classes: PropTypes.object.isRequired,
};

ToastWrapper.defaultProps = {
	// classes: {},
};

export default ToastWrapper;

