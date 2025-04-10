import React from 'react';
import './ButtonCreatePlan.css';

function ButtonCreatePlan({ onClick, text = 'Create Plan' }) {
	return (
		<section className='Button-Create'>
			<button className='Create-Plan' onClick={onClick}>
				{text}
			</button>
		</section>
	);
}

export default ButtonCreatePlan;
