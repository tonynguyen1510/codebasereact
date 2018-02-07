/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-08 00:53:17
*------------------------------------------------------- */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Button, DatePicker, Input, Pagination, Select } from 'antd';

import UserCard from 'src/components/Card/User';
import UserListItem from 'src/components/ListItem/User';

import { stylesheet, classNames } from './style.less';

const { RangePicker } = DatePicker;
const { Search } = Input;

export default class UserList extends PureComponent {
	static propTypes = {
		// classes: PropTypes.object.isRequired,
	}

	static defaultProps = {}

	state = {
		viewMode: 'grid',
	}

	handleChangeViewMode = (type) => {
		this.setState({
			viewMode: type,
		});
	}

	render() {
		const {  } = this.props;

		return (
			<div className={classNames.root}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />

				<div className={classNames.control}>
					<div>
						<Search
							placeholder="input search text"
							onSearch={value => console.log(value)}
							style={{ width: 200 }}
						/>
					</div>
					<div>Created at: <RangePicker style={{ marginLeft: 10 }} /></div>
					<div>
						Gender:
						<Select defaultValue="all" style={{ marginLeft: 10 }}>
							<Select.Option value="all">All</Select.Option>
							<Select.Option value="male">Male</Select.Option>
							<Select.Option value="female">Female</Select.Option>
						</Select>
					</div>
					<div>
						<Button type={this.state.viewMode === 'grid' ? 'primary' : ''} shape="circle" icon="appstore-o" onClick={() => this.handleChangeViewMode('grid')} style={{ marginRight: 5 }} />
						<Button type={this.state.viewMode === 'list' ? 'primary' : ''} shape="circle" icon="bars" onClick={() => this.handleChangeViewMode('list')} />
					</div>
				</div>

				{
					this.state.viewMode === 'grid' ?
						<div className={classNames.grid}>
							<UserCard />
							<UserCard loading />
							<UserCard loading />
						</div> :
						<div className={classNames.list}>
							<UserListItem />
							<UserListItem loading />
							<UserListItem loading />
						</div>
				}
				<Pagination
					className={classNames.pagination}
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
					pageSize={20}
					defaultCurrent={1}
					total={70}
				/>
			</div>
		);
	}
}
