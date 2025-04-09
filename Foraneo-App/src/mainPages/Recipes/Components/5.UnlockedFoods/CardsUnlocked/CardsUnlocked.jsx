import React from 'react';
import './CardsUnlocked.css';

function CardsUnlocked({ recipe, onAddRecipe }) {
	return (
		<div className='unlocked-card'>
			<img src={recipe.image} alt={recipe.name} className='unlocked-image' />
			<h3>{recipe.name}</h3>
			<ul className='ingredients-list'>
				{recipe.ingredients.map((ingredient, index) => (
					<li key={index}>{ingredient}</li>
				))}
			</ul>
			<button onClick={() => onAddRecipe(recipe)}>+ Add</button>
		</div>
	);
}

export default CardsUnlocked;
