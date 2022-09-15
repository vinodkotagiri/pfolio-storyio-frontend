import React, { Fragment, useContext, useState } from 'react'
import { MailOutlined, MailTwoTone, LockOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row } from 'antd'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AuthContext } from '../../context/AuthContext'
import { useRouter } from 'next/router'

const ForgotPassword = () => {
	//State for button loading animation
	const [loading, setLoading] = useState(false)
	//Auth context
	const [aut, setAuth] = useContext(AuthContext)
	//State for showing code box
	const [visible, setVisible] = useState(false)
	//Hook
	const route = useRouter()

	//Handle Reset
	const sendCode = async (values) => {
		setLoading(true)

		await axios
			.post('http://localhost:5002/users/forgot-password', values)
			.then((response) => {
				const { data } = response
				toast.success('Email sent with instructions to reset password')
				setLoading(false)
				setVisible(true)
			})
			.catch((err) => {
				console.log(err)
				setLoading(false)
				console.log(err.response.data.error)
				toast.error(err.response.data.error)
				setLoading(false)
			})
	}

	const resetPassword = async (values) => {
		setLoading(true)
		await axios
			.post('http://localhost:5002/users/reset-password', values)
			.then((response) => {
				const { data } = response
				toast.success('Password updated successfully')
				console.log(data)
				setLoading(false)
				setVisible(true)
				route.push('/signin')
			})
			.catch((err) => {
				console.log(err.response.data.error)
				toast.error(err.response.data.error)
				setLoading(false)
				setLoading(false)
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
					<MailTwoTone style={{ marginRight: '1rem' }} />
					Forgot Password
				</h1>
				<Fragment>
					{!visible && (
						<Form
							name='normal_login'
							className='login-form'
							initialValues={{
								remember: true,
							}}
							onFinish={sendCode}>
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
							<Form.Item>
								<Button
									type='primary'
									htmlType='submit'
									className='login-form-button'
									loading={loading}>
									Submit
								</Button>
							</Form.Item>
						</Form>
					)}

					{visible && (
						<Form
							name='normal_login'
							className='login-form'
							initialValues={{
								remember: true,
							}}
							onFinish={resetPassword}>
							{/* ResetCode */}
							<Form.Item
								name='resetCode'
								rules={[
									{
										required: true,
										message: 'Enter Reset Code',
									},
								]}>
								<Input placeholder='Enter Reset Code' />
							</Form.Item>
							<Form.Item
								name='password'
								rules={[
									{
										required: true,
										message: 'Enter New Password',
									},
								]}>
								<Input.Password
									prefix={<LockOutlined className='site-form-item-icon' />}
									type='password'
									placeholder='New Password'
								/>
							</Form.Item>

							<Form.Item>
								<Button
									type='primary'
									htmlType='submit'
									className='login-form-button'
									loading={loading}>
									Change Password
								</Button>
							</Form.Item>
						</Form>
					)}
				</Fragment>
			</Col>
		</Row>
	)
}

export default ForgotPassword
