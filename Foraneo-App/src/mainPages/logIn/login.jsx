import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LogInForm from './components/logInForm/logInForm';
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (user) => {
    if (user) {

      navigate('/main');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className='ContainerLoginn'>

<h1 className='welcomeMessageLogin'>Welcome back to Foraneo Day!☀️</h1>

    <section className="login">
      <h1 className='welcomeMessageLogin1'>Login Here!</h1>
      <LogInForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
      <p className='plogin' style={{ textAlign: 'center' }}>
        Don't have an account? <Link className='linkLogin' to="/">Sign up</Link>
      </p>
    </section>
    </section>
  );
};

export default Login;