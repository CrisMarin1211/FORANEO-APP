import React from 'react';
import './CardsPlans.css';
import { useNavigate } from 'react-router-dom';

function CardsPlans({ plans }) {
	const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	const navigate = useNavigate();

	const sortedPlans = [...plans].sort((a, b) => {
		return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
	});

	const handleCardClick = (day) => {
		navigate(`/editrecipe/${day}`);
	};

	return (
		<section className='cards-wrapper'>
			{sortedPlans.map((plan, index) => (
				<section key={index} className='Cards-Plans' onClick={() => handleCardClick(plan.day)}>
					<img src={plan.breakfast.image} alt={plan.day} className='Card-image' />
					<p className='Card-day'>{plan.day}</p>
				</section>
			))}
		</section>
	);
}

export default CardsPlans;
