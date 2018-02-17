/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-07 11:14:46
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Icon } from 'antd';

import { Link } from 'src/routes';

import Avatar from 'src/components/Avatar';
import Badge from 'src/components/Badge';
import BtnUserActionMore from 'src/components/Form/BtnUserActionMore';

import { stylesheet, classNames } from './style.less';

const UserCard = (props) => {
	const { loading, userData } = props;

	if (loading) {
		return (
			<div className={classNames.root}>
				<div className={classNames.wrapper}>
					<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

					<div className={classNames.avatarWrapper}>
						<div className={classNames.avatar + ' loading-block'} />
						<div className={classNames.nameWrapper} style={{ marginTop: -2 }}>
							<div>
								<div className="loading-block" style={{ width: 100 }} />
							</div>
							<div className="loading-block" style={{ width: 50 }} />
						</div>
					</div>

					<div className={classNames.infoWrapper}>
						<div className={classNames.item} >
							<div className={classNames.label}>
								<div className="loading-block" />
							</div>
							<div className={classNames.value}>
								<div className="loading-block" />
							</div>
						</div>
						<div className={classNames.item} >
							<div className={classNames.label}>
								<div className="loading-block" />
							</div>
							<div className={classNames.value}>
								<div className="loading-block" />
							</div>
						</div>
						<div className={classNames.item} >
							<div className={classNames.label}>
								<div className="loading-block" />
							</div>
							<div className={classNames.value}>
								<div className="loading-block" />
								<div className="loading-block" />
							</div>
						</div>
						<div className={classNames.item} >
							<div className={classNames.label}>
								<div className="loading-block" />
							</div>
							<div className={classNames.value}>
								<div className="loading-block" />
								<div className="loading-block" />
							</div>
						</div>
						{/* <div className={classNames.item} >
							<div className={classNames.label}>
								<div className="loading-block" />
							</div>
							<div className={classNames.value}>
								<div className="loading-block" />
								<div className="loading-block" />
								<div className="loading-block" />
							</div>
						</div> */}
					</div>
					<div className={classNames.control}>
						<div className={classNames.controlItem}>
							<div className="loading-block" />
						</div>
						<div className={classNames.controlItem}>
							<div className="loading-block" />
						</div>
						<div className={classNames.controlItem}>
							<div className="loading-block" />
						</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className={classNames.root}>
			<div className={classNames.wrapper}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

				<div className={classNames.avatarWrapper}>
					<Avatar size="large" src={userData.avatar} />
					<div className={classNames.nameWrapper}>
						<h4>{userData.fullName}</h4>
						{/* <i>{userData.role}</i> */}
						<Badge type={userData.status === 'active' ? 'success' : userData.status === 'inactive' ? 'error' : 'warning'}>
							{userData.status}
						</Badge>
					</div>
				</div>

				<div className={classNames.infoWrapper}>
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
					{/* <div className={classNames.item} >
						<div className={classNames.label}>
							<Icon type="check-circle-o" />
							Status:
						</div>
						<div className={classNames.value}>
							<Badge type={userData.status === 'active' ? 'success' : userData.status === 'inactive' ? 'error' : 'warning'}>
								{userData.status}
							</Badge>
						</div>
					</div> */}
					{/* <div className={classNames.item} >
						<div className={classNames.label}>
							<Icon type="environment-o" />
							Address:
						</div>
						<div className={classNames.value}>
							115 Vo Van Tan
						</div>
					</div>
					<div className={classNames.item} >
						<div className={classNames.label}>
							<Icon type="calendar" />
							Entry Test Date:
						</div>
						<div className={classNames.value}>2018-02-07</div>
					</div>
					<div className={classNames.item} >
						<div className={classNames.label}>
							<Icon type="solution" />
							Entry Test Result:
						</div>
						<div className={classNames.value}>5.0</div>
					</div>
					<div className={classNames.item} >
						<div className={classNames.label}>
							<Icon type="scan" />
							Expected Target:
						</div>
						<div className={classNames.value}>8.0</div>
					</div>
					<div className={classNames.item} >
						<div className={classNames.label}>
							<Icon type="facebook" />
							Facebook:
						</div>
						<div className={classNames.value}>
							<a href="http://facebook.com" target="_blank" rel="noopener noreferrer">Đức Tiến</a>
						</div>
					</div>
					<div className={classNames.item} >
						<div className={classNames.label}>
							<Icon type="form" />
							Note:
						</div>
						<div className={classNames.value}>
							dents do not go to class within one week - they will automatically receive an email. If students do not to go class within 2 weeks - for each week absent they will have 2 LESSONS REMOVED. Consultant and teacher should
						</div>
					</div> */}
				</div>
				<div className={classNames.control}>
					<div className={classNames.controlItem}>
						<Link route={'/' + userData.role + '/' + userData.id}>
							<a>
								<Icon type="eye-o" />
							</a>
						</Link>
					</div>
					<div className={classNames.controlItem}>
						<Link route={'/' + userData.role + '/edit/' + userData.id}>
							<a>
								<Icon type="edit" />
							</a>
						</Link>
					</div>
					<div className={classNames.controlItem}>
						<BtnUserActionMore userData={userData} />
					</div>
				</div>
			</div>
		</div>
	);
};

UserCard.propTypes = {
	loading: PropTypes.bool,
	userData: PropTypes.object,
};

UserCard.defaultProps = {
	loading: false,
	userData: {},
};

export default UserCard;
