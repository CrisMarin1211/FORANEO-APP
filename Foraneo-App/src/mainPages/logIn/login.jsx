import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import './login.css';

const Login = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    if (savedUsername && savedPassword) {
      form.setFieldsValue({ username: savedUsername, password: savedPassword, remember: true });
    }
  }, [form]);

  const onFinish = values => {
    console.log('Success:', values);
    if (values.remember) {
      localStorage.setItem('username', values.username);
      localStorage.setItem('password', values.password);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section>
      <h1>Login</h1>

      <Form
        form={form}
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <p style={{ textAlign: 'center' }}>
        Don't have an account? <Link to="/">Sign up</Link>
      </p>
    </section>
  );
};

export default Login;
