import React, { useState, useEffect } from 'react';
import { Menu, Layout, Button } from 'antd';
import Link from 'next/link';
const { Sider } = Layout;

import { useWindowWidth } from '@react-hook/window-size';
import {
  PushpinOutlined,
  CameraOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  BgColorsOutlined,
  UserOutlined,
  CommentOutlined,
} from '@ant-design/icons';
const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const items = [
  getItem(
    <Link href='/admin'>
      <a>Dashboard</a>
    </Link>,
    '1',
    <SettingOutlined />
  ),
  // Posts
  getItem('Posts', 'sub1', <PushpinOutlined />, [
    getItem(
      <Link href='/admin/posts'>
        <a>All Posts</a>
      </Link>,
      '2'
    ),
    getItem(
      <Link href='/admin/post/new'>
        <a>Add Post</a>
      </Link>,
      '3'
    ),
    getItem(
      <Link href='/admin/categories'>
        <a>Categories</a>
      </Link>,
      '4'
    ),
  ]),

  //   Library
  getItem('Media', 'sub2', <CameraOutlined />, [
    getItem(
      <Link href='/admin/media/library'>
        <a>Library</a>
      </Link>,
      '5'
    ),
    getItem(
      <Link href='/admin/media/new'>
        <a>Add Media</a>
      </Link>,
      '6'
    ),
  ]),
  // Comments
  getItem(
    <Link href='/admin/comments'>
      <a>Comments</a>
    </Link>,
    '7',
    <CommentOutlined />
  ),

  //Users
  getItem('Users', 'sub3', <UserSwitchOutlined />, [
    getItem(
      <Link href='/admin/users'>
        <a>All Users</a>
      </Link>,
      '8'
    ),
    getItem(
      <Link href='/admin/user/new'>
        <a>Add User</a>
      </Link>,
      '9'
    ),
  ]),

  //Profile
  getItem(
    <Link href='/admin/userid'>
      <a>Profile</a>
    </Link>,
    '10',
    <UserOutlined />
  ),
  //Customize
  getItem(
    <Link href='/admin/customize'>
      <a>Customize</a>
    </Link>,
    '11',
    <BgColorsOutlined />
  ),
];

const AdminSider = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onlyWidth = useWindowWidth();

  useEffect(() => {
    if (onlyWidth <= 800) setCollapsed(true);
    else setCollapsed(false);
  }, [onlyWidth]);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1', 'sub2']}
        mode='inline'
        items={items}
      />
    </Sider>
  );
};

export default AdminSider;
