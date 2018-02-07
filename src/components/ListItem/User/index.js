/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-07 15:50:58
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

import Avatar from 'src/components/Avatar';

import { stylesheet, classNames } from './style.less';

const UserListItem = (props) => {
	const { loading } = props;

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
				</div>
				<div className={classNames.tr}>
					<div className={classNames.item} >
						<div className={classNames.label}>
							<div className="loading-block" />
						</div>
						<div className={classNames.value}>
							<p><div className="loading-block" /></p>
							<p><div className="loading-block" /></p>
						</div>
					</div>
				</div>
				<div className={classNames.tr}>
					<div className={classNames.item} >
						<div className={classNames.label}>
							<div className="loading-block" />
						</div>
						<div className={classNames.value}>
							<p><div className="loading-block" /></p>
							<p><div className="loading-block" /></p>
						</div>
					</div>
				</div>

			</div>
		);
	}

	return (
		<div className={classNames.root}>
			<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

			<div className={classNames.avatarWrapper}>
				<Avatar size="large" />
				<div className={classNames.nameWrapper}>
					<h4>Trần Đức Tiến</h4>
					<i>Consultor</i>
				</div>
			</div>

			<div className={classNames.tr}>
				<div className={classNames.item} >
					<div className={classNames.label}>
						<Icon type="calendar" />
						Birth Date:
					</div>
					<div className={classNames.value}>1992-02-07</div>
				</div>
				<div className={classNames.item} >
					<div className={classNames.label}>
						<Icon type="user" />
						Gender:
					</div>
					<div className={classNames.value}>Male</div>
				</div>
			</div>
			<div className={classNames.tr}>
				<div className={classNames.item} >
					<div className={classNames.label}>
						<Icon type="mail" />
						Email:
					</div>
					<div className={classNames.value}>
						<p>ductien@gmail.com</p>
						<p>ductienas@gmail.com</p>
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
						<p>1223123213</p>
						<p>1212321323</p>
					</div>
				</div>
			</div>

		</div>
	);
};

UserListItem.propTypes = {
	loading: PropTypes.bool,
};

UserListItem.defaultProps = {
	loading: false,
};

export default UserListItem;
