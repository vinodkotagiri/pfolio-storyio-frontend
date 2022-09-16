import { Button, Col, Divider, Row } from 'antd'
import React from 'react'
import AdminLayout from '../../../components/AdminLayout'
import { PlusCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'
const Allposts = () => {
	return (
		<AdminLayout>
			<Row>
				<Col span={24}>
					<Button type='primary' style={{ marginLeft: '1rem' }}>
						<Link href='/admin/post/new'>
							<a>
								<PlusCircleOutlined /> Add New
							</a>
						</Link>
					</Button>
					{/* TODO: Dynamically update posts count */}
					<p style={{ margin: ' 1rem 1rem' }}>14 Posts</p>
					<Divider />
				</Col>
			</Row>
		</AdminLayout>
	)
}

export default Allposts
