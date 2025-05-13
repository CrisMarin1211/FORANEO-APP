import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import CardsEditRecipes from '../../Components/4.MyEditRecipe/CardsEditRecipes/CardsEditRecipes.JSX';
import TitleEditRecipes from '../../Components/4.MyEditRecipe/TitleEditRecipes/TitleEditRecipes';
import Menu from '../../../Planner/components/navBar/navBar';
import './EditRecipe.css';

function EditRecipe() {
	const navigate = useNavigate();
	const [recipes, setRecipes] = useState(null);
	const { day } = useParams();

	useEffect(() => {
		const storedPlans = JSON.parse(localStorage.getItem('weeklyPlan'));

		if (storedPlans) {
			const selectedDayPlan = storedPlans.find((plan) => plan.day === day);

			if (selectedDayPlan) {
				setRecipes(selectedDayPlan);
			}
		}
	}, [day]);

	const handleGoBack = () => {
		navigate('/weeklyplan');
	};

	if (!recipes) return <div>Loading...</div>;

	const getIngredients = (recipe) => {
		if (recipe.ingredients) return recipe.ingredients;
		return [];
	};

	return (
		<section className='bigContainerEditrecipe'>
			<section className='button-chevro' onClick={handleGoBack}>
				<ChevronLeft />
			</section>

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

				<section className='spaceiwi'></section>
			<section className='menucontaiiner'>
			<Menu></Menu>
			</section>
		</section>
	);
}

export default EditRecipe;
