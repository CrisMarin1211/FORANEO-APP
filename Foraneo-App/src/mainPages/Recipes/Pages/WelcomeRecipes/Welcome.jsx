import React from 'react';
import PlanYet from '../../Components/PlanYetPhrase/PlanYetPhrase';
import Title from '../../Components/TitleWelcome/TitleWelcome';
import ImageSad from '../../Components/imageSad/imageSad';
import ButtonCreatePlan from '../../Components/ButtonCreatePlan/ButtonCreatePlan';

function Welcome() {
	return (
		<div>
			<Title />
			<ImageSad />
			<PlanYet />
			<ButtonCreatePlan />
		</div>
	);
}

export default Welcome;
