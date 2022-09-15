import React, { Fragment, useContext, useEffect, useState } from 'react'
import AdminSider from './AdminSider'
import { Layout } from 'antd'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/router'
import { LoadingOutlined } from '@ant-design/icons'
const { Content } = Layout
import axios from 'axios'
const AdminLayout = ({ children }) => {
	const [auth, setAuth] = useContext(AuthContext)
	const route = useRouter()
	const [loading, setLoading] = useState(true)

	//get the current admin user
	const getCurrentAdmin = async () => {
		try {
			await axios
				.get('/users/current-admin')
				.then((response) => setLoading(false))
		} catch (error) {
			console.log(auth.token)
			route.push('/')
		}
	}

	//Use effect to handle admin layout protection
	useEffect(() => {
		getCurrentAdmin()
	}, [auth?.token])
	return (
		<Fragment>
			{loading ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '90vh',
					}}>
					<LoadingOutlined style={{ fontSize: '10rem', color: '#ff4507' }} />
				</div>
			) : (
				<Layout>
					<AdminSider />
					<Layout>
						<Content style={{ padding: '1rem' }}>{children}</Content>
					</Layout>
				</Layout>
			)}
		</Fragment>
	)
}

export default AdminLayout
