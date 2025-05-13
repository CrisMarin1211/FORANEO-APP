import React from 'react';
import './Welcome.css';
import WelcomeNoData from '../../Components/Welcome Component/welcomeComp';
import Menu from '../../../Planner/components/navBar/navBar';

function Welcome() {

	return (
		<section className='welcomeContainer'>
		<WelcomeNoData />

		<Menu className='menusection'></Menu>
		</section>
	);
}

export default Welcome;
