import React from 'react';
import TitleCongrats from '../../Components/3.CongratsPlan/TitleCongrats/TitleCongrats';
import ImageEmotions from '../../Components/3.CongratsPlan/ImageEmotions/ImageEmotions';
import UnlockedMessage from '../../Components/3.CongratsPlan/UnlockedMessage/UnlockedMessage';
import MealPlanPhrase from '../../Components/3.CongratsPlan/MealPlanPhrase/MealPlanPhrase';

function Congratulations() {
	return (
		<div>
			<TitleCongrats />
			<ImageEmotions />
			<UnlockedMessage />
			<MealPlanPhrase />
		</div>
	);
}

export default Congratulations;
