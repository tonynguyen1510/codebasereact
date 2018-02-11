/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-11 15:31:46
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Menu, Dropdown, Spin, Icon, Popconfirm, notification } from 'antd';

import { updateUser, resendInvitation } from 'src/redux/actions/user';

function mapStateToProps(state) {
	return {
		// store: {
		// 	userList: state.user.userList,
		// },
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			updateUser,
			resendInvitation,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class BtnUserActionMore extends PureComponent {
	static propTypes = {
		userData: PropTypes.object.isRequired,
		// store
		// store: PropTypes.shape({
		// 	userList: PropTypes.object.isRequired,
		// }).isRequired,
		// action
		action: PropTypes.shape({
			updateUser: PropTypes.func.isRequired,
			resendInvitation: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {}

	state = {
		loading: false,
	}

	handleChangeStatusUser = (newStatus) => {
		const { id, status } = this.props.userData;

		if (id && status !== 'pending') {
			this.setState({
				loading: true,
			});
			this.props.action.updateUser({ id, status: newStatus, updatedAt: new Date() }, () => {
				notification.success({
					message: 'Congratulation',
					description: (newStatus === 'inactive' ? 'Deactivate' : 'Activate') + ' account success! Thank you.',
				});
				this.setState({
					loading: false,
				});
			}, () => {
				this.setState({
					loading: false,
				});
			});
		}
	}

	handleResendInvitation = () => {
		const { email, status } = this.props.userData;

		if (email && status === 'pending') {
			this.setState({
				loading: true,
			});
			this.props.action.resendInvitation({ email }, () => {
				notification.success({
					message: 'Congratulation',
					description: 'Invitation has been sent successfully! Thank you.',
				});
				this.setState({
					loading: false,
				});
			}, () => {
				this.setState({
					loading: false,
				});
			});
		}
	}

	render() {
		const { userData } = this.props;

		const menu = (
			<Menu>
				{
					userData.status === 'active' &&
					<Menu.Item key="0">
						<Popconfirm title="Are you sure？" onConfirm={() => this.handleChangeStatusUser('inactive')}>
							Deactivate Account
						</Popconfirm>
					</Menu.Item>
				}
				{
					userData.status === 'inactive' &&
					<Menu.Item key="0">
						<Popconfirm title="Are you sure？" onConfirm={() => this.handleChangeStatusUser('active')}>
							Active Account
						</Popconfirm>
					</Menu.Item>
				}
				{
					userData.status === 'pending' &&
					<Menu.Item key="1">
						<Popconfirm title="Are you sure？" onConfirm={() => this.handleResendInvitation()}>
							Resend Invitation
						</Popconfirm>
					</Menu.Item>
				}
			</Menu>
		);

		return (
			<Dropdown overlay={menu} trigger={['click']}>
				{
					this.state.loading ?
						<Spin /> :
						<a className="ant-dropdown-link">
							<Icon type="ellipsis" />
						</a>
				}
			</Dropdown>
		);
	}
}
