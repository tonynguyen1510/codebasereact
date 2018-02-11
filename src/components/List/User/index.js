/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-08 00:53:17
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Button, Row, Col, Pagination } from 'antd';

import UserCard from 'src/components/Card/User';
import UserListItem from 'src/components/ListItem/User';

import { stylesheet, classNames } from './style.less';

export default class UserList extends PureComponent {
	static propTypes = {
		children: PropTypes.node,
		userList: PropTypes.object.isRequired,
		onChangePagination: PropTypes.func,
	}

	static defaultProps = {
		children: null,
		onChangePagination: f => f,
	}

	state = {
		viewMode: 'grid',
	}

	handleChangeViewMode = (type) => {
		this.setState({
			viewMode: type,
		});
	}

	handleChange = (page) => {
		this.props.onChangePagination(page - 1);
	}

	render() {
		const { children, userList = {} } = this.props;

		return (
			<div className={classNames.root}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

				<div className={classNames.control}>
					<div className={classNames.controlRender}>
						{
							children
						}
					</div>
					<div>
						<Button type={this.state.viewMode === 'grid' ? 'primary' : ''} shape="circle" icon="appstore-o" onClick={() => this.handleChangeViewMode('grid')} style={{ marginRight: 5 }} />
						<Button type={this.state.viewMode === 'list' ? 'primary' : ''} shape="circle" icon="bars" onClick={() => this.handleChangeViewMode('list')} />
					</div>
				</div>

				{
					this.state.viewMode === 'grid' ?
						<Row gutter={15}>
							{
								!userList.loading ?
									userList.data.map((user) => {
										return (
											<Col md={12} xl={8} key={user.id}>
												<UserCard userData={user} />
											</Col>
										);
									}) :
									[1, 1, 1, 1, 1, 1, 1, 1, 1].map((el, i) => {
										return (
											<Col md={12} xl={8} key={i}>
												<UserCard loading />
											</Col>
										);
									})
							}
						</Row> :
						<div className={classNames.list}>
							{
								!userList.loading ?
									userList.data.map((user) => {
										return (
											<UserListItem
												key={user.id}
												userData={user}
											/>
										);
									}) :
									[1, 1, 1, 1, 1, 1, 1, 1, 1].map((el, i) => {
										return (
											<UserListItem
												key={i}
												loading
											/>
										);
									})
							}
						</div>
				}
				<Pagination
					className={classNames.pagination}
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
					pageSize={userList.limit}
					defaultCurrent={1}
					current={(userList.skip / userList.limit) + 1}
					total={userList.total}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}
