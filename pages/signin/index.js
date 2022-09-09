import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import React from 'react';
import Link from 'next/link';
const SignIn = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Row>
      <Col
        span={8}
        offset={8}>
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
            name='name'
            rules={[
              {
                required: true,
                message: 'Please input your Name!',
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
              className='login-form-button'>
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
  );
};

export default SignIn;
