import React from 'react';
import { Link } from 'react-router-dom';
import LogInForm from './logInForm/logInForm';
import './login.css';

const Login = () => {
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
      <LogInForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
      <p style={{ textAlign: 'center' }}>
        Don't have an account? <Link to="/">Sign up</Link>
      </p>
    </section>
  );
};

export default Login;
