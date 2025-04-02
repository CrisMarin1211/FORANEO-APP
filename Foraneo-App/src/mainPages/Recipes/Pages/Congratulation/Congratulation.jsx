import React from 'react';

import TitleCongrats from '../../Components/3.CongratsPlan/TitleCongrats/TitleCongrats';
import ImageEmotions from '../../Components/3.CongratsPlan/ImageEmotions/ImageEmotions';
import UnlockedMessage from '../../Components/3.CongratsPlan/UnlockedMessage/UnlockedMessage';
import MealPlanPhrase from '../../Components/3.CongratsPlan/MealPlanPhrase/MealPlanPhrase';
import NameRecipe from '../../Components/3.CongratsPlan/NameRecipe/NameRecipe';

function Congratulation() {
	return (
		<div>
			<TitleCongrats />
			<ImageEmotions />
			<UnlockedMessage />
			<MealPlanPhrase />
			<NameRecipe />
		</div>
	);
}

export default Congratulation;
