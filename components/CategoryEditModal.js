import React from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
const CategoryEditModal = ({
	open,
	updatingCategory,
	renameCategory,
	setOpen,
}) => {
	return (
		<Modal
			title='Edit Category'
			footer={false}
			open={open}
			onCancel={() => {
				setOpen(false)
			}}>
			<Form
				onFinish={renameCategory}
				initialValues={[{ name: ['update'], value: updatingCategory.name }]}>
				<Form.Item
					name='update'
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
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default CategoryEditModal
