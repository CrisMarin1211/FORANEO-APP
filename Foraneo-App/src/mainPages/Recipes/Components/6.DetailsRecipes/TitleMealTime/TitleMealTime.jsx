import React from 'react';
import './TitleMealTime.css';

function TitleMealTime({ mealTime }) {
	return (
		<section>
			<h2 className='titlemealtime'>{mealTime}</h2>
		</section>
	);
}

export default TitleMealTime;
