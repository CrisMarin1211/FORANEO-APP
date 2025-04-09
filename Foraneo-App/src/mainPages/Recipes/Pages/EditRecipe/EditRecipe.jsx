import React, { useEffect, useState } from 'react';
import CardsEditRecipes from '../../Components/4.MyEditRecipe/CardsEditRecipes/CardsEditRecipes.JSX';
import TitleEditRecipes from '../../Components/4.MyEditRecipe/TitleEditRecipes/TitleEditRecipes';
import './EditRecipe.css';
import { useParams } from 'react-router-dom';

function EditRecipe() {
	const [recipes, setRecipes] = useState(null);
	const { day } = useParams();

	console.log('Current Day:', day);

	useEffect(() => {
		const storedPlans = JSON.parse(localStorage.getItem('weeklyPlan'));
		console.log(storedPlans);

		if (storedPlans) {
			const selectedDayPlan = storedPlans.find((plan) => plan.day === day);
			console.log('Selected Day Plan:', selectedDayPlan);

			if (selectedDayPlan) {
				setRecipes(selectedDayPlan);
			}
		}
	}, [day]);

	if (!recipes) return <div>Loading...</div>;

	const getIngredients = (recipe) => {
		if (recipe.ingredients) return recipe.ingredients;
		return [];
	};

	return (
		<section>
			<TitleEditRecipes day={day} />

			{recipes.breakfast && (
				<CardsEditRecipes
					mealTime='Breakfast'
					recipe={{
						name: recipes.breakfast.name,
						description: recipes.breakfast.description || 'Perfect to start your day!',
						image: recipes.breakfast.image || 'default-breakfast.jpg',
						ingredients: getIngredients(recipes.breakfast),
					}}
					day={day}
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
					day={day}
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
					day={day}
				/>
			)}
		</section>
	);
}

export default EditRecipe;
