/* --------------------------------------------------------
* Author Ngo An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-02-09 11:27:16
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import CKEditor from "react-ckeditor-component";
import { Form, Select, Input, Button } from 'antd';

import { upsertNote, getNotes } from 'src/redux/actions/note';

const FormItem = Form.Item;

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			upsertNote,
			getNotes,
		}, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		store: {
			noteObject: state.note.noteInfo,
		},
	};
};
@Form.create()
@connect(mapStateToProps, mapDispatchToProps)

export default class NoteAction extends Component {
	static propTypes = {
		form: PropTypes.object.isRequired,
		noteId: PropTypes.string,
		// store
		store: PropTypes.shape({
			noteObject: PropTypes.object.isRequired,
		}).isRequired,
		// action
		actions: PropTypes.shape({
			upsertNote: PropTypes.func.isRequired,
			getNotes: PropTypes.func.isRequired,
		}).isRequired,
	}
	state = {
		loading: false,
		content: this.props.noteId ? this.props.store.noteObject.content : '',
	}
	componentWillMount = () => {
	};

	componentDidMount() {
		if (this.props.noteId) {
			this.props.form.setFieldsValue({
				name: this.props.store.noteObject.name || '',
				description: this.props.store.noteObject.description || '',
				language: this.props.store.noteObject.language || '',
				keyword: this.props.store.noteObject.keyword || '',
				content: this.props.store.noteObject.content || '',
			});
		}
	}
	onChange = (e) => {
		const newContent = e.editor.getData();
		this.setState({ content: newContent });
	}
	filter = {
		skip: 0,
		limit: 6,
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const data = { ...values, updatedAt: new Date(), id: this.props.noteId, content: this.state.content };
				this.setState({
					loading: true,
				});
				this.props.actions.upsertNote(data, () => {
					this.props.actions.getNotes({ filter: this.filter }, Router.push('/'));
				}, () => {
					this.setState({
						loading: false,
					});
				});
			}
		});
	}
	render() {
		const { form: { getFieldDecorator } } = this.props;
		return (
			<Form layout="horizontal" onSubmit={this.handleSubmit} style={{ margin: '100px 0' }}>
				<FormItem
					label="language"
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 18 }}
				>
					{getFieldDecorator('language', {
						rules: [{ required: true, message: 'Please input language!' }],
					})(
						<Input
							size="large"
							placeholder="language"
						/>,
					)}
				</FormItem>
				<FormItem
					label="Name"
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 18 }}
				>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: 'Please input name!' }],
					})(
						<Input
							size="large"
							placeholder="Name"
						/>,
					)}
				</FormItem>
				<FormItem
					label="description"
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 18 }}
				>
					{getFieldDecorator('description', {
						rules: [{ required: true, message: 'Please input description!' }],
					})(
						<Input
							size="large"
							placeholder="description"
						/>,
					)}
				</FormItem>
				<FormItem
					label="keyword"
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 18 }}
				>
					{getFieldDecorator('keyword', {
						rules: [{ required: true, message: 'Please input description!' }],
					})(
						<Input
							size="large"
							placeholder="keyword"
						/>,
					)}
				</FormItem>
				<FormItem
					label="content"
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 18 }}
				>
					{getFieldDecorator('content', {
						rules: [{ required: true, message: 'Please input content!' }],
					})(
						<CKEditor
							events={{
								'change': this.onChange
							}}
							content={this.state.content}
						/>,
					)}
				</FormItem>
				<Form.Item
					style={{ marginTop: 48 }}
					wrapperCol={{ span: 8, offset: 8 }}
				>
					<Button size="large" type="primary" htmlType="submit" loading={this.state.loading}>
						Submit
					</Button>
					<Button size="large" style={{ marginLeft: 8 }} onClick={() => Router.push('/')}>
						Cancel
					</Button>
				</Form.Item>
			</Form>
		);
	}
}
