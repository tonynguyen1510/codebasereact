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
import { getNotes, deleteNote } from 'src/redux/actions/note';
import { notification, Button, Row, Col, Modal } from 'antd';
import { Router, Link } from 'src/routes';

import AuthStorage from 'src/utils/AuthStorage';

import { stylesheet, classNames } from './style.less';

const mapStateToProps = (state) => {
	return {
		store: {
			auth: state.auth,
			noteInfo: state.note.noteInfo,
			noteList: state.note.noteList,
		},
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			getNotes,
			deleteNote,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class IndexPage extends PureComponent {
	static propTypes = {
		// classes: PropTypes.object.isRequired,
		// store
		store: PropTypes.shape({
			noteInfo: PropTypes.object.isRequired,
			noteList: PropTypes.object.isRequired,
		}).isRequired,
		// action
		actions: PropTypes.shape({
			getNotes: PropTypes.func.isRequired,
			deleteNote: PropTypes.func.isRequired,
		}).isRequired,

	}

	static defaultProps = {

	}

	componentWillMount = () => {
		if (this.props.store.noteList.data.length < 2) {
			this.props.actions.getNotes({ filter: this.filter });
		}
	};


	componentDidMount() {
		// this.props.action.getFeedsFb();
	}

	filter = {
		skip: 0,
		limit: 6,
	}

	notify = () => {
		notification.open({
			message: 'Notification Title',
			description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
		});
	}

	render() {
		const { noteInfo } = this.props.store;

		return (
			<div className={classNames.mainContain}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<Row className={classNames.controlBar}>
					<Col span={12}>
						<h2 className={classNames.textTitle}> {noteInfo.name} </h2>
					</Col>
					<Col span={10} className={classNames.textRight}>
						<Link route="/note/new">
							<Button size="large" type="primary" shape="circle" icon="plus" style={{ marginRight: '10px' }} />
						</Link>
						<Link route={'/note/edit/' + noteInfo.id}>
							<Button size="large" type="primary" shape="circle" icon="edit" style={{ marginRight: '10px' }} />
						</Link>
						<Button
							onClick={() => {
								Modal.confirm({
									title: 'Do you want to delete these items?',
									onOk: () => {
										this.props.actions.deleteNote(noteInfo.id, () => {
											notification.success({
												message: 'Congratulation',
												description: 'Delete note success!',
											});
											this.props.actions.getNotes({ filter: this.filter });
										});
									},
								});
							}}
							size="large" type="danger" shape="circle" icon="delete"
						/>
					</Col>
				</Row>
				<Row className={classNames.content}>
					<p><strong><i>{ noteInfo.description }</i></strong></p>
					<div dangerouslySetInnerHTML={{ __html: noteInfo.content }} />
				</Row>
			</div>
		);
	}
}
