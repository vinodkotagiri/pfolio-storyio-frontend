import React, { useContext, useState, useEffect } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AuthContext } from '../../context/AuthContext'
import { useRouter } from 'next/router'
const SignIn = () => {
	//State for button loading animation
	const [loading, setLoading] = useState(false)
	//Auth context
	const [auth, setAuth] = useContext(AuthContext)

	//Hook
	const route = useRouter()
	const [form] = Form.useForm()
	//Reset
	const onReset = () => {
		form.resetFields()
		setLoading(false)
	}

	//If aleready signed in
	useEffect(() => {
		if (auth?.user) route.push('/')
	}, [auth?.token])

	//Handle login
	const onFinish = async (values) => {
		setLoading(true)

		await axios
			.post('/users/login', values)
			.then((response) => {
				setLoading(false)
				//Save User and token to context and local storage
				const { data } = response
				setAuth(data)
				localStorage.setItem('auth', JSON.stringify(data))
				toast.success('Logged in successfully!')
				if (data?.user?.role === 'admin') route.push('/admin')
				else if (data?.user?.role === 'author') route.push('/author')
				else route.push('/subscriber')
				// console.log(data)
			})
			.catch((err) => {
				console.log(err)
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
					<UserOutlined style={{ marginRight: '1rem' }} />
					Sign In
				</h1>
				<Form
					form={form}
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
						<Input.Password
							prefix={<LockOutlined className='site-form-item-icon' />}
							type='password'
							placeholder='Password'
						/>
					</Form.Item>
					<Form.Item>
						<Link href='/forgot-password'>
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
						<Button
							type='outlined'
							onClick={onReset}
							className='login-form-button'
							style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
							Reset
						</Button>

						<span style={{ marginLeft: '2rem', marginRight: '0.5rem' }}>
							Need an account?
						</span>
						<Link href='/signup'>
							<a>Sign Up</a>
						</Link>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	)
}

export default SignIn
