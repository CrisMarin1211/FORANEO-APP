import React, { useState, useEffect } from 'react';
import TitleEditBLD from '../../Components/5.UnlockedFoods/TitleEditBLD/TitleEditBLD';
import './UnlockedRecipes.css';
import { useParams, useNavigate } from 'react-router-dom';
import CardsEditRecipes from '../../Components/4.MyEditRecipe/CardsEditRecipes/CardsEditRecipes.JSX';
import TitleUnlockedFoods from '../../Components/5.UnlockedFoods/TitleUnlockedFoods/TitleUnlockedFoods';
import { ChevronLeft } from 'lucide-react';

function UnlockedRecipes() {
	const { day, mealTime } = useParams();
	const [recipes, setRecipes] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const storedPlans = JSON.parse(localStorage.getItem('weeklyPlan'));

		if (storedPlans) {
			const selectedDayPlan = storedPlans.find((plan) => plan.day === day);
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

	const handleGoBack = () => {
		navigate(`/editrecipe/${day}`);
	};

	return (
		<section>
			<button className='button-chevro1' onClick={handleGoBack}>
				<ChevronLeft />
			</button>

			<TitleEditBLD day={day} mealTime={mealTime} />

			{mealTime === 'Breakfast' && recipes.breakfast && (
				<CardsEditRecipes
					mealTime='Breakfast'
					recipe={{
						name: recipes.breakfast.name,
						description: recipes.breakfast.description || 'Perfect to start your day!',
						image: recipes.breakfast.image || 'default-breakfast.jpg',
						ingredients: getIngredients(recipes.breakfast),
					}}
					day={day}
					showPencil={false}
				/>
			)}

			{mealTime === 'Lunch' && recipes.lunch && (
				<CardsEditRecipes
					mealTime='Lunch'
					recipe={{
						name: recipes.lunch.name,
						description: recipes.lunch.description || 'Energize your afternoon!',
						image: recipes.lunch.image || 'default-lunch.jpg',
						ingredients: getIngredients(recipes.lunch),
					}}
					day={day}
					showPencil={false}
				/>
			)}

			{mealTime === 'Dinner' && recipes.dinner && (
				<CardsEditRecipes
					mealTime='Dinner'
					recipe={{
						name: recipes.dinner.name,
						description: recipes.dinner.description || 'End your day deliciously!',
						image: recipes.dinner.image || 'default-dinner.jpg',
						ingredients: getIngredients(recipes.dinner),
					}}
					day={day}
					showPencil={false}
				/>
			)}

			<TitleUnlockedFoods />
		</section>
	);
}

export default UnlockedRecipes;
