import React from 'react';
import './navBar.css';

const Menu = () => {
	return (
		<>
			<nav className='menu'>
				<button className='btn'>Text 1</button>
				<button className='btn'>Text 2</button>
				<div className='home-container'>
					<button className='btn home'>Home</button>
				</div>
				<button className='btn'>Text 4</button>
				<button className='btn'>Text 5</button>
			</nav>
		</>
	);
};

export default Menu;
