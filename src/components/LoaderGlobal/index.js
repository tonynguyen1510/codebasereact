/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-13 17:35:33
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Progress } from 'antd';

import { stylesheet, classNames } from './style.less';

function mapStateToProps(state) {
	return {
		loading: state.loading,
	};
}

const mapDispatchToProps = {
	// toggleLoader,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class LoaderGlobal extends PureComponent {
	static propTypes = {
		loading: PropTypes.bool.isRequired,
	}

	state = {
		completed: 100,
	};

	componentDidMount() {
		this.timer = setInterval(this.handleProgress, 100);
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.loading) {
			this.setState({ completed: 100 });
		} else {
			this.setState({ completed: 0 });
		}
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	handleProgress = () => {
		const { completed } = this.state;
		if (completed < 80 && this.props.loading) {
			// const diff = Math.random() * 10;
			this.setState({ completed: completed + 20 });
		}
	};

	render() {
		const { loading } = this.props;

		return !loading && this.state.completed === 100 ?
			null :
			(
				<div className={classNames.root}>
					<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
					<div className={classNames.overlay} />
					<Progress size="small" className={classNames.progress + ' progress-custom'} percent={this.state.completed} status="active" showInfo={false} />
				</div>
			);
	}
}
