import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlanYet from '../../Components/PlanYetPhrase/PlanYetPhrase';
import Title from '../../Components/TitleWelcome/TitleWelcome';
import ImageSad from '../../Components/imageSad/imageSad';
import ButtonCreatePlan from '../../Components/ButtonCreatePlan/ButtonCreatePlan';
import './Welcome.css';

function Welcome() {
	const navigate = useNavigate();

	const handleCreatePlanClick = () => {
		navigate('/plancreate');
	};

	return (
		<div>
			<div className='tittle-welcome'>
				<Title />
			</div>
			<ImageSad />
			<PlanYet />
			<ButtonCreatePlan onClick={handleCreatePlanClick} />
		</div>
	);
}

export default Welcome;
