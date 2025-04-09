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
		<section>
			<section className='tittle-welcome'>
				<Title />
			</section>
			<ImageSad />
			<PlanYet />
			<ButtonCreatePlan onClick={handleCreatePlanClick} />
		</section>
	);
}

export default Welcome;
