import { Col, Form, Input, Row, Button, Divider, Tooltip, Modal } from 'antd'
import { EditOutlined, DeleteFilled, EditFilled } from '@ant-design/icons'
import React, { useEffect, useState, useRef } from 'react'
import AdminLayout from '../../../components/AdminLayout'
import axios from 'axios'
import toast from 'react-hot-toast'
import CategoryEditModal from '../../../components/CategoryEditModal'
const Categories = () => {
	// state for categories
	const [categories, setCategories] = useState([])
	//Loader animation state
	const [loading, setLoading] = useState(false)
	//Function to handle Add button click
	const [form] = Form.useForm()
	const addCategory = async (values) => {
		setLoading(true)
		await axios
			.post('/categories/create', values)
			.then((response) => {
				console.log(response)
				toast.success('Category Added Successfully')
				setLoading(false)
				form.resetFields()
			})
			.catch((error) => {
				console.log(error)
				toast.error(error.response.data.error)
				setLoading(false)
			})
	}
	//Get Categories from Server
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
	}, [setCategories, getCategories])

	//Rename Category
	// Open modal window
	const [open, setOpen] = useState(false)
	const [updatingCategory, setUpdatingCategory] = useState({})
	const openModal = (data) => {
		const { category } = data
		setOpen(true)
		console.log(category)
		setUpdatingCategory(category)
	}

	const renameCategory = async (category) => {
		console.log(updatingCategory)
		console.log()
		if (category.update.toLowerCase() === updatingCategory.name.toLowerCase()) {
			toast.success('No changes')
			setOpen(false)
			return
		}
		try {
			const newCategory = {
				_id: updatingCategory._id,
				name: category.update.toLowerCase(),
			}
			await axios.post(`categories/edit`, newCategory).then((response) => {
				setOpen(false)
				toast.success('Successfully updated category')
			})
		} catch (error) {
			console.log(error)
			toast.error('Error updatingCategory')
		}
	}
	//Rename Category
	const deleteCategory = async (data) => {
		const { _id } = data.category
		console.log(_id)
		try {
			await axios.delete(`/categories/${_id}`)
			toast.success('Category deleted successfully!')
			getCategories()
		} catch (error) {
			toast.error('Error deleting Category')
		}
	}

	return (
		<AdminLayout>
			<div style={{ textAlign: 'center' }}>
				<h1 style={{ fontSize: '2em' }}>Categories</h1>
			</div>
			<Divider />
			<Row>
				<Col span={12}>
					<div style={{ textAlign: 'center' }}>
						<p>Add new category</p>
					</div>
					<Form onFinish={addCategory} form={form}>
						<Form.Item
							name='name'
							rules={[
								{
									required: true,
									message: '* Category name is required',
								},
							]}>
							<Input
								prefix={<EditOutlined />}
								className='site-form-item-icon'
								placeholder='Enter Category Name'
							/>
						</Form.Item>
						<Form.Item>
							<Button
								loading={loading}
								type='primary'
								htmlType='submit'
								className='login-form-button'>
								Add
							</Button>
						</Form.Item>
					</Form>
				</Col>
				<Col span={12}>
					<div style={{ textAlign: 'center' }}>
						<p>Categories</p>
						<Divider dashed />
					</div>
					<div style={{ padding: '0 2rem', display: 'flex', flexWrap: 'wrap' }}>
						{categories.map((category) => (
							<div
								key={category.id}
								style={{
									padding: '0.2rem',
									border: '0.5px solid',
									width: 'fit-content',
									borderRadius: '5px',
									margin: '0.3rem',
									paddingRight: '0.5rem',
									cursor: 'pointer',
								}}>
								<span style={{ margin: '0 0.5rem' }}>
									{category.name.toUpperCase()}
								</span>
								<span
									style={{ margin: '0 0.5rem', color: '#ABD9FF' }}
									onClick={() => openModal({ category })}>
									<Tooltip placement='top' title='Edit'>
										{<EditFilled />}
									</Tooltip>
								</span>
								<span
									style={{ color: '#FA7070' }}
									onClick={() => deleteCategory({ category })}>
									<Tooltip placement='top' title='Delete'>
										{<DeleteFilled />}
									</Tooltip>
								</span>
							</div>
						))}
					</div>
				</Col>
				<CategoryEditModal
					open={open}
					updatingCategory={updatingCategory}
					renameCategory={renameCategory}
					setOpen={setOpen}
				/>
			</Row>
		</AdminLayout>
	)
}

export default Categories
