import React from 'react';
import './ButtonCreatePlan.css';

function ButtonCreatePlan({ onClick, text = 'Create Plan' }) {
	return (
		<div className='Button-Create'>
			<button className='Create-Plan' onClick={onClick}>
				{text}
			</button>
		</div>
	);
}

export default ButtonCreatePlan;
