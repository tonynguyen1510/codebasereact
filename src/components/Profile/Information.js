/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-17 09:41:28
*------------------------------------------------------- */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Icon } from 'antd';

import Badge from 'src/components/Badge';

import { classNames } from './style.less';

const Information = (props) => {
	const { userData, loading } = props;
	if (loading) {
		return (
			<div className={classNames.infoWrapper}>
				<div className={classNames.item}>
					<div className={classNames.left}>
						<div className="loading-block" />
					</div>
					<div className={classNames.right}>
						<div className="loading-block" />
					</div>
				</div>
				<div className={classNames.item}>
					<div className={classNames.left}>
						<div className="loading-block" />
					</div>
					<div className={classNames.right}>
						<div className="loading-block" />
					</div>
				</div>
				<div className={classNames.item}>
					<div className={classNames.left}>
						<div className="loading-block" />
					</div>
					<div className={classNames.right}>
						<div className="loading-block" />
					</div>
				</div>
				<div className={classNames.item}>
					<div className={classNames.left}>
						<div className="loading-block" />
					</div>
					<div className={classNames.right}>
						<div className="loading-block" />
					</div>
				</div>
				<div className={classNames.item}>
					<div className={classNames.left}>
						<div className="loading-block" />
					</div>
					<div className={classNames.right}>
						<div><div className="loading-block" /></div>
						<div><div className="loading-block" /></div>
					</div>
				</div>
				<div className={classNames.item}>
					<div className={classNames.left}>
						<div className="loading-block" />
					</div>
					<div className={classNames.right}>
						<div className="loading-block" />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={classNames.infoWrapper}>
			<div className={classNames.item}>
				<div className={classNames.left}>
					<Icon type="smile-o" />
					Status:
				</div>
				<div className={classNames.right}>
					{
						userData.role ?
							<Badge type={userData.status === 'active' ? 'success' : userData.status === 'inactive' ? 'error' : 'warning'}>
								{userData.status}
							</Badge> :
							<Badge type={userData.status === 'studying' ? 'success' : userData.status === 'finished' ? 'warning' : userData.status === 'old' ? 'default' : userData.status === 'suspending' ? 'error' : 'info'}>
								{userData.status}
							</Badge>
					}
				</div>
			</div>
			{
				!userData.role &&
				<div className={classNames.item}>
					<div className={classNames.left}>
						<Icon type="calendar" />
						Level:
					</div>
					<div className={classNames.right}>
						{userData.levelName || '-'}
					</div>
				</div>
			}
			<div className={classNames.item}>
				<div className={classNames.left}>
					<Icon type="calendar" />
					Created:
				</div>
				<div className={classNames.right}>
					{userData.createdAt ? moment(userData.createdAt).format('DD-MM-YYYY') : '-'}
				</div>
			</div>
			<div className={classNames.item}>
				<div className={classNames.left}>
					<Icon type="mail" />
					Email:
				</div>
				<div className={classNames.right}>
					{userData.email || '-'}
				</div>
			</div>
			<div className={classNames.item}>
				<div className={classNames.left}>
					<Icon type="calendar" />
					Birth Date:
				</div>
				<div className={classNames.right}>
					{userData.birthDate ? moment(userData.birthDate).format('DD-MM-YYYY') : '-'}
				</div>
			</div>
			<div className={classNames.item}>
				<div className={classNames.left}>
					<Icon type="user" />
					Gender:
				</div>
				<div className={classNames.right}>
					{userData.gender || '-'}
				</div>
			</div>
			<div className={classNames.item}>
				<div className={classNames.left}>
					<Icon type="phone" />
					Phone:
				</div>
				<div className={classNames.right}>
					<p>{userData.phone && userData.phone[0] ? userData.phone[0] : '-'}</p>
					<p>{userData.phone && userData.phone[1] ? userData.phone[1] : '-'}</p>
				</div>
			</div>
			<div className={classNames.item}>
				<div className={classNames.left}>
					<Icon type="environment-o" />
					Address:
				</div>
				<div className={classNames.right}>
					{userData.address || '-'}
				</div>
			</div>
			{
				!userData.role &&
				<Fragment>
					<div className={classNames.item}>
						<div className={classNames.left}>
							<Icon type="calendar" />
							Entry Test Date:
						</div>
						<div className={classNames.right}>
							{userData.entryTest && userData.entryTest.date ? moment(userData.entryTest.date).format('DD-MM-YYYY') : '-'}
						</div>
					</div>

					<div className={classNames.item}>
						<div className={classNames.left}>
							<Icon type="solution" />
							Entry Test Result:
						</div>
						<div className={classNames.right}>
							{userData.entryTest && userData.entryTest.result ? userData.entryTest.result : '-'}
						</div>
					</div>
					<div className={classNames.item}>
						<div className={classNames.left}>
							<Icon type="scan" />
							Expected Target:
						</div>
						<div className={classNames.right}>
							{userData.expectedTarget || '-'}
						</div>
					</div>
				</Fragment>
			}
			<div className={classNames.item}>
				<div className={classNames.left}>
					<Icon type="facebook" />
					Facebook:
				</div>
				<div className={classNames.right}>
					{
						userData.facebook && userData.facebook.link ?
							<a href={userData.facebook.link} target="_blank" rel="noopener noreferrer">{userData.facebook.name}</a> :
							'-'
					}
				</div>
			</div>
			<div className={classNames.item}>
				<div className={classNames.left}>
					<Icon type="form" />
					Description:
				</div>
				<div className={classNames.right}>
					{userData.desc || '-'}
				</div>
			</div>

		</div>
	);
};

Information.propTypes = {
	userData: PropTypes.object.isRequired,
	loading: PropTypes.bool,
};

Information.defaultProps = {
	loading: false,
};

export default Information;
