/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-07 11:14:46
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

import Avatar from 'src/components/Avatar';

import { stylesheet, classNames } from './style.less';

const UserCard = (props) => {
	const { loading } = props;

	if (loading) {
		return (
			<div className={classNames.root}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

				<div className={classNames.avatarWrapper}>
					<div className={classNames.avatar + ' loading-block'} />
					<div className={classNames.nameWrapper}>
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
					<div className={classNames.item} >
						<div className={classNames.label}>
							<div className="loading-block" />
						</div>
						<div className={classNames.value}>
							<div className="loading-block" />
							<div className="loading-block" />
							<div className="loading-block" />
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
				<Avatar size="large" src="https://yt3.ggpht.com/-DxJSAKyWCE4/AAAAAAAAAAI/AAAAAAAAAAA/M8DxVGU-fR0/s88-c-k-no-mo-rj-c0xffffff/photo.jpg" />
				<div className={classNames.nameWrapper}>
					<h4>Trần Đức Tiến</h4>
					<i>Consultor</i>
				</div>
			</div>

			<div className={classNames.infoWrapper}>
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
				<div className={classNames.item} >
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
				</div>
			</div>
		</div>
	);
};

UserCard.propTypes = {
	loading: PropTypes.bool,
};

UserCard.defaultProps = {
	loading: false,
};

export default UserCard;
