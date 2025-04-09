import React from 'react';
import './CardsRecipe.css';
import ButtonLetsCook from '../ButtonLetsCook/ButtonLetsCook';

function CardsRecipe({ mealTime, recipe }) {
	return (
		<section className='recipe-card'>
			<section className='recipe-header'>
				<h3 className='meal-time'>{mealTime}</h3>
			</section>

			<section className='recipe-image-container'>
				<img src={recipe.image} alt={recipe.name} className='recipe-image' />
			</section>

			<h4 className='recipe-name'>{recipe.name}</h4>
			<p className='recipe-description'>{recipe.description}</p>

			<ButtonLetsCook />
		</section>
	);
}

export default CardsRecipe;
