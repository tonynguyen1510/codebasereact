/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-06 01:31:14
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Icon, Input, Col, Divider } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from 'next/link';
import { logoutRequest } from 'src/redux/actions/auth';
import { getNoteInfo, getNotes } from 'src/redux/actions/note';
import { stylesheet, classNames } from './style.less';
const Search = Input.Search;

function mapStateToProps(state) {
	return {
		store: {
			auth: state.auth,
			noteList: state.note.noteList,
		},
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			logoutRequest,
			getNoteInfo,
			getNotes,
		}, dispatch),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SideBar extends Component {
	static propTypes = {
		store: PropTypes.shape({
			noteList: PropTypes.object.isRequired,
		}).isRequired,
		actions: PropTypes.shape({
			getNoteInfo: PropTypes.func.isRequired,
			logoutRequest: PropTypes.func.isRequired,
			getNotes: PropTypes.func.isRequired,
		}).isRequired,
	}

	componentWillMount = () => {

	};
	filter = {
		skip: 0,
		limit: 6,
	}
	handleSearch = (value) => {
		this.filter.where = {
			"or": [
				{ "name": { "like": ".*" + value + ".*" } },
				{ "keyword": { "like": ".*" + value + ".*" } }
			]
		}
		this.props.actions.getNotes({ filter: this.filter });
	}
	renderItem = (item) => {
		return (
			<List.Item style={{ fontSize: 12 }} className={classNames.item} onClick={() => this.props.actions.getNoteInfo({ id: item.id })} >
				<List.Item.Meta
					title={item.name}
					description={(item.language || '') + '  ' + (item.keyword || '')}
				/>
			</List.Item>
		);
	}


	render() {
		const { noteList } = this.props.store;

		return (
			<Col span={4} className={classNames.root}>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<br />
				<Search
					placeholder="input search text"
					onSearch={this.handleSearch}
					style={{ width: 200 }}
				/>
				<Divider />
				<List
					bordered
					dataSource={noteList.data ? noteList.data : []}
					renderItem={this.renderItem}
				/>
				<Divider />
			</Col>
		);
	}
}
