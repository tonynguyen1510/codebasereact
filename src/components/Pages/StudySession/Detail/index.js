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

import { getSessionData, createSession, updateSession } from 'src/redux/actions/session';
import { getStudentData } from 'src/redux/actions/student';

import StudentList from './StudentList';

import { stylesheet, classNames } from './style.less';

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			getSessionData,
			createSession,
			getStudentData,
			updateSession,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		store: {
			sessionView: state.session.sessionView,
		},
	};
};
@connect(mapStateToProps, mapDispatchToProps)
export default class StudySessionDetail extends Component {
	static propTypes = {
		sessionId: PropTypes.string,
		// store
		store: PropTypes.shape({
			sessionView: PropTypes.object.isRequired,
		}).isRequired,
		// action
		action: PropTypes.shape({
			getSessionData: PropTypes.func.isRequired,
			createSession: PropTypes.func.isRequired,
			getStudentData: PropTypes.func.isRequired,
			updateSession: PropTypes.func.isRequired,
		}).isRequired,
	}
	static defaultProps = {
		sessionId: '',
	}
	state = {
		loading: true,
	}
	componentDidMount() {
		if (this.props.sessionId) {
			this.props.action.getSessionData({ id: this.props.sessionId }, () => {
				this.setState({
					loading: false,
				});
			});
		}
	}

	render() {
		const { store: { sessionView }, sessionId } = this.props;

		return (
			<div>
				<div style={{ position: 'relative' }}>
					<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
					<div className={classNames.control}>
						<Link route={'/study-session/edit/' + sessionId}>
							<Button type="primary" shape="circle" icon="edit" />
						</Link>
					</div>
					<div className={classNames.session}>
						<h3 style={{ marginBottom: 10 }}>Information:</h3>

						<div className={classNames.subTable}>
							<div className={classNames.item}>
								<div className={classNames.label}>Created At:</div>
								<div className={classNames.value}>{moment(sessionView.createdAt).format('DD-MM-YYYY')}</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Time:</div>
								<div className={classNames.value}>{moment(sessionView.startTime).format('HH:mm')} - {moment(sessionView.endTime).format('HH:mm')}</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Name:</div>
								<div className={classNames.value}>{sessionView.name}</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Note:</div>
								<div className={classNames.value}>{sessionView.note || '-'}</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Branch:</div>
								<div className={classNames.value}>{sessionView.branch || '-'}</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Level:</div>
								<div className={classNames.value}>{sessionView.levelName || '-'}</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Lesson:</div>
								<div className={classNames.value}>{sessionView.lessonData && sessionView.lessonData.name ? sessionView.lessonData.name : '-'}</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Lesson reference:</div>
								<div className={classNames.value}>
									<div dangerouslySetInnerHTML={{ __html: sessionView.lessonData && sessionView.lessonData.reference ? sessionView.lessonData.reference : '-' }} />
								</div>
							</div>
							<div className={classNames.item}>
								<div className={classNames.label}>Lesson homework:</div>
								<div className={classNames.value}>
									<div dangerouslySetInnerHTML={{ __html: sessionView.lessonData && sessionView.lessonData.homework ? sessionView.lessonData.homework : '-' }} />
								</div>
							</div>
						</div>
					</div>
				</div>
				{
					!this.state.loading &&
					<StudentList sessionData={sessionView} />
				}
			</div>
		);
	}
}
