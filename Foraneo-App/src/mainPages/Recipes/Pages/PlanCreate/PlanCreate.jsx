import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleBuild from '../../Components/1.CreateYourPlan/TitleBuild/TitleBuild';
import BudgetInput from '../../Components/1.CreateYourPlan/BudgetInput/BudgetInput';
import FoodTypeSelector from '../../Components/1.CreateYourPlan/FoodTypeSelector/FoodTypeSelector';
import IngredientsList from '../../Components/1.CreateYourPlan/IngredientsList/IngredientsList';
import DaySelectorCook from '../../Components/1.CreateYourPlan/DaySelectorCook/DaySelectorCook';
import ButtonCreatePlan from '../../Components/ButtonCreatePlan/ButtonCreatePlan';
import BreakfastBowls from '../../Data/BreakfastBowls';
import LunchBowls from '../../Data/LunchBowls';
import DinnerBowls from '../../Data/DinnerBowls';
import './PlanCreate.css';
import Menu from '../../../Planner/components/navBar/navBar';

function PlanCreate() {
	const [budget, setBudget] = useState('');
	const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);
	const [selectedDays, setSelectedDays] = useState([]);
	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const [plans, setPlans] = useState([]);

	const navigate = useNavigate();

	const filterRecipesByTags = (recipes, selectedFoodTypes) => {
		return recipes.filter((recipe) => {
			const tags = recipe.tags || [];

			return selectedFoodTypes.every((type) => tags.includes(type));
		});
	};

	const getRandomRecipe = (recipes) => {
		if (recipes.length > 0) {
			return recipes[Math.floor(Math.random() * recipes.length)];
		} else {
			return { name: 'No recipe available', price: 0, image: '', description: '', tags: [] };
		}
	};

	const checkIncompatibleFilters = (selectedFoodTypes) => {
		const incompatibleCombos = [
			['Seafood', 'Vegetarian'],
			['Meat & Grill', 'Vegetarian'],
			['Meat & Grill', 'Vegan'],
			['Seafood', 'Vegan'],
		];

		for (const combo of incompatibleCombos) {
			if (combo.every((type) => selectedFoodTypes.includes(type))) {
				return true;
			}
		}
		return false;
	};

	const handleCreatePlan = () => {
		if (!budget || selectedFoodTypes.length === 0 || selectedDays.length === 0 || selectedIngredients.length === 0) {
			alert('Please complete all fields before creating the plan.');
			return;
		}

		if (checkIncompatibleFilters(selectedFoodTypes)) {
			alert('The selected food types are incompatible. Please choose different options.');
			return;
		}

		const numericBudget = parseInt(budget.replace(/\D/g, ''), 10);

		const newPlan = selectedDays.map((day) => {
			let filteredBreakfast = filterRecipesByTags(BreakfastBowls, selectedFoodTypes);

			let breakfastRecipe =
				filteredBreakfast.length > 0 ? getRandomRecipe(filteredBreakfast) : getRandomRecipe(BreakfastBowls);

			const filteredLunch = filterRecipesByTags(LunchBowls, selectedFoodTypes);
			const filteredDinner = filterRecipesByTags(DinnerBowls, selectedFoodTypes);

			const lunchRecipe = filteredLunch.length > 0 ? getRandomRecipe(filteredLunch) : getRandomRecipe(LunchBowls);
			const dinnerRecipe = filteredDinner.length > 0 ? getRandomRecipe(filteredDinner) : getRandomRecipe(DinnerBowls);

			return {
				day,
				breakfast: breakfastRecipe,
				lunch: lunchRecipe,
				dinner: dinnerRecipe,
			};
		});

		let totalCost = 0;
		newPlan.forEach((dayPlan) => {
			const dayCost = dayPlan.breakfast.price + dayPlan.lunch.price + dayPlan.dinner.price;
			totalCost += dayCost;
		});

		setPlans(newPlan);

		localStorage.setItem('weeklyPlan', JSON.stringify(newPlan));

		navigate('/weeklyplan');
	};

	return (
		<section className='plan-container'>
			<TitleBuild />
			<BudgetInput budget={budget} setBudget={setBudget} />
			<FoodTypeSelector selectedFoodTypes={selectedFoodTypes} setSelectedFoodTypes={setSelectedFoodTypes} />
			<IngredientsList selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} />
			<DaySelectorCook selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
			<ButtonCreatePlan onClick={handleCreatePlan} />



		<section className='menusectionplan'>
			<Menu ></Menu>
			</section>
		</section>
	);
}

export default PlanCreate;
