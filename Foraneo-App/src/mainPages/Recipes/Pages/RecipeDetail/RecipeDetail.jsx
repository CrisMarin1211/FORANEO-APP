import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TitleMealTime from '../../Components/6.DetailsRecipes/TitleMealTime/TitleMealTime';
import CardImageRecipes from '../../Components/6.DetailsRecipes/CardImageRecipes/CardImageRecipes';
import IngredientsRecipes from '../../Components/6.DetailsRecipes/IngredientsRecipes/IngredientsRecipes';
import ButtonLetsCook from '../../Components/ButtonLetsCook/ButtonLetsCook';
import { ChevronLeft } from 'lucide-react';
import './RecipeDetail.css';

function RecipeDetail() {
	const { day, mealTime, recipeName } = useParams();
	const [recipe, setRecipe] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const storedPlans = JSON.parse(localStorage.getItem('weeklyPlan')) || [];
		const selectedDayPlan = storedPlans.find((plan) => plan.day === day);

		if (selectedDayPlan) {
			const mealPlan = selectedDayPlan[mealTime.toLowerCase()];
			if (mealPlan && mealPlan.name === recipeName) {
				setRecipe(mealPlan);
			} else {
				console.error('Recipe not found:', recipeName);
			}
		} else {
			console.error('No plan found for the day:', day);
		}
	}, [day, mealTime, recipeName]);

	if (!recipe) return <div>Loading...</div>;

	const handleGoBack = () => {
		navigate('/weeklyplan');
	};

	return (
		<section>
			<ChevronLeft className='button-chevro2' onClick={handleGoBack} />

			<TitleMealTime mealTime={mealTime} />
			<CardImageRecipes name={recipe.name} image={recipe.image} description={recipe.description} />
			<IngredientsRecipes ingredients={recipe.ingredients} />
			<ButtonLetsCook />
		</section>
	);
}

export default RecipeDetail;
