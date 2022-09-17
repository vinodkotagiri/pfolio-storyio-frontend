import React, { createRef, useEffect, useRef, useState } from 'react'
import { Divider, Row, Col, Input, Select, Modal, Button } from 'antd'
import AdminLayout from '../../../components/AdminLayout'
import RichTextEditor from '../../../components/RichTextEditor'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { EyeOutlined, SendOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
const { Option } = Select
const AddPost = () => {
	//get saved post data from localStorage
	const savedTitle = () => {
		if (localStorage.getItem('post-title'))
			return JSON.parse(localStorage.getItem('post-title'))
	}
	const savedContent = () => {
		if (localStorage.getItem('post-content'))
			return JSON.parse(localStorage.getItem('post-content'))
	}
	const [content, setContent] = useState(savedContent())
	const [title, setTitle] = useState(savedTitle())

	//Get Categories from Server
	const [categories, setCategories] = useState([]) // Available categories
	const [selectedCategories, setSelectedCategories] = useState([]) // selectedCategories
	const getCategories = async () => {
		await axios
			.get('/categories')
			.then((response) => setCategories(response.data))
			.catch((error) => {
				console.log(error)
			})
	}
	useEffect(() => {
		getCategories()
	}, [])

	//Handle Image uploads, compress and send them to server recieve url from server
	const resizeFile = (file) => {
		new Promise((resolve) => {
			Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0, (uri) => {
				resolve(uri), 'base64'
			})
		})
	}
	const uploadImage = async (file) => {
		try {
			const image = await resizeFile(file)
			const { data } = await axios.post('/posts/upload-image', { image })
			console.log('upload response=>' + data)
			return data.url
		} catch (error) {
			console.log('error uploading image: ' + error)
		}
	}

	//Handle modal
	const [visible, setVisible] = useState(false)

	//Handle Publish Post
	const route = useRouter()
	const publishPost = async () => {
		const post = JSON.stringify({
			title: title,
			content: content,
			categories: selectedCategories,
		})

		try {
			await axios.post('/posts/create', JSON.parse(post)).then((response) => {
				console.log(response)
				toast.success('Post successfully published')
				//Clear local storage
				localStorage.removeItem('post-title')
				localStorage.removeItem('post-content')
				//Redirect to posts page
				route.push('/admin/posts')
			})
		} catch (error) {
			console.log(error)
			toast.error('Error publishing post')
		}
	}

	return (
		<AdminLayout>
			<h1 style={{ display: 'flex', justifyContent: 'center' }}>Create Post</h1>
			<Divider />
			<Row>
				<Col span={14} offset={1}>
					<Input
						style={{ borderRadius: '0.75rem', marginBotton: '1rem' }}
						placeholder='Post Title'
						value={title}
						onChange={(e) => {
							setTitle(e.target.value)
							localStorage.setItem('post-title', JSON.stringify(e.target.value))
						}}
					/>
					<RichTextEditor content={content} setContent={setContent} />
				</Col>
				<Col span={8} offset={1}>
					<Button
						type='ghost'
						onClick={() => setVisible(true)}
						style={{ margin: '1rem 0 1rem 0', width: '100%' }}>
						<EyeOutlined />
						Preview
					</Button>
					<h4>Categories</h4>
					<Select
						style={{ width: '100%' }}
						mode='multiple'
						allowClear={true}
						placeholder='Select Category'
						onChange={(values) => setSelectedCategories(values)}>
						{categories.map((category) => (
							<Option key={category.name}>{category.name}</Option>
						))}
					</Select>
					<Button
						type='primary'
						onClick={publishPost}
						style={{ margin: '1rem 0 1rem 0', width: '100%' }}>
						<SendOutlined />
						Publish
					</Button>
				</Col>
				{/* Preview Modal */}
				<Modal
					title='Preview Post'
					visible={visible}
					footer={false}
					onCancel={() => setVisible(false)}>
					<div dangerouslySetInnerHTML={{ __html: `${content}` }} />
				</Modal>
			</Row>
		</AdminLayout>
	)
}

export default AddPost
