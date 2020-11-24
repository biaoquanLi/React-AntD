import React from 'react'
import { Card, Button, Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjs from 'draftjs-to-html'
export default class Rich extends React.Component {
	state = {
		showRichContent: false,
		editorState: '',
		editorContent: '',
	}
	clearContent = () => {
		this.setState({
			editorState: '',
			editorContent: '',
		})
	}
	getHTMLContent = () => {
		this.setState({
			showRichContent: true,
		})
	}
	onEditorChange = (editorContent) => {
		console.log(111, editorContent)
		this.setState({
			editorContent,
		})
	}
	onEditorStateChange = (editorState) => {
		console.log(222, editorState)
		this.setState({
			editorState,
		})
	}
	render() {
		const { editorState, showRichContent, editorContent } = this.state
		return (
			<div style={{ width: '100%' }}>
				<Card>
					<Button
						type="primary"
						onClick={this.clearContent}
						style={{ marginRight: 10 }}
					>
						清空内容
					</Button>
					<Button type="primary" onClick={this.getHTMLContent}>
						获取HTML文本
					</Button>
				</Card>
				<Card title="富文本编辑器">
					<Editor
						editorState={editorState}
						toolbarClassName="toolbarClassName"
						wrapperClassName="wrapperClassName"
						editorClassName="editorClassName"
						onContentStateChange={this.onEditorChange}
						onEditorStateChange={this.onEditorStateChange}
					/>
				</Card>
				<Modal
					footer={null}
					title="富文本内容"
					visible={showRichContent}
					onCancel={() => {
						this.setState({ showRichContent: false })
					}}
				>
					{draftjs(editorContent)}
				</Modal>
			</div>
		)
	}
}
