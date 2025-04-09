import React, { useEffect, useState } from 'react';
import CardsEditRecipes from '../../Components/4.MyEditRecipe/CardsEditRecipes/CardsEditRecipes.JSX';
import TitleEditRecipes from '../../Components/4.MyEditRecipe/TitleEditRecipes/TitleEditRecipes';
import './EditRecipe.css';

function EditRecipe() {
	const [recipes, setRecipes] = useState(null);

	const currentDay = window.location.pathname.split('/').pop();
	console.log('Current Day:', currentDay);

	useEffect(() => {
		const storedPlans = JSON.parse(localStorage.getItem('weeklyPlan'));
		console.log(storedPlans);

		if (storedPlans) {
			const selectedDayPlan = storedPlans.find((plan) => plan.day === currentDay);
			console.log('Selected Day Plan:', selectedDayPlan);

			if (selectedDayPlan) {
				setRecipes(selectedDayPlan);
			}
		}
	}, [currentDay]);

	if (!recipes) return <div>Loading...</div>;

	// Función para convertir descripción en lista de ingredientes si es necesario
	const getIngredients = (recipe) => {
		if (recipe.ingredients) return recipe.ingredients;

		return [];
	};

	return (
		<section>
			<TitleEditRecipes day={currentDay} />

			{recipes.breakfast && (
				<CardsEditRecipes
					mealTime='Breakfast'
					recipe={{
						name: recipes.breakfast.name,
						description: recipes.breakfast.description || 'Perfect to start your day!',
						image: recipes.breakfast.image || 'default-breakfast.jpg',
						ingredients: getIngredients(recipes.breakfast),
					}}
				/>
			)}

			{recipes.lunch && (
				<CardsEditRecipes
					mealTime='Lunch'
					recipe={{
						name: recipes.lunch.name,
						description: recipes.lunch.description || 'Energize your afternoon!',
						image: recipes.lunch.image || 'default-lunch.jpg',
						ingredients: getIngredients(recipes.lunch),
					}}
				/>
			)}

			{recipes.dinner && (
				<CardsEditRecipes
					mealTime='Dinner'
					recipe={{
						name: recipes.dinner.name,
						description: recipes.dinner.description || 'End your day deliciously!',
						image: recipes.dinner.image || 'default-dinner.jpg',
						ingredients: getIngredients(recipes.dinner),
					}}
				/>
			)}
		</section>
	);
}

export default EditRecipe;
