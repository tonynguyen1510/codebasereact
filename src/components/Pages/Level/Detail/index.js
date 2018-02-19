/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-19 00:21:31
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getLevelInfo } from 'src/redux/actions/level';

import Info from './Info';
import LessonList from './LessonList';
import { stylesheet, classNames } from './style.less';

function mapStateToProps(state) {
	return {
		store: {
			levelObject: state.level.levelInfo,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getLevelInfo,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class LevelDetail extends Component {
	static propTypes = {
		levelId: PropTypes.string.isRequired,
		// store
		store: PropTypes.shape({
			levelObject: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getLevelInfo: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	componentDidMount() {
		if (this.props.levelId) {
			this.props.action.getLevelInfo({ id: this.props.levelId });
		}
	}

	render() {
		const { levelId, store: { levelObject } } = this.props;

		return (
			<div className={classNames.root}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<Info levelData={levelObject} loading={levelObject.loading} />
				{
					!levelObject.loading &&
					<LessonList levelData={levelObject} />
				}

			</div>
		);
	}
}
