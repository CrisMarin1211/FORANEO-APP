import React from 'react';
import './CardsPlans.css';

function CardsPlans({ plans }) {
	return (
		<section className='cards-wrapper'>
			{/* Mapea los planes y genera las tarjetas */}
			{plans.map((plan, index) => (
				<section key={index} className='Cards-Plans'>
					<img
						src={plan.breakfast.image} // Usa la propiedad de imagen del plan
						alt={plan.day}
						className='Card-image'
					/>
					<p className='Card-day'>{plan.day}</p>
				</section>
			))}
		</section>
	);
}

export default CardsPlans;
