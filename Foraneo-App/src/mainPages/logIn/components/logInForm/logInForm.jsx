import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../services/firebaseConfig';  // Importamos el auth desde el archivo de configuración

const LogInForm = ({ onFinish, onFinishFailed }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const { username, password, remember } = values;

    try {
      // Intentamos hacer login con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      console.log('User logged in:', user);

      // Si el login es exitoso
      if (remember) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }

      // Si el login es exitoso, ejecutamos la función onFinish
      onFinish(user);
    } catch (error) {
      console.error('Error during login:', error);
      message.error('Login failed. Please check your credentials.');
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
      onFinish={handleSubmit}  // Usamos handleSubmit aquí para realizar el login con Firebase
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="Email"
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
  );
};

export default LogInForm;
