import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, Divider, Input } from 'antd'
import AdminLayout from '../../../components/AdminLayout'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import EditorToolbar, {
	modules,
	formats,
} from '../../../components/EditorCustomToolBar'

const NewPost = () => {
	//Load from local storage for persistnace whrn reloaded
	const savedTitle = () => {
		if (localStorage.getItem('post-title'))
			return JSON.parse(localStorage.getItem('post-title'))
	}
	const savedContent = () => {
		if (localStorage.getItem('post-content'))
			return JSON.parse(localStorage.getItem('post-content'))
	}
	const [title, setTitle] = useState(savedTitle())
	const [content, setContent] = useState(savedContent())

	//handle Title Change and store post title in local storage
	const handleTitleChange = (e) => {
		setTitle(e.target.value)
		localStorage.setItem('post-title', JSON.stringify(e.target.value))
	}
	//Store Post content in local storage
	useEffect(() => {
		localStorage.setItem('post-content', JSON.stringify(content))
	}, [content])

	return (
		<AdminLayout>
			<div style={{ textAlign: 'center' }}>
				<h1 style={{ fontSize: '2em' }}>Create Post</h1>
			</div>
			<Divider />

			<Row>
				<Col span={14} offset={1}>
					<Input
						size='large'
						placeholder='Post Title goes here. . .'
						value={title}
						onChange={handleTitleChange}
						style={{
							marginBottom: '1rem',
							width: '100%',
							borderRadius: '0.75rem',
						}}
					/>

					<EditorToolbar />
					<ReactQuill
						theme='snow'
						value={content}
						onChange={setContent}
						modules={modules}
						formats={formats}
					/>
				</Col>
				<Col span={8} offset={1}>
					Col2
				</Col>
			</Row>
		</AdminLayout>
	)
}

export default NewPost
