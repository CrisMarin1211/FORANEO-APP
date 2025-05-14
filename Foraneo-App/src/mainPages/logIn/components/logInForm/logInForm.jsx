import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../services/firebaseConfig';

const LogInForm = ({ onFinish, onFinishFailed }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const { email, password, remember } = values;

    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      if (remember) {
        localStorage.setItem('email', email);

      } else {
        localStorage.removeItem('email');
      }


      onFinish(user); 
    } catch (error) {
      console.error('Error durante el login:', error);
      message.error(`Login failed: ${error.message}`);
    }
  };

  return (
    <Form
      form={form}
      name="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
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
  );
};

export default LogInForm;
