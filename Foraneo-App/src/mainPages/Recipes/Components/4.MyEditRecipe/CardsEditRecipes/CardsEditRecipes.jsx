import React from 'react';
import ButtonViewAll from '../../2.MyWeeklyPlan/ButtonViewAll/ButtonViewAll';
import { Pencil } from 'lucide-react';
import './CardsEditRecipes.css';

function CardsEditRecipes({ mealTime, recipe }) {
	return (
		<div className='recipe-card'>
			<h3>{mealTime}</h3>
			<img src={recipe.image} alt={recipe.name} className='recipe-image' />
			<p>{recipe.name}</p>

			{recipe.ingredients && (
				<ul className='ingredients-list'>
					{recipe.ingredients.map((ingredient, index) => (
						<li key={index}>{ingredient}</li>
					))}
				</ul>
			)}
			<ButtonViewAll />
			<div className='pencil-button'>
				<Pencil />
			</div>
		</div>
	);
}

export default CardsEditRecipes;
