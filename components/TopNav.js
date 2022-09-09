import { Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import React, { useState } from 'react';
import ToggleTheme from '../components/ToggleTheme';
import Link from 'next/link';
import {
  SettingOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

const TopNav = () => {
  const [current, setCurrent] = useState('brand');
  const onClick = (e) => {
    setCurrent(e);
  };
  return (
    <Menu
      mode='horizontal'
      onClick={onClick}
      selectedKeys={[current]}>
      <Menu.Item
        key='brand'
        style={{ fontWeight: 900, fontSize: '1.8em' }}>
        <Link href='/'>
          <a>story.io</a>
        </Link>
      </Menu.Item>
      <Menu.Item
        key='signin'
        icon=<LoginOutlined />>
        <Link href='/signin'>
          <a>Sign In</a>
        </Link>
      </Menu.Item>
      <Menu.Item
        key='signup'
        icon=<UserAddOutlined />>
        <Link href='/signup'>
          <a>Sign Up</a>
        </Link>
      </Menu.Item>
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
      <Menu.Item key='toggle-theme'>
        <ToggleTheme />
      </Menu.Item>
    </Menu>
  );
};

export default TopNav;
