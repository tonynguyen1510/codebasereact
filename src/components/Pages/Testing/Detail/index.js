/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-19 22:53:51
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { Link } from 'src/routes';

import { Button } from 'antd';

import { getTestingData } from 'src/redux/actions/testing';

import StudentList from './StudentList';

import { stylesheet, classNames } from './style.less';

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getTestingData,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		store: {
			testingView: state.testing.testingView,
		},
	};
};
@connect(mapStateToProps, mapDispatchToProps)
export default class TestingDetail extends Component {
	static propTypes = {
		testingId: PropTypes.string,
		// store
		store: PropTypes.shape({
			testingView: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getTestingData: PropTypes.func.isRequired,
		}).isRequired,
	}
	static defaultProps = {
		testingId: '',
	}
	state = {
		loading: true,
	}
	componentDidMount() {
		if (this.props.testingId) {
			this.props.action.getTestingData({ id: this.props.testingId }, () => {
				this.setState({
					loading: false,
				});
			});
		}
	}

	render() {
		const { store: { testingView }, testingId } = this.props;

		return (
			<div>
				<div style={{ position: 'relative' }}>
					<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
					<div className={classNames.control}>
						<Link route={'/testing/edit/' + testingId}>
							<Button type="primary" shape="circle" icon="edit" />
						</Link>
					</div>
					<div className={classNames.session}>
						<h3 style={{ marginBottom: 10 }}>Information:</h3>

						<div className={classNames.subTable}>
							<div className={classNames.item}>
								<div className={classNames.label}>Created At:</div>
								<div className={classNames.value}>{moment(testingView.createdAt).format('DD-MM-YYYY')}</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Time:</div>
								<div className={classNames.value}>{moment(testingView.startTime).format('HH:mm')} - {moment(testingView.endTime).format('HH:mm')}</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Name:</div>
								<div className={classNames.value}>{testingView.name}</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Note:</div>
								<div className={classNames.value}>{testingView.note || '-'}</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Branch:</div>
								<div className={classNames.value}>{testingView.branch || '-'}</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Level:</div>
								<div className={classNames.value}>{testingView.levelName || '-'}</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Lesson:</div>
								<div className={classNames.value}>{testingView.lessonData && testingView.lessonData.name ? testingView.lessonData.name : '-'}</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Lesson reference:</div>
								<div className={classNames.value}>
									<div dangerouslySetInnerHTML={{ __html: testingView.lessonData && testingView.lessonData.reference ? testingView.lessonData.reference : '-' }} />
								</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Lesson homework:</div>
								<div className={classNames.value}>
									<div dangerouslySetInnerHTML={{ __html: testingView.lessonData && testingView.lessonData.homework ? testingView.lessonData.homework : '-' }} />
								</div>
							</div>
						</div>
					</div>
				</div>
				{
					!this.state.loading &&
					<StudentList testingData={testingView} />
				}
			</div>
		);
	}
}
