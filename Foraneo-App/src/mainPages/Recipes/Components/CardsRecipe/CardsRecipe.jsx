import React from 'react';
import './CardsRecipe.css';
import ButtonLetsCook from '../ButtonLetsCook/ButtonLetsCook';

function CardsRecipe({ mealTime, recipe }) {
	return (
		<div className='recipe-card'>
			<div className='recipe-header'>
				<h3 className='meal-time'>{mealTime}</h3>
				<button className='edit-button'>Edit</button>
			</div>

			<div className='recipe-image-container'>
				<img src={recipe.image} alt={recipe.name} className='recipe-image' />
			</div>

			<h4 className='recipe-name'>{recipe.name}</h4>
			<p className='recipe-description'>{recipe.description}</p>

			<ButtonLetsCook />
		</div>
	);
}

export default CardsRecipe;
