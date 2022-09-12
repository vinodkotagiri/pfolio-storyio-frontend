import {
	LockOutlined,
	UserOutlined,
	UserAddOutlined,
	MailOutlined,
} from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import responsiveObserve from 'antd/lib/_util/responsiveObserve'

// Handle form submit
const SignIn = () => {
	const onFinish = async (values) => {
		try {
			// Post data to the server
			const response = await axios.post(
				'http://localhost:5002/users/register',
				values
			)
			toast.success('User registered successfully')
		} catch (error) {
			console.log(error.response.data.error)
			toast.error(error.response.data.error)
		}
	}
	return (
		<Row>
			<Col span={8} offset={8}>
				<h1
					style={{
						paddingTop: '6rem',
						marginBottom: '3rem',
						textAlign: 'center',
					}}>
					<UserAddOutlined style={{ marginRight: '1rem' }} />
					Sign Up
				</h1>
				<Form
					name='normal_login'
					className='login-form'
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}>
					{/* Name */}
					<Form.Item
						name='name'
						rules={[
							{
								required: true,
								message: 'Please input your name',
							},
						]}>
						<Input
							prefix={<UserOutlined className='site-form-item-icon' />}
							placeholder='Name'
						/>
					</Form.Item>
					{/* Email */}
					<Form.Item
						name='email'
						rules={[
							{
								type: 'email',
								required: true,
								message: 'Please input your  email!',
							},
						]}>
						<Input
							prefix={<MailOutlined className='site-form-item-icon' />}
							placeholder='Email'
						/>
					</Form.Item>
					<Form.Item
						name='password'
						rules={[
							{
								required: true,
								message: 'Please input your Password!',
							},
						]}>
						<Input.Password
							prefix={<LockOutlined className='site-form-item-icon' />}
							type='password'
							placeholder='Password'
						/>
					</Form.Item>

					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'>
							Sign Up
						</Button>
						<span style={{ margin: '0 0.5rem' }}>Already has account?</span>
						<Link href='/signin'>
							<a>Sign In</a>
						</Link>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	)
}

export default SignIn
