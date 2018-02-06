/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-06 10:59:53
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Popover, Icon, Divider, Button, Badge, Avatar, Menu, Dropdown } from 'antd';

import MdMoreVert from 'react-icons/lib/md/more-vert';

import { stylesheet, classNames } from './style.less';

const menu = (
	<Menu>
		<Menu.Item key="0">
			Hide this notification
		</Menu.Item>
		<Menu.Item key="1">
			Mark as Read
		</Menu.Item>
	</Menu>
);

const content = (
	<div className={classNames.content}>
		<div className={classNames.item + ' ' + classNames.unread}>
			<Avatar icon="notification" size="large" />
			<div className={classNames.text}>
				<p>Image, Icon and letter are supported, and the latter two kinds.</p>
				<span>2018-02-06 11:21:10</span>
			</div>
			<div className={classNames.control}>
				<Dropdown overlay={menu} trigger={['click']}>
					<a className="ant-dropdown-link" href="#">
						<MdMoreVert />
					</a>
				</Dropdown>
			</div>
		</div>
		<div className={classNames.item}>
			<Avatar icon="notification" size="large" />
			<div className={classNames.text}>
				<p>Image, Icon and letter are supported.</p>
				<span>2018-02-06 11:21:10</span>
			</div>
			<div className={classNames.control}>
				<Dropdown overlay={menu} trigger={['click']}>
					<a className="ant-dropdown-link" href="#">
						<MdMoreVert />
					</a>
				</Dropdown>
			</div>
		</div>
		<div className={classNames.item}>
			<Avatar icon="notification" size="large" />
			<div className={classNames.text}>
				<p>Image, Icon and letter are supported.</p>
				<span>2018-02-06 11:21:10</span>
			</div>
			<div className={classNames.control}>
				<Dropdown overlay={menu} trigger={['click']}>
					<a className="ant-dropdown-link" href="#">
						<MdMoreVert />
					</a>
				</Dropdown>
			</div>
		</div>
		<div className={classNames.item}>
			<Avatar icon="notification" size="large" />
			<div className={classNames.text}>
				<p>Image, Icon and letter are supported, and the latter two kinds.</p>
				<span>2018-02-06 11:21:10</span>
			</div>
			<div className={classNames.control}>
				<Dropdown overlay={menu} trigger={['click']}>
					<a className="ant-dropdown-link" href="#">
						<MdMoreVert />
					</a>
				</Dropdown>
			</div>
		</div>
		<div className={classNames.item}>
			<Avatar icon="notification" size="large" />
			<div className={classNames.text}>
				<p>Image, Icon and letter are supported, and the latter two kinds.</p>
				<span>2018-02-06 11:21:10</span>
			</div>
			<div className={classNames.control}>
				<Dropdown overlay={menu} trigger={['click']}>
					<a className="ant-dropdown-link" href="#">
						<MdMoreVert />
					</a>
				</Dropdown>
			</div>
		</div>
		<div className={classNames.item}>
			<Avatar icon="notification" size="large" />
			<div className={classNames.text}>
				<p>Image, Icon and letter are supported, and the latter two kinds.</p>
				<span>2018-02-06 11:21:10</span>
			</div>
			<div className={classNames.control}>
				<Dropdown overlay={menu} trigger={['click']}>
					<a className="ant-dropdown-link" href="#">
						<MdMoreVert />
					</a>
				</Dropdown>
			</div>
		</div>
		<div className={classNames.item}>
			<Avatar icon="notification" size="large" />
			<div className={classNames.text}>
				<p>Image, Icon and letter are supported, and the latter two kinds.</p>
				<span>2018-02-06 11:21:10</span>
			</div>
			<div className={classNames.control}>
				<Dropdown overlay={menu} trigger={['click']}>
					<a className="ant-dropdown-link" href="#">
						<MdMoreVert />
					</a>
				</Dropdown>
			</div>
		</div>
	</div>
);

const title = (
	<div className={classNames.title}>
		<div>Notifications</div>
		<a href="#">Mark All as Read</a>
	</div>
);

const NotiWidget = (props) => {
	return (
		<Popover content={content} title={title} trigger="click" placement="bottomRight">
			<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

			<Badge dot className={classNames.badge}>
				<Button shape="circle" icon="notification" className={classNames.btnIcon} />
			</Badge>
		</Popover>
	);
};

NotiWidget.propTypes = {
	// classes: PropTypes.object.isRequired,
};

NotiWidget.defaultProps = {
	// classes: {},
};

export default NotiWidget;
