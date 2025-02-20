import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Layout, Col, Divider } from 'antd';
import { Typography } from 'antd';
import { login } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import LoginForm from '@/forms/LoginForm';
import AuthLayout from '@/layout/AuthLayout';
import SideContent from '@/components/SideContent';
import logo from '@/style/images/logo.png';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const LoginPage = () => {
  const { loading: isLoading } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(login({ loginData: values }));
  };

  return (
    <>
      <AuthLayout sideContent={<SideContent />}>
        <Content
          style={{
            padding: '200px 30px 30px',
            maxWidth: '440px',
            margin: '0 auto',
          }}
        >
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
            <img
              src={logo}
              alt="Logo"
              style={{
                margin: '-70px auto 40px',
                display: 'block',
              }}
            />
            <div className="space50"></div>
          </Col>
          <Title level={1}>Sign in</Title>
          <Divider />
          <div className="site-layout-content">
            {/* Additional Information */}
            <Paragraph>
              Welcome to our platform. Please sign in to access your account.
            </Paragraph>
            {/* Login Form */}
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <LoginForm />
              <Form.Item>
                {/* Login Button */}
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={isLoading}
                  size="large"
                  style={{ backgroundColor: '#3b7d2e', borderColor: '#3b7d2e' }}
                >
                  Log in
                </Button>
                {/* Register Link */}
                Or <a href="/register">register now!</a>
              </Form.Item>
            </Form>
            {/* Additional Button */}
            <Button type="link" href="/additional-info">
              Learn more about us
            </Button>
          </div>
        </Content>
      </AuthLayout>
    </>
  );
};

export default LoginPage;