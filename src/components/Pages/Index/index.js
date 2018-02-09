/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-11 14:30:56
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { notification, Button } from 'antd';

import Link from 'next/link';

import { getFeedsFb } from 'src/redux/actions/feed';

import AuthStorage from 'src/utils/AuthStorage';

import { stylesheet, classNames } from './style.less';

const mapStateToProps = (state) => {
	return {
		store: {
			auth: state.auth,
		},
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// action: bindActionCreators({
		// 	getFeedsFb,
		// }, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class IndexPage extends PureComponent {
	static propTypes = {
		// classes: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			auth: PropTypes.object.isRequired,
		}).isRequired,
		// action
		// action: PropTypes.shape({
		// 	getFeedsFb: PropTypes.func.isRequired,
		// }).isRequired,

	}

	static defaultProps = {

	}

	componentDidMount() {
		// this.props.action.getFeedsFb();
	}

	notify = () => {
		notification.open({
			message: 'Notification Title',
			description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
		});
	}

	render() {
		const { store: { auth } } = this.props;

		return (
			<div>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

				<Button className={classNames.btn} onClick={this.notify} type="primary">Primary</Button>
			</div>
		);
	}
}
