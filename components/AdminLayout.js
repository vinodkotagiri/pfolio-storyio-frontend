import React from 'react';
import AdminSider from './AdminSider';
import { Layout } from 'antd';
const { Content } = Layout;
const AdminLayout = ({ children }) => {
  return (
    <Layout>
      <AdminSider />
      <Layout>
        <Content style={{ padding: '1rem' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
