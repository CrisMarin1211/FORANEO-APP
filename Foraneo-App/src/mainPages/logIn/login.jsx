import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LogInForm from './components/logInForm/logInForm';
import { login } from '../../utils/auth'; // Importa la función login para marcar la autenticación
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (user) => {
    // Si el login es exitoso, marcamos al usuario como autenticado
    login();

    // Navegamos a la página principal después del login
    navigate('/main');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className="login">
      <h1>Login</h1>
      <LogInForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
      <p style={{ textAlign: 'center' }}>
        Don't have an account? <Link to="/">Sign up</Link>
      </p>
    </section>
  );
};

export default Login;
