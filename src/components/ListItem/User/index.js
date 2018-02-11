/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-07 15:50:58
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Icon, Button, Divider } from 'antd';

import { Link } from 'src/routes';

import Avatar from 'src/components/Avatar';
import Badge from 'src/components/Badge';
import BtnUserActionMore from 'src/components/Form/BtnUserActionMore';

import { stylesheet, classNames } from './style.less';

const UserListItem = (props) => {
	const { loading, userData } = props;

	if (loading) {
		return (
			<div className={classNames.root}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

				<div className={classNames.avatarWrapper}>
					<div className={classNames.avatar + ' loading-block'} />
					<div className={classNames.nameWrapper}>
						<div>
							<div className="loading-block" style={{ width: '80%' }} />
						</div>
						<div className="loading-block" style={{ width: '50%' }} />
					</div>
				</div>

				<div className={classNames.tr}>
					<div className={classNames.item} >
						<div className={classNames.label} style={{ flex: 1 }}>
							<div className="loading-block" />
						</div>
						<div className={classNames.value} style={{ flex: 3 }}>
							<div className="loading-block" />
						</div>
					</div>
					<div className={classNames.item} >
						<div className={classNames.label} style={{ flex: 1 }}>
							<div className="loading-block" />
						</div>
						<div className={classNames.value} style={{ flex: 3 }}>
							<div className="loading-block" />
						</div>
					</div>
				</div>
				<div className={classNames.tr}>
					<div className={classNames.item} >
						<div className={classNames.label} style={{ flex: 1 }}>
							<div className="loading-block" />
						</div>
						<div className={classNames.value} style={{ flex: 3 }}>
							<div className="loading-block" />
							<div className="loading-block" />
						</div>
					</div>
				</div>
				<div className={classNames.tr}>
					<div className={classNames.item} >
						<div className={classNames.label} style={{ flex: 1 }}>
							<div className="loading-block" />
						</div>
						<div className={classNames.value} style={{ flex: 3 }}>
							<div className="loading-block" />
							<div className="loading-block" />
						</div>
					</div>
				</div>
				<div className={classNames.tr} style={{ width: 140, flex: 'none', textAlign: 'right' }}>
					<div style={{ width: 20 }} className="loading-block" />
					<Divider type="vertical" />
					<div style={{ width: 20 }} className="loading-block" />
					<Divider type="vertical" />
					<div style={{ width: 20 }} className="loading-block" />
				</div>
			</div>
		);
	}

	return (
		<div className={classNames.root}>
			<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

			<div className={classNames.avatarWrapper}>
				<Avatar size="large" src={userData.avatar} />
				<div className={classNames.nameWrapper}>
					<h4>{userData.fullName}</h4>
					<Badge type={userData.status === 'active' ? 'success' : userData.status === 'inactive' ? 'error' : 'warning'}>
						{userData.status}
					</Badge>
				</div>
			</div>

			<div className={classNames.tr}>
				<div className={classNames.item} >
					<div className={classNames.label}>
						<Icon type="calendar" />
						Birth Date:
					</div>
					<div className={classNames.value}>{userData.birthDate ? moment(userData.birthDate).format('DD-MM-YYYY') : '-'}</div>
				</div>
				<div className={classNames.item} >
					<div className={classNames.label}>
						<Icon type="user" />
						Gender:
					</div>
					<div className={classNames.value}>{userData.gender || '-'}</div>
				</div>
			</div>
			<div className={classNames.tr}>
				<div className={classNames.item} >
					<div className={classNames.label}>
						<Icon type="mail" />
						Email:
					</div>
					<div className={classNames.value}>
						<p>{userData.email || '-'}</p>
						{/* <p>ductienas@gmail.com</p> */}
					</div>
				</div>
			</div>
			<div className={classNames.tr}>
				<div className={classNames.item} >
					<div className={classNames.label}>
						<Icon type="phone" />
						Phone:
					</div>
					<div className={classNames.value}>
						<p>{userData.phone && userData.phone[0] ? userData.phone[0] : '-'}</p>
						<p>{userData.phone && userData.phone[1] ? userData.phone[1] : '-'}</p>
					</div>
				</div>
			</div>

			<div className={classNames.tr + ' ' + classNames.actionWrapper}>
				<div className={classNames.action}>
					<Link route="/class/1223">
						<a>
							<Icon type="eye-o" />
						</a>
					</Link>
				</div>
				<Divider type="vertical" />
				<div className={classNames.action}>
					<Link route="/class/edit/1223">
						<a>
							<Icon type="edit" />
						</a>
					</Link>
				</div>
				<Divider type="vertical" />
				<div className={classNames.action}>
					<BtnUserActionMore userData={userData} />
				</div>
			</div>

		</div>
	);
};

UserListItem.propTypes = {
	loading: PropTypes.bool,
	userData: PropTypes.object,
};

UserListItem.defaultProps = {
	loading: false,
	userData: {},
};

export default UserListItem;
