import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;

const currencyOptions = [
  { value: 'COP', label: 'Colombian Peso (COP)' },
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'GBP', label: 'British Pound (GBP)' },
  { value: 'JPY', label: 'Japanese Yen (JPY)' },
  { value: 'MXN', label: 'Mexican Peso (MXN)' },
  { value: 'BRL', label: 'Brazilian Real (BRL)' },
  { value: 'ARS', label: 'Argentine Peso (ARS)' }
];

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = values => {
    console.log('Received values:', values);
    navigate('/main');
  };

  return (
    <section>

      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 400, margin: 'auto' }}
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[{ type: 'email', required: true, message: 'Please enter a valid email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                return !value || getFieldValue('password') === value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Passwords do not match!'));
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="currency"
          label="Preferred Currency"
          rules={[{ required: true, message: 'Please select a currency!' }]}
        >
          <Select placeholder="Select a currency">
            {currencyOptions.map(({ value, label }) => (
              <Option key={value} value={value}>{label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>

      <p style={{ textAlign: 'center' }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </section>
  );
};

export default Register;
