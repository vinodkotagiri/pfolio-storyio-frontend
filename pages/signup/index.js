import React, { useState, useContext } from 'react'
import {
	LockOutlined,
	UserOutlined,
	UserAddOutlined,
	MailOutlined,
} from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import responsiveObserve from 'antd/lib/_util/responsiveObserve'
import { AuthContext } from '../../context/AuthContext'
import { useRouter } from 'next/router'

// Handle form submit
const SignIn = () => {
	//State for button loading animation
	const [loading, setLoading] = useState(false)

	//Auth context
	const [auth, setAuth] = useContext(AuthContext)

	//hook
	const route = useRouter()

	const onFinish = async (values) => {
		setLoading(true)
		await axios
			.post('/users/register', values)
			.then((response) => {
				//Save User and token to context and local storage
				const { data } = response
				setAuth(data)
				localStorage.setItem('auth', JSON.stringify(data))
				toast.success('User registered successfully')
				setLoading(false)
				route.push('/admin')
			})
			.catch((err) => {
				setLoading(false)
				console.log(err.response.data.error)
				toast.error(err.response.data.error)
			})
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
							className='login-form-button'
							loading={loading}>
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
