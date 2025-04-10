import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LogInForm from './components/logInForm/logInForm';
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = values => {
    console.log('Success:', values);
    if (values.remember) {
      localStorage.setItem('username', values.username);
      localStorage.setItem('password', values.password);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
    navigate('/finances'); 
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className='login'>
      <h1>Login</h1>
      <LogInForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
      <p style={{ textAlign: 'center' }}>
        Don't have an account? <Link to="/">Sign up</Link>
      </p>
    </section>
  );
};

export default Login;
