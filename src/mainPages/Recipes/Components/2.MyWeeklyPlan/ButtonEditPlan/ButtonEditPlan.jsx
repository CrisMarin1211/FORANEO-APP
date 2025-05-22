import React from 'react';
import './ButtonEditPlan.css';

function ButtonEditPlan({ onClick, text = 'Edit Plan' }) {
	return (
		<section className='Button-EditPlan'>
			<button className='Edit-Plan' onClick={onClick}>
				{text}
			</button>
		</section>
	);
}

export default ButtonEditPlan;
