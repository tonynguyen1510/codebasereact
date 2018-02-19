/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-19 00:32:44
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Button } from 'antd';

import { Link } from 'src/routes';

import Badge from 'src/components/Badge';

import { classNames } from './style.less';

const LevelInfo = (props) => {
	const { levelData, loading } = props;
	if (loading) {
		return (
			<div className={classNames.infoWrapper}>
				<h2>
					<div className="loading-block" style={{ width: 100, height: 30 }} />
				</h2>
				<div className={classNames.time}>
					<div className="loading-block" style={{ width: 300 }} />
				</div>
				<div className={classNames.time}>
					<div className="loading-block" style={{ width: 300 }} />
				</div>

				<div className={classNames.desc}>
					<div className="loading-block" />
					<div className="loading-block" />
				</div>
			</div>
		);
	}

	return (
		<div className={classNames.infoWrapper}>
			<div className={classNames.control}>
				<Link route={'/level/edit/' + levelData.id}>
					<Button type="primary" shape="circle" icon="edit" />
				</Link>
			</div>
			<h2>
				{levelData.name}
				<Badge type={levelData.status === 'active' ? 'success' : 'error'} style={{ marginLeft: 15 }}>
					{levelData.status}
				</Badge>
			</h2>
			<div className={classNames.time}>
				<strong>Created At:</strong> {moment(levelData.createdAt).format('DD-MM-YYYY HH:mm')}
			</div>
			<div className={classNames.time}>
				<strong>Updated At:</strong> {moment(levelData.UpdatedAt).format('DD-MM-YYYY HH:mm')}
			</div>

			<div className={classNames.desc}>
				<strong>Description:</strong>
				{levelData.desc}
			</div>
		</div>
	);
};

LevelInfo.propTypes = {
	levelData: PropTypes.object,
	loading: PropTypes.bool,
};

LevelInfo.defaultProps = {
	levelData: {},
	loading: false,
};

export default LevelInfo;
