import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
const SignIn = () => {
	//State for button loading animation
	const [loading, setLoading] = useState(false)

	//Handle login
	const onFinish = async (values) => {
		setLoading(true)

		await axios
			.post('http://localhost:5002/users/login', values)
			.then((response) => {
				toast.success('Logged in successfully!')
				setLoading(false)
				console.log(response.data)
			})
			.catch((error) => {
				setLoading(false)
				console.log(error.response.data.error)
				toast.error(error.response.data.error)
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
					<UserOutlined style={{ marginRight: '1rem' }} />
					Sign In
				</h1>
				<Form
					name='normal_login'
					className='login-form'
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}>
					<Form.Item
						name='email'
						rules={[
							{
								type: 'email',
								required: true,
								message: 'Please input your Email!',
							},
						]}>
						<Input
							prefix={<UserOutlined className='site-form-item-icon' />}
							placeholder='Name'
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
						<Input
							prefix={<LockOutlined className='site-form-item-icon' />}
							type='password'
							placeholder='Password'
						/>
					</Form.Item>
					<Form.Item>
						<Link href='/forget-password'>
							<a className='login-form-forgot'>Forgot password?</a>
						</Link>
					</Form.Item>

					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'
							loading={loading}>
							Sign In
						</Button>
						<span style={{ margin: '0 0.5rem' }}>Need an account?</span>
						<Link href='/signup'>
							<a>Sign In</a>
						</Link>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	)
}

export default SignIn
