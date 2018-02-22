/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-22 04:54:22
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, notification, Input } from 'antd';

import { updateSessionDetail } from 'src/redux/actions/sessionDetail';

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			updateSessionDetail,
		}, dispatch),
	};
};
const mapStateToProps = (/* state */) => {
	return {
		// store: {
		// 	studentList: state.student.studentList,
		// },
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class BtnAddComment extends PureComponent {
	static propTypes = {
		sessionDetailData: PropTypes.object.isRequired,
		onAfterAdd: PropTypes.func,
		// store
		// store: PropTypes.shape({
		// 	studentList: PropTypes.object.isRequired,
		// }).isRequired,
		// action
		action: PropTypes.shape({
			updateSessionDetail: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		onAfterAdd: f => f,
	}

	state = {
		visible: false,
		confirmLoading: false,
		comment: '',
	}

	handleShowModal = () => {
		this.setState({
			visible: true,
			confirmLoading: false,
		});
	}
	handleOk = () => {
		if (this.state.comment && this.props.sessionDetailData.id) {
			this.setState({
				confirmLoading: true,
			});

			this.props.action.updateSessionDetail({ id: this.props.sessionDetailData.id, updatedAt: new Date(), comment: this.state.comment }, () => {
				notification.success({
					message: 'Congratulation',
					description: 'Add comment success!',
				});
				this.props.onAfterAdd();
				this.setState({
					visible: false,
				});
			}, () => {
				this.setState({
					confirmLoading: false,
				});
			});
		} else {
			this.setState({
				visible: false,
			});
		}
	}
	handleCancel = () => {
		this.setState({
			visible: false,
		});
	}

	handleChange = (val) => {
		this.setState({
			comment: val.target.value,
		});
	}

	render() {
		return (
			<div>
				<a onClick={this.handleShowModal}>
					Comment
				</a>
				<Modal
					title="Add Comment "
					visible={this.state.visible}
					confirmLoading={this.state.confirmLoading}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					okText="Add Comment"
					maskClosable={false}
					destroyOnClose
				>
					<Input.TextArea rows={4} onChange={this.handleChange} />
				</Modal>
			</div>
		);
	}
}
