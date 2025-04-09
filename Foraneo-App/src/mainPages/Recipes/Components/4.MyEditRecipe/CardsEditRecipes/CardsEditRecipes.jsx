import React from 'react';
import ButtonViewAll from '../../2.MyWeeklyPlan/ButtonViewAll/ButtonViewAll';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CardsEditRecipes.css';

function CardsEditRecipes({ mealTime, recipe, day, showPencil = true }) {
	const navigate = useNavigate();

	const handlePencilClick = () => {
		navigate(`/unlockedrecipes/${day}/${mealTime}`);
	};

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

			{showPencil && (
				<div className='pencil-button' onClick={handlePencilClick}>
					<Pencil />
				</div>
			)}
		</div>
	);
}

export default CardsEditRecipes;
