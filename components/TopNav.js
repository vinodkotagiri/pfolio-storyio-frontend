import { Menu } from 'antd'
import MenuItem from 'antd/lib/menu/MenuItem'
import React, { Fragment, useContext, useState } from 'react'
import ToggleTheme from '../components/ToggleTheme'
import Link from 'next/link'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import {
	SettingOutlined,
	LoginOutlined,
	UserAddOutlined,
	LogoutOutlined,
} from '@ant-design/icons'

const TopNav = () => {
	const [current, setCurrent] = useState('')

	const [auth, setAuth] = useContext(AuthContext)
	const route = useRouter()

	// Handle navigation events
	const onClick = (e) => {
		setCurrent(e)
	}

	//Handle Signout
	const signOut = () => {
		//Clear the local storage
		//Remove from auth context
		localStorage.clear()
		setAuth({})
		//redirect to login
		route.push('/signin')
		toast.success('Successfully signed out!')
	}
	return (
		<Menu mode='horizontal' onClick={onClick} selectedKeys={[current]}>
			<Menu.Item key='brand' style={{ fontWeight: 900, fontSize: '1.8em' }}>
				<Link href='/'>
					<a>story.io</a>
				</Link>
			</Menu.Item>

			{!auth.user ? (
				<Fragment>
					<Menu.Item
						key='signin'
						icon=<LoginOutlined />
						style={{ marginLeft: 'auto' }}>
						<Link href='/signin'>
							<a>Sign In</a>
						</Link>
					</Menu.Item>
					<Menu.Item key='signup' icon=<UserAddOutlined />>
						<Link href='/signup'>
							<a>Sign Up</a>
						</Link>
					</Menu.Item>
					<Menu.Item key='toggle-theme'>
						<ToggleTheme />
					</Menu.Item>
				</Fragment>
			) : (
				<Fragment>
					<Menu.SubMenu
						key='dashboard'
						title='Dashboard'
						icon=<SettingOutlined />
						style={{ marginLeft: 'auto' }}>
						<Menu.ItemGroup title='Management'>
							<Menu.Item key='op1'>
								<Link href='/admin'>
									<a>Admin</a>
								</Link>
							</Menu.Item>
						</Menu.ItemGroup>
					</Menu.SubMenu>
					<Menu.Item
						key='signout'
						icon=<LogoutOutlined style={{ marginLeft: 'auto' }} />>
						<a onClick={() => signOut()}>Sign Out</a>
					</Menu.Item>
					<Menu.Item key='toggle-theme'>
						<ToggleTheme />
					</Menu.Item>
				</Fragment>
			)}
		</Menu>
	)
}

export default TopNav
