/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-11 15:31:46
*------------------------------------------------------- */

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Menu, Dropdown, Spin, Icon, Popconfirm, notification, Modal } from 'antd';

import { updateUser, resendInvitation } from 'src/redux/actions/user';
import { updateStudent } from 'src/redux/actions/student';

import SelectLevel from 'src/components/Form/SelectLevel';

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
			updateStudent,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class BtnUserActionMore extends PureComponent {
	static propTypes = {
		userData: PropTypes.object.isRequired,
		root: PropTypes.node,
		// store
		// store: PropTypes.shape({
		// 	userList: PropTypes.object.isRequired,
		// }).isRequired,
		// action
		action: PropTypes.shape({
			updateUser: PropTypes.func.isRequired,
			resendInvitation: PropTypes.func.isRequired,
			updateStudent: PropTypes.func.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		root: undefined,
	}

	state = {
		loading: false,
		level: '',
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
					description: (newStatus === 'inactive' ? 'Deactivate' : 'Activate') + ' account success!',
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

	handleChangeStatusStudent = (newStatus) => {
		const { id } = this.props.userData;

		if (id) {
			this.setState({
				loading: true,
			});
			this.props.action.updateStudent({ id, status: newStatus, updatedAt: new Date() }, () => {
				notification.success({
					message: 'Congratulation',
					description: 'Change status success!',
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
					description: 'Invitation has been sent successfully!',
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

	handleAssign = () => {
		Modal.confirm({
			title: 'Assign into a level',
			content: (
				<div style={{ margin: '30px 0' }}>
					Select a level:
					<SelectLevel
						defaultValue={this.props.userData.levelName || ''}
						style={{ width: 200, marginLeft: 15 }}
						onChange={(level) => this.setState({ level })}
					/>
				</div>
			),
			onOk: () => {
				const { id, levelName } = this.props.userData;

				if (id && this.state.level !== levelName) {
					this.setState({
						loading: true,
					});
					this.props.action.updateStudent({ id, levelName: this.state.level, updatedAt: new Date() }, () => {
						notification.success({
							message: 'Congratulation',
							description: 'Assign into a level success!',
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
			},
			onCancel() {
				// console.log('Cancel');
			},
		});
	}

	handleSelectMenu = ({ key }) => {
		Modal.confirm({
			title: 'Are you sure?',
			onOk: () => {
				if (key === 'resendInvitation') {
					this.handleResendInvitation();
				} else {
					this.handleChangeStatusUser(key);
				}
			},
		});
	}

	handleSelectMenuStudent = ({ key }) => {
		Modal.confirm({
			title: 'Are you sure?',
			onOk: () => {
				if (key === 'assign') {
					this.handleAssign();
				} else {
					this.handleChangeStatusStudent(key);
				}
			},
		});
	}

	render() {
		const { userData, root } = this.props;

		const menu = userData.role ? (
			<Menu onClick={this.handleSelectMenu}>
				{
					userData.status === 'active' &&
					<Menu.Item key="inactive">
						Deactivate Account
					</Menu.Item>
				}
				{
					userData.status === 'inactive' &&
					<Menu.Item key="active">
						Active Account
					</Menu.Item>
				}
				{
					userData.status === 'pending' &&
					<Menu.Item key="resendInvitation">
						Resend Invitation
					</Menu.Item>
				}
			</Menu>
		) : (
			<Menu onClick={this.handleSelectMenuStudent}>
				<Menu.SubMenu title="Change status">
					<Menu.Item disabled={userData.status === 'inquiring'} key="inquiring">
						Course inquiring
					</Menu.Item>
					<Menu.Item disabled={userData.status === 'tested'} key="tested">
						Tested and consulted
					</Menu.Item>
					<Menu.Item disabled={userData.status === 'studying'} key="studying">
						Studying
					</Menu.Item>
					<Menu.Item disabled={userData.status === 'finished'} key="finished">
						Course finished
					</Menu.Item>
					<Menu.Item disabled={userData.status === 'suspending'} key="suspending">
						Suspending
					</Menu.Item>
					<Menu.Item disabled={userData.status === 'old'} key="old">
						Old students
					</Menu.Item>
				</Menu.SubMenu>
				<Menu.Item key="assign">
					Assign into a level
				</Menu.Item>
			</Menu>
		);

		return (
			<Dropdown overlay={menu} trigger={['click']} >
				{
					this.state.loading ?
						<Spin /> :
						<a className="ant-dropdown-link">
							{
								root ?
									root :
									<Icon type="ellipsis" />
							}
						</a>
				}
			</Dropdown>
		);
	}
}
