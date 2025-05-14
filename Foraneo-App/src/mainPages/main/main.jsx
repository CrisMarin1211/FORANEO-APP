import React from 'react';
import './main.css';
import Menu from '../Planner/components/navBar/navBar';
import ForaneoImage from './components/ForaneoImage/ForaneoImage';


const Main = () => {
	return (

		<section className='MainContainerPage'>
			<ForaneoImage></ForaneoImage>
		<section className='MainContainerr'>
			<h1>Hola, Foraneo</h1>
			</section>
			<section className='MenuBarr'>
			<Menu></Menu>
		</section>
		</section>
	);
};

export default Main;
