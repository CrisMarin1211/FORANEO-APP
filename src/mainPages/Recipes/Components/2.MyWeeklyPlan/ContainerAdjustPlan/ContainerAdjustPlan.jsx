import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonEditPlan from '../ButtonEditPlan/ButtonEditPlan';
import './ContainerAdjustPlan.css';

function ContainerAdjustPlan() {
	const navigate = useNavigate();

	const handleEditPlanClick = () => {
		navigate('/plancreate');
	};

	return (
		<section className='adjust-plan'>
			<h2>Want to adjust your plan?</h2>
			<h2>Create a new one.</h2>
			<ButtonEditPlan onClick={handleEditPlanClick} />
		</section>
	);
}

export default ContainerAdjustPlan;
