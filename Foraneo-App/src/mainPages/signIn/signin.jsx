import React from 'react';
import SignInForm from './components/signInForm/signInForm';
import './signin.css'

const SignIn = () => {
	return (
		<section className='ContainerSignIn'>
			<h1 className='welcomeMessageSignIn'>Welcome to Foraneo Day!✨</h1>
		<section className='signIn'>
			<h1 className='welcomeMessageLogin1'>Sign Up Here!</h1>
			<SignInForm />
		</section>
		</section>
	);
};

export default SignIn;